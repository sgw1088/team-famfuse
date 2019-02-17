var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');
const jwt = require('jsonwebtoken');
const auth = require("../config/auth");
const bcrypt = require('bcrypt');

process.env.SECRET_KEY = 'secret'
/* GET users listing. */
router.get('/', function(req, res, next) {
  models.users
  .findAll({})
  .then(allUsers => {
    res.send(JSON.stringify(allUsers));
  })
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
        email: req.body.email
      }
    })
    .then(user => {
      if (user) {
        res.send('this user already exists');
      } else {
        const code = Math.random().toString(36).substr(2, 9) + req.body.lastName;
        
          models.users
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            childUser: req.body.childUser,
            parentUser: req.body.parentUser,
            email: req.body.email,
            password: hashedPassword,
            familyCode: req.body.familyCode,
            username: req.body.email
          })
          .then(createdUser => {
            const isMatch = createdUser.comparePassword(req.body.password);
            if (isMatch) {
              const userId = createdUser.userId;
              console.log(userId);
              const token = auth.signUser(createdUser);
              res.cookie('jwt', token);
              res.send(JSON.stringify(token));
            } else {
              console.error('not a match');
            }
          });
        }
      })
    })
        
  
      
      

//Login
router.get('/login', function(req,res,next) {
  res.render('login');
})
router.post('/login', function (req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
     const isMatch = user.comparePassword(req.body.password)
      console.log(isMatch)
    if (!user) {
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    if (isMatch) {
      const userId = user.userId
      const token = auth.signUser(user);
      res.cookie('jwt', token);
      res.send(token);
      
    } else {
      console.log(error);
      // res.redirect('/users/login')
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


// To DO CRUD


router.get('/todos', function(req, res, next) {
  models.todos.findAll({})
  .then(allTodos => {
    res.send(JSON.stringify(allTodos));
  })

}
);

router.post('/todos', function(req, res, next) {
  models.todos
    .findOrCreate({
      where: {
        todoName: req.body.todoName,
        todoDetails: req.body.todoDetails,
        dueDate: req.body.dueDate
      }
    })
    .spread(function(result, created) {
      if (created) {
      res.redirect('/todos');
      } else {
        res.send('This To Do Already Exists')
      }
    });
});

router.get('/todos/:id', (req, res) => {
  let todoId = parseInt(req.params.id);
  models.todos
  .find({
    where: {
      todoId: todoId
    },
  })
  .then(todo => {
    
    res.send(JSON.stringify(todo))
  })
});

router.put('/todos/:id', (req, res) => {
  let todoId = parseInt(req.params.id);
  models.todos
    .update(
      {
        todoName: req.body.todoName,
        todoDetails: req.body.todoDetails,
        dueDate: req.body.dueDate,
        todoStatus: req.body.todoStatus,
      },
      {
        where: {
          TodoId: todoId
        }
      }
    )
    .then(result => {
      res.send(JSON.stringify(result));
    });
});


module.exports = router;

