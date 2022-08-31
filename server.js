"use strict";

const express = require("express");
const server = express();
const cors = require("cors");
const responseData = require("./data/weather.json");
require("dotenv").config();
const PORT = process.env.PORT || 3003;
server.use(cors());

let weatherHandler=require("./weather")

let moviesHandler=require("./movies")

// Global Route
server.get("/", (req, res) => {
  res.send("welcome to the Amani route ");
});
// http://localhost:3003/test
server.get("/test", (req, res) => {
  res.send("welcome to the test route ");
});
// Paris 48.8588897 2.3200410217200766
// http://localhost:3003/weather?city_name=Paris&lat=48.8588897&lot=2.3200410217200766
server.get("/weather", weatherHandler);

// `https://api.weatherbit.io/v2.0/forecast/daily?city=Paris&lat=48.8588897&lon=2.3200410217200766&key=153c6e538c2840c0b6ccd92cb6d6c61f`
server.get("/movies", moviesHandler);

// `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${query}`
// http://localhost:3003/movies?city_name=Paris


server.get("*", (req, res) => {
  res.send("page not found");
});




server.listen(PORT, () => {
  console.log(`I am listening on ${PORT}`);
});
