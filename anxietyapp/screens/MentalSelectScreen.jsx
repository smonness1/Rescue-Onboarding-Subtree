import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../globalStyles";
import AnimationButton from "../components/AnimationButton";
import countAnimation from "../assets/animations/count.gif";
import singAnimation from "../assets/animations/sing.gif";
import LookingAnimation from "../assets/animations/looking.gif";
import ThinkAnimation from "../assets/animations/thought.gif";
import { COLORS } from "../constants";
import BackgroundOverlay from "../components/BackgroundOverlay";
import { usePreferencesContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import {mentalSelect as localization} from "../localization";

const log = logger.extend("MentalSelectScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/08_mental_select_screen.wav"));

export default function MentalSelectScreen({ navigation }) {
  const { language, isFemale, selectText } = usePreferencesContext();
  const [ isPlayed, setIsPlayed ] = React.useState(false);
  const isFocused = useIsFocused();

  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    setIsPlayed(true);
  }

  function navigateNext(target) {
    setIsPlayed(false);
    navigation.navigate(target);
  }

  return (
    <View style={[globalStyles.mainContainer]}>
      <BackgroundOverlay />

      <View style={globalStyles.promptConatiner}>
        <Text style={[globalStyles.selectionHeaderText]}>
          {selectText(localization.header)}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <AnimationButton
          handlePress={() => navigateNext("Sing")}
          imgSource={singAnimation}
          animationColor={COLORS.support}
          title={selectText(localization.buttons.sing)}
        />
        <AnimationButton
          handlePress={() => navigateNext("Count")}
          imgSource={countAnimation}
          animationColor={COLORS.support}
          title={selectText(localization.buttons.count)}
        />
        <AnimationButton
          handlePress={() => navigateNext("Color")}
          imgSource={LookingAnimation}
          animationColor={COLORS.support}
          title={selectText(localization.buttons.color)}
        />
        <AnimationButton
          handlePress={() => navigateNext("Words")}
          imgSource={ThinkAnimation}
          animationColor={COLORS.support}
          title={selectText(localization.buttons.words)}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",

    rowGap: 25,
    justifyContent: "space-around",
    marginTop: 35,
    alignItems: "center",
  },
});
