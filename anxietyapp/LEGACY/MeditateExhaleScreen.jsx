import React from "react";
import { StyleSheet } from "react-native";
import meditateAnimation from "../assets/animations/stretch.gif"; // **TEMP**
import ExerciseScreenBase from "../components/ExerciseScreenBase";
import { SIZES } from "../constants";
import { useNavContext } from "../hooks";
import { logger } from "../utils/logger";

const log = logger.extend("MeditateExhaleScreen");

export default function MeditateExhaleScreen({ navigation }) {
  const { setLastExcercise, setNavFunction, location } = useNavContext();

  // TODO: Change to go to all excercises
  function navPattern(mood) {
    if (mood == "better") {
      log.debug("TODO: Change navigation to all excercises");
      return "Splash";
    } else if (mood == "worse") {
      if (location == "Home") return "Shower";
      else {
        log.debug("TODO: Change navigation to all excercises");
        return "First";
      }
    }
  }

  function navigateNext() {
    setLastExcercise("MeditateInhale");
    setNavFunction(() => navPattern);
    navigation.navigate("Checkup");
  }

  return (
    <ExerciseScreenBase
      navigateNext={navigateNext}
      animation={meditateAnimation}
      text={headerTextOptions}
      additionalTextStyle={styles.headerText}
      accessibilityLabel="A girl exhaling in meditation position"
    />
  );
}
const headerTextOptions = {
  en: "Slow Down and Take a Deep Breath - Exhale",
  he: {
    male: "האט וקח נשימה עמוקה - נשוף",
    female: "האיטי וקחי נשימה עמוקה - נשפי",
  },
  ar: "تمهّلوا وخذوا نفس عميق",
};
const styles = StyleSheet.create({
  headerText: {
    fontSize: SIZES.lg,
  },
});
