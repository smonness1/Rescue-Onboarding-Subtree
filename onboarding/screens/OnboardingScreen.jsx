import React from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function Step1({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome to the App!</Text>
      <Button title="Next" onPress={() => navigation.navigate("Step2")} />
    </View>
  );
}

function Step2({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Step 2</Text>
      <Button title="Next" onPress={() => navigation.navigate("Done")} />
    </View>
  );
}

function DoneScreen({ navigation, finish }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Done with Onboarding!</Text>
      <Button title="Go to App" onPress={() => navigation.replace("MainApp")} />
    </View>
  );
}

export default function OnboardingScreen() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* TODO: can here the steps like: <Stack.Screen name="Step1" component={Step1}*/}
      <Stack.Screen name="Step1" component={Step1} />
      <Stack.Screen name="Step2" component={Step2} />
      <Stack.Screen name="Done" component={DoneScreen} />
    </Stack.Navigator>
  );
}
