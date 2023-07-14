const express = require("express");
const { checkAddSongBodyRequest } = require("../validationRules");
const { validateRequest } = require("../../utils/validator");
const SongService = require("../service");
const songs = require("../model");

const router = express.Router();

const addSongAction = (_songService) => async (req, res, next) => {
  try {
    await _songService.insertSong(req.body);

    res.statusCode = 201;
    res.json({ status: "success", message: "data added successfully" });
  } catch (error) {
    next(error);
  }
};

const addSong = router.post(
  "/",
  checkAddSongBodyRequest(),
  validateRequest,
  addSongAction(new SongService(songs))
);

module.exports = addSong;
