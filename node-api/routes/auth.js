const express = require("express");
const {
  requiredField,
  requiredLength,
  emailValidate,
} = require("../validations/common_validation");

const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  [
    ...requiredField("email"),
    ...emailValidate("email"),
    ...requiredField("password"),
    ...requiredField("confirm_password"),

    ...requiredLength("password"),
    ...requiredLength("confirm_password"),
  ],
  authController.signUpUser
);
router.post(
  "/signin",
  [
    ...requiredField("email"),
    ...emailValidate("email"),

    ...requiredField("password"),
    ...requiredLength("password")
  ],
  authController.signInUser
);

module.exports = router;
