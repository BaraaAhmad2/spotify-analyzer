import express from "express";
import cors from "cors";
import spotifyRouter from "./spotify.js";

const app = express();

app.use(express.json());
app.use(cors());

// mount the spotify routes
app.use("/api", spotifyRouter);

// start server
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
