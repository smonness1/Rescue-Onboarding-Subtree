import React, {useCallback, useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";

import { globalStyles } from "../globalStyles";
import { COLORS, FONTS, SIZES } from "../constants";
import MenuButton from "./MenuButton";
import GenericButton from "./GenericButton";
import BackgroundOverlay from "./BackgroundOverlay";
import {
  useNavContext,
  usePreferencesContext,
  useTrackerContext,
} from "../hooks";

import { useFocusEffect } from "@react-navigation/native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const circle = Math.min(
  Dimensions.get("screen").width * 0.7,
  Dimensions.get("screen").height * 0.7,
);

export default function ExerciseScreenBase({
  animation,
  bodyTextOptions,
  additionalTextStyle,
  accessibilityLabel,
  navigateNext,
  navigation,
  buttonTemplate = "skip",
  timerDuration = 60, // Exercise timer in Seconds, set to null to put in no timer
}) {
  const { selectText } = usePreferencesContext();
  const { lastExcercise, setLastExcercise } = useNavContext();
  const { trackAction, startTrackEventTime } = useTrackerContext();
  const [refreshCounter, setRefreshCounter] = useState(0); //Variable for timer animation

  const bodyText = selectText(bodyTextOptions);

  startTrackEventTime();
  useFocusEffect(
    useCallback(() => {
      setRefreshCounter(prevKey => prevKey + 1);
    }, [])
  );

  function animationComp() {
    return (
    <Image
      style={{
        ...Platform.select({
        ios: { width: "65%", height: "70%" },
        web: { width: "65%", height: "70%" },
        android: styles.mainAnimation,
      }), }}
      source={animation}
      resizeMode="contain"
      accessibility={true}
      accessibilityLabel={accessibilityLabel}
    />
  )
}

  return (
    <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={globalStyles.mainContainer}>
        <BackgroundOverlay />

        <View style={[globalStyles.contentContainer, {paddingTop: '10%'}]}>
          {/* <View style={styles.excerciseContainer}> */}
            <View style={styles.animationContainer}>
              <View style={styles.animationCircle}>
                {timerDuration === null ? (animationComp()) :
                <CountdownCircleTimer
                  key={refreshCounter}
                  duration={timerDuration}
                  onComplete={(e) => navigateNext(true)}
                  isGrowing={true}
                  rotation="counterclockwise"
                  isPlaying
                  size={circle}
                  colors={COLORS.accent}
                  strokeWidth={8}
                  trailStrokeWidth={16}
                  trailColor={COLORS.main}
                >
                  {() => (animationComp())}
              </CountdownCircleTimer>}
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <Text style={[styles.bodyText, additionalTextStyle]}>{bodyText}</Text>
            </View>
          {/* </View> */}
        </View>

        <View style={[globalStyles.buttonsRow]}>
          {lastExcercise === "All" ? (
            <GenericButton
              onPress={() => navigation.navigate("First")}
              template="home"
            />
          ) : (
            <GenericButton
              onPress={(e) => navigateNext(true)}
              template={buttonTemplate}
            />
          )}
          <MenuButton onPress={(e) => navigateNext(true, true)} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    marginTop: 120,
    width: "100%",
    alignItems: "center",
  },
  animationCircle: {
    width: circle,
    height: circle,
    backgroundColor: COLORS.main,
    alignItems: "center",
    borderRadius: 100000000000,
    justifyContent: "center",
  },
  mainAnimation: {
    tintColor: COLORS.support,
    resizeMode: "center",
    maxWidth: "65%",
    maxHeight: "70%",
  },
  bodyContainer: {
    width: "80%",
    marginTop: '10%',
  },
  bodyText: {
    fontSize: SIZES.lg,
    fontFamily: FONTS.main,
    textAlign: "center",
  },
});
