import React, { useRef } from "react";
import smellAnimation from "../assets/animations/smell.gif";
import ExerciseScreenBase from "../components/ExerciseScreenBase";
import { useFocusEffect } from "@react-navigation/native";
import { useNavContext, useTrackerContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import { standardExercises as localization } from "../localization";

const log = logger.extend("SmellScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/05_smell_screen.wav"));

export default function SmellScreen({ navigation }) {
  const { lastExcercise, setLastExcercise, setNavFunction, location } = useNavContext();
    const { trackAction , trackExerciseEvent } = useTrackerContext();
  const [ isPlayed, setIsPlayed ] = React.useState(false);
  const isFocused = useIsFocused();

  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    log.debug("Not playing and focused, setting isPlayed to true");
    setIsPlayed(true);
  }

  useFocusEffect(
    React.useCallback(() => {
      if (isPlayed) {
        log.debug("Smell Focus");

        return () => {
          log.debug("Smell Blur");
        };
      }
    }, [isPlayed])
  );

  function navPattern(mood) {
    return mood == "worse" ? "MuscleIntro" : "MentalSelect";
  }

  function navigateNext(skipped = false, toMenu = false) {
    trackAction(skipped ? "(Skipped) Smell" : "Smell");
    trackExerciseEvent("Smell", skipped)

    if (toMenu) {
      trackAction("All Excercises");
      setLastExcercise("All");
      setIsPlayed(false);
      navigation.navigate("All");
    } else {
      setLastExcercise("Smell");
      setNavFunction(() => navPattern);
      setIsPlayed(false);
      navigation.navigate("Checkup");
    }
  }

  return (
    <ExerciseScreenBase
      navigateNext={navigateNext}
      animation={smellAnimation}
      timerDuration={60}
      bodyTextOptions={localization.smell}
      navigation={navigation}
      accessibilityLabel="A smelling nose"
    />
  );
}
