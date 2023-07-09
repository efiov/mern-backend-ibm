const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(input) {
  let errors = {};

  input.name = !isEmpty(input.name) ? input.name : "";
  input.email = !isEmpty(input.email) ? input.email : "";
  input.password = !isEmpty(input.password) ? input.password : "";

  if (Validator.isEmpty(input.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(input.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(input.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(input.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(input.password, { min: 8, max: 30 })) {
    errors.password = "Password must be at least 8 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
