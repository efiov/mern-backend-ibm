const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(input) {
  let errors = {};

  input.email = !isEmpty(input.email) ? input.email : "";
  input.password = !isEmpty(input.password) ? input.password : "";

  if (Validator.isEmpty(input.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(input.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(input.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
