import React, { useEffect, useState } from 'react'
import cloud_icn from "../Assets/cloud.png"
import drizzle_icn from "../Assets/drizzle.png"
import clear_icn from "../Assets/clear.png"
import wind_icn from "../Assets/wind.png"
import humidity_icn from "../Assets/humidity.png"
import search_icn from "../Assets/search.png"
import rain_icn from "../Assets/rain.png"
import snow_icn from "../Assets/snow.png"

function WeatherApp() {
    const [wicon, setWicon] = useState(cloud_icn);
    useEffect(() => {
        search()
    }, []);
    const search = async () => {
        try {

            const input = document.getElementById("input");
            if (input.value === "") {
                return;
            }
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=Metric&appid=${import.meta.env.VITE_API_KEY}`;

            const request = await fetch(url);
            const data = await request.json();

            const humidity = document.getElementById("humidity");
            const location = document.getElementById("location");
            const temperature = document.getElementById("temperature");
            const wind = document.getElementById("wind");

            humidity.innerHTML = Math.floor(data.main.humidity) + " %";
            wind.innerHTML = data.wind.speed + " km/h";
            location.innerHTML = data.name;
            temperature.innerHTML = Math.floor(data.main.temp) + "°C";

            if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") { setWicon(clear_icn); }
            else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") { setWicon(cloud_icn) }
            else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") { setWicon(drizzle_icn); }
            else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") { setWicon(drizzle_icn); }
            else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") { setWicon(rain_icn); }
            else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") { setWicon(rain_icn); }
            else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") { setWicon(snow_icn); }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className='w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl my-5 space-y-4 px-4 py-5 text-white'>
            <div className='flex justify-center space-x-10'>
                <input type="teks" id='input' placeholder='Search City' className=' rounded-2xl px-4 text-black' onc />
                <div className='bg-white rounded-full p-4 cursor-pointer' onClick={() => { search(); }}>
                    <img src={search_icn} alt="search" />
                </div>
            </div>
            <div>
                <div className='flex justify-center'>
                    <img src={wicon} alt="Cloud" />
                </div>
            </div>
            <div className='flex flex-col space-y-5'>
                <span className='text-6xl font-bold flex justify-center' id='temperature'>21.24°C</span>
                <span className='text-4xl tracking-wide font-semibold flex justify-center' id='location'>News York</span>
            </div>
            <div className='flex justify-center space-x-14'>
                <div className='flex space-x-2'>
                    <div className='flex justify-center'>
                        <div className='flex justify-center flex-col'>
                            <img src={humidity_icn} alt="Humidity" className='w-9 object-contain h-9 flex flex-col justify-end' />
                        </div>
                    </div>
                    <div className='flex justify-end flex-col'>
                        <span className='text-xl' id='humidity'>87%</span>
                        <span>Humadity</span>
                    </div>
                </div>
                <div className='flex space-x-2'>
                    <div className='flex justify-center'>
                        <div className='flex justify-center flex-col'>
                            <img src={wind_icn} alt="Humidity" className='w-9 object-contain h-9 flex flex-col justify-end' />
                        </div>
                    </div>
                    <div className='flex justify-end flex-col'>
                        <span className='text-xl' id='wind'>87%</span>
                        <span>Wind</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp