import { create } from "zustand";
import { getWeather, weatherResult } from "@/api/weatherApi";
import {
  getCurrentLocation,
  requestLocationPermission,
} from "@/utils/userLocation";

interface WeatherStore {
  weather: weatherResult | null;
  isLoading: boolean;
  error: string | null;
  fetchWeatherByCity: (city: string) => Promise<void>;
  fetchWeatherByCoords: () => Promise<void>;
  clearWeather: () => void;
  currentLocation: string | null;
}

export const useWeather = create<WeatherStore>((set) => ({
  weather: null,
  isLoading: false,
  error: null,
  currentLocation: null,

  fetchWeatherByCity: async (city: string) => {
    try {
      set({ isLoading: true, error: null });
      const data = await getWeather({ city });
      set({
        weather: data,
        isLoading: false,
        error: null,
        currentLocation: data.cityName,
      });
    } catch (error) {
      set({ error: "could not find that city", isLoading: false });
    }
  },

  fetchWeatherByCoords: async () => {
    try {
      set({ isLoading: true, error: null });
      const perm = await requestLocationPermission();
      if (!perm) {
        set({ error: "Location permission denied", isLoading: false });
        return;
      }
      const coords = await getCurrentLocation();
      if (!coords) {
        set({ error: "could not get location", isLoading: false });
        return;
      }
      const data = await getWeather({ lat: coords?.lat, lon: coords?.lon });
      set({ weather: data, isLoading: false, currentLocation: data.cityName });
    } catch (error) {
      set({ error: "Failed to fetch weather", isLoading: false });
      console.error(error);
    }
  },

  clearWeather: () => {
    set({ weather: null, error: null });
  },
}));
