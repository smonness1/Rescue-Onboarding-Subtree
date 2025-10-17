import { registerRootComponent } from "expo";

import { StackActions, useNavigation } from "@react-navigation/native";

import { View, Text, Button } from "react-native";

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppRouter as MainApp } from "rescue/AppRouter";
import { globalStyles } from "rescue/globalStyles";
import SplashScreenBackgroundOverlay from "rescue/components/SplashScreenBackgroundOverlay";
import { TrackerContextProvider } from "rescue/context/TrackerContext";
import { NavContextProvider } from "rescue/context/NavContextProvider";
import { PrefrencesContextProvider } from "rescue/context/prefrencesContext";
import OnboardingScreen from "./screens/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasCompletedOnboarding = false; //await AsyncStorage.getItem("hasCompletedOnboarding");
        const nextScreen = hasCompletedOnboarding ? "MainApp" : "Onboarding";

        const timeout = setTimeout(() => {
          navigation.dispatch(StackActions.replace(nextScreen));
        }, 2500);

        return () => clearTimeout(timeout);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        navigation.dispatch(StackActions.replace("Onboarding"));
      }
    };

    checkOnboarding();
  }, []);

  return (
    <View style={globalStyles.mainContainer}>
      <SplashScreenBackgroundOverlay />
    </View>
  );
}
function AppRouter() {
  //
  // useEffect(() => {
  //   // בדיקה אם המשתמש כבר ראה onboarding
  //   // const seen = getFromStorage('hasSeenOnboarding');
  //   // setShowOnboarding(!seen);
  // }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
      }}
      // screenListeners={screenListener}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="MainApp" component={MainApp} />
    </Stack.Navigator>
  );
}

function App() {
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

export default function Root() {
  return <App />;
}

registerRootComponent(Root);
