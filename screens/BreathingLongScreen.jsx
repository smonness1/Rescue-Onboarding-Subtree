import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Vibration,
  Dimensions,
} from "react-native";
import { globalStyles } from "../globalStyles";
import GenericButton from "../components/GenericButton";
import BreathingBallImage from "../assets/images/breathing_ball.png";
import BreathingAnimation from "../components/BreathingAnimation";
import breathingImage from "../assets/images/breathing.png";
import BackgroundOverlay from "../components/BackgroundOverlay";
import MenuButton from "../components/MenuButton";
import GrowAndShrink from "../components/GrowAndShrink";
import { COLORS } from "../constants";
import { logger } from "../utils/logger";
import {
  useNavContext,
  usePreferencesContext,
  useTrackerContext,
} from "../hooks";
import Container from "../components/Container";
import { breathing as localization } from "../localization";
import useAnalytics, {AnalyticsEvent, EventType} from "../api/services/trackerService";
import {auth} from "../firebase/config";

// Constants
const log = logger.extend("BreathingLongScreen");
const inahleDuration = 4000;
const exhaleDuration = 6000;
const breathIterations = 18; // amount of times you do both inhale and exhale

export default function BreathingLongScreen({ navigation }) {
  const { selectText } = usePreferencesContext();
  const { trackAction, trackExerciseEvent, startTrackEventTime } = useTrackerContext();
  const { setLastExcercise, setNavFunction } = useNavContext();
  const [bodyText, setBodyText] = useState(localization.inhale.instructions);
  const [bodyTextSeconds, setBodyTextSeconds] = useState(localization.inhale.seconds);
  const [phase, setPhase] = useState("inhale");
  const [exhaleCounter, setExhaleCounter] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    startTrackEventTime();
  })

  useEffect(() => {
    updatePhase(phase);
  }, [phase]);

  function navPattern(mood) {
    if (mood == "worse") {
      // Worse
      return "MentalSelect";
    } else {
      // Better
      return "All";
    }
  }

  function navigateNext(toMenu = false) {
    trackAction("Breathing 2");
    trackExerciseEvent("Breathing 2")
    clearTimeout(timerRef.current);
    setLastExcercise("BreathingLong");

    if (toMenu) {
      trackAction("All Excercises");
      navigation.navigate("All");
    } else {
      // user decided to skip the exercise
      trackUserEvent({
        userId: auth.currentUser.uid,
        event: new AnalyticsEvent(EventType.CLICK, "Skipped")
      })
      setNavFunction(() => navPattern);
      navigation.navigate("Checkup");
    }
  }

  function updatePhase(lastPhase) {
    if (lastPhase === "exhale") {
      // change to inhale phase
      timerRef.current = setTimeout(() => {
        log.debug("changing to inhale");
        setBodyText(localization.exhale.instructions);
        setBodyTextSeconds(localization.exhale.seconds);
        setPhase("inhale");
        setExhaleCounter(exhaleCounter + 1);
      }, exhaleDuration);
    } else if (lastPhase === "inhale") {
      // change to exhale phase
      timerRef.current = setTimeout(() => {
        Vibration.vibrate(800, false);
        log.debug("changing to exhale");
        setBodyText(localization.inhale.instructions);
        setBodyTextSeconds(localization.inhale.seconds);
        setPhase("exhale");
      }, inahleDuration);
    }
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
            <Text style={globalStyles.buttonText}>{selectText(bodyText)}</Text>
            <Text style={globalStyles.selectionHeaderText}>
              {selectText(bodyTextSeconds)}
            </Text>
          </View>
        </View>

        <View style={[globalStyles.buttonsRow]}>
          {exhaleCounter < breathIterations ? (
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
