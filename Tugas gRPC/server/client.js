const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = '../contacts.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const contactsSrvPckgDef = grpc.loadPackageDefinition(packageDefinition).contacts;

const client = new contactsSrvPckgDef.ContactService(
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
);

module.exports = client;
