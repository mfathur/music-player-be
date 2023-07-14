const express = require("express");
const getAllSongs = require("./get.allSongs");
const addSong = require("./post.addSong");
const playSong = require("./patch.playSong");

const router = express.Router();

router.use(getAllSongs, addSong, playSong);

module.exports = router;
