// Import package 
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const api = require('./db.js');
const mongoose = require('mongoose');

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

// Connection URL and database name
const url = 'mongodb://admin:pass12345@localhost:27017/mahasiswa?authSource=admin';
const dbName = 'mahasiswa';

const Mahasiswa = mongoose.model('mahasiswa', new mongoose.Schema({
    id: String,
    nama: String,
    nrp: String,
    nilai: String
}));


async function connectDB() {
    try {
        const connect = await mongoose.connect(url);
        if (connect) {
            console.log("Connected successfully to mongo server");
        }
    } catch (e) {
        console.error(e);
    }
}

async function main() {
    // await connectDB().catch(console.dir);
    await connectDB().catch(err => console.log(err));
    let server = new grpc.Server();

    server.addService(mahasiswaProto.MahasiswaService.service, {
        getAll: async (_, callback) => {
            try {
                const mahasiswa = await Mahasiswa.find();
                callback(null, { mahasiswa });
            } catch (error) {
                callback(error, null);
            }
        },
        deleteMahasiswa: async (call, callback) => {
            const _id = call.request.id;
            try {
                const mahasiswa = await Mahasiswa.findByIdAndDelete(_id);
                if (!mahasiswa) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'Mahasiswa not found' }, null);
                } else {
                    console.log(`1 document deleted`);
                    callback(null, {});
                }
            } catch (error) {
                callback(error, null);
            }
        },
        updateMahasiswa: async (call, callback) => {
            const _id = call.request.id;
            const _mahasiswa = call.request;
            try {
                const mahasiswa = await Mahasiswa.findByIdAndUpdate(_mahasiswa);
                if (!mahasiswa) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'Mahasiswa not found' }, null);
                } else {
                    console.log(`1 document updated`);
                    callback(null, _mahasiswa);
                }
            } catch (error) {
                callback(error, null);
            }
        },
        getMahasiswa: async (call, callback) => {
            const _id = call.request.id;
            try {
                const mahasiswa = await Mahasiswa.findById(_id);
                if (!mahasiswa) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'Mahasiswa not found' }, null);
                } else {
                    callback(null, mahasiswa);
                }
            } catch (error) {
                callback(error, null);
            }
        },
        addMahasiswa: async (call, callback) => {
            const _mahasiswa = call.request;
            try {
                const mahasiswa = new Mahasiswa(_mahasiswa);
                if (await mahasiswa.save()) {
                    callback(null, _mahasiswa);
                }
            } catch (error) {
                callback(error, null);
            }
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