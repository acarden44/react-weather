import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./App.css";

const API_KEY = "3b34c40446ftcf4f07e329o00aa2e010";

export default function App() {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState("Grand Rapids");
  const [unit, setUnit] = useState("imperial");

  function handleCurrentResponse(response) {
    const data = response.data;
    const localTime = new Date(data.time * 1000);

    setWeatherData({
      ready: true,
      coordinates: data.coordinates,
      temperature: data.temperature.current,
      humidity: data.temperature.humidity,
      description: data.condition.description,
      icon: data.condition.icon_url,
      wind: data.wind.speed,
      city: data.city,
      time: localTime,
    });
  }

  function handleForecastResponse(response) {
    setForecastData(response.data.daily || []);
  }

  function search() {
    const currentUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${API_KEY}&units=${unit}`;
    axios.get(currentUrl).then(handleCurrentResponse);

    const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${API_KEY}&units=${unit}`;
    axios.get(forecastUrl).then(handleForecastResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function toggleUnits() {
    setUnit((prevUnit) => (prevUnit === "imperial" ? "metric" : "imperial"));
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  if (weatherData.ready) {
    return (
      <div className="App">
        <div className="container">
          <header className="app-header">
            <h1>April's React Weather App</h1>
          </header>
          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="search"
              placeholder="Enter a city..."
              className="search-form-input"
              value={city}
              onChange={handleCityChange}
            />
            <input
              type="submit"
              value="Search"
              className="search-form-button"
            />
          </form>
          <div className="unit-toggle">
            <button onClick={toggleUnits}>
              Switch to {unit === "imperial" ? "°C" : "°F"}
            </button>
          </div>
          <div className="weather-today">
            <WeatherInfo data={weatherData} unit={unit} />
          </div>
          <WeatherForecast
            coordinates={weatherData.coordinates}
            unit={unit}
            forecast={forecastData}
          />
          <footer>
            Built by <a href="https://github.com/acarden44">April Carden</a>,
            open-sourced on{" "}
            <a href="https://github.com/acarden44/react-weather">GitHub</a>, and
            hosted on{" "}
            <a href="https://aprilsreactweatherapp.netlify.app">Netlify</a>.
          </footer>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
}
