import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = process.env.EXPO_PUBLIC_SECRET_KEY;

export interface weatherResult {
  temp: number;
  description: string;
  icon: string;
  cityName: string;
}
const buildUrlByCity = (city: string) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

const buildUrlByCoords = (lat: number, lon: number) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

export const getWeather = async (opts: {
  city?: string;
  lat?: number;
  lon?: number;
}): Promise<weatherResult> => {
  let url: string = "";
  if (opts.city == null && opts.lat != null && opts.lon != null) {
    url = buildUrlByCoords(opts.lat, opts.lon);
  } else if (opts.city != null && opts.lat == null && opts.lon == null) {
    url = buildUrlByCity(opts.city);
  } else {
    throw new Error("Needs lat & lon or a city name");
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Error from api: ${res.status}: ${res.statusText}`);
  }

  const json = await res.json();
  const result: weatherResult = {
    temp: json.main.temp,
    description: json.weather[0].description,
    icon: json.weather[0].icon,
    cityName: json.name,
  };

  return result;
};
