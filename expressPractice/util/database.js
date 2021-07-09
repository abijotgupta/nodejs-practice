const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const uri = "mongodb+srv://Ram:uw3U2Wql4UEskPfo@cluster0.rjgiw.mongodb.net/shop?retryWrites=true&w=majority";
const mongoConnect = (callback) => {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connection Successful');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log('Error', err);
    });
}

const getDb = () => {
    if( _db ) {
        return _db;
    }
    throw 'No Database Found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
