// CRUD

const {MongoClient, ObjectID} = require('mongodb');

const conUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());
console.log(id.id.length);


MongoClient.connect(conUrl, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database: ', error.toString());
    }
    console.log('connected correctly');
    const db = client.db(dbName);
    db.collection('users').insertOne({
        _id: id,
        name: 'Betty',
        age: 12
    }, (error, result) => {
        if (error){
            return console('unable to insert user', error);
        }
        console.log(result.ops);
    })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jethro', age: 30
    //     },
    //     {
    //         name: 'Holly', age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console('unable to insert user', error);
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany( [
    //     {
    //         description: 'task one', completed: true
    //     },
    //     {
    //         description: 'task 2', completed: false
    //     },
    //     {
    //         description: 'task 3', completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console('unable to insert user', error);
    //     }
    //     console.log(result.ops);
    // });
});
