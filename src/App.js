import React, { useEffect, useState } from "react";
import './App.css';

export default function App() {

  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);

  function getWeather() {
    let key = '2b770498ef35379644bb4f9a0e773a2e';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    console.log(url)
    
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let MT = Math.round(data.main.temp);
      let FL = Math.round(data.main.feels_like);

      const weather = {
        location: `Weather in ${data.name}`,
        temperature: `Temperature: ${MT} C`,
        feelsLike: `Feels like ${FL} C`,
        humidity: `Humidity: ${data.main.humidity} %`,
        wind: `Wind: ${data.wind.speed} km/hr`,
        condition: `Weather condition: ${data.weather[0].description}`,
      }

      setWeatherInfo(weather);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  return (
    <div className="weather-container">
      <input type="text" placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={getWeather}> Get Weather</button>
      {weatherInfo && 
        <div className="weather-info">
          <h3>{weatherInfo.location}</h3>
          <p>{weatherInfo.temperature}</p>
          <p>{weatherInfo.feelsLike}</p>
          <p>{weatherInfo.humidity}</p>
          <p>{weatherInfo.wind}</p>
          <p>{weatherInfo.condition}</p>
        </div>
      }
    </div>
  );
}

