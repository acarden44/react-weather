import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo({ data, unit }) {
  return (
    <div className="info-layout">
      <div className="left-column">
        <h2>{data.city}</h2>
        <p>
          <FormattedDate date={data.time} />,{" "}
          <span className="weather-description">{data.description}</span>
        </p>
        <p>
          Humidity: <span className="weather-highlight">{data.humidity}%</span>,
          Wind:{" "}
          <span className="weather-highlight">
            {Math.round(data.wind)} {unit === "imperial" ? "mph" : "kph"}
          </span>
        </p>
      </div>
      <div className="right-column">
        <div className="weather-app-temp-row">
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
    </div>
  );
}
