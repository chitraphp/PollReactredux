const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  option:String,
  votes:{
    type:Number,
    default:0
  }
});
const pollSchema = new Schema({
  question:{
    type:String,
    required:true,
    message:"question required"
  },
  options:[optionSchema],
  voted:{
    type:Number,
    default:0
  },
  status:String

});
module.exports = Poll= mongoose.model('poll', pollSchema);