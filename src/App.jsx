import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./App.css";

const API_KEY = "3b34c40446ftcf4f07e329o00aa2e010";

export default function App() {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState("Grand Rapids");
  const [unit, setUnit] = useState("imperial");

  function handleResponse(response) {
    const daily = response.data.daily?.[0] || {};
    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: daily.temperature?.day || 0,
      humidity: daily.temperature?.humidity || 0,
      date: new Date(daily.time * 1000),
      description: daily.condition?.description || "",
      icon: daily.condition?.icon_url || "",
      wind: daily.wind?.speed || 0,
      city: response.data.city,
    });
  }

  function search() {
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${API_KEY}&units=${unit}`;
    axios.get(apiUrl).then(handleResponse);
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
    if (weatherData.ready) {
      search();
    }
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
          <div className="weather-today two-column-layout">
            <WeatherInfo data={weatherData} unit={unit} />
          </div>
          <WeatherForecast coordinates={weatherData.coordinates} unit={unit} />
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
    search();
    return "Loading...";
  }
}
