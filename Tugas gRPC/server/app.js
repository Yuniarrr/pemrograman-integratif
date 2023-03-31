// Import package 
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const api = require('./db.js');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// Define Proto path 
const PROTO_PATH = './contacts.proto';

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

// Load Proto 
const contactsProto = grpc.loadPackageDefinition(packageDefinition);

// Connection URL and database name
const url = 'mongodb://admin:pass12345@localhost:27017/contacts?authSource=admin';
const dbName = 'mahasiswa';

const Contacts = mongoose.model('contact', new mongoose.Schema({
    nama: String,
    email: String,
    phone: String,
    category: String,
    description: String,
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

    server.addService(contactsProto.contacts.ContactService.service, {
        getAll: async (_, callback) => {
            try {
                const contacts = await Contacts.find();
                callback(null, { contacts });
            } catch (error) {
                callback(error, null);
            }
        },
        deleteContact: async (call, callback) => {
            const _id = call.request.id;
            try {
                const contact = await Contacts.findByIdAndDelete(_id);
                if (!contact) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'Contact not found' }, null);
                } else {
                    console.log(`1 document deleted`);
                    callback(null, {});
                }
            } catch (error) {
                callback(error, null);
            }
        },
        updateContact: async (call, callback) => {
            const _id = call.request.id;
            const _contact = call.request;
            try {
                const contact = await Contacts.findByIdAndUpdate(_contact);
                if (!contact) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'Contact not found' }, null);
                } else {
                    console.log(`1 document updated`);
                    callback(null, _contact);
                }
            } catch (error) {
                callback(error, null);
            }
        },
        getContact: async (call, callback) => {
            const _id = call.request.id;
            try {
                const contact = await Contacts.findById(_id);
                if (!contact) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'Contact not found' }, null);
                } else {
                    callback(null, contact);
                }
            } catch (error) {
                callback(error, null);
            }
        },
        addContact: async (call, callback) => {
            const _contact = call.request;
            try {
                const contact = await Contacts.create(_contact);
                callback(null, contact);
            } catch (error) {
                callback(error, null);
            }
        },
        createDatabase: (_, callback) => {
            db.createCollection("contacts", (err, res) => {
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