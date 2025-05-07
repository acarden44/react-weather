import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo({ data, unit }) {
  return (
    <>
      <div className="weather-info-text">
        <h2>{data.city}</h2>
        <p>
          <FormattedDate date={data.date} />, {data.description}
        </p>
        <p>
          Humidity: <span className="weather-highlight">{data.humidity}%</span>,
          Wind:{" "}
          <span className="weather-highlight">
            {Math.round(data.wind)} {unit === "imperial" ? "mph" : "km/h"}
          </span>
        </p>
      </div>
      <div className="weather-info-temp">
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
    </>
  );
}
