import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FilledButton from "../components/FilledButton";
import { globalStyles } from "../globalStyles";
import BackgroundOverlay from "../components/BackgroundOverlay";
import { useNavContext, usePreferencesContext, useTrackerContext, } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import { checkup as localization } from "../localization";
import {auth} from "../firebase/config";
import useAnalytics, {AnalyticsEvent, EventType, FeelingType} from "../api/services/trackerService";


console.log('---: ', localization);

const log = logger.extend("CheckupScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/06_checkup_screen.wav"));

export default function CheckupScreen({ navigation }) {
  const { selectText } = usePreferencesContext();
  const { navFunction } = useNavContext();
    const { trackAction , trackExerciseEvent } = useTrackerContext();
  const { trackFeelingEvent } = useAnalytics();
  const [ isPlayed, setIsPlayed ] = React.useState(false);
  const isFocused = useIsFocused();

  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    log.debug("Not playing and focused, setting isPlayed to true");
    setIsPlayed(true);
  }

  function feelingWorse() {
    trackAction("-Feeling Worse-");
    trackFeelingEvent(FeelingType.WORSE)

    setIsPlayed(false);
    // Edge cases - finish right after this screen
    if (navFunction("worse") === "Finish") {
      navigation.navigate("Finish");
    } else {
      // general case
      navigation.navigate("FeelingWorse");
    }
  }

  function feelingBetter() {
    trackAction("-Feeling Better-");
    trackFeelingEvent(FeelingType.BETTER)
    setIsPlayed(false);
    navigation.navigate("FeelingBetter");
  }

  function feelingSame() {
    trackAction("-Feeling The same-");
    trackFeelingEvent(FeelingType.SAME)
    setIsPlayed(false);
    navigation.navigate("FeelingWorse");
  }

  return (
    <View style={[globalStyles.mainContainer]}>
      <BackgroundOverlay />

      <View style={globalStyles.promptConatiner}>
        <Text style={globalStyles.selectionHeaderText}>
          {selectText(headerTextOptions)}
        </Text>
      </View>

      <View style={[globalStyles.bottomContainer, styles.buttonsContainer]}>
        <FilledButton
          title={selectText({ en: "I'm better", he: "יותר טוב", ar: "أفضل" })}
          handlePress={feelingBetter}
        />
        <FilledButton
          title={selectText({ en: "The same", he: "אותו דבר", ar: "نفس الشيئ" })}
          handlePress={feelingSame}
        />
        <FilledButton
          title={selectText({
            en: "It's getting worse",
            he: "זה מחמיר",
            ar: "الوضع يزداد سوء",
          })}
          handlePress={feelingWorse}
        />
      </View>
    </View>
  );
}
const headerTextOptions = {
  en: "How are you feeling right now?",
  he: "איך אתם מרגישים כרגע?",
  ar: "كيف تشعرون الآن؟",
};
const styles = StyleSheet.create({
  buttonsContainer: {
    gap: 40,
    width: "100%",
  },
});
