import express from "express";
import queryString from "querystring";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();

router.get("/spotify-login", (req, res) => {
  console.log("accessed endpoint");
  console.log("client id:", process.env.SPOTIFY_CLIENT_ID);

  const params = queryString.stringify({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: "user-read-email",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  });

  res.redirect("https://accounts.spotify.com/authorize?" + params);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  if (!code) return res.status(400).send("no code provided");

  const basicAuth = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
  ).toString("base64");

  //exchange auth code for tokens
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + basicAuth,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }),
  });

  const data = await response.json();
  console.log("data: ", data);
  // Here, you can store access_token / refresh_token in a session or cookie

  res.cookie("spotify_access_token", data.access_token, {
    httpOnly: true,
    secure: true, // use true if using HTTPS (ngrok is HTTPS)
    maxAge: data.expires_in * 1000, // expires_in is in seconds
  });
  // Redirect user to your frontend home page
  res.redirect("http://localhost:3000/home"); // <-- change to your frontend route
});
export default router;
