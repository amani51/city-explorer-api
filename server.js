const express = require("express");
const server = express();
const cors = require('cors');
const responseData = require("./data/weather.json");
require('dotenv').config();
const PORT = process.env.PORT;
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
// url/weather?city_name=Seattle&lat=47.6038321&lon=-122.3300624
server.get("/weather", (req, res) => {
  let findData = responseData.find((item) => {
    return  item.city_name == req.query.city_name &&
      item.lat == req.query.lat &&
      item.lon == req.query.lot; 
  });
  
console.log(req.query.city_name,req.query.lat ,req.query.lot)
  let specificData=findData.data.map(item=>{

    return new days(item);;
  })
  res.send(specificData);
  console.log(specificData);
});
server.get('*', (req,res)=>{
  res.send("page not found");
})
class days {
  constructor(item) {
      this.description = item.weather.description;
      this.datetime = item.datetime;
  }
}
server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
