const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
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

//Verify the login with the database
passport.use(new LocalStrategy( {
  usernameField: 'email',
  passswordField: 'password'
},  function(email, password, done) {
    db.collection('person').findOne({email: email, password: password}, (error, user) => {
      // console.log('Logging userdata in LocalStrategy: ', user)
      if (error) { return done(error); }
      if (!user) {
        //user used wrong credentials to log in
        return done(null, false, console.log('Wrong password or email'));
      }
      //By this, user is logged in
      return done(null, user);
    })
  }
));

//put the id in the cookie
passport.serializeUser((user, done) => {
  console.log('serializing user', user);
  done(null, user);
});

//Pass user, so it can be used by the template engine
passport.deserializeUser((id, done) => {
  db.collection('person').findOne(id, (err, user) => {
    console.log('deserializing user', id);
    done(err, id);
  });
});

module.exports = passport;
