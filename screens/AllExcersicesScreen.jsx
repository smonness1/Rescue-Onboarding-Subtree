import { ScrollView, StyleSheet, View } from "react-native";
import AnimationButton from "../components/AnimationButton";
import { COLORS } from "../constants";

import Ice from "../assets/animations/cold.gif";
import Sing from "../assets/animations/sing.gif";
import Stretch from "../assets/animations/stretch.gif";
import Muscle from "../assets/animations/muscle.gif";
import Smell from "../assets/animations/smell.gif";
import Count from "../assets/animations/count.gif";
import Think from "../assets/animations/thought.gif";
import Look from "../assets/animations/looking.gif";
import { useNavContext, usePreferencesContext } from "../hooks";
import BackgroundOverlay from "../components/BackgroundOverlay";

export default function AllExcersicesScreen({ navigation }) {
  const { selectText } = usePreferencesContext();
  const { setLastExcercise } = useNavContext();

  function handlePress(nextExcercise) {
    setLastExcercise("All");
    navigation.navigate(nextExcercise);
  }

  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <BackgroundOverlay/>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          {/*<BackgroundOverlay />*/}
          <AnimationButton
            color={COLORS.secondary}
            handlePress={() => handlePress("Ice")}
            circleColor={COLORS.secondary}
            animationColor={COLORS.base100}
            imgSource={Ice}
            title={selectText(componentDictionary.iceBtn)}
          />
          <AnimationButton
            color={COLORS.secondary}
            handlePress={() => handlePress("Sing")}
            title={selectText(componentDictionary.singBtn)}
            circleColor={COLORS.secondary}
            animationColor={COLORS.base100}
            imgSource={Sing}
          />
          <AnimationButton
            color={COLORS.secondary}
            handlePress={() => handlePress("Stretch")}
            title={selectText(componentDictionary.stretchBtn)}
            circleColor={COLORS.secondary}
            animationColor={COLORS.base100}
            imgSource={Stretch}
          />
          <AnimationButton
            color={COLORS.secondary}
            handlePress={() => handlePress("MuscleIntro")}
            title={selectText(componentDictionary.muscleBtn)}
            circleColor={COLORS.secondary}
            animationColor={COLORS.base100}
            imgSource={Muscle}
          />
          <AnimationButton
            color={COLORS.secondary}
            handlePress={() => handlePress("Count")}
            title={selectText(componentDictionary.countBtn)}
            circleColor={COLORS.secondary}
            animationColor={COLORS.base100}
            imgSource={Count}
          />
          <AnimationButton
            color={COLORS.secondary}
            handlePress={() => handlePress("Smell")}
            title={selectText(componentDictionary.smellBtn)}
            circleColor={COLORS.secondary}
            animationColor={COLORS.base100}
            imgSource={Smell}
          />
          <AnimationButton
            color={COLORS.secondary}
            handlePress={() => handlePress("Color")}
            title={selectText(componentDictionary.colorBtn)}
            circleColor={COLORS.secondary}
            animationColor={COLORS.base100}
            imgSource={Look}
          />
          <AnimationButton
            color={COLORS.secondary}
            handlePress={() => handlePress("Words")}
            title={selectText(componentDictionary.wordsBtn)}
            circleColor={COLORS.secondary}
            animationColor={COLORS.base100}
            imgSource={Think}
          />
        </View>
      </ScrollView>
    </View>

  );
}
const componentDictionary = {
  iceBtn: { en: "Ice", he: "קר" },
  singBtn: { en: "Hum", he: "זמזום" },
  stretchBtn: { en: "Stretch", he: "מתיחות" },
  muscleBtn: { en: "Muscle Relaxation", he: "הרפיית שרירים" },
  countBtn: { en: "Count", he: "ספירה" },
  smellBtn: { en: "Smell", he: "ריח" },
  colorBtn: { en: "Colors", he: "צבעים" },
  wordsBtn: { en: "Words", he: "מילים" },
};

const styles = StyleSheet.create({
  mainContainer: {
    maxWidth: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 20,
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 100,
  },
  scrollContainer: {
    backgroundColor: COLORS.base200,
  },
});
