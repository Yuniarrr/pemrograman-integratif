// Import package 
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { Contacts, Users } = require('./models.js');
const setup = require('./setup.json');

// Define Proto path 
const PROTO_PATH = '../contacts.proto';

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
const url = `mongodb://${setup.username}:${setup.password}@localhost:27017/contacts?authSource=admin`;

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
    await connectDB().catch(err => console.log(err));
    let server = new grpc.Server();

    server.addService(contactsProto.contacts.ContactService.service, {
        getAllContacts: async (call, callback) => {
            const user_id = call.request.user_id;
            try {
                const user = await Users.findById(user_id);
                if (!user) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'User not found' }, null);
                } else {
                    const contacts = await Contacts.find({ user_id }).sort({ nama: 'asc' });
                    callback(null, { contacts });
                }
            } catch (error) {
                callback(error, null);
            }
        },
        deleteContact: async (call, callback) => {
            const contact = call.request;
            const _id = contact._id;
            const user_id = contact.user_id;
            try {
                const user = await Users.findById(user_id);
                if (!user) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'User not found' }, null);
                } else {
                    const contact = await Contacts.findByIdAndDelete(_id);
                    if (!contact) {
                        callback({ code: grpc.status.NOT_FOUND, message: 'Contact not found' }, null);
                    } else {
                        console.log(`1 document deleted`);
                        callback(null, { message: '1' });
                    }
                }
            } catch (error) {
                callback(error, null);
            }
        },
        updateContact: async (call, callback) => {
            const _id = call.request._id;
            const user_id = call.request.user_id;
            console.log(`id: ${_id}`);
            const _contact = {
                nama: call.request.nama,
                email: call.request.email,
                phone: call.request.phone,
                category: call.request.category,
                description: call.request.description,
                user_id
            };
            try {
                const user = await Users.findById(user_id);
                if (!user) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'User not found' }, null);
                } else {
                    const contact = await Contacts.findOneAndUpdate(_id, _contact, { new: true }).exec();
                    if (!contact) {
                        callback({ code: grpc.status.NOT_FOUND, message: 'Contact not found' }, null);
                    } else {
                        console.log(`1 document updated`);
                        callback(null, { message: '1' });
                    }
                }
            } catch (error) {
                callback(error, null);
            }
        },
        getContact: async (call, callback) => {
            const _id = call.request._id;
            const user_id = call.request.user_id;
            try {
                const user = await Users.findById(user_id);
                if (!user) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'User not found' }, null);
                } else {
                    const contact = await Contacts.findById(_id);
                    if (!contact) {
                        callback({ code: grpc.status.NOT_FOUND, message: 'Contact not found' }, null);
                    } else {
                        callback(null, contact);
                    }
                }
            } catch (error) {
                callback(error, null);
            }
        },
        addContact: async (call, callback) => {
            const _contact = call.request;
            const user_id = _contact.user_id;
            try {
                const user = await Users.findById(user_id);
                if (!user) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'User not found' }, null);
                } else {
                    const contact = new Contacts(_contact);
                    const new_contact = await contact.save();
                    callback(null, { message: '1' });
                }
            } catch (error) {
                callback(error, null);
            }
        },
        addUser: async (call, callback) => {
            const _user = call.request;
            const _email = _user.email;
            try {
                const email = await Users.findOne({ email: _email });
                if (email) {
                    callback({ code: grpc.status.ALREADY_EXISTS, message: 'Email already exists' }, null);
                } else {
                    const user = new Users(_user);
                    const new_user = await user.save();
                    // const token = jwt.sign({
                    //     _id: new_user._id,
                    //     email: new_user.email
                    // }, setup.secret, { expiresIn: '2h' });
                    // new_user.token = token;
                    callback(null, { message: '1' });
                }
            } catch (error) {
                callback(error, null);
            }
        },
        getUser: async (call, callback) => {
            const _email = call.request.email;
            try {
                const user = await Users.findOne(_email);
                if (!user) {
                    callback({ code: grpc.status.NOT_FOUND, message: 'User not found' }, null);
                } else {
                    callback(null, user);
                }
            } catch (error) {
                callback(error, null);
            }
        },
        getAllUsers: async (call, callback) => {
            try {
                const users = await Users.find().sort({ _id: 'asc' }).exec();
                callback(null, { users });
            } catch (error) {
                callback(error, null);
            }
        }
    });

    let address = `127.0.0.1:${setup.port_grpc}`;
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log("Server running at " + address);
    });
}

main();