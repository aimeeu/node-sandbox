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

    db.collection('users').findOne({name: 'Betty'}, (error, user) => {
        if (error) {
            return console.log('unable to fetch user', error);
        }
        console.log(user);
    });

    // find returns a cursor
    db.collection('users').find({age: 12}).toArray((error, users) => {
        console.log(users);
    });

    db.collection('users').find({age: 12}).count((error, count) => {
        console.log(count);
    });

    db.collection('tasks').findOne({ _id: new ObjectID("5c7ec2965a1d857c722883ef")}, (error, task) => {
        if (error) {
            return console.log('unable to fetch task', error);
        }
        console.log(task);
    });

    db.collection('tasks').find({completed: true}).toArray((error, tasks) => {
        console.log(tasks);
    });
});
