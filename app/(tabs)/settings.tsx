import { useThemeColor } from '@/hooks/use-theme-color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from 'react-native';


export default function SettingsScreen() {
	const [isCelsius, setIsCelsius] = useState(true); 

	const backgroundColor = useThemeColor({}, "background")
	const textColor = useThemeColor({}, "text");
	const tintColor = useThemeColor({}, "tint");

	useEffect(() => {
		loadSettings();
	}, []);

	const loadSettings = async () => {
		try {
			const tempUnits = await AsyncStorage.getItem("tempunits");
			if (!tempUnits) {
				setIsCelsius(tempUnits === "celsius")
			}
		}catch (error) {
			console.error("error loading settings", error);
		}
	}

	const toggleTemp = async (value: boolean) => {
		setIsCelsius(value);
		await AsyncStorage.setItem("tempunits", value ? "celsius" : "fahrenheit");

	}

	return (
		<View style={[styles.container, {backgroundColor}]}>
			<Text style={[styles.text, {color: textColor}]}>Settings</Text>
			<View style={[styles.settingRow, {borderBottomColor: "red"}]}>
				<Text style={[styles.text, {color: textColor}]}>Tempterature Unit</Text>
				<View style={[styles.toggleContainer]}>
					<Text style={[styles.unitText, { color: textColor }]}>°F</Text>
					<Switch
						value={isCelsius}
						onValueChange={toggleTemp}
						trackColor={{ false: 'gray', true: 'blue' }}
						thumbColor={isCelsius ? tintColor : '#f4f3f4'}
					/>
					<Text style={[styles.unitText, { color: textColor }]}>°C</Text>
				</View>
			</View>

		</View>
	)
}
const styles = StyleSheet.create({
	container: { 
		flex: 1,
		paddingTop: 60,
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 30,
	},
	settingRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 20,
		borderBottomWidth: 1,
	},
	text: {
		fontSize: 18,
	},
	toggleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	unitText: {
		fontSize: 16,
	},
	infoSection: {
		marginTop: 30,
		paddingHorizontal: 10,
	},
	infoText: {
		fontSize: 14,
		textAlign: 'center',
		lineHeight: 20,
	},
});
