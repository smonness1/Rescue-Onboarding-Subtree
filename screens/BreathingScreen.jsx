import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Image, Vibration, Dimensions, } from "react-native";
import { globalStyles } from "../globalStyles";
import GenericButton from "../components/GenericButton";
import BreathingBallImage from "../assets/images/breathing_ball.png";
import BreathingAnimation from "../components/BreathingAnimation";
import breathingImage from "../assets/images/breathing.png";
import BackgroundOverlay from "../components/BackgroundOverlay";
import MenuButton from "../components/MenuButton";
import GrowAndShrink from "../components/GrowAndShrink";
import { TrackerContext } from "../context/TrackerContext";
import { COLORS } from "../constants";
import { logger } from "../utils/logger";
import { useNavContext, usePreferencesContext, useTrackerContext, } from "../hooks";
import SoundContainer from "../utils/sound";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import Container from "../components/Container";
import { breathing as localization } from "../localization";
import {auth} from "../firebase/config";
import useAnalytics, {AnalyticsEvent, EventType} from "../api/services/trackerService";

// Constants:
const inahleDuration = 4000;
const exhaleDuration = 6000;
const breathIterations = 3;
const log = logger.extend("BreathingScreen");
const soundInstance = new SoundContainer(
  require("../assets/sounds/he/02_breathing_screen_start.wav"),
);
const inhaleSoundInstance = new SoundContainer(
  require("../assets/sounds/he/02_breathing_screen_in.wav"),
);
const exhaleSoundInstance = new SoundContainer(
  require("../assets/sounds/he/02_breathing_screen_out.wav"),
);

export default function BreathingScreen({ navigation }) {
  const { selectText } = usePreferencesContext();
  const { setLastExcercise } = useNavContext();
    const { trackAction , trackExerciseEvent, startTrackEventTime } = useTrackerContext();
  const [animationPhase, setAnimationPhase] = useState({
    phase: "inhale",
    bodyText: localization.inhale.instructions,
    bodyTextSeconds: localization.inhale.seconds,
    exhaleCounter: 0,
  });
  const [isPlayed, setIsPlayed] = React.useState(false);
  const isFocused = useIsFocused();
  const timerRef = useRef(null);


  useEffect(() => {
    startTrackEventTime();
  },[])

  useEffect(() => {
    updatePhase(animationPhase.phase);
  }, [animationPhase]);

  useFocusEffect(
    React.useCallback(() => {
      if (isPlayed) {
        return () => {
          log.debug('Unloading inhale exhale sounds');
          inhaleSoundInstance.soundInstance?.unloadAsync();
          exhaleSoundInstance.soundInstance?.unloadAsync();
        };
      }
    }, [isPlayed]),
  );

  function navigateNext(toMenu = false) {
    trackAction("Breathing");
    trackExerciseEvent("Breathing", !toMenu)
    clearTimeout(timerRef.current);
    setLastExcercise("Breathing");

    setIsPlayed(false);
    if (toMenu) {
      navigation.navigate("All");
    } else {
      navigation.navigate("Select");
    }
  }

  function updatePhase(lastPhase) {
    if (lastPhase === "exhale") {
      // Change to inhale phase
      timerRef.current = setTimeout(() => {
        log.debug("changing to inhale");
        if (soundInstance.isFinished)
          inhaleSoundInstance.playSound();
        setAnimationPhase({
          phase: "inhale",
          bodyText: localization.inhale.instructions,
          bodyTextSeconds: localization.inhale.seconds,
          exhaleCounter: animationPhase.exhaleCounter + 1,
        });
      }, exhaleDuration);
    } else if (lastPhase === "inhale") {
      // Change to exhale phase
      timerRef.current = setTimeout(() => {
        Vibration.vibrate(800, false);
        log.debug("changing to exhale");
        if (soundInstance.isFinished)
          exhaleSoundInstance.playSound();
        setAnimationPhase({
          phase: "exhale",
          bodyText: localization.exhale.instructions,
          bodyTextSeconds: localization.exhale.seconds,
          exhaleCounter: animationPhase.exhaleCounter,
        });
      }, inahleDuration);
    }
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

        <View style={[globalStyles.contentContainer, {paddingTop: '20%'}]}>
          <View style={styles.headerImageContainer}>
            <Image style={styles.headerImage} source={breathingImage} />
          </View>
          <View style={styles.animationContainer}>
            <BreathingAnimation
              source={BreathingBallImage}
              growDuration={inahleDuration}
              shrinkDuration={exhaleDuration}
              delay={0}
              endColor={COLORS.secondary}
              startColor={COLORS.main}
              maxScale={1}
              minScale={0.3}
              additionalImageStyles={styles.animation}
            />
          </View>
          <View style={styles.bodyContainer}>
            <Text style={globalStyles.buttonText}>
              {selectText(animationPhase.bodyText)}
            </Text>
            <Text style={globalStyles.selectionHeaderText}>
              {selectText(animationPhase.bodyTextSeconds)}
            </Text>
          </View>
        </View>

          <View style={[globalStyles.buttonsRow]}>
            {animationPhase.exhaleCounter < breathIterations ? (
              <GenericButton template={"skip"} onPress={(e) => navigateNext()} />
            ) : (
              <GrowAndShrink
                minScale={1}
                maxScale={1.2}
                delay={0}
                growDuration={500}
                shrinkDuration={300}
              >
                <GenericButton
                  template={"continue"}
                  onPress={(e) => navigateNext()}
                />
              </GrowAndShrink>
            )}
            <MenuButton onPress={(e) => navigateNext(true)} />
          </View>
      </View>
    </Container>
  );
}
const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  headerImageContainer: {
    maxHeight: height * 0.2,
    marginBottom: '10%'
  },
  headerImage: {
    resizeMode: "contain",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  animationContainer: {
    width: "70%",
    height: height * 0.2,
    margin: 30,
  },
  animation: {
    resizeMode: "contain",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  bodyContainer: {
    marginVertical: 30,
  },
});
