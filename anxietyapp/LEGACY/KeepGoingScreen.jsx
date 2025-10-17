import React from "react";
import drinkAnimation from "../assets/animations/water.gif";
import ExerciseScreenBase from "../components/ExerciseScreenBase";

// TODO: Change icon to question mark
export default function KeepGoingScreen({ navigation }) {
  // const navigateNext = () => navigation.navigate('MentalSelect');

  return (
    <ExerciseScreenBase
      //   navigateNext={ navigateNext }
      animation={drinkAnimation}
      text={headerTextOptions}
      accessibilityLabel="A Question Mark"
      hideSkip={true}
    />
  );
}
const headerTextOptions = {
  en: "Would you like to keep going? I'm here for you.",
  he: {
    male: "תרצה להמשיך? אני פה בשבילך.",
    female: "תרצי להמשיך? אני פה בשבילך.",
  },
  ar: "تذكرني أنا هنا. أنت لست وحدك",
};
