import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
} from "react-native";
import { globalStyles } from "../globalStyles";
import GenericButton from "../components/GenericButton";
import { useEffect } from "react";
import { COLORS, FONTS, SIZES } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import BackgroundOverlay from "../components/BackgroundOverlay";
import LogoOverlay from "../components/LogoOverlay";
import { usePreferencesContext, useTrackerContext } from "../hooks";
import { logger } from "../utils/logger";
import Container from "../components/Container";
import { finish as localization } from "../localization";
import {auth} from "../firebase/config";
import useAnalytics, {AnalyticsEvent, EventType} from "../api/services/trackerService";

const log = logger.extend("FinishScreen");

export default function FinishScreen({ navigation }) {
  const { selectText } = usePreferencesContext();
  const { trackAction, setUsageEndTime, usageEndTime } = useTrackerContext();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackAction("Finish Screen");
    if (usageEndTime === null) {
      log.info('**TRYING TO SEND TO TELEGRAM**')
      log.info('Branch: ' + process.env["EXPO_PUBLIC_BRANCH"])
      setUsageEndTime(new Date());
    }
  }, []);

  async function sendFeedback() {
    const feedbackUrl = process.env.EXPO_PUBLIC_FEEDBACK_FORM_URL;
    trackEvent({
      userId: auth.currentUser.uid,
      event: new AnalyticsEvent(EventType.CLICK, 'SEND_FEEDBACK')
    })
    log.debug('FEEDBACK!')
    const canOpenUrl = Linking.canOpenURL(feedbackUrl);
    if (canOpenUrl) {
      await Linking.openURL(feedbackUrl);
      navigation.navigate("Thanks");
    } else {
      log.error(
        `Couldn't open feedback url: ${feedbackUrl}`,
      );
      navigation.navigate("First");
    }
  }

  function gotoMenu() {
    setUsageEndTime(null);
    trackAction("Continue to all exercises");
    navigation.navigate("All");
  }

  function goToFirstScreen(){
    setUsageEndTime(null);
    navigation.navigate("First");
  }

  return (
    <Container>
      <View style={[globalStyles.mainContainer]}>
        <BackgroundOverlay />

        <View style={[globalStyles.contentContainer, { paddingTop: '15%' }]}>

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{selectText(localization.header)}</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={globalStyles.buttonText}>
              {selectText(localization.body)}
            </Text>
          </View>
          <View style={[styles.iconsContainer, Platform.OS === "android" && styles.androidIconsContainer]}>
            {Platform.OS == "android" ? <TouchableOpacity
              onPress={() => Linking.openURL("content://contacts/people/")}
            >
              <View style={styles.iconButton}>
                <AntDesign name="contacts" style={styles.icon} />
                <Text style={globalStyles.buttonText}>
                  {selectText(localization.buttons.contacts)}
                </Text>
              </View>
            </TouchableOpacity> : null}
            <TouchableOpacity onPress={() => Linking.openURL("tel:1201")}>
              <View style={styles.iconButton}>
                <AntDesign name="phone" style={styles.icon} />
                <Text style={globalStyles.buttonText}>
                  {selectText(localization.buttons.eran)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.feedbackContainer}>
            <Text style={globalStyles.buttonText}>
              {selectText(localization.feedback)}
            </Text>

            <GenericButton
              onPress={sendFeedback}
              additionalButtonStyles={styles.feedbackButton}
              additionalTextStyles={styles.feedbackButtonText}
              text={selectText(localization.buttons.sendFeedback)}
            />
          </View>
        </View>

        <View style={[globalStyles.bottomContainer, globalStyles.buttonsRow]}>
          <GenericButton
            template={"home"}
            onPress={goToFirstScreen}
          />
          <TouchableOpacity onPress={gotoMenu}>
            <Text style={styles.menuButtonText}>
              {selectText(localization.buttons.allExcercises)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: "20%",
  },
  headerText: {
    fontFamily: FONTS.mainBold,
    fontSize: SIZES.xl2,
    textAlign: "center",
  },
  bodyContainer: {
    marginTop: 10,
    maxWidth: "90%",
  },
  feedbackContainer: {
    height: "20%",
  },
  feedbackButton: {
    marginTop: 10,
    backgroundColor: COLORS.accent,
    borderWidth: 0,
  },
  feedbackButtonText: {
    color: COLORS.base100,
  },
  menuButtonText: {
    fontFamily: FONTS.main,
    fontSize: SIZES.md,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    textDecorationColor: COLORS.accent,
  },
  iconsContainer: {
    marginVertical: 30,
  },
  androidIconsContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
  },
  iconButton: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  icon: {
    fontSize: SIZES.lg,
    color: COLORS.accent,
  },
});
