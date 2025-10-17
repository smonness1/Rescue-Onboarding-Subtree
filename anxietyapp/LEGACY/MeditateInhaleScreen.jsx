import React from "react";
import { StyleSheet } from "react-native";
import meditateAnimation from "../assets/animations/stretch.gif"; //**TEMP**
import ExerciseScreenBase from "../components/ExerciseScreenBase";
import { SIZES } from "../constants";

export default function MeditateInhaleScreen({ navigation }) {
  const navigateNext = () => navigation.navigate("MeditateExhale");

  return (
    <ExerciseScreenBase
      navigateNext={navigateNext}
      animation={meditateAnimation}
      text={headerTextBase}
      additionalTextStyle={styles.headerText}
      accessibilityLabel="A girl inhaling in meditation position"
    />
  );
}
const headerTextBase = {
  en: "Slow down and take a deep breath",
  he: "בואו נשאף עמוק למשך 4 שניות וננשוף למשך 6 שניות",
  ar: "تنفسوا معي",
};
const styles = StyleSheet.create({
  headerText: {
    fontSize: SIZES.lg,
  },
});
