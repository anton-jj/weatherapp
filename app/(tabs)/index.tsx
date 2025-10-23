import { useTemp } from "@/hooks/use-temperature";
import { useThemeColor } from "@/hooks/use-theme-color";
import { loadSettings } from "@/utils/loadSettings";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { WeatherCard } from "@/components/weatherCard";
import { useWeather } from "@/stores/weatherStore";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const {
    weather,
    isLoading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  } = useWeather();
  const { isCelsius } = useTemp();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  useEffect(() => {
    const init = async () => {
      await loadSettings();
    };
    init();
  }, []);

  const convertTemp = (kelvin: number) => {
    if (isCelsius) {
      return Math.round(kelvin - 273.15);
    } else {
      return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) return;
    await fetchWeatherByCity(city);
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
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <Button title="search" onPress={handleSearch} />
      </View>

      {isLoading ? (
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
        />
      ) : (
        <Text style={[styles.emptyText, { color: textColor }]}>
          Search for a city or use your location
        </Text>
      )}
      <View>
        <TouchableOpacity onPress={fetchWeatherByCoords}>
          <IconSymbol name="location.app.fill" color="tintColor" />
        </TouchableOpacity>
      </View>
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
