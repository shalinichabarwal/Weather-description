const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const cityName = req.body.city;
  console.log(cityName);
  const API = "45c680de8c433b984332fb4bf365c1b1";

  const url_weather =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=metric&appid=" +
    API;

  https.get(url_weather, function (response) {
    response.on("data", function (data) {
      const data2 = JSON.parse(data);
      const temp = data2.main.temp;
      console.log(temp);
      const weatherDescription = data2.weather[0].description;
      console.log(weatherDescription);
      const icon = data2.weather[0].icon;
      const pressure = data2.main.pressure;
      console.log(pressure);
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.render("app",{city:cityName,tmp:temp,description:weatherDescription,pressure:pressure,imageURL:imageURL})
      // res.write(
      //   "<h1>Temperature of " +
      //     cityName +
      //     " is " +
      //     temp +
      //     " degrees Celcius.</h1>"
      // );
      // res.write("<h2>Weather condition : " + weatherDescription + "</h2>");
      // res.write("<h2>Air pressure : " + pressure + " hPa</h2>");
      // res.write("<img src = " + imageURL + ">");
      // res.send();
    });
  });
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
