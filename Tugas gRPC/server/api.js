const express = require('express');
const client = require('./client');
const cors = require('cors');
const setup = require('./setup.json');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(cookieParser());

// get contacts
app.post('/contacts', (req, res) => {
    try {
        client.getAllContacts({
            user_id: req.body.user_id
        }, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error getting data'
                });
            } else {
                return res.status(200).send({
                    data: data.contacts,
                    message: 'Success getting data'
                });
            }
        })
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

// get contact
app.post('/contact', (req, res) => {
    try {
        client.getContact({
            _id: req.body._id,
            user_id: req.body.user_id
        }, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error getting data'
                });
            } else {
                return res.status(200).send({
                    data,
                    message: 'Success getting data'
                });
            }
        })
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

// add contact
app.put('/contact', (req, res) => {
    try {
        client.addContact({
            _id: req.body._id,
            user_id: req.body.user_id,
            nama: req.body.nama,
            email: req.body.email,
            phone: req.body.phone,
            category: req.body.category,
            description: req.body.description
        }, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error adding data'
                });
            } else {
                return res.status(200).send({
                    message: data.message
                });
            }
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

// update contact
app.patch('/contact', (req, res) => {
    try {
        client.updateContact({
            _id: req.body._id,
            user_id: req.body.user_id,
            nama: req.body.nama,
            email: req.body.email,
            phone: req.body.phone,
            category: req.body.category,
            description: req.body.description
        }, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error updating data'
                });
            } else {
                return res.status(200).send({
                    message: data.message
                });
            }
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

// delete contact
app.delete('/contact', (req, res) => {
    try {
        client.deleteContact({
            _id: req.body._id,
            user_id: req.body.user_id
        }, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error deleting data'
                });
            } else {
                return res.status(200).send({
                    message: data.message
                });
            }
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

app.post('/login', (req, res) => {
    try {
        client.login({
            email: req.body.email,
            password: req.body.password
        }, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error logging in'
                });
            } else {
                return res.status(200).send({
                    message: data.message,
                    token: data.token
                });
            }
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

app.post('/register', (req, res) => {
    try {
        client.addUser({
            nama: req.body.nama,
            email: req.body.email,
            password: req.body.password
        }, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error create new account'
                });
            } else {
                return res.status(200).send({
                    message: data.message
                });
            }
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

app.listen(setup.port_api, () => console.log(`Server running on port ${setup.port_api}`));