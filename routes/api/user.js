const express = require('express');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validationRegisterInput = require('../../validation/register');
const validationLoginInput = require('../../validation/login');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const passportConf = require('../../config/passport-setup');
const UsersController = require('../../controllers/users');
//google
//const passportJWT = passport.authenticate('jwt', { session: false });

signToken = user => {
  return jwt.sign({
    iss: 'peopleTech',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, keys.secretOrKey);
}

const router = express.Router();

// @route   POST api/users/login
// @desc    Login User
// @access  Public
router.post('/login', (req, res) => {
  const {errors, isValid} =  validationLoginInput(req.body)

  //check for validation
  if (!isValid){
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({name})
  .then(user => {
    if (!user){
      errors.name = 'User not found';
      return res.status(404)
      .json(errors);
    }

    // check password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if (isMatch){
        //User matched
        const payload = {
          id: user.id,
          name: user.name,
          email:user.email          
        };

        jwt.sign(payload, 
          keys.secretOrKey,
          {expiresIn: 3600},
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        )
      } else {
        errors.password = 'Password does not match.';
        return res.status(400)
      .json(errors);
      }
    })
  })
})

/************************registration***************************/
router.post('/register',(req,res)=>{
  const {errors, isValid} =  validationRegisterInput(req.body)

  //check for validation
  if (!isValid){
    return res.status(400).json(errors);
  }

  User.findOne({name:req.body.name})
  .then(user=>{
    if(user){
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }
    const newUser = new User({
      name: req.body.name,
      email:req.body.email,    
      password: req.body.password
    });

    bcrypt.genSalt(10,(err,salt)=>{
      if(err) throw err;
      bcrypt.hash(newUser.password,salt,(err,hash)=>{
        if(err) throw err;
        newUser.password = hash;
        newUser.save()
        .then(user=>res.json(user))
        .catch(err=>console.log(err));
      });
    });

  })
})

router.get('/google',passport.authenticate('googleToken',{
  scope:['profile']
}));

router.get('/google/redirect',(req,res)=>{
  res.send(req.user)
});

// router.route('/oauth/google')
// .post(passport.authenticate('googleToken', { session: false }),UsersController.googleOAuth);

router.post('/google',passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);
//oAuth microsoft
// router.route('/oauth/google')
//   .post(passport.authenticate('googleToken', { session: false }), (req,res)=>{
    
//   });
router.post('/gapiuser',(req,res)=>{
  const existingUser =  User.findOne({ "googleId": req.body.id });
  if(!existingUser){
    const newUser = new User({
      googleId:req.body.id,
      name:req.body.name,
      email:req.body.email
    });
    newUser.save()
        .then(user=>res.json(user))
        .catch(err=>console.log(err));

  }
})


module.exports=router;