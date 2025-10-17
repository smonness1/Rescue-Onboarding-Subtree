import useAnalytics, {AnalyticsEvent, EventType} from "./api/services/trackerService";
import useSession from "./hooks/useSession";
import React from "react";
import SplashScreen from "./screens/SplashScreen";
import PrivacyScreen from "./screens/PrivacyScreen";
import BreathingIntroScreen from "./screens/BreathingIntroScreen";
import BreathingScreen from "./screens/BreathingScreen";
import BreathingLongScreen from "./screens/BreathingLongScreen";
import LocationSelectScreen from "./screens/LocationSelectScreen";
import GroundingSelectScreen from "./screens/GroundingSelectScreen";
import SmellScreen from "./screens/SmellScreen";
import StretchScreen from "./screens/StretchScreen";
// import KeepGoingScreen from "./screens/KeepGoingScreen"; //
import IceScreen from "./screens/IceScreen";
import DrinkScreen from "./screens/DrinkScreen";
import ShowerScreen from "./screens/ShowerScreen";
import MentalSelectScreen from "./screens/MentalSelectScreen";
import MuscleIntroScreen from "./screens/MuscleIntroScreen";
import MuscleRelaxationScreen from "./screens/MuscleRelaxationScreen";
import SingScreen from "./screens/SingScreen";
import CountScreen from "./screens/CountScreen";
import ColorScreen from "./screens/ColorScreen";
import WordsScreen from "./screens/WordsScreen";
import CheckupScreen from "./screens/CheckupScreen";
import FeelingBetterScreen from "./screens/FeelingBetterScreen";
import FeelingWorseScreen from "./screens/FeelingWorseScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import FinishScreen from "./screens/FinishScreen";
import ThanksScreen from "./screens/ThanksScreen";
import AllExcersicesScreen from "./screens/AllExcersicesScreen";
import SettingsScreen from "./screens/SettingsScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {auth} from "./firebase/config";
import FirstScreen from "./screens/FirstScreen";

const Stack = createNativeStackNavigator();

export function AppRouter() {
  const { trackEvent } = useAnalytics();

  const screenListener = ({ _, route }) => ({
    focus: (e) => {
      if(route.name === 'Splash' || route.name === "First") return;

      trackEvent({
        userId: auth.currentUser.uid,
        event: new AnalyticsEvent(EventType.SCREEN, route.name)
      })
    },
  })

  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
        screenListeners={screenListener}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="First" component={FirstScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen
          name="BreathingIntro"
          component={BreathingIntroScreen}
        />
        <Stack.Screen name="Breathing" component={BreathingScreen} />
        <Stack.Screen
          name="BreathingLong"
          component={BreathingLongScreen}
        />
        <Stack.Screen name="Select" component={LocationSelectScreen} />
        <Stack.Screen
          name="GroundingSelect"
          component={GroundingSelectScreen}
        />
        <Stack.Screen name="Smell" component={SmellScreen} />
        <Stack.Screen name="Stretch" component={StretchScreen} />
        <Stack.Screen name="Ice" component={IceScreen} />
        <Stack.Screen name="Drink" component={DrinkScreen} />
        <Stack.Screen name="Shower" component={ShowerScreen} />
        <Stack.Screen
          name="MentalSelect"
          component={MentalSelectScreen}
        />
        <Stack.Screen name="MuscleIntro" component={MuscleIntroScreen} />
        <Stack.Screen name="Muscle" component={MuscleRelaxationScreen} />
        <Stack.Screen name="Sing" component={SingScreen} />
        <Stack.Screen name="Count" component={CountScreen} />
        <Stack.Screen name="Color" component={ColorScreen} />
        <Stack.Screen name="Words" component={WordsScreen} />
        <Stack.Screen name="Checkup" component={CheckupScreen} />
        <Stack.Screen
          name="FeelingBetter"
          component={FeelingBetterScreen}
        />
        <Stack.Screen
          name="FeelingWorse"
          component={FeelingWorseScreen}
        />
        {/* <Stack.Screen name="KeepGoing" component={KeepGoingScreen} /> */}
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="Finish" component={FinishScreen} />
        <Stack.Screen name="Thanks" component={ThanksScreen} />
        <Stack.Screen name="All" component={AllExcersicesScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
  );
}
