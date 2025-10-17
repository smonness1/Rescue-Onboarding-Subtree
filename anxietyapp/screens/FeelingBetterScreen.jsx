import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import FilledButton from "../components/FilledButton";
import { globalStyles } from "../globalStyles";
import BackgroundOverlay from "../components/BackgroundOverlay";
import { useNavContext, usePreferencesContext, useTrackerContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import Container from "../components/Container";
import { feelingBetter as localization } from "../localization";
import useAnalytics, {AnalyticsEvent, EventType} from "../api/services/trackerService";
import {auth} from "../firebase/config";


const log = logger.extend("FeelingBetterScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/07_feeling_better_screen.wav"));

export default function FeelingBetterScreen({ navigation }) {
  const { selectText } = usePreferencesContext();
  const { location, navFunction, lastExcercise } = useNavContext();
  const { trackAction, setUsageEndTime } = useTrackerContext();
  const [isPlayed, setIsPlayed] = React.useState(false);
  const { trackEvent } = useAnalytics();
  const isFocused = useIsFocused();

  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    log.debug("Not playing and focused, setting isPlayed to true");
    setIsPlayed(true);
  }

  log.info("(Feeling Better) Next Exercise -> " + navFunction("better"));

  // Continue function
  function onPress(choice) {
    setIsPlayed(false);
    trackEvent({
      userId: auth.currentUser.uid,
      event: new AnalyticsEvent(EventType.CLICK, choice)
    })
    if (choice === "further") {
      // Edge case (finish)
      if (lastExcercise === "BreathingLong") {
        trackAction("Sending to all excercises");
        setUsageEndTime(new Date());
        navigation.navigate(navFunction("better"));
      } else if (location === "Home") {
        navigation.navigate("Drink");
      } else {
        navigation.navigate(navFunction("better"));
      }
    } else if (choice === "calm") {
      navigation.navigate("Finish");
    } else {
      // repeat
      navigation.navigate(lastExcercise);
    }
  }

  return (
    <Container>
      <View
        style={[
          globalStyles.mainContainer]}
      >
        <BackgroundOverlay />

        <View style={globalStyles.promptConatiner}>
          <Text style={globalStyles.selectionHeaderText}>
            {selectText(localization.header)}
          </Text>
        </View>

        <View style={[globalStyles.bottomContainer, globalStyles.answerButtonsContainer]}>
          <FilledButton
            title={selectText(localization.buttons.more)}
            handlePress={() => onPress("further")}
          />
          <FilledButton
            title={selectText(localization.buttons.repeat)}
            handlePress={() => onPress("repeat")}
          />
          <FilledButton
            title={selectText(localization.buttons.finish)}
            handlePress={() => onPress("calm")}
          />
        </View>
      </View>
    </Container>
  );
}
