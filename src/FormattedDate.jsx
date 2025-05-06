import React from "react";

export default function FormattedDate({ date, unit }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: unit === "imperial",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Auto-detects local zone
  };

  return <div>{date.toLocaleString("en-US", options)}</div>;
}
