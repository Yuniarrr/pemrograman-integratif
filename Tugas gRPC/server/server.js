// Import package 
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const MongoClient = require('mongodb').MongoClient;

// Define Proto path 
const PROTO_PATH = './mahasiswa.proto';

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

// Load Proto 
const mahasiswaProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// Connection URL and database name
const url = 'mongodb://admin:pass12345@localhost:27017/?authSource=admin';
const dbName = 'mahasiswa';

const dbClient = new MongoClient(url, { useUnifiedTopology: true });
let db;

async function connectDB() {
    try {
        await dbClient.connect();
        db = await dbClient.db(dbName);
        db.command({ ping: 1 });
        console.log("Connected successfully to mongo server");
        // Create index
        await db.collection("mahasiswa").createIndex({ email: 1 });
    } catch (e) {
        console.error(e);
    }
}

async function main() {
    await connectDB().catch(console.dir);
    let server = new grpc.Server();

    server.addService(mahasiswaProto.MahasiswaService.service, {
        getAll: async (_, callback) => {
            db.collection('mahasiswa').find().toArray((err, result) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    const mahasiswa = { mahasiswa: result };
                    callback(null, mahasiswa);
                }
            });
        },
        deleteMahasiswa: async (call, callback) => {
            const _id = call.request.id;
            db.collection('mahasiswa').deleteOne({ _id: ObjectId(_id) }, (err, result) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else if (result.deletedCount === 0) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'Mahasiswa not found' }, null);
                } else {
                    console.log(`${result.deletedCount} document(s) deleted`);
                    callback(null, { id: _id });
                }
            });
        },
        updateMahasiswa: async (call, callback) => {
            const _id = call.request.id;
            const _mahasiswa = call.request;
            db.collection('mahasiswa').updateOne({ _id: ObjectId(_id) }, { $set: _mahasiswa }, (err, result) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else if (result.matchedCount === 0) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'Mahasiswa not found' }, null);
                } else {
                    console.log(`${result.modifiedCount} document(s) updated`);
                    callback(null, _mahasiswa);
                }
            });
        },
        getMahasiswa: async (call, callback) => {
            const _id = call.request.id;
            db.collection('mahasiswa').findOne({ _id: ObjectId(_id) }, (err, result) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else if (result === null) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'Mahasiswa not found' }, null);
                } else {
                    callback(null, result);
                }
            });
        },
        addMahasiswa: async (call, callback) => {
            const _mahasiswa = call.request;
            db.collection('mahasiswa').insertOne(_mahasiswa, (err, result) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    console.log("1 document inserted");
                    callback(null, _mahasiswa);
                }
            });
        },
        createDatabase: (_, callback) => {
            db.createCollection("mahasiswa", (err, res) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    console.log("Collection created!");
                    callback(null, "Collection created!");
                }
            });
        }
    });

    let address = "127.0.0.1:50051";
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log("Server running at " + address);
    });
}

main();