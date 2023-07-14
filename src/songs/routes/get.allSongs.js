const express = require("express");
const SongService = require("../service");
const songs = require("../model");

const router = express.Router();

const getAllSongsAction = (_songService) => async (req, res, next) => {
  try {
    const { sort_by: sort_method } = req.query;

    const data = await _songService.getAllSongs({ sort_by: sort_method });

    res.statusCode = 200;
    res.json({ status: "success", data: data });
  } catch (error) {
    next(error);
  }
};

const getAllSongs = router.get("/", getAllSongsAction(new SongService(songs)));

module.exports = getAllSongs;
