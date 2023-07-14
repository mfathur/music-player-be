const express = require("express");
const SongService = require("../service");
const songs = require("../model");

const router = express.Router();

const playSongAction = (_songService) => async (req, res, next) => {
  try {
    const params = req.params;
    const id = parseInt(params.id);

    const playedSongId = await _songService.playSongWithId(id);

    res.statusCode = 200;
    res.json({
      status: "success",
      message: `song with id ${playedSongId} is played`,
    });
  } catch (error) {
    next(error);
  }
};

const playSong = router.patch(
  "/:id/play",
  playSongAction(new SongService(songs))
);

module.exports = playSong;
