const { body } = require("express-validator");

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const requiredField = (fieldName) => {
  // If fieldName contains underscores, split it and capitalize only the first word's first character
  const formattedFieldName = fieldName.includes("_")
    ? fieldName
        .split("_")
        .map((word, index) =>
          index === 0 ? capitalizeFirstLetter(word) : word
        )
        .join(" ")
    : capitalizeFirstLetter(fieldName);

  return [
    body(fieldName)
      .trim()
      .notEmpty()
      .withMessage({
        message: `${formattedFieldName} field is required!`,
        statusCode: 422,
      }),
  ];
};

const requiredLength = (fieldName) => {
  // If fieldName contains underscores, split it and capitalize only the first word's first character
  const formattedFieldName = fieldName.includes("_")
    ? fieldName
        .split("_")
        .map((word, index) =>
          index === 0 ? capitalizeFirstLetter(word) : word
        )
        .join(" ")
    : capitalizeFirstLetter(fieldName);

  return [
    body(fieldName)
      .trim()
      .isLength({ min: 5 })
      .withMessage({
        message: `${formattedFieldName} length must be 5 character long!`,
        statusCode: 422,
      })
      .isLength({
        max: 12,
      })
      .withMessage({
        message: `${formattedFieldName} length must be less than 12 character!`,
        statusCode: 422,
      }),
  ];
};

const emailValidate = (fieldName) => {
  // If fieldName contains underscores, split it and capitalize only the first word's first character
  const formattedFieldName = fieldName.includes("_")
    ? fieldName
        .split("_")
        .map((word, index) =>
          index === 0 ? capitalizeFirstLetter(word) : word
        )
        .join(" ")
    : capitalizeFirstLetter(fieldName);

  return [
    body(fieldName).trim().isEmail().withMessage({
      message: `Email should be valid!`,
      statusCode: 422,
    }),
  ];
};

module.exports = {
  requiredField,
  requiredLength,
  emailValidate,
};
