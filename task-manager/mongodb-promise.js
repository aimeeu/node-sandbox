// CRUD

const {MongoClient, ObjectID} = require('mongodb');

const conUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

const id = new ObjectID();

MongoClient.connect(conUrl, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database: ', error.toString());
    }
    console.log('connected correctly');
    const db = client.db(dbName);

    // https://docs.mongodb.com/manual/reference/operator/update/
    db.collection('users').updateOne( {
        _id: new ObjectID("5c7eb26401ca8d724d0b3af0")
    }, {
        $set: {
            name: 'Squiffy'
        },
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result.modifiedCount);
    }).catch((error) => {
        console.log(error);
    })


    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })
});
