import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../globalStyles";
import FilledButton from "../components/FilledButton";
import BackgroundOverlay from "../components/BackgroundOverlay";
import { useNavContext, usePreferencesContext, useTrackerContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import { locationSelect as localization } from "../localization";
import {auth} from "../firebase/config";
import useAnalytics, {AnalyticsEvent, EventType} from "../api/services/trackerService";

const log = logger.extend("LocationSelectScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/03_select_screen.wav"));

export default function LocationSelectScreen({ navigation }) {
  const { selectText } = usePreferencesContext();
    const { trackAction , trackExerciseEvent } = useTrackerContext();
  const { setLocation, setLastExcercise } = useNavContext()
  const { trackEvent } = useAnalytics();
  const [isPlayed, setIsPlayed] = React.useState(false);
  const isFocused = useIsFocused();

  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    setIsPlayed(true);
  }

  function onPress(choice) {
    trackAction("Location: " + choice);
    trackEvent({
      userId: auth.currentUser.uid,
      event: new AnalyticsEvent(EventType.LOCATION, choice)
    })

    setLocation(choice);
    setLastExcercise("Select");
    setIsPlayed(false);
    if (choice === "Alone") {
      navigation.navigate("Stretch");
    } else {
      navigation.navigate("GroundingSelect");
    }
  }

  return (
      <View style={[globalStyles.mainContainer]}>
        <BackgroundOverlay />

        <View style={globalStyles.promptConatiner}>
          <Text style={globalStyles.selectionHeaderText}>
            {selectText(localization.header)}
          </Text>
        </View>

        <View style={[globalStyles.bottomContainer, styles.buttonsContainer]}>
          <FilledButton
            title={selectText(localization.buttons.public)}
            handlePress={() => onPress("Public")}
          />
          <FilledButton
            title={selectText(localization.buttons.home)}
            handlePress={() => onPress("Home")}
          />
          <FilledButton
            title={selectText(localization.buttons.alone)}
            handlePress={() => onPress("Alone")}
          />
        </View>
      </View>
  );
}

// Styles
const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: 64,
    flex: 0.3
  },
  buttonsContainer: {
    gap: 24,
    width: "100%",
  },
});
