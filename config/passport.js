const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');
const auth = require("../config/auth");

passport.use(
    'local',
    new LocalStrategy(function(username, password, done) {
      models.users
        .findOne({
          where: {
            username: username
          }
        })
        .then(user => {
          if (!user) {
            console.log('not user');
            return done(null, false, {
              message: 'Incorrect username.'
            });
          }
          if (user.password !== password) {
            console.log('not valid password');
            return done(null, false, {
              message: 'Incorrect password.'
            });
          }
          return done(null, user);
        })
        .catch(err => {
          if (err) {
            console.log('error');
            return done(err);
          }
        });
    })
  );
  
  passport.serializeUser((user, cb) => {
    cb(null, user.userId);
  });
  
  passport.deserializeUser((id, cb) => {
    models.users
      .findOne({
        where: {
          userId: id
        }
      })
      .then(user => {
        cb(null, user);
      })
      .catch(err => {
        cb(err);
      });
  });