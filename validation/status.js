const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateStatusInput(data) {
  let errors = {};
  data.status = !isEmpty(data.status) ? data.status : '';

  if (Validator.isEmpty(data.status)) {
    errors.status = 'status field is required';
  }

  if (!Validator.isLength(data.status, { min: 5, max: 10 })) {
    errors.question = 'status must be between 5 and 10 characters';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}