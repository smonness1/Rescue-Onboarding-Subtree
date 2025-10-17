import React, {useRef} from "react";
import "expo-dev-client";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { PrefrencesContextProvider } from "./context/prefrencesContext";
import { NavContextProvider } from "./context/NavContextProvider";
import { TrackerContextProvider } from "./context/TrackerContext";
import {AppRouter} from "./AppRouter";

export default function App() {
  const [fontLoaded] = useFonts({
    Heebo: require("./assets/fonts/Heebo.ttf"),
    Heebo_300Light: require("./assets/fonts/Heebo-Light.ttf"),
    Heebo_500Medium: require("./assets/fonts/Heebo-Medium.ttf"),
    Heebo_700Bold: require("./assets/fonts/Heebo-Bold.ttf"),
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <PrefrencesContextProvider>
      <NavContextProvider>
        <TrackerContextProvider>
          <NavigationContainer>
            <AppRouter />
          </NavigationContainer>
        </TrackerContextProvider>
      </NavContextProvider>
    </PrefrencesContextProvider>
  );
}
