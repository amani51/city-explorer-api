const express = require("express");
const server = express();
const cors = require('cors');
const responseData = require("./data/weather.json");
const PORT = 3000;
server.use(cors());
// Global Route
server.get("/", (req, res) => {
  res.send("Hi from the home route");
});
// http://localhost:3000/test
server.get("/test", (req, res) => {
  res.send("Hi from the test route");
  // console.log("keep going")
});
// http://localhost:3000/weather?city_name=Seattle&lat=47.6038321&lon=-122.3300624
server.get("/weather", (req, res) => {
  let findData = responseData.find((item) => {
    return  item.city_name == req.query.city_name &&
      item.lat == req.query.lat &&
      item.lon == req.query.lot; 
  });
  
console.log(req.query.city_name,req.query.lat ,req.query.lot)
  let specificData=findData.data.map(item=>{

    return ([item.weather.description, item.datetime]);
  })
  res.send(specificData);
  console.log(req.query);
});

server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
