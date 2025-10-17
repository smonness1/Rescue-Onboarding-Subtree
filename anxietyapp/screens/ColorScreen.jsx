import React, { useRef } from "react";
import LookingAnimation from "../assets/animations/looking.gif";
import ExerciseScreenBase from "../components/ExerciseScreenBase";
import { useNavContext, useTrackerContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { standardExercises as localization } from "../localization";

const log = logger.extend("ColorScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/15_color_screen.wav"));

export default function ColorScreen({ navigation }) {
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
    return mood == "better" ? "BreathingLong" : "GroundingSelect";
  }

  function navigateNext(skipped = false, toMenu = false) {
    trackAction(skipped ? "(Skipped) Colors" : "Colors");
    trackExerciseEvent("Colors", skipped)

    if (toMenu) {
      trackAction("All Excercises");
      setLastExcercise("All");
      setIsPlayed(false);
      navigation.navigate("All");
    } else {
      setLastExcercise("Color");
      setNavFunction(() => navPattern);
      setIsPlayed(false);
      navigation.navigate("Checkup");
    }
  }

  return (
    <ExerciseScreenBase
      navigateNext={navigateNext}
      animation={LookingAnimation}
      timerDuration={150}
      bodyTextOptions={localization.color}
      navigation={navigation}
      accessibilityLabel="Looking"
    />
  );
}
