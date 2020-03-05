const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const dotenv = require('dotenv');

dotenv.config();

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
  console.log("Connected to database")
});


module.exports = (req, res) => {
  let person = {
    name: req.body.name,
    lastName: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    preference: req.body.searchp
  };

  db.collection("person").insertOne(person, (error, person) => {
        res.redirect("/");
    })
};
