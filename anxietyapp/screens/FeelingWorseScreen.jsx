import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FilledButton from "../components/FilledButton";
import { PrefrencesContext } from "../context/prefrencesContext";
import { useContext } from "react";
import { globalStyles } from "../globalStyles";
import { NavContext } from "../context/NavContext";
import BackgroundOverlay from "../components/BackgroundOverlay";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import { feelingWorse as localization } from "../localization";

const log = logger.extend("FeelingWorseScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/17_feeling_worse_screen.wav"));

export default function FeelingWorseScreen({ navigation }) {
  const { selectText } = useContext(PrefrencesContext);
  const { navFunction, lastExcercise } = useContext(NavContext);
  const [ isPlayed, setIsPlayed ] = React.useState(false);
  const isFocused = useIsFocused();

  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    log.debug("Not playing and focused, setting isPlayed to true");
    setIsPlayed(true);
  }

  // ** Debug **
  log.info("(Feeling Worse) Next Exercise -> " + navFunction("worse"));

  function onPress(choice) {
    setIsPlayed(false);
    if (choice == "different") {
      navigation.navigate(navFunction("worse"));
    } else {
      navigation.navigate(lastExcercise);
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

      <View style={[globalStyles.bottomContainer, globalStyles.answerButtonsContainer]}>
        <FilledButton
          title={selectText(localization.buttons.more)}
          handlePress={() => onPress("different")}
        />
        <FilledButton
          title={selectText(localization.buttons.repeat)}
          handlePress={() => onPress("repeat")}
        />
      </View>
    </View>
  );
}
const componentDictionary = {
  differentTool: {
    en: "Different tool",
    he: "תרגילים נוספים",
    ar: "أداة مختلفة",
  },
  repeatTool: {
    en: "Repeat this tool",
    he: "להישאר בתרגיל הנוכחי",
    ar: "تكرير هذه الأداة",
  },
};