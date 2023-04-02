const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    nama: String,
    email: String,
    phone: String,
    category: String,
    description: String,
});

const usersSchema = new Schema({
    nama: String,
    email: String,
    password: String,
    token: String
});

const Contacts = mongoose.model('contacts', contactsSchema);
const Users = mongoose.model('users', usersSchema);

module.exports = {
    Contacts,
    Users
};