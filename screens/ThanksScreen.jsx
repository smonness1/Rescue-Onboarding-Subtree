import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { globalStyles } from "../globalStyles";
import GenericButton from "../components/GenericButton";
import { COLORS, FONTS, SIZES } from "../constants";
import BackgroundOverlay from "../components/BackgroundOverlay";
import SplashImage from "../assets/images/hands.png";
import LogoOverlay from "../components/LogoOverlay";
import { usePreferencesContext } from "../hooks";
import { thanks as localization } from "../localization";

export default function ThanksScreen({ navigation }) {
  const { selectText } = usePreferencesContext();

  return (
    <View style={globalStyles.mainContainer}>
      <BackgroundOverlay />
      <LogoOverlay />

      <View style={[globalStyles.contentContainer, {paddingTop: '10%'}]}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{selectText(localization.header)}</Text>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={globalStyles.buttonText}>
          {selectText(localization.body)}
        </Text>
      </View>

      <View style={styles.splashContainer}>
        <Image
          style={styles.splashImage}
          accessibility={true}
          accessibilityLabel="A wondering person"
          source={SplashImage}
          resizeMode="contain"
        />
      </View>

      </View>

      <View style={[globalStyles.buttonsRow]}>
        <GenericButton
          template={"home"}
          onPress={() => navigation.navigate("First")}
        />
        <TouchableOpacity onPress={() => navigation.navigate("All")}>
          <Text style={styles.menuButtonText}>
            {selectText({ he: "לכל התרגילים", en: "All excercises" })}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: "27%",
  },
  headerText: {
    fontFamily: FONTS.main,
    fontSize: SIZES.xl2,
    textAlign: "center",
    fontWeight: "700",
  },
  bodyContainer: {
    marginTop: 30,
    maxWidth: "90%",
  },
  splashContainer: {
    width: "100%",
    marginTop: 50,
    height: "35%",
  },
  splashImage: {
    alignSelf: "center",
    maxWidth: "100%",
  },
  menuButtonText: {
    fontFamily: FONTS.main,
    fontSize: SIZES.md,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    textDecorationColor: COLORS.accent,
  },
});
