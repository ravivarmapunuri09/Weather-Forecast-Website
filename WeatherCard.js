import React from "react";

function WeatherCard({ data }) {
  const date = new Date(data.dt_txt).toDateString();
  const icon = data.weather[0].icon;
  return (
    <div className="weather-card">
      <h4>{date}</h4>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" />
      <p>{data.weather[0].main}</p>
      <p>🌡 {data.main.temp}°C</p>
    </div>
  );
}

export default WeatherCard;
