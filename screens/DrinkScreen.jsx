import React from "react";
import drinkAnimation from "../assets/animations/water.gif";
import ExerciseScreenBase from "../components/ExerciseScreenBase";
import { useNavContext, useTrackerContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import { standardExercises as localization } from "../localization";

const log = logger.extend("DrinkScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/09_drink_screen.wav"));

export default function DrinkScreen({ navigation }) {
  const { navFunction } = useNavContext();
    const { trackAction , trackExerciseEvent } = useTrackerContext();
  const [ isPlayed, setIsPlayed ] = React.useState(false);
  const isFocused = useIsFocused();

  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    setIsPlayed(true);
  }

  function navigateNext(skipped = false) {
    trackAction("Water");
    setIsPlayed(false);
    navigation.navigate(navFunction("better"));
  }

  return (
    <ExerciseScreenBase
      navigateNext={navigateNext}
      animation={drinkAnimation}
      timerDuration={null}
      bodyTextOptions={localization.drink}
      navigation={navigation}
      buttonTemplate="continue"
      accessibilityLabel="A child drinking water"
    />
  );
}
