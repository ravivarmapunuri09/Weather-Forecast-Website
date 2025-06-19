import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import "./index.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");

  const getWeather = async (loc) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.list) {
        const daily = data.list.filter((_, i) => i % 8 === 0).slice(0, 5);
        setForecast(daily);
        setCity(data.city.name);
      } else {
        alert("City not found.");
      }
    } catch (err) {
      alert("Error fetching weather data.");
    }
  };

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      const daily = data.list.filter((_, i) => i % 8 === 0).slice(0, 5);
      setForecast(daily);
      setCity(data.city.name);
    });
  };

  useEffect(() => {
    detectLocation(); // Auto-detect on load
  }, []);

  return (
    <div className="app">
      <h1>5-Day Weather Forecast</h1>
      <div className="search-bar">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city..."
        />
        <button onClick={() => getWeather(location)}>Search</button>
      </div>
      {city && <h2>Weather in {city}</h2>}
      <div className="forecast">
        {forecast.map((day, index) => (
          <WeatherCard key={index} data={day} />
        ))}
      </div>
    </div>
  );
}

export default App;
