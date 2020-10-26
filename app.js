const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

const img = "/css/background.jpg";

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");



});

app.use(express.static('public'));

app.post("/", function(req,res){
  const query = req.body.cityName
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=2ccb6b87aa7134c4c70af62165527fc5&units=imperial#";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1 style='text-align: center;'>The temp is " + temp + " degrees.</h1>");
      res.write("<h2 style='text-align: center;'>There are " + weatherDescription + "!");
      res.write("<h3 style='text-align: center;'><img src=" + iconURL + "></h3>");
      res.write("<body style='background-image: url(" + img +"); background-size: cover;'></body>")
      res.send();
    })
  })
})

app.listen(3000, function(){
  console.log("3000");
})
