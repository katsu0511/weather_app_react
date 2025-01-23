import { useQuery } from 'react-query';
import text from './appid.txt';
import cities from './city.json';

const fetchWeather = async () => {
  const appid = await getAppid();
  const latitude = '35.6895';
  const longitude = '139.6917';
  const language = 'en';
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${language}&appid=${appid}`);
  if (res.ok){ return res.json(); }
  throw new Error(res.statusText);
};

const getAppid = async () => {
  const data = await fetch(text);
  return data.text();
};

export default function Weather() {
  const { data, isLoading, isError, error } = useQuery('weather', fetchWeather);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const cityArray = [];
  for (let i = 0; i < cities.length; i++) {
    cityArray.push(<option>{cities[i].name}</option>);
  }

  return (
    <div>
      <select>
        <option>-</option>
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
