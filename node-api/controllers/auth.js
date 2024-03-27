const crypto = require("crypto");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { clearImage } = require("../helpers/clearImage");

function generateToken(length) {
  return crypto.randomBytes(length).toString("hex");
}

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
        {
          userId: loadedUser._id,
          email: loadedUser.email,
          is_staff: loadedUser.is_staff,
        },
        "malakfarmankhan786",
        { expiresIn: "1h" }
      );
      res.status(200).json({ access_token: token.toString() });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.forgotPassword = (req, res, next) => {
  const { email } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().map((errorObj, index) => {
      const error = new Error(errorObj.msg.message);
      error.statusCode = errorObj.msg.statusCode;
      throw error;
    });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error(
          `User with this ${email} e-mail is not exist in db!`
        );
        error.statusCode = 404;
        throw error;
      }

      const token = generateToken(32);
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      return user.save();
    })
    .then((userDoc) => {
      return res.status(200).json({
        message:
          "Hey now you can reset your password via link which i sent you in email!",
        token: userDoc.resetToken,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.checkToken = (req, res, next) => {
  const { token } = req.body;

  let tokenExist = false;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        res.status(422).json({
          message: "Your token is not exist or expired!",
          tokenExist: tokenExist,
          token: token,
        });
      }
      res.status(200).json({
        message: "Your token is fully correct!",
        tokenExist: true,
        token: token,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Your token is not exist or expired!",
        tokenExist: tokenExist,
        token: token,
      });
    });
};

exports.resetPassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().map((errorObj, index) => {
      const error = new Error(errorObj.msg.message);
      error.statusCode = errorObj.msg.statusCode;
      throw error;
    });
  }
  const { password, confirm_password, token } = req.body;

  if (password !== confirm_password) {
    const error = new Error("Password and confirm password is not match!");
    error.statusCode = 422;
    throw error;
  }
  let loadedUser;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        const error = new Error(`Your Token has been expired!`);
        error.statusCode = 422;
        throw error;
      }
      loadedUser = user;
      return bcrypt.hash(password, 12);
    })
    .then((hash_password) => {
      loadedUser.password = hash_password;
      loadedUser.resetToken = undefined;
      loadedUser.resetTokenExpiration = undefined;
      return loadedUser.save();
    })
    .then((resetUser) => {
      res
        .status(200)
        .json({ status_code: 200, message: "Password successfully reset!" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getUserProfile = (req, res, next) => {
  const userId = req.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Authenticate user!",
        user: {
          full_name: user.full_name,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          image: user.image,
        },
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.editUserProfile = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().map((err) => {
      const error = new Error(err.msg.message || "Server Error");
      error.statusCode = err.msg.statusCode || 500;
      throw error;
    });
  }
  const { first_name, last_name, email, password, confirm_password } = req.body;
  const userId = req.userId;


  let loadedUser;
  let isPassword = false;

  if (password || confirm_password) {
    if (password.length < 5 || confirm_password.length < 5) {
      const error = new Error(
        "Password and confirm password must be at least 5 characters long!"
      );
      error.statusCode = 422;
      throw error;
    }

    if (password.length > 12 || confirm_password.length > 12) {
      const error = new Error(
        "Password and confirm password must be less than 12 characters long!"
      );
      error.statusCode = 422;
      throw error;
    }
    if (password !== confirm_password) {
      const error = new Error("Password and confirm password do not match!");
      error.statusCode = 422;
      throw error;
    }
    isPassword = true;
  }

  // Check if the provided email already exists
  User.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser && existingUser._id.toString() !== userId.toString()) {
        res
          .status(409)
          .json({ detail: `User with this ${email} is already exist!` });
      }
      return User.findById(userId);
    })
    .then((user) => {
      if (!user) {
        const error = new Error(`User with this ID ${userId} not found!`);
        error.statusCode = 422;
        throw error;
      }
      loadedUser = user;

      if (isPassword) {
        return bcrypt.hash(password, 12);
      }

      return Promise.resolve(null);
    })
    .then((hashPassword) => {
      if (hashPassword !== null) {
        loadedUser.password = hashPassword;
      }

      loadedUser.first_name = first_name;
      loadedUser.last_name = last_name;
      loadedUser.email = email;
      if (req.file && req.file.path!==loadedUser.image) {
          clearImage(loadedUser.image);

        loadedUser.image = req.file.path;
      }
      return loadedUser.save();
    })
    .then((updateUser) => {
      res
        .status(200)
        .json({ msg: "Profile successfully updated", user: updateUser._id });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
        next(error);
      }
    });
};
