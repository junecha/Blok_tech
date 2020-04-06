const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dotenv = require('dotenv');

dotenv.config();

require('passport')

let profile = {}

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

profile.userPage = function (req, res) {
  if (req.user) {
    res.render('user.ejs', { //Give the template engine these req from the database
      name: req.user.name,
      lastname: req.user.lastname,
      age: req.user.age,
      email: req.user.email,
      gender: req.user.gender,
      preference: req.user.preference,
      interests: req.user.interests
    });
    console.log('Session id = ', req.session.passport.user._id)
  } else { //Authenticate if the user is logged in, if not return to log in
    console.log('redirecting to / anyway ')
    res.redirect('/');
  }
}

profile.doEditProfile = function (req, res) {

  db.collection('person').updateOne({ _id: ObjectId(req.session.passport.user._id) }, {
    $set: {
      name: req.body.name,
      lastName: req.body.lastname,
      age: req.body.age,
      interests: req.body.interests
    }
  }, (err, person) => {
    console.log('user updated')
    res.redirect('user')
  });
}

profile.logOut = function (req, res) {
  req.logout();
  res.redirect('/');
}

module.exports = profile
