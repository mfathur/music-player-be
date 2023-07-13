const express = require("express");
const controllers = require("./controllers");
const { checkAddSongBodyRequest } = require("./validationRules");
const { validateRequest } = require("../utils/validator.js");

const router = express.Router();

router.get("/", controllers.getAllSongs);
router.post(
  "/",
  checkAddSongBodyRequest(),
  validateRequest,
  controllers.addSong
);
router.patch("/:id/play", controllers.playSong);

module.exports = router;
