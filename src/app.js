const express = require("express");
const { errorHandler } = require("./utils/ErrorHandler");

const songRouter = require("./songs/routes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Spotify server app");
});

app.use("/songs", songRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
