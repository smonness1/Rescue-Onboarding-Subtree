import { View, Text, StyleSheet, Image } from "react-native";
import { FONTS, SIZES } from "../constants";
import { globalStyles } from "../globalStyles";
import React, { useEffect, useState, useRef } from "react";
import GenericButton from "../components/GenericButton";
import MenuButton from "../components/MenuButton";
import BackgroundOverlay from "../components/BackgroundOverlay";
import HandsImage from "../assets/images/relax/relax_hands.png";
import HeadImage from "../assets/images/relax/relax_head.png";
import ShouldersImage from "../assets/images/relax/relax_shoulders.png";
import ArmsImage from "../assets/images/relax/relax_arms.png";
import LegsImage from "../assets/images/relax/relax_legs.png";
import FullBodyImage from "../assets/images/relax/relax_whole_body.png";
import {
  useNavContext,
  usePreferencesContext,
  useTrackerContext,
} from "../hooks";
import Container from "../components/Container";
import { logger } from "../utils/logger";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import SoundContainer from "../utils/sound";
import { muscleRelaxation as localization } from "../localization";

const imageSourceOptions = [
  HandsImage,
  HeadImage,
  ShouldersImage,
  ArmsImage,
  LegsImage,
  FullBodyImage,
];
const log = logger.extend("MuscleRelaxationScreen");
const soundInstances = [
  new SoundContainer(require("../assets/sounds/he/19_muscle_relaxation_screen_1.wav")),
  new SoundContainer(require("../assets/sounds/he/19_muscle_relaxation_screen_2.wav")),
  new SoundContainer(require("../assets/sounds/he/19_muscle_relaxation_screen_3.wav")),
  new SoundContainer(require("../assets/sounds/he/19_muscle_relaxation_screen_4.wav")),
  new SoundContainer(require("../assets/sounds/he/19_muscle_relaxation_screen_5.wav")),
  new SoundContainer(require("../assets/sounds/he/19_muscle_relaxation_screen_6.wav"))
]

export default function MuscleRelaxationScreen({ navigation }) {
  const [phase, setPhase] = useState(-1);  // -1 marks beginning to avoid back button double-play bug
  const [bodyTextFirst, setBodyTextFirst] = useState(""); // first text paragraph
  const [bodyTextSecond, setBodyTextSecond] = useState(""); // second text paragraph
  const [shownImage, setShownImage] = useState(HandsImage);
  const { selectText } = usePreferencesContext();
  const { setLastExcercise, setNavFunction, location } = useNavContext();
    const { trackAction , trackExerciseEvent, startTrackEventTime } = useTrackerContext();
  const timerRef = useRef(null);
  const PHASE_MAX = 5;
  const PHASE_MIN = 0;

  startTrackEventTime();
  useEffect(() => {
    if (phase >= PHASE_MIN && phase <= PHASE_MAX) {
      setBodyTextFirst(selectText(textOptionsFirst[phase]));
      setBodyTextSecond(selectText(textOptionsSecond[phase]));
      setShownImage(imageSourceOptions[phase]);
    }
  }, [phase]);

  useFocusEffect(
    React.useCallback(() => {
      log.debug("MuscleRelaxation Focus");
      if (phase == -1) {
        log.debug("Start playing");
        changePhase(1);
      } else {
        timerRef.current = setTimeout(() => { changePhase(1) }, 30 * 1000);
      }

      return () => {
        log.debug("MuscleRelaxation Blur");
        stopSounds();
        clearTimeout(timerRef.current);
      };
    }, [phase])
  );

  function navPattern(mood) {
    if (mood == "worse") {
      // Worse
      if (location === "Home") return "Shower";
      else return "Finish";
    } else {
      //  Better
      return "MentalSelect";
    }
  }

  function navigateNext() {
    trackAction("Muscle Relaxtion");
    trackExerciseEvent("Muscle Relaxtion")

    setLastExcercise("Muscle");
    setNavFunction(() => navPattern);
    navigation.navigate("Checkup");
  }

  async function stopSounds(){
    let promises = [];
    for (let i in soundInstances) {
      let soundInstance = soundInstances[i];
      logger.debug("Trying to unload " + i);
      promises.push(soundInstance.soundInstance?.unloadAsync());
      soundInstance.soundInstance = null;
    }
    await Promise.all(promises);
  }

  async function changePhase(diff) {
    if (phase + diff <= PHASE_MAX && phase + diff >= PHASE_MIN) {
      setPhase(phase + diff);
      if (phase >= PHASE_MIN) {  // For extreme case of phase == -1
        logger.debug("Unloading sound " + phase);
        await soundInstances[phase].soundInstance?.unloadAsync();
        soundInstances[phase].soundInstance = null;
      }
      logger.debug("Playing sound " + (phase + diff));
      await soundInstances[phase + diff].playSound();
    } else if (phase + diff > PHASE_MAX) {
      // finish
      await stopSounds();
      navigateNext();
    }
  }

  return (
    <Container>
      <View style={[globalStyles.mainContainer, { paddingTop: 70 }]}>
        <BackgroundOverlay />

        <View style={styles.headerContainer}>
          <Text style={styles.bodyTextFirst}>{bodyTextFirst}</Text>
          {/* <RevealingText textStyle={styles.bodyTextFirst} startColor={'transparent'} endColor={COLORS.content} delay={50} text={bodyTextFirst} /> */}
          <Text style={styles.bodyTextSecond}>{bodyTextSecond}</Text>
          {/* <RevealingText textStyle={styles.bodyTextSecond} startColor={'transparent'} endColor={COLORS.content} delay={50} text={bodyTextSecond} /> */}
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={shownImage} />
        </View>

        <View style={[globalStyles.bottomContainer, globalStyles.buttonsRow]}>
          <GenericButton onPress={() => { changePhase(1) }} template={"continue"} />
          <GenericButton

            onPress={() => { if (phase > 0) changePhase(-1) }} template={"previous"}
          />
          <MenuButton onPress={() => navigation.navigate("All")} />
        </View>
      </View>
    </Container>
  );
}
// text options for first paragraph, for each phase
const textOptionsFirst = [localization.partA.hands, localization.partA.head, localization.partA.shoulders, localization.partA.arms, localization.partA.legs, localization.partA.fullBody];

// Text options for second paragraph, for each phase
const textOptionsSecond = [localization.partB.hands, localization.partB.head, localization.partB.shoulders, localization.partB.arms, localization.partB.legs, localization.partB.fullBody];

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    maxWidth: "90%",
    height: '30%',
  },
  bodyTextFirst: {
    fontFamily: FONTS.main,
    textAlign: "center",
    fontSize: SIZES.sm,
  },
  bodyTextSecond: {
    fontFamily: FONTS.main,
    textAlign: "center",
    fontSize: SIZES.sm,
    fontWeight: "700",
  },
  imageContainer: {
    marginTop: 5,
    marginBottom: 15,
    flex: 1,
  },
  image: {
    height: "100%",
    minWidth: 200,
    minHeight: 200,
    resizeMode: "contain",
  },
});
