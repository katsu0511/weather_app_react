import { useQuery } from 'react-query';
import text from './appid.txt';

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
  console.log(text);
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

  return (
    <figure>
      <img
      src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
      alt={data?.weather?.[0]?.main} />
      <figcaption>{data?.weather?.[0]?.description}</figcaption>
    </figure>
  );
}
