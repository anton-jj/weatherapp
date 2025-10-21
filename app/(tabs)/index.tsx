import { getWeather, weatherResult } from "@/api/weatherApi";
import { useTemp } from "@/hooks/use-temperature";
import { useThemeColor } from "@/hooks/use-theme-color";
import { loadSettings } from "@/utils/loadSettings";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getCurrentLocation,
  requestLocationPermission,
} from "@/utils/userLocation";
import { useFavorites } from "@/stores/useFavorites";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { WeatherCard } from "@/components/weatherCard";

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<weatherResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { isCelsius } = useTemp();
  const { loadFavorites, addFavorite, removeFavorite, isFavorite } =
    useFavorites();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  useEffect(() => {
    const init = async () => {
      await fetchWeahterByCoords();
      await loadSettings();
      await loadFavorites();
    };
    init();
  }, []);

  // useEffect(() => {}, [weather]);

  const toggleFavortie = async () => {
    if (!weather) return;
    if (isFavorite(weather.cityName)) {
      await removeFavorite(weather.cityName);
    } else {
      await addFavorite(weather.cityName);
    }
  };
  const convertTemp = (kelvin: number) => {
    if (isCelsius) {
      return Math.round(kelvin - 273.15);
    } else {
      return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
    }
  };

  const fetchWeahterByCoords = async () => {
    try {
      setLoading(true);
      const perm = await requestLocationPermission();
      if (!perm) {
        console.log("failed to get persmission");
        return;
      }
      const coords = await getCurrentLocation();
      if (!coords) {
        console.log("failed to get coords");
        return;
      }
      const data = await getWeather({ lat: coords?.lat, lon: coords?.lon });
      setWeather(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async () => {
    try {
      setLoading(true);
      const data = await getWeather({ city });
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("could not find weather for that city");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Search for a city"
          placeholderTextColor={textColor}
          value={city}
          onChangeText={setCity}
          onSubmitEditing={fetchWeatherByCity}
          returnKeyType="search"
        />
        <Button title="search" onPress={fetchWeatherByCity} />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={tintColor}
          style={styles.loading}
        />
      ) : weather ? (
        <WeatherCard
          weather={weather}
          temp={convertTemp(weather.temp)}
          unit={isCelsius ? "celsius" : "fahrenheit"}
          onFavoritePress={toggleFavortie}
          isFavorite={isFavorite(weather.cityName)}
        />
      ) : (
        <Text style={[styles.emptyText, { color: textColor }]}>
          Search for a city or use your location
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },
  weatherContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    fontSize: 15,
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 600,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  temp: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  desc: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 20,
  },
  loading: {
    margin: 50,
  },
});
