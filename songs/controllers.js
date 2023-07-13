const NotFoundError = require("../utils/errors/NotFoundError");
const songs = require("./data");

const getAllSongs = async (req, res, next) => {
  try {
    res.statusCode = 200;
    res.json({ status: "success", data: songs });
  } catch (error) {
    next(error);
  }
};

const playSong = async (req, res, next) => {
  try {
    const params = req.params;
    const id = parseInt(params.id);
    const index = songs.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new NotFoundError("song not found");
    } else {
      // change last played song status to idle if any
      const lastPlayedSong = songs.find((song) => song.status === "playing");
      if (lastPlayedSong) {
        lastPlayedSong.status = "idle";
      }

      // change targeted song status to playing
      songs[index].status = "playing";

      res.statusCode = 200;
      res.json({
        status: "success",
        message: `song with id ${songs[index].id} is played`,
      });
    }
  } catch (error) {
    next(error);
  }
};

const addSong = async (req, res, next) => {
  try {
    const newSong = req.body;
    newSong.status = "idle";
    songs.push(newSong);

    res.statusCode = 201;
    res.json({ status: "success", message: "data added successfully" });
  } catch (error) {
    next(error);
  }
};

const controllers = { getAllSongs, playSong, addSong };

module.exports = controllers;
