import React, { useState } from 'react';
import Weather from './components/Weather';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  const retrieveWeatherData = async (cityName) => {
    if (cityName) {
      setLoading(true);
      const API_KEY = '796c761e86df44d46a9728e52c4aa654';
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
      try {
        const weatherResponse = await axios.get(weatherUrl);
        const forecastResponse = await axios.get(forecastUrl);
        setWeatherData(weatherResponse.data);
        setForecastData(forecastResponse.data.list.slice(0, 5));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = () => {
    if (city.trim()) retrieveWeatherData(city);
  };

  return (
    <div className="App">
      <Weather
        city={city}
        weatherData={weatherData}
        forecastData={forecastData}
        loading={loading}
        handleSearch={handleSearch}
        setCity={setCity}
      />
    </div>
  );
}

export default App;
