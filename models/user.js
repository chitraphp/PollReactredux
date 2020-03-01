const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }  
});
// const UserSchema = new Schema({
//   id:{
//     type:string,
//   },
//   email:{
//     type:String,
//     lowercase:true
//   }

// });


module.exports = User = mongoose.model('users', UserSchema);