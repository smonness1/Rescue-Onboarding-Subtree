import React from "react";
import showerAnimation from "../assets/animations/shower.gif";
import ExerciseScreenBase from "../components/ExerciseScreenBase";
import { useNavContext, useTrackerContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import { standardExercises as localization } from "../localization";

const log = logger.extend("ShowerScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/13_shower_screen.wav"));

export default function ShowerScreen({ navigation }) {
  const { setLastExcercise, setNavFunction } = useNavContext();
    const { trackAction , trackExerciseEvent } = useTrackerContext();
  const [ isPlayed, setIsPlayed ] = React.useState(false);
  const isFocused = useIsFocused();

  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    setIsPlayed(true);
  }

  function navPattern(mood) {
    if (mood == "worse") {
      // Worse
      return "Finish";
    } else {
      // Better
      return "MentalSelect";
    }
  }

  function navigateNext(skipped = false) {
    trackAction(skipped ? "(Skipped) Shower" : "Shower");
    trackExerciseEvent("Shower", skipped)
    setLastExcercise("Shower");
    setNavFunction(() => navPattern);
    setIsPlayed(false);
    navigation.navigate("Checkup");
  }

  return (
    <ExerciseScreenBase
      navigateNext={navigateNext}
      animation={showerAnimation}
      bodyTextOptions={localization.shower}
      navigation={navigation}
      accessibilityLabel="A dripping shower head"
    />
  );
}
