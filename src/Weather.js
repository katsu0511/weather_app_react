import { useState } from "react";
import { useQuery } from 'react-query';
import text from './appid.txt';
import cities from './city.json';
import languages from './language.json';

const cityArray = [];
for (let i = 0; i < cities.length; i++) {
  cityArray.push(<option value={cities[i].name}>{cities[i].name}</option>);
}

const languageArray = [];
for (let i = 0; i < languages.length; i++) {
  languageArray.push(<option value={languages[i].abbr}>{languages[i].lang}</option>);
}

const getAppid = async () => {
  const data = await fetch(text);
  return data.text();
};

export default function Weather() {
  const [city, setCity] = useState("Tokyo");
  const [language, setLanguage] = useState("en");

  const fetchWeather = async () => {
    const appid = await getAppid();
    const longitude = getCoordinate().lon;
    const latitude = getCoordinate().lat;
    const language = getLanguage();
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

  const getLanguage = () => {
    for (let i = 0; i < languages.length; i++) {
      if (languages[i].abbr === language) {
        return languages[i].abbr;
      }
    }
  };

  const cityChange = () => {
    const citySelect = document.getElementById('city_select');
    setCity(citySelect.value);
    alert('city changed');
  }

  const languageChange = () => {
    const langSelect = document.getElementById('lang_select');
    setLanguage(langSelect.value);
    alert('language changed');
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
      <select id="lang_select" onChange={languageChange}>
        {languageArray}
      </select>
      <h1>{city}</h1>
      <figure>
        <img
        src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
        alt={data?.weather?.[0]?.main} />
        <figcaption>{data?.weather?.[0]?.description}</figcaption>
      </figure>
    </div>
  );
}
