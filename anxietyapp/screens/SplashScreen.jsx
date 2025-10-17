import React, {useEffect} from "react";
import {
  View,

} from "react-native";
import {globalStyles} from "../globalStyles";
import SplashScreenBackgroundOverlay from "../components/SplashScreenBackgroundOverlay";
import {StackActions, useNavigation} from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.dispatch(StackActions.replace('First'));
    }, 2500)
    return () => clearTimeout(timeout);
  }, [])

  return (
    <View style={globalStyles.mainContainer}>
      <SplashScreenBackgroundOverlay/>
    </View>
  );
}

