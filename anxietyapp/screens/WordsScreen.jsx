import React, { useRef } from "react";
import ThinkAnimation from "../assets/animations/thought.gif";
import ExerciseScreenBase from "../components/ExerciseScreenBase";
import { useFocusEffect } from "@react-navigation/native";
import { useNavContext, useTrackerContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import { standardExercises as localization } from "../localization";

const log = logger.extend("WordsScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/11_words_screen.wav"));

export default function WordsScreen({ navigation }) {
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
        log.debug("Words Focus");

        return () => {
          log.debug("Words Blur");
        };
      }
    }, [isPlayed])
  );

  function navPattern(mood) {
    return mood == "better" ? "BreathingLong" : "GroundingSelect";
  }

  function navigateNext(skipped = false, toMenu = false) {
    trackAction(skipped ? "(Skipped) Words" : "Words");
    trackExerciseEvent("Words", skipped)

    if (toMenu) {
      trackAction("All Excercises");
      setLastExcercise("All");
      setIsPlayed(false);
      navigation.navigate("All");
    } else {
      setLastExcercise("Words");
      setNavFunction(() => navPattern);
      setIsPlayed(false);
      navigation.navigate("Checkup");
    }
  }

  return (
    <ExerciseScreenBase
      navigateNext={navigateNext}
      animation={ThinkAnimation}
      timerDuration={120}
      bodyTextOptions={localization.words}
      navigation={navigation}
      accessibilityLabel="Looking"
    />
  );
}
