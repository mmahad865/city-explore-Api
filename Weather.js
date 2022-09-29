const axios = require('axios');

const weatherCache = {};


async function eather (req, res) {
 

  const searchQuery = req.query.searchQuery;
  const lat = req.query.lat;
  const lon = req.query.lon;


  console.log(weatherCache[searchQuery]);
  if(weatherCache[searchQuery] !== undefined) {
    res.status(200).send(weatherCache[searchQuery]);

  } else {
 
    const cityArr = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
  

    try {
      const cityData = cityArr.data.data.map(item => new Forecast(item));
      weatherCache[searchQuery] = cityData;
     
      res.status(200).send(cityData);

    } catch (error) {
      errorHandler(error, res);
    }

  }


}

module.exports = {weather}