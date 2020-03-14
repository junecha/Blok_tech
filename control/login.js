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
  console.log('Connected to database');
});

module.exports = (req, res) => {
  let userLogin = {   //Object van de gegevens van de log in
    email: req.body.email,
    password: req.body.password
  }
  console.log(userLogin);
  //Zoek in de collection en match het
  db.collection('person').findOne(userLogin, (error, userLogin) => {
    if (error || userLogin == null) {
      res.render('log-in', {
        person: userLogin,
        error: {loginError : "We couldn't log you in, Please try again!"}
      }) //Als er een onderdeel niet klopt, render log in dan weer
        console.log("You didn't enter proper credentials")
    } else {  //render de user log in als de inlog functie klopt
      req.session.userLoginid = userLogin._id;
      console.log(userLogin)

    }
  });
}
