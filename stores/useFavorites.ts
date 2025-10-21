import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fav_key } from "@/constants";

interface FavoriteStore {
  favorites: string[];
  loadFavorites: () => Promise<void>;
  addFavorite: (cityName: string) => Promise<void>;
  removeFavorite: (cityName: string) => Promise<void>;
  isFavorite: (cityName: string) => boolean;
}

export const useFavorites = create<FavoriteStore>((set, get) => ({
  favorites: [],

  loadFavorites: async () => {
    try {
      const data = await AsyncStorage.getItem(fav_key);
      const favorites = data ? JSON.parse(data) : [];
      set({ favorites });
    } catch (error) {
      console.error(error);
    }
  },

  addFavorite: async (cityName: string) => {
    const normalized = cityName.toLowerCase();
    const { favorites } = get();
    if (!favorites.includes(normalized)) {
      const updated = [...favorites, normalized];
      set({ favorites: updated });
      await AsyncStorage.setItem(fav_key, JSON.stringify(updated));
    }
  },

  removeFavorite: async (cityName: string) => {
    const normalized = cityName.toLowerCase();
    const { favorites } = get();
    const updated = favorites.filter((f) => f !== normalized);
    set({ favorites: updated });
    await AsyncStorage.setItem(fav_key, JSON.stringify(updated));
  },

  isFavorite: (cityName: string) => {
    const { favorites } = get();
    return favorites.includes(cityName.toLowerCase());
  },
}));
