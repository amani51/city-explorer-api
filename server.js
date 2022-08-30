"use strict";

const express = require("express");
const server = express();
const cors = require("cors");
const responseData = require("./data/weather.json");
require("dotenv").config();
const PORT = process.env.PORT || 3003;
server.use(cors());
const axios = require("axios");
// Global Route
server.get("/", (req, res) => {
  res.send("Hi from the home route");
});
// http://localhost:3003/test
server.get("/test", (req, res) => {
  res.send("Hi from the test route");
  // console.log("keep going")
});

// Paris 48.8588897 2.3200410217200766
// http://localhost:3003/weather?city_name=Paris&lat=48.8588897&lot=2.3200410217200766
server.get("/weather", weatherHandler);

async function weatherHandler(req, res) {
  const city_name = req.query.city_name;
  const lat = req.query.lat;
  const lot = req.query.lot;
  const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city_name}&lat=${lat}&lon=${lot}&key=${process.env.WEATHER_API_KEY}`;
  // console.log(req.query);
  // console.log(URL);
  try {
    const responseData = await axios.get(URL);
    console.log("res",responseData.data);
    let specificData=responseData.data.data.map(item=>{

          return new Days(item);

        })
        res.send(specificData);
        console.log(specificData);
  } catch {
    console.log("error from weather route");
  }
}
// Paris 48.8588897 2.3200410217200766
// `https://api.weatherbit.io/v2.0/forecast/daily?city=Paris&lat=48.8588897&lon=2.3200410217200766&key=153c6e538c2840c0b6ccd92cb6d6c61f`
// `https://api.weatherbit.io/v2.0/forecast/daily?city=${req.query.city_name}&lat=${req.query.lat}&lon=${req.query.lot}&key=153c6e538c2840c0b6ccd92cb6d6c61f`
// console.log(req.query)
server.get("/movies", moviesHandler);
// `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${query}`
// http://localhost:3003/movies?city_name=Paris
async function moviesHandler(req, res) {
  const query = req.query.city_name;
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
  console.log(req.query);
  console.log(URL);
  
  try {
    const responseData = await axios.get(URL);
    console.log("res",responseData.data);
    let specificData=responseData.data.results.map(item=>{

          return new Movies(item);

        })
        res.send(specificData);
        console.log(specificData);
  } catch {
    console.log("error from movies route");
  }
}






server.get("*", (req, res) => {
  res.send("page not found");
});

class Days {
  constructor(item) {
    this.description = item.weather.description;
    this.datetime = item.datetime;
  }
}

class Movies{
  constructor(item){
    this.title=item.title;
    this.overview=item.overview;
    this.vote_average=item.vote_average;
    this.vote_count=item.vote_count;
    this.poster_path=item.poster_path;
    this.popularity=item.popularity;
    this.release_date=item.release_date;
  }
}
server.listen(PORT, () => {
  console.log(`I am listening on ${PORT}`);
});
