import { useState } from "react";
import { useQuery } from 'react-query';
import text from './appid.txt';
import cities from './city.json';

const cityArray = [];
for (let i = 0; i < cities.length; i++) {
  cityArray.push(<option>{cities[i].name}</option>);
}

const getAppid = async () => {
  const data = await fetch(text);
  return data.text();
};

export default function Weather() {
  const [city, setCity] = useState("Tokyo");

  const fetchWeather = async () => {
    const appid = await getAppid();
    const longitude = getCoordinate().lon;
    const latitude = getCoordinate().lat;
    const language = 'en';
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${language}&appid=${appid}`);
    if (res.ok){ return res.json(); }
    throw new Error(res.statusText);
  };

  const getCoordinate = () => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].name === city) {
        return cities[i].coord;
      }
    }
  };

  const cityChange = () => {
    const citySelect = document.getElementById('city_select');
    if (citySelect.value !== '-') {
      setCity(citySelect.value);
      alert('changed');
    }
  }

  const { data, isLoading, isError, error } = useQuery('weather', fetchWeather);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <select id="city_select" onChange={cityChange}>
        {cityArray}
      </select>
      <figure>
        <img
        src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
        alt={data?.weather?.[0]?.main} />
        <figcaption>{data?.weather?.[0]?.description}</figcaption>
      </figure>
    </div>
  );
}
