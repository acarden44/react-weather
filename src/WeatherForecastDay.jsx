import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay({ day, unit }) {
  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const maxTemp = Math.round(day.temperature.maximum);
  const minTemp = Math.round(day.temperature.minimum);

  return (
    <div className="weather-forecast-day">
      <div className="weather-forecast-date">{formatDay(day.time)}</div>
      <WeatherIcon code={day.condition.icon} size={48} />
      <div className="weather-forecast-temps">
        <span className="temp-max">
          <strong>{maxTemp}°</strong>
        </span>
        <span className="temp-min">{minTemp}°</span>
      </div>
    </div>
  );
}
