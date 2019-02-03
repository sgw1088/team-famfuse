var express = require('express');
var router = express.Router();

const sqlite = require('sqlite3').verbose();
var models = require('../models');

const auth = require("../config/auth");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', function(req,res,next) {
  res.render('login');
})
router.get('/register',function(req,res,next) {
  res.render('register');
})

router.post('/register',function(req,res,next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users
    .findOne({
      where: {
        Username: req.body.username
      }
    })
    .then(user => {
      if (user) {
        res.send('this user already exists');
      } else {
        const code = Math.random().toString(36).substr(2, 9) + req.body.lastName;
        if(req.body.usertype == 'parent' && req.body.createfamily == 'true') {
          models.users
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userType: req.body.usertype,
            email: req.body.email,
            password: hashedPassword,
            familyCode: code,
            username: req.body.email
          })
          .then(createdUser => {
            const isMatch = createdUser.comparePassword(req.body.password);
            if (isMatch) {
              const userId = createdUser.userId;
              console.log(userId);
              const token = auth.signUser(createdUser);
              res.cookie('jwt', token);
              res.send(JSON.stringify(createdUser));
            } else {
              console.error('not a match');
            }
          });
        } else {
          models.users
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userType: req.body.usertype,
            email: req.body.email,
            password: hashedPassword,
            familyCode: req.body.familycode,
            username: req.body.email
          })
          .then(createdUser => {
            const isMatch = createdUser.comparePassword(req.body.password);
            if (isMatch) {
              const userId = createdUser.userId;
              console.log(userId);
              const token = auth.signUser(createdUser);
              res.cookie('jwt', token);
              res.send(JSON.stringify(createdUser));
            } else {
              console.error('not a match');
            }
          });
        }
      }
    });
});
      



router.post('/login', function (req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users.findOne({
    where: {
      email: req.body.username
    }
  }).then(user => {
    const isMatch = user.comparePassword(req.body.password)

    if (!user) {
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    if (isMatch) {
      const userId = user.userId
      const token = auth.signUser(user);
      res.cookie('jwt', token);
      res.send(JSON.stringify(user));
      res.render('/profile/' + userId)
    } else {
      console.log(req.body.password);
      res.redirect('/users/login')
    }

  });
});

router.get('/profile/:id', auth.verifyUser, function (req, res, next) {
  if (req.params.id !== String(req.user.userId)) {
    res.send('This is not your profile')
  } else {
    res.render('profile', {
      FirstName: req.user.firstName,
      LastName: req.user.lastName,
      Email: req.user.email,
      UserId: req.user.userId,
      familyCode: req.user.familyCode
    })
  } 
});

router.get('/myfamily/:id', auth.verifyUser, function(req,res,next){
  if (req.params.id !== req.user.familyCode) {
    res.send('Please login to see this page.')
  } else {
  models.users
    .findAll({
      where: {
        familyCode: req.params.id
      }
    }).then(allFamily => {
      res.render('myfamily', {
        family: allFamily
      })
    })
  }
})

router.get('/logout', function (req, res) {
  res.cookie('jwt', null);
  res.redirect('/users/login');
});

module.exports = router;
