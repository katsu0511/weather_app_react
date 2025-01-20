import { useQuery } from 'react-query';

const fetchWeather = async () => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=35.6895&lon=139.6917&appid=`);
  if (res.ok){ return res.json(); }
  throw new Error(res.statusText);
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
