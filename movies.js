"use strict";
const axios = require("axios");
const cashMem={};


async function moviesHandler(req, res) {
  const query = req.query.city_name;
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
if (cashMem[query]!=undefined){
  console.log('data')

  res.status(200).send(cashMem[query]);
}else{
  console.log(' I dont have data')
  axios
    .get(URL)
    .then((responseData) => {
      let specificData = responseData.data.results.map((item) => {
        return new Movies(item);
      });
      cashMem[query]=specificData;
      res.status(200).send(specificData);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
}
  
}

class Movies {
  constructor(item) {
    this.title = item.title;
    this.overview = item.overview;
    this.vote_average = item.vote_average;
    this.vote_count = item.vote_count;
    this.poster_path = "https://image.tmdb.org/t/p/w500/" + item.poster_path;
    this.popularity = item.popularity;
    this.release_date = item.release_date;
  }
}

module.exports= moviesHandler