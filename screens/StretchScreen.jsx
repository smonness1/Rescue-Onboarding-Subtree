import React, { useRef } from "react";
import stretchAnimation from "../assets/animations/stretch.gif";
import ExerciseScreenBase from "../components/ExerciseScreenBase";
import { useFocusEffect } from "@react-navigation/native";
import { useNavContext, useTrackerContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import { standardExercises as localization } from "../localization";

const log = logger.extend("StretchScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/16_stretch_screen.wav"));

export default function StretchScreen({ navigation }) {
  const { setLastExcercise, setNavFunction } = useNavContext();
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
        log.debug("Stretch Focus");

        return () => {
          log.debug("Stretch Blur");
        };
      }
    }, [isPlayed])
  );

  function navPattern(mood) {
    return mood == "worse" ? "MuscleIntro" : "MentalSelect";
  }

  function navigateNext(skipped = false, toMenu = false) {
    trackAction(skipped ? "(Skipped) Stretch" : "Stretch");
    trackExerciseEvent("Stretch", skipped)
    log.debug("Navigate next");

    if (toMenu) {
      log.debug("Navigate next - to menu");
      trackAction("All Excercises");
      setLastExcercise("All");
      setIsPlayed(false);
      navigation.navigate("All");
    } else {
      log.debug("Navigate next - not to menu");
      setLastExcercise("Stretch");
      setNavFunction(() => navPattern);
      setIsPlayed(false);
      navigation.navigate("Checkup");
    }
  }

  return (
    <ExerciseScreenBase
      navigateNext={navigateNext}
      animation={stretchAnimation}
      timerDuration={60}
      bodyTextOptions={localization.stretch}
      navigation={navigation}
      accessibilityLabel="A child doing stretches"
    />
  );
}
