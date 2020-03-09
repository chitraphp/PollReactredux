const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
      done(null, user);
  });
});

passport.use('googleToken', new GoogleStrategy({
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: '/api/users/google/redirect'    
}, async (req, accessToken, refreshToken, profile, done) => {
  try{
    //passReqToCallback: true
    //callbackURL: '/api/users/google/redirect'
  console.log('accesstoken', accessToken);
  console.log('refreshtoken', refreshToken);
  console.log('profile', profile);
  existingUser = await User.findOne({ "googleId": profile.id });
  if(existingUser){
    return done(null,existingUser);
  }

  const newUser = new User({
    googleId:profile.id,
    name:profile.displayName,
    email:profile.emails[0].value
  });
  await newUser.save();
  done(null,newUser)
}catch(error){
  done(error,false,error.message);
}

}));