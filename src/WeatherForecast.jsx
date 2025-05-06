import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

const API_KEY = "3b34c40446ftcf4f07e329o00aa2e010";

export default function WeatherForecast({ coordinates, unit }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (coordinates) {
      const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${API_KEY}&units=${unit}`;
      axios.get(apiUrl).then((response) => {
        setForecast(response.data.daily);
      });
    }
  }, [coordinates, unit]);

  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div className="weather-forecast">
      {forecast.slice(1, 6).map((day, index) => {
        if (!day || !day.time) return null; // Safety check
        return <WeatherForecastDay key={index} day={day} unit={unit} />;
      })}
    </div>
  );
}
