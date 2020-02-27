const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePollInput(data) {
  let errors = {};

  data.question = !isEmpty(data.question) ? data.question : '';

  if (!Validator.isLength(data.question, { min: 20, max: 60 })) {
    errors.question = 'Question must be between 20 and 60 characters';
  }
  
/****
  if(!Validator.isLength(data.options),{min:2}){
    errors.options = 'Minimum two options should be there'
  }***/

  if (Validator.isEmpty(data.question)) {
    errors.question = 'Question field is required';
  }
  if(data.options.length === 0){
    errors.option = 'provide options'
  }

  if(data.options.length === 1){
    errors.option = 'provide minimum two options'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};