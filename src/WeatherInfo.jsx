import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo({ data, unit }) {
  return (
    <div className="WeatherInfo">
      <h1>{data.city}</h1>
      <p>
        <FormattedDate date={data.date} unit={unit} />
        <br />
        Humidity: <strong>{data.humidity}%</strong>, Wind:{" "}
        <strong>
          {Math.round(data.wind)} {unit === "imperial" ? "mph" : "kph"}
        </strong>
      </p>
      <div className="weather-app-temp-container">
        <WeatherIcon
          code={data.icon.split("/").pop().replace(".png", "")}
          size={64}
        />
        <div className="weather-app-temp">
          {Math.round(data.temperature)}
          <span className="weather-app-unit">
            {unit === "imperial" ? "°F" : "°C"}
          </span>
        </div>
      </div>
    </div>
  );
}
