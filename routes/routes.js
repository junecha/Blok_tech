const express = require('express'); //https://expressjs.com/en/starter/installing.html
const router = express.Router()
const ObjectId = require('mongodb').ObjectId;
const session = require('express-session'); //https://www.npmjs.com/package/express-session
const passport = require('passport'); //http://www.passportjs.org/docs/authenticate/
const createUser = require('../control/createuser.js');
require('../control/passport.js')

router.get('/', index)
router.get('/sign-up', signUp)
router.get('/log-in', logIn)
router.get('/user', userPage)
router.get('/logout', logOut)
router.post('/sign-up', createUser)
router.post('/log-in', passport.authenticate('local', { failureRedirect: '/log-in', }), authCheck)

function index (req, res) {
  res.render('index.ejs');
}

function signUp (req, res) {
  res.render('sign-up.ejs');
}

function logIn (req, res) {
  res.render('log-in.ejs');
  // console.log(req.session);
}

function authCheck (req, res) {
  console.log('redirecting to /user')
  res.redirect('/user');
}

function userPage (req, res) {
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
    console.log('Session = ', req.session.passport.user.name)
  } else { //Authenticate if the user is logged in, if not return to log in
    console.log('redirecting to / anyway ')
    res.redirect('/');
  }
}

function logOut (req, res) {
  req.logout();
  res.redirect('/');
}

module.exports = router;
