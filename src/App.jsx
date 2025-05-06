import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "3b34c40446ftcf4f07e329o00aa2e010";

export default function App() {
  const [city, setCity] = useState("Grand Rapids");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState("imperial");

  useEffect(() => {
    fetchWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  function fetchWeather(cityName) {
    axios
      .get(
        `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${API_KEY}&units=${unit}`
      )
      .then((response) => {
        setWeather(response.data);
        fetchForecast(cityName);
      });
  }

  function fetchForecast(cityName) {
    axios
      .get(
        `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${API_KEY}&units=${unit}`
      )
      .then((response) => {
        setForecast(response.data.daily.slice(0, 5));
      });
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchWeather(city);
  }

  function toggleUnits() {
    setUnit((prev) => (prev === "imperial" ? "metric" : "imperial"));
  }

  return (
    <div className="weather-app">
      <header>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Enter a city..."
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-form-input"
          />
          <input type="submit" value="Search" className="search-form-button" />
        </form>
        <div className="unit-toggle">
          <button type="button" id="unit-toggle-button" onClick={toggleUnits}>
            Switch to {unit === "imperial" ? "°C" : "°F"}
          </button>
        </div>
      </header>

      <main>
        {weather && (
          <div className="weather-app-data">
            <div>
              <h1 className="weather-app-city">{weather.city}</h1>
              <p className="weather-app-details">
                {new Date(weather.time * 1000).toLocaleString()},{" "}
                {weather.condition.description}
                <br />
                Humidity: <strong>{weather.temperature.humidity}%</strong>,
                Wind:{" "}
                <strong>
                  {Math.round(weather.wind.speed)}{" "}
                  {unit === "imperial" ? "mph" : "kph"}
                </strong>
              </p>
            </div>
            <div className="weather-app-temp-container">
              <div>
                <img
                  src={weather.condition.icon_url}
                  alt={weather.condition.description}
                  className="weather-app-icon"
                />
              </div>
              <div className="weather-app-temp">
                {Math.round(weather.temperature.current)}
                <span className="weather-app-unit">
                  {unit === "imperial" ? "°F" : "°C"}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="weather-forecast">
          {forecast.map((day, index) => (
            <div className="weather-forecast-day" key={index}>
              <div className="weather-forecast-date">
                {new Date(day.time * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </div>
              <img src={day.condition.icon_url} alt="" className="icon" />
              <div className="weather-forecast-temps">
                <div className="weather-forecast-temp">
                  <strong>{Math.round(day.temperature.maximum)}º</strong>
                </div>
                <div className="weather-forecast-temperature">
                  {Math.round(day.temperature.minimum)}º
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer>
        This project was coded by{" "}
        <a href="https://github.com/acarden44">April Carden</a>, and is{" "}
        <a
          href="https://github.com/acarden44/react-weather"
          target="_blank"
          rel="noreferrer"
        >
          open-sourced on GitHub
        </a>
        , and{" "}
        <a
          href="https://aprilsreactweatherapp.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          hosted on Netlify
        </a>
        .
      </footer>
    </div>
  );
}
