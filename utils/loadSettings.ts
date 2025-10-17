import AsyncStorage from "@react-native-async-storage/async-storage";
export const loadSettings = async (): Promise<boolean> => {
		try {
			const tempUnits = await AsyncStorage.getItem("tempunits");
            return tempUnits === "celsius";
		}catch (error) {
			console.error("error loading settings", error);
            return true;
		}
	}