import React from 'react';
import { MapPinIcon, CloudIcon, SunIcon, ArrowDownTrayIcon, MoonIcon } from '@heroicons/react/24/solid';
import weatherBackground from '../assets/img/weather2.jpg';
import mainBackground from '../assets/img/weather.jpg';

export default function Weather({
    city,
    weatherData,
    forecastData,
    loading,
    handleSearch,
    setCity
}) {
    return (
        <div
            className="flex flex-col items-center bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white"
            style={{
                backgroundImage: `url(${mainBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <h1 className="text-4xl font-bold mt-6">
                Weather <span className="text-blue-400">Forecast</span>
            </h1>

            <div className="my-6">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-2 rounded-lg border border-gray-300 text-gray-800 font-semibold"
                    placeholder="Enter city name"
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    Search
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : weatherData && forecastData.length > 0 ? (
                <div className="flex flex-wrap w-4/5 shadow-lg shadow-blue-400 bg-gray-800 rounded-lg hover:scale-105 ">
                    <div
                        className="flex-1 p-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none text-center text-white"
                        style={{
                            backgroundImage: `url(${weatherBackground})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <p className="text-2xl font-semibold">
                            {new Date(weatherData.dt * 1000).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                        <p className="mt-2 text-2xl flex justify-center items-center font-extrabold">
                            <MapPinIcon className="w-5 h-5 text-blue-400 mr-2" />
                            {weatherData.name}
                        </p>
                        <h2 className="text-6xl font-bold mt-4">{Math.round(weatherData.main.temp)}°C</h2>
                        <p className="text-lg mt-2 capitalize font-bold">{weatherData.weather[0].description}</p>
                    </div>

                    <div className="flex-1 p-6 border-white border-l-black border-4 rounded-md">
                        <div className="space-y-2">
                            <p className="flex items-center">
                                <CloudIcon className="w-5 h-5 text-blue-400 mr-2" />
                                <span className="mr-2">Humidity:</span> {weatherData.main.humidity}%
                            </p>
                            <p className="flex items-center">
                                <SunIcon className="w-5 h-5 text-yellow-400 mr-2" />
                                <span className="mr-2">Wind: </span> {Math.round(weatherData.wind.speed)} km/h
                            </p>
                            <p className="flex items-center">
                                <MoonIcon className="w-5 h-5 text-blue-300 mr-2" />
                                <span className="mr-2">Air Pressure: </span> {weatherData.main.pressure} mb
                            </p>
                            <p>
                                <span className="font-bold">Max Temp: </span> {Math.round(weatherData.main.temp_max)}°C
                            </p>
                            <p>
                                <span className="font-bold">Min Temp: </span> {Math.round(weatherData.main.temp_min)}°C
                            </p>
                        </div>
                        <hr className="my-4 border-white border-2" />
                        <div className="grid grid-cols-5 gap-2 text-center">
                            {forecastData.map((day, index) => (
                                <div key={index} className="bg-gray-900 p-2 rounded-lg shadow-md">
                                    <p className="text-sm font-semibold">
                                        {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                                    </p>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                        alt={day.weather[0].description}
                                        className="mx-auto"
                                    />
                                    <p className="text-sm">{Math.round(day.main.temp)}°C</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p className='font-bold text-2xl bg-sky-600 border-black rounded-lg p-2'>No data available. Try searching for a valid city!</p>
            )}
        </div>
    );
}
