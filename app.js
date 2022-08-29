const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const apiKey = "ffd0683ce7ff48abc5abe84c7bd9b2db"
    const unit = "metric"
    const query = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey
    https.get(url,function(response){
        console.log(response.statusCode)

        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imageURl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is currently " +weatherDescription+"</p>");
            res.write("<h1>The temperature in "+ query+" is "+temp+" degree celcius.</h1>");
            res.write("<img src="+imageURl+">");
            res.send();
        });
    });
})


app.listen(3000,function(){
    console.log("Server is started on port 3000!")
});