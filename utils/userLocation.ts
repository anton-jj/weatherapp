import * as Location from "expo-location";

export interface userCoords {
  lat: number;
  lon: number;
}

export async function requestLocationPermission(): Promise<boolean> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted";
  } catch (error) {
    alert("error requesting location permission");
    return false;
  }
}

export async function getCurrentLocation(): Promise<userCoords | null> {
  try {
    const location = await Location.getCurrentPositionAsync({});
    return {
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    };
  } catch (error) {
    console.log(error);
    alert("error getting current location");
    return null;
  }
}
