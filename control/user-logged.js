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

module.exports = (req, res) => {
  //Check if user is logged in
  if (!request.session.userLoginid) {
    res.redirect("/");
    return;
  }

  let userId = req.params.id;
  let objectId = new ObjectId(userId);
  db.collection('person').findOne({
    "_id": objectId
  }, (error, user) => {
    if (error || person == null) {
      response.status(404).send('User not found');
    } else {
      res.redirect('user.ejs');
    }
    console.log(person);
  })
}
