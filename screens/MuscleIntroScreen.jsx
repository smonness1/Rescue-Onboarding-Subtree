import React from "react";
import { StyleSheet, View } from "react-native";
import { globalStyles } from "../globalStyles";
import BackgroundOverlay from "../components/BackgroundOverlay";
import GenericButton from "../components/GenericButton";
import RevealingText from "../components/RevealingText";
import { COLORS, FONTS, SIZES } from "../constants";
import { usePreferencesContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import { muscleRelaxation as localization } from "../localization";

const log = logger.extend("MuscleIntroScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/18_muscle_intro_screen.wav"));

export default function MuscleIntroScreen({ navigation }) {
  const { selectText } = usePreferencesContext();

  const [ isPlayed, setIsPlayed ] = React.useState(false);
  const isFocused = useIsFocused();

  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    setIsPlayed(true);
  }

  function navigateNext() {
    setIsPlayed(false);
    navigation.navigate("Muscle");
  }

  return (
    <View style={globalStyles.mainContainer}>
      <BackgroundOverlay />
      <View style={styles.headerContainer}>
        <RevealingText
          textStyle={styles.headerText}
          startColor={"transparent"}
          endColor={COLORS.content}
          duration={55}
          text={selectText(localization.intro)}
        />
      </View>

      <View style={[globalStyles.bottomContainer, styles.buttonContainer]}>
        <GenericButton onPress={navigateNext} template="continue" />
        <View />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    height: "80%",
    // borderWidth: 1
  },
  buttonContainer: {
    marginTop: 50,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: COLORS.content,
    fontSize: SIZES.lg,
    fontFamily: FONTS.main,
    textAlign: "center",
    textTransform: "uppercase",
    maxWidth: "80%",
  },
});
