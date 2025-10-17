import { getWeather, weatherResult } from "@/api/weatherApi";
import { useTemp } from "@/hooks/use-temperature";
import { useThemeColor } from "@/hooks/use-theme-color";
import { loadSettings } from "@/utils/loadSettings";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<weatherResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { isCelsius } = useTemp();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {}, [weather]);

  const convertTemp = (kelvin: number) => {
    if (isCelsius) {
      return Math.round(kelvin - 273.15);
    } else {
      return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
    }
  };

  const fetchWeather = async () => {
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
          onSubmitEditing={fetchWeather}
          returnKeyType="search"
        />
        <Button title="search" onPress={fetchWeather} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={tintColor} style={styles.loading}/>
      ) : weather ? (
        <View style={styles.weatherContainer}>
          <View style={styles.cityRow}>
            <Text style={[styles.cityName, {color: textColor}]}>
              {weather.cityName}
            </Text>
          </View>
          <Image
          source={{uri: `https://openweathermap.org/img/wn/${weather.icon}@4x.png`}}
						style={styles.weatherIcon}/>
            <Text style={[styles.temp, {color:textColor}]}>
              {convertTemp(weather.temp)} {isCelsius ? "C" : "f"}
            </Text>
            <Text style={[styles.desc, {color:textColor}]}>
              {weather.description}
            </Text>
        </View>
      ): (
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
  cityName : {
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

});
