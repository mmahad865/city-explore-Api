'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.get('/weather', (req, res) => {
  let searchQuery = req.query.searchQuery;
  const city = weatherData.find(city => city.city_name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase());

  try {
    const weatherArr = city.data.map(item => new Forecast(item));
    res.status(200).send(weatherArr);
  } catch (error) {
    handlerError(error, res);


  }


});

function handlerError(error, res) {
  res.status(500).send('Error:(');
}

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}


const weatherData = require('./data/weather.json');

console.log(weatherData);

app.listen(PORT, () => {
  console.log('The server is working');
});