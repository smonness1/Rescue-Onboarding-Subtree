import React, { useRef } from "react";
import iceAnimation from "../assets/animations/cold.gif";
import ExerciseScreenBase from "../components/ExerciseScreenBase";
import { useFocusEffect } from "@react-navigation/native";
import { useNavContext, useTrackerContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import { standardExercises as localization } from "../localization";
import useAnalytics, {AnalyticsEvent, EventType} from "../api/services/trackerService";
import {auth} from "../firebase/config";

const log = logger.extend("IceScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/10_ice_screen.wav"));

export default function IceScreen({ navigation }) {
  const { setLastExcercise, setNavFunction } = useNavContext();
    const { trackAction , trackExerciseEvent } = useTrackerContext();
  const [ isPlayed, setIsPlayed ] = React.useState(false);
  const isFocused = useIsFocused();

  const { trackEvent } = useAnalytics();

  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    log.debug("Not playing and focused, setting isPlayed to true");
    setIsPlayed(true);
  }

  useFocusEffect(
    React.useCallback(() => {
      if (isPlayed) {
        log.debug("Ice Focus");

        return () => {
          log.debug("Ice Blur");
        };
      }
    }, [isPlayed])
  );

  function navPattern(mood) {
    return mood == "worse" ? "MuscleIntro" : "MentalSelect";
  }

  function navigateNext(skipped = false, toMenu = false) {
    trackAction(skipped ? "(Skipped) Ice" : "Ice");
    trackExerciseEvent("Ice", skipped)

    if(skipped){
      trackEvent({
        userId: auth.currentUser.uid,
        event: new AnalyticsEvent(EventType.CLICK, "Skipped")
      })
    }
    if (toMenu) {
      trackAction("All Excercises");
      setLastExcercise("All");
      setIsPlayed(false);
      navigation.navigate("All");
    } else {
      setLastExcercise("Ice");
      setNavFunction(() => navPattern);
      setIsPlayed(false);
      navigation.navigate("Checkup");
    }
  }

  return (
    <ExerciseScreenBase
      navigateNext={navigateNext}
      animation={iceAnimation}
      timerDuration={120}
      bodyTextOptions={localization.ice}
      navigation={navigation}
      accessibilityLabel="Snow falling"
    />
  );
}
