import React from "react";

export default function FormattedDate({ date }) {
  const options = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return <span>{date.toLocaleString("en-US", options)}</span>;
}
