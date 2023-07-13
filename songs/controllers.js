const songs = require("./data");

const getAllSongs = async (req, res) => {
  res.statusCode = 200;
  res.json({ status: "success", data: songs });
};

const playSong = async (req, res) => {
  const params = req.params;
  const id = parseInt(params.id);

  const index = songs.findIndex((song) => song.id === id);

  if (index === -1) {
    res.statusCode = 404;
    res.json({ status: "failed", message: "song not found" });
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
};

const addSong = async (req, res) => {
  const newSong = req.body;
  newSong.status = "idle";
  songs.push(newSong);

  res.statusCode = 201;
  res.json({ status: "success", message: "data added successfully" });
};

const controllers = { getAllSongs, playSong, addSong };

module.exports = controllers;
