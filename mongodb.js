// all of the CRUD operations create read update and delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

// const id = new ObjectID();
// console.log(id);
// console.log(id.id.length);
// console.log(id.toHexString().length);

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect to db');
    }

    const db = client.db(databaseName);

    // db.collection('tasks').deleteOne({
    //     description: 'home work'
    // }).then(result=> {
    //     console.log(result.deletedCount);
    // }).catch(error => {
    //     console.log(error);
    // })

    // db.collection('users').deleteMany({age:29}).then(result=>{
    //     console.log(result.deletedCount)
    // }).catch(error => {
    //     console.log(error)
    // })
    
    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed : true
    //     }
    // }).then(result => {
    //     console.log(result.modifiedCount)
    // }).catch(error => {
    //     console.log(error)
    // });



    // db.collection('users').updateOne({
    //     _id: new ObjectID('5cf6082e246bf655477f5022')
    // }, {
    //     $set: {
    //         age: 29
    // }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // });
    
    
    // db.collection('tasks').find({completed : true}).toArray((error, result) =>{
    //     if (error){
    //         return console.log('unable to fetch the document!');
    //     }
    //     console.log(result);
    // });
    
    
    // db.collection('tasks').findOne({
    //     _id : new ObjectID('5cf60d98b399645630673e2c')
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('unable to fetch it');
    //     }
    //     console.log(result);
    // })
    
    
    // db.collection('users').find({ 
    //         age: 22
    //     }).toArray((error, result) => {
    //         if(error) {
    //             return console.log(error);
    //         }
    //         console.log(result);
    //     });
    
    
    // db.collection('users').findOne({
    //     name: 'Armaghan'
    // }, (error, result) => {
    //     if (error) {
    //        return console.log(error); 
    //     }
    //     console.log(result)
    // });


    // db.collection('users').insertOne({
    //     name: 'Armaghan',
    //     age: 22
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert the document');
    //     }

    //     console.log(result.ops);

    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Shwan',
    //         age: 32
    //     }, {
    //         name: 'Brooks',
    //         age: 24

    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'home work',
    //         completed: true
    //     }, {
    //         description: 'Work on Ionic',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert document!');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Renew inspection for bike',
    //         completed : false
    //     }
    // ], (er, res) => {
    //     if (er) {
    //         return console.log(er);
    //     }
    //     console.log(res.ops);
    // })

});