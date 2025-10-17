import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../constants";
import { globalStyles } from "../globalStyles";
import BackgroundOverlay from "../components/BackgroundOverlay";
import GenericButton from "../components/GenericButton";
import RevealingText from "../components/RevealingText";
import { usePreferencesContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { breathing as localization } from "../localization";

const soundInstance = new SoundContainer(null);
// soundInstance.soundFile = require(`../assets/sounds/he/01_breathing_intro_screen.wav`);

const soundFiles = {
  he : require('../assets/sounds/he/01_breathing_intro_screen.wav'),
  en : require('../assets/sounds/he/01_breathing_intro_screen.wav'),
}

export default function BreathingIntroScreen({ navigation }) {
  const { selectText, userApprovesTracking } = usePreferencesContext();
  const [isPlayed, setIsPlayed] = React.useState(false);
  const isFocused = useIsFocused();

  soundInstance.soundFile = selectText(soundFiles) 


  useEffect(() => {
    async function readIt() {
      const val = await AsyncStorage.getItem('userApprovesTracking');
      logger.info(`Tracking: ${val} of type ${typeof val}, ACTUAL: ${userApprovesTracking} of type ${typeof userApprovesTracking}`);


    }
    readIt();
  }, [])

  // play sound
  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    setIsPlayed(true);
  }



  function navigateNext() {
    setIsPlayed(false);
    navigation.navigate("Breathing");
  }


  return (
    <View style={globalStyles.mainContainer}>
      <BackgroundOverlay />
      <View style={styles.headerContainer}>
        <RevealingText
          textStyle={globalStyles.headerText}
          text={selectText(localization.intro)}
          duration={70}
          startColor={"transparent"}
          endColor={COLORS.content}
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
  },
  buttonContainer: {
    marginTop: 50,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
