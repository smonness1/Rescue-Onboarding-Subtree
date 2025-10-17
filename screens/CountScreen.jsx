import React, { useContext, useRef } from "react";
import countAnimation from "../assets/animations/count.gif";
import ExerciseScreenBase from "../components/ExerciseScreenBase";
import { TrackerContext } from "../context/TrackerContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import { standardExercises as localization } from "../localization";

const log = logger.extend("CountScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/12_count_screen.wav"));

export default function CountScreen({ navigation }) {
  const { setLastExcercise, setNavFunction } = useNavContext();
  const { trackAction, trackExerciseEvent } = useContext(TrackerContext);
  const [ isPlayed, setIsPlayed ] = React.useState(false);
  const isFocused = useIsFocused();
  // const timerRef = useRef(null);

  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    log.debug("Not playing and focused, setting isPlayed to true");
    setIsPlayed(true);
  }

  useFocusEffect(
    React.useCallback(() => {
      if (isPlayed) {
        log.debug("Count Focus");
        // timerRef.current = setTimeout(navigateNext, 150 * 1000);

        return () => {
          log.debug("Count Blur");
          // clearTimeout(timerRef.current);
        };
      }
    }, [isPlayed])
  );

  function navPattern(mood) {
    return mood == "better" ? "BreathingLong" : "GroundingSelect";
  }

  function navigateNext(skipped = false, toMenu = false) {
    trackAction(skipped ? "(Skipped) Count" : "Count");
    trackExerciseEvent("Count", skipped)

    if (toMenu) {
      trackAction("All Excercises");
      setLastExcercise("All");
      setIsPlayed(false);
      navigation.navigate("All");
    } else {
      setLastExcercise("Count");
      setNavFunction(() => navPattern);
      setIsPlayed(false);
      navigation.navigate("Checkup");
    }
  }

  return (
    <ExerciseScreenBase
      navigateNext={navigateNext}
      animation={countAnimation}
      bodyTextOptions={localization.count}
      navigation={navigation}
      accessibilityLabel="Dancing digits"
      timerDuration={150}
    />
  );
}
