import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../globalStyles";
import AnimationButton from "../components/AnimationButton";
import { COLORS } from "../constants";
import StretchAnimation from "../assets/animations/stretch.gif";
import IceAnimation from "../assets/animations/cold.gif";
import SmellAnimation from "../assets/animations/smell.gif";
import BackgroundOverlay from "../components/BackgroundOverlay";
import { useNavContext, usePreferencesContext } from "../hooks";
import { logger } from "../utils/logger";
import SoundContainer from "../utils/sound"
import { useIsFocused } from "@react-navigation/native";
import Container from "../components/Container";
import { groundingSelect as localization } from "../localization";

const log = logger.extend("GroundingSelectScreen");
const soundInstance = new SoundContainer(require("../assets/sounds/he/04_grounding_select_screen.wav"));

export default function GroundingSelectScreen({ navigation }) {
  const { selectText } = usePreferencesContext();
  const { lastExcercise, location } = useNavContext();
  const [ isPlayed, setIsPlayed ] = React.useState(false);
  const isFocused = useIsFocused();

  function navigateNext(target) {
    setIsPlayed(false);
    navigation.navigate(target);
  }

  soundInstance.update(isPlayed, setIsPlayed);
  soundInstance.setSoundOnFocus();
  if (!isPlayed && isFocused) {
    setIsPlayed(true);
  }

  return (
    <Container>
      <View style={[globalStyles.mainContainer]}>
        <BackgroundOverlay />
        <Text style={[globalStyles.selectionHeaderText, { marginTop: 140 }]}>
          {selectText(localization.header)}
        </Text>
        <View style={[globalStyles.bottomContainer, styles.buttonsContainer]}>
          <AnimationButton
            handlePress={() => navigateNext("Stretch")}
            imgSource={StretchAnimation}
            circleColor={COLORS.main}
            animationColor={COLORS.support}
            title={selectText(localization.buttons.stretch)}
          />
          {location === "Alone" || (
            <AnimationButton
              handlePress={() => navigateNext("Smell")}
              imgSource={SmellAnimation}
              circleColor={COLORS.main}
              animationColor={COLORS.support}
              title={selectText(localization.buttons.smell)}
            />
          )}
          {location == "Home" && (
            <AnimationButton
              handlePress={() => navigateNext("Ice")}
              imgSource={IceAnimation}
              circleColor={COLORS.main}
              animationColor={COLORS.support}
              title={selectText(localization.buttons.ice)}
            />
          )}
        </View>

      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 25,
    justifyContent: "space-around",
    marginTop: 45,
    alignItems: "center",
  },
});
