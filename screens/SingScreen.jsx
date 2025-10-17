import React, { useRef } from "react";
import singAnimation from "../assets/animations/sing.gif";
import ExerciseScreenBase from "../components/ExerciseScreenBase";
import { useFocusEffect } from "@react-navigation/native";
import { useNavContext, useTrackerContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import { standardExercises as localization } from "../localization";

const log = logger.extend("SingScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/14_sing_screen.wav"));

export default function SingScreen({ navigation }) {
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
        log.debug("Sing Focus");

        return () => {
          log.debug("Sing Blur");
        };
      }
    }, [isPlayed])
  );

  function navPattern(mood) {
    return mood == "better" ? "BreathingLong" : "GroundingSelect";
  }
  function navigateNext(skipped = false, toMenu = false) {
    trackAction(skipped ? "(Skipped) Sing" : "Sing");
    trackExerciseEvent("Sing", skipped)

    if (toMenu) {
      trackAction("All Excercises");
      setLastExcercise("All");
      setIsPlayed(false);
      navigation.navigate("All");
    } else {
      setLastExcercise("Sing");
      setNavFunction(() => navPattern);
      setIsPlayed(false);
      navigation.navigate("Checkup");
    }
  }

  return (
    <ExerciseScreenBase
      navigateNext={navigateNext}
      animation={singAnimation}
      timerDuration={150}
      bodyTextOptions={localization.sing}
      navigation={navigation}
      accessibilityLabel="A loud microphone"
    />
  );
}
