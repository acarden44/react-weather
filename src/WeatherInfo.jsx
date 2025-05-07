import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import "./App.css";

export default function WeatherInfo({ data, unit }) {
  return (
    <div className="WeatherInfo">
      <div className="info-layout">
        <div className="left-column">
          <h1>{data.city}</h1>
          <p>
            <FormattedDate date={data.date} />, {data.description}
            <br />
            Humidity: <strong className="highlight">{data.humidity}%</strong>,
            Wind:{" "}
            <strong className="highlight">
              {Math.round(data.wind)} {unit === "imperial" ? "mph" : "kph"}
            </strong>
          </p>
        </div>
        <div className="right-column">
          <div className="weather-app-temp-row">
            <WeatherIcon
              code={data.icon.split("/").pop().replace(".png", "")}
              size={52}
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
    </div>
  );
}
