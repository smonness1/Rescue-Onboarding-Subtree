import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { globalStyles } from "../globalStyles";
import MenuButton from "../components/MenuButton";
import axios from "axios";
import GenericButton from "../components/GenericButton";
import BackgroundOverlay from "../components/BackgroundOverlay";
import LogoOverlay from "../components/LogoOverlay";
import {
  useNavContext,
  usePreferencesContext,
  useTrackerContext,
} from "../hooks";
import { logger } from "../utils/logger";
import { feedback as localization } from "../localization";

const log = logger.extend("FeedbackScreen");
const BOT_API_TOKEN = "6671559531:AAHInIJ1SSSu6K1x2dj1N24u-JBim_Drrxs"; //TODO should be secret?
async function sendMessageToTelegram(message) {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`,
      { chat_id: "-4094924994", text: message }
    );
    log.debug("Message sent: ", response.data);
  } catch (error) {
    log.error("Error sending message: ", error);
  }
}
export default function FeedbackScreen({ navigation }) {
  const { selectText } = usePreferencesContext();
  const { setLastExcercise } = useNavContext();
  const [input, setInput] = useState("");

  const headerText = selectText(localization.header);
  const bodyText = selectText(localization.body);

  async function handleSend() {
    const FEEDBACK_URL =
      "https://docs.google.com/forms/d/e/1FAIpQLSeM8hkiubwyLCyLxACaTsN-uoHzYI53tIdzIS2DR8CzLMnqAg/viewform";

    sendMessageToTelegram(input);
    setInput("");
    navigation.navigate("Thanks");
  }

  return (
    <View style={globalStyles.mainContainer}>
      <BackgroundOverlay />
      <LogoOverlay logoSize />

      <View style={styles.headerContainer}>
        <Text style={[globalStyles.headerText, { fontWeight: "700" }]}>
          {headerText}
        </Text>

        <Text style={[styles.bodyText]}>{bodyText}</Text>
      </View>

      <View style={styles.feedbackContainer}>
        <TextInput
          style={styles.feedbackInput}
          placeholder={selectText(localization.buttons.textInput)}
          multiline
          numberOfLines={4}
          value={input}
          onChangeText={(text) => setInput(text)}
        />

        <GenericButton
          onPress={handleSend}
          text={selectText(localization.buttons.send)}
          additionalButtonStyles={styles.feedbackButton}
        />
        <StatusBar style="auto" />
      </View>

      <View style={[globalStyles.bottomContainer, globalStyles.buttonsRow]}>
        <GenericButton
          template={"home"}
          onPress={() => navigation.navigate("First")}
        />
        <MenuButton onPress={() => navigation.navigate("All")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: "50%",
  },
  feedbackContainer: {
    height: "50%",
    width: "80%",
  },
  feedbackInput: {
    padding: 15,
    marginBottom: 20,
    marginTop: 20,
    // backgroundColor: hexToRgbA(COLORS.secondary, 0.3),
    backgroundColor: "#C8E4FF",
    borderRadius: 25,
    minHeight: "25%",
    textAlignVertical: "top",
    fontFamily: FONTS.main,
    fontSize: SIZES.sm,
  },
  feedbackButton: {
    maxWidth: "60%",
    alignSelf: "center",
    borderColor: COLORS.main,
  },
  bodyText: {
    color: COLORS.content,
    fontSize: SIZES.lg,
    fontFamily: FONTS.main,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
});
