const express = require("express");
const songRouter = require("./songs/routes.js");

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Spotify server app");
});

app.use("/songs", songRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
