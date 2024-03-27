const express = require("express");
const {
  requiredField,
  requiredLength,
  emailValidate,
} = require("../validations/common_validation");

const isAuth = require("../middleware/is-auth");

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
    ...requiredLength("password"),
  ],
  authController.signInUser
);

router.post(
  "/forgot-password",
  [...requiredField("email"), ...emailValidate("email")],
  authController.forgotPassword
);

router.post("/check-token", authController.checkToken);

router.post(
  "/reset-password",
  [
    ...requiredField("password"),
    ...requiredField("confirm_password"),

    ...requiredLength("password"),
    ...requiredLength("confirm_password"),
  ],
  authController.resetPassword
);

router.get("/user-profile", isAuth, authController.getUserProfile);

router.put(
  "/edit-profile",
  isAuth,
  [...requiredField("email"), ...emailValidate("email")],
  authController.editUserProfile
);

module.exports = router;
