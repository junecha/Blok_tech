const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dotenv = require('dotenv');

dotenv.config();

//Initiate a connection with the database

let db = null;

const dbUri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(err => {
  if (err) {
    console.log(err);
    throw err;
  }
  db = client.db(dbName);
});


module.exports = (req, res) => { //Make an object person in Json format
  let person = {
    name: req.body.name,
    lastName: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    preference: req.body.searchp,
    interests: req.body.interests
  };

  db.collection('person').insertOne(person, (error, person) => {  //Insert the object 'person' in the collection person.
        res.redirect('/');
    })
};
