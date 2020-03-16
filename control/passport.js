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

passport.use(new LocalStrategy( {usernameField: 'email', passswordField: 'password'},
  function(username, password, done) {
    db.collection('person').findOne({email: username, password: password}, (error, user) => {
      // console.log('Logging userdata in LocalStrategy: ', user)
      if (error) { return done(error); }
      if (!user) {
        return done(null, false, console.log('je bent lelijk'));
      }
      return done(null, user);
    })
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializing user', user);
  done(null, user._id);

});

passport.deserializeUser(function(_id, done) {
  db.collection('person').findOne({id: _id}, (err, user) => {
    // console.log('deserializing user', _id, _id.name);
    done(err, _id);
  });
});

module.exports = passport;
