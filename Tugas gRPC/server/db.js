module.exports = class API {
    constructor(db, grpc) {
        this.db = db;
        this.grpc = grpc;
    }

    getAll(call, callback) {
        this.db.collection('mahasiswa').find({}).toArray((err, result) => {
            if (err) {
                console.error(err);
                callback(err, null);
            } else {
                const mahasiswa = { mahasiswa: result };
                callback(null, mahasiswa);
            }
        });
    }

    deleteMahasiswa(call, callback) {
        const _id = call.request.id;
        this.db.collection('mahasiswa').deleteOne({ _id: ObjectId(_id) }, (err, result) => {
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
    }

    updateMahasiswa(call, callback) {
        const _id = call.request.id;
        const _mahasiswa = call.request;
        this.db.collection('mahasiswa').updateOne({ _id: ObjectId(_id) }, { $set: _mahasiswa }, (err, result) => {
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
    }

    getMahasiswa(call, callback) {
        const _id = call.request.id;
        this.db.collection('mahasiswa').findOne({ _id: ObjectId(_id) }, (err, result) => {
            if (err) {
                console.error(err);
                callback(err, null);
            } else if (result === null) {
                callback({ code: grpc.status.NOT_FOUND, message: 'Mahasiswa not found' }, null);
            } else {
                callback(null, result);
            }
        });
    }

    addMahasiswa(call, callback) {
        const _mahasiswa = call.request;
        this.db.collection('mahasiswa').insertOne(_mahasiswa, (err, result) => {
            if (err) {
                console.error(err);
                callback(err, null);
            } else {
                callback(null, _mahasiswa);
            }
        });
    }

    getServer() {
        const server = new grpc.Server();
        server.addService(proto.MahasiswaService.service, {
            getAll: this.getAll.bind(this),
            getAllMahasiswa: this.getAllMahasiswa.bind(this),
            deleteMahasiswa: this.deleteMahasiswa.bind(this),
            updateMahasiswa: this.updateMahasiswa.bind(this),
            getMahasiswa: this.getMahasiswa.bind(this),
            addMahasiswa: this.addMahasiswa.bind(this)
        });
        return server;
    }
};

//  = new API();