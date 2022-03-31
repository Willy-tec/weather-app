const url = `https://www.prevision-meteo.ch/services/json/lat=46.259lng=5.235`;

import axios from "axios";

interface weatherResponse {
  city_info: {
    name: string;
    country: string;
    sunrise: string;
    sunset: string;
  };
  current_condition: {
    condition: string;
    date: string;
    hour: string;
    humidity: number;
    icon: string;
    icon_big: string;
    pressure: number;
    tmp: number;
    wnd_dir: string;
    wnd_gust: number;
    wnd_spd: number;
  };
}

async function useFindWeather(town: string): Promise<weatherResponse> {
  const url = `https://www.prevision-meteo.ch/services/json/${town}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}

export default useFindWeather;
export type {weatherResponse};
