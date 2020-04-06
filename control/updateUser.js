// const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectID;
// const dotenv = require('dotenv');
// const session = require('express-session'); //https://www.npmjs.com/package/express-session
// const passport = require('passport'); //http://www.passportjs.org/docs/authenticate/
//
// require('../control/passport.js')
//
// dotenv.config();
//
// let db = null;
//
// const dbUri = process.env.DB_URI;
// const dbName = process.env.DB_NAME;
// const client = new MongoClient(dbUri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
//
// client.connect(err => {
//   if (err) {
//     console.log(err);
//     throw err;
//   }
//   db = client.db(dbName);
//   console.log('Connected from updateUser.js')
// });
//
// module.exports = (req, res) => {
//
//   console.log
//
//
// }
