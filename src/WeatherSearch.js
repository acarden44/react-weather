import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(false);

  function handleSearch(event) {
    event.preventDefault();
    if (city.trim().length < 2) return;

    setLoading(true);
    fetchWeather(city, unit);
    setSearchedCity(city);
  }

  function fetchWeather(cityName, selectedUnit) {
    const apiKey = "3b34c40446ftcf4f07e329o00aa2e010";
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=${selectedUnit}`;

    axios.get(apiUrl).then((response) => {
      const data = response.data.daily[0];
      setWeather({
        city: response.data.city,
        country: response.data.country,
        temperature: data.temperature.day,
        description: data.condition.description,
        humidity: data.temperature.humidity,
        wind: data.wind.speed,
        icon: data.condition.icon_url,
      });
      setLoading(false);
    });
  }

  function handleUnitToggle() {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
  }

  useEffect(() => {
    if (searchedCity) {
      setLoading(true);
      fetchWeather(searchedCity, unit);
    }
  }, [unit]);

  return (
    <div className="WeatherSearch">
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Enter a city..."
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="loading">Loading...</p>}

      {weather && !loading && (
        <div className="WeatherResult fade-in">
          <h2>
            Weather in {weather.city}, {weather.country}
          </h2>
          <img
            src={weather.icon}
            alt={weather.description}
            width={64}
            height={64}
          />
          <p>
            <strong>
              {Math.round(weather.temperature)}°{unit === "metric" ? "C" : "F"}
            </strong>{" "}
            — {weather.description}
          </p>
          <p>Humidity: {weather.humidity}%</p>
          <p>
            Wind: {Math.round(weather.wind)} {unit === "metric" ? "m/s" : "mph"}
          </p>
          <button onClick={handleUnitToggle}>
            Show in {unit === "metric" ? "°F / mph" : "°C / m/s"}
          </button>
        </div>
      )}
    </div>
  );
}
