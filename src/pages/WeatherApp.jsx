import { useState } from "react";

const WEATHER_LABELS = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Moderate showers",
  82: "Violent showers",
  95: "Thunderstorm",
};

function weatherLabel(code) {
  return WEATHER_LABELS[code] ?? "Unknown";
}

function WeatherApp() {
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (searchCity) => {
    const trimmed = searchCity.trim();
    if (!trimmed) {
      setError("Enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=1`
      );
      if (!geoRes.ok) throw new Error("Failed to search city.");
      const geoData = await geoRes.json();

      if (!geoData.results?.length) {
        setError(`City "${trimmed}" not found.`);
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
      );
      if (!weatherRes.ok) throw new Error("Failed to fetch weather.");
      const weatherData = await weatherRes.json();
      const current = weatherData.current;

      setWeather({
        city: name,
        country,
        temp: current.temperature_2m,
        condition: weatherLabel(current.weather_code),
      });
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(city);
    fetchWeather(city);
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Weather App</h2>
        <p className="page-desc">Practice: API calls, fetch</p>

        <form className="input-group" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search city (e.g. Chennai)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </form>

        {error && <p className="field-error">{error}</p>}

        {loading && <p className="empty-msg">Fetching weather...</p>}

        {weather && !loading && (
          <div className="weather-result">
            <h3>
              {weather.city}
              {weather.country ? `, ${weather.country}` : ""}
            </h3>
            <p className="weather-temp">{weather.temp}°C</p>
            <p className="weather-condition">{weather.condition}</p>
          </div>
        )}

        {!weather && !loading && !error && query && (
          <p className="empty-msg">No data for "{query}".</p>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
