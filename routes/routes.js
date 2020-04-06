const express = require('express'); //https://expressjs.com/en/starter/installing.html
const router = express.Router()
const ObjectId = require('mongodb').ObjectId;
const session = require('express-session'); //https://www.npmjs.com/package/express-session
const passport = require('passport'); //http://www.passportjs.org/docs/authenticate/
const createUser = require('../control/createuser.js');
const profile = require('../control/profile.js')
require('../control/passport.js')

router.get('/', index)
router.get('/sign-up', signUp)
router.get('/log-in', logIn)
router.get('/user', profile.userPage)
router.get('/logout', profile.logOut)
router.get('/editprofile', editUserPage)
router.post('/editprofile', profile.doEditProfile)
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

function editUserPage (req, res) {
  console.log(req.user)
  res.render('editprofile.ejs')
}

module.exports = router;
