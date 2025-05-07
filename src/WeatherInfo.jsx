import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo({ data, unit }) {
  return (
    <>
      <div className="left-column">
        <h2>{data.city}</h2>
        <p>
          <FormattedDate date={data.time} />
          <br />
          Humidity:{" "}
          <span className="weather-highlight">
            <strong>{data.humidity}%</strong>
          </span>
          , Wind:{" "}
          <span className="weather-highlight">
            <strong>
              {Math.round(data.wind)} {unit === "imperial" ? "mph" : "kph"}
            </strong>
          </span>
        </p>
      </div>
      <div className="right-column">
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
    </>
  );
}
