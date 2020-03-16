const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
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

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.collection('person').findOne({ username: username}, (err, user) => {
      console.log('logging userdata in LocalStrategy: ', user)
      if(err) {return done(err)}

      if(!user || !user.validPassword(password)) {return done(null, false, console.log('user incorrect'))}

      return done(null, user, console.log('something something done'));
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializing: ' + user.id)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializing: ' + id)
})


module.exports = passport;
