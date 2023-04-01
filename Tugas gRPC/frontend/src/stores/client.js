const { ContactServiceClient } = require("../protos/contacts_grpc_web_pb");
const { Contacts } = require("../protos/contacts_pb");
const fetch = require("node-fetch");

const client = new ContactServiceClient("http://localhost:50051", null, null);

const contact = new Contacts({
    nama: "John Doe",
    email: "jhon@gmail.com",
    phone: "08123456789",
    category: "None",
    description: "Lorem ipsum dolor sit amet",
});

const addContact = async (contact) => {
    const request = new Request("http://localhost:50051/AddContact", {
        method: "POST",
        body: contact.serializeBinary(),
        headers: { "Content-Type": "application/octet-stream" },
    });
    const response = await fetch(request);
    return Contacts.deserializeBinary(await response.arrayBuffer());
};

addContact(contact)
    .then((response) => {
        console.log(response.toObject());
    })
    .catch((err) => {
        console.log(err);
    });
