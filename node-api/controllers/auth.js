const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUpUser = (req, res, next) => {
  const { first_name, last_name, email, password, confirm_password, is_staff } =
    req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().map((errorObj, index) => {
      const error = new Error(errorObj.msg.message);
      error.statusCode = errorObj.msg.statusCode;
      throw error;
    });
  }

  if (password !== confirm_password) {
    const error = new Error("Password and confirm password is not match!");
    error.statusCode = 422;
    throw error;
  }

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        const error = new Error(`User with this ${email} is already exist!`);
        error.statusCode = 409;
        throw error;
      }

      return bcrypt.hash(password, 12);
    })
    .then((hash_password) => {
      const user = User({
        first_name,
        last_name,
        email,
        password: hash_password,
        is_staff,
      });

      return user.save();
    })
    .then((registeredUser) => {
      res
        .status(201)
        .json({ status_code: 201, message: "User created successfully!" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.signInUser = (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().map((errorObj, index) => {
      const error = new Error(errorObj.msg.message);
      error.statusCode = errorObj.msg.statusCode;
      throw error;
    });
  }
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error(
          `User with this ${email} e-mail is not exist in db!`
        );
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((passwordIsEqual) => {
      if (!passwordIsEqual) {
        const error = new Error(`Password is incorrect!`);
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        { email: loadedUser.email, is_staff: loadedUser.is_staff },
        "malakfarmankhan",
        { expiresIn: "10m" }
      );
      res.status(200).json({ access_token: token});
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
