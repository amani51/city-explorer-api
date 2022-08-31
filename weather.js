"use strict";
const axios = require("axios");


async function weatherHandler(req, res) {
  const city_name = req.query.city_name;
  const lat = req.query.lat;
  const lot = req.query.lot;
  const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city_name}&lat=${lat}&lon=${lot}&key=${process.env.WEATHER_API_KEY}`;
  axios
    .get(URL)
    .then((responseData) => {
      let specificData = responseData.data.data.map((item) => {
        return new Days(item);
      });
      res.status(200).send(specificData);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
}

class Days {
    constructor(item) {
      this.description = item.weather.description;
      this.datetime = item.datetime;
    }
  }


  module.exports=weatherHandler