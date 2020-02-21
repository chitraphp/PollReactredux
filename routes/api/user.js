const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validationRegisterInput = require('../../validation/register');
const validationLoginInput = require('../../validation/login');

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
module.exports=router;