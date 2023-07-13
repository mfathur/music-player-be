const { body } = require("express-validator");

const checkAddSongBodyRequest = () => {
  return [
    body("id").exists().isInt(),
    body("title").exists().escape(),
    body("url").exists().isString(),
    body("artists").exists().isArray({ min: 1 }),
  ];
};

module.exports = { checkAddSongBodyRequest };
