const { body } = require("express-validator");

const checkAddSongBodyRequest = () => {
  return [
    body("id").exists().bail().isInt(),
    body("title").exists().bail().escape(),
    body("url").exists().bail().isString(),
    body("artists").exists().bail().isArray({ min: 1 }),
  ];
};

module.exports = { checkAddSongBodyRequest };
