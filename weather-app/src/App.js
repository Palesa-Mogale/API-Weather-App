import React, { useState } from "react";
import "./App.css";
import sky from "./Assets/sky.mp4";

const API_KEY = "127a694ceaf4b4c6f3e1e4bd81793c3c";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${API_URL}${city}`);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError("");
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("An error occurred while fetching weather data.");
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",

    hour12: true,
  });

  return (
    <div className="App">
      {/* Video Background */}
      <video autoPlay muted loop id="background-video">
        <source src={sky} type="video/mp4" />
      </video>

      {/* Weather Content */}
      <div className="content">
        <h1>{currentTime}</h1>
        <h2>{currentDate}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Search City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <button type="submit">Enter</button>
        </form>
        {weather && (
          <div>
            <h2>
              Weather in {weather.name}, {weather.sys.country}
            </h2>

            <div className="weather-details">
              <p className="weather-item">Temperature: {weather.main.temp}°C</p>
              <p className="weather-item">
                Weather: {weather.weather[0].description}
              </p>
              <p className="weather-item">Humidity: {weather.main.humidity}%</p>
              {weather.rain && (
                <p className="weather-item">Rain: {weather.rain["1h"]} mm</p>
              )}
              {weather.snow && (
                <p className="weather-item">Snow: {weather.snow["1h"]} mm</p>
              )}
            </div>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          <small>Coded by Palesa</small>
        </p>
      </div>
    </div>
  );
}

export default App;
