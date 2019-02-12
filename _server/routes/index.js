var express = require('express');
var router = express.Router();
var models = require('../models');
const auth = require("../config/auth");
var multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null,'uploads/');
  },
  filename: function(req,file,cb) {
    cb(null, file.originalname);
  }
})
var upload = multer({ storage: storage})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FamFuse' });
});

router.get('/feed', auth.verifyUser, function(req, res, next) {
  models.feeds
  .findAll({
    where: {
      familyCode: req.user.familyCode
    }
  }).then(familyFeed => {
    res.render('feed', {
      feed: familyFeed
    });
  })
})
router.post('/newimage', upload.single('image'), function(req,res,next) {
  models.images
  .create({
    userId: req.body.userId,
    file: req.file.name,
    familyCode: req.body.familyCode
  })
})
router.post('/newpost', auth.verifyUser, function(req, res, next){
  console.log(req.body.file);
  models.feeds
  .create({
    userId: req.user.userId,
    message: req.body.message,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    familyCode: req.user.familyCode,
    username: req.user.username
  }).then(post => {
      res.redirect('feed'); 
  })
})

module.exports = router;
