class SongService {
  constructor(models) {
    this.models = models;
  }

  async getAllSongs(query) {
    if (query.sort_by === "most_played") {
      // sort by played_count
      const data = this.models.sort((s1, s2) =>
        s1.played_count < s2.played_count
          ? 1
          : s1.played_count > s2.played_count
          ? -1
          : 0
      );

      return data;
    }

    return this.models;
  }

  async playSongWithId(id) {
    // find targeted song index
    const index = this.models.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new NotFoundError("song not found");
    }

    // change last played song status to idle if any
    const lastPlayedSong = this.models.find(
      (song) => song.status === "playing"
    );
    if (lastPlayedSong) {
      lastPlayedSong.status = "idle";
    }

    const currentPlayedSong = this.models[index];

    // change current played song status to playing
    currentPlayedSong.status = "playing";

    currentPlayedSong.played_count += 1;

    return currentPlayedSong.id;
  }

  async insertSong(newData) {
    newData.status = "idle";
    newData.played_count = 0;

    this.models.push(newData);
  }
}

module.exports = SongService;
