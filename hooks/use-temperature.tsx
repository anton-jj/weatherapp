import { temp_key } from "@/constants";
import { loadSettings } from "@/utils/loadSettings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type TempContextPrompt = {
  isCelsius: boolean;
  setIsCelsius: (value: boolean) => void;
};

const TempContext = createContext<TempContextPrompt | undefined>(undefined);

export const TempProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = loadSettings();
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem(
          temp_key,
          isCelsius ? "celsius" : "fahrenheit",
        );
      } catch (error) {
        console.error(error);
      }
    };
    save();
  }, [isCelsius]);

  return (
    <TempContext.Provider value={{ isCelsius, setIsCelsius }}>
      {children}
    </TempContext.Provider>
  );
};
export const useTemp = (): TempContextPrompt => {
  const ctx = useContext(TempContext);
  if (!ctx) {
    throw new Error("useTemp has to be inside the provider");
  }
  return ctx;
};
