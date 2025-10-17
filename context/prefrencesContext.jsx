import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logger } from "../utils/logger";
import {I18nManager} from "react-native";

const log = logger.extend("PreferencesContext")
export const PrefrencesContext = createContext();

export function PrefrencesContextProvider({ children }) {
  const [language, setLanguageRaw] = useState("he"); // TEMP: Changed to en for checking english localization
  const [userApprovesTracking, setUserApprovesTrackingRaw] = useState(true);

  const [isFemale, setIsFemaleRaw] = useState(false); // *NOT IN USE*
  const [initLaunch, setInitLaunchRaw] = useState(null); // Used to check if this is the first time using the app (*NOT IN USE*)

  // Set State wih async storage updates functions
  async function setLanguage(value) {
    setLanguageRaw(value);
    const valString = value.toString()
    try {
      await AsyncStorage.setItem('language', valString);
      log.info('set language to ', valString);
    }
    catch {
      log.error(`Error in updating language to ${value}: ${e}`)
    }
  }

  async function setUserApprovesTracking(value) {
    setUserApprovesTrackingRaw(value);
    const valString = value.toString()
    console.log(valString);
    try {
      await AsyncStorage.setItem('userApprovesTracking', valString);
      log.info('set tracking to ', valString);
    }
    catch {
      log.error(`Error in updating userApprovesTracking to ${value}: ${e}`)
    }
  }


  async function setIsFemale(value) { // *NOT IN USE*
    setIsFemaleRaw(value);
    try {
      await AsyncStorage.setItem("isFemale", value.toString());
      log.debug(`Updaed isFemale to ${value.toString()}`);
    } catch (e) {
      log.error(`Error in updating isFemale to ${value.toString()}: ${e}`);
    }
  }

  async function setInitLaunch(value) { //*NOT IN USE*
    setInitLaunchRaw(value);
    try {
      await AsyncStorage.setItem("initLaunch", value.toString());
      log.debug(`Updaed initLaunch to ${value.toString()}`);
    } catch (e) {
      log.error(`Error in updating initLaunch to ${value.toString()}: ${e}`);
    }
  }

  // Utility functiosn
  function selectText(options) {
    return options[language]["female"]
      ? isFemale
        ? options[language]["female"]
        : options[language]["male"]
      : options[language];
  }

  async function loadFromStorage() {
    // Load and update context data from storage be used once when first loading the app.

    // Language
    try {
      const lang = await AsyncStorage.getItem('language');
      if (lang !== null) setLanguageRaw(lang);
      log.info(`loaded and updated language to ${lang}`);
    }
    catch (e) {
      log.error(`Error in loading and updating language to ${lang}: ${e}`);
    }

    // userApprovesTracking
    try {
      const tracking = await AsyncStorage.getItem('userApprovesTracking');
      if (tracking !== null) setUserApprovesTrackingRaw(tracking === 'true');
      log.info(`loaded and updated userApprovesTracking to ${tracking}`);
    }
    catch (e) {
      log.error(`Error in loading and updating userApprovesTracking to ${tracking}: ${e}`);
    }
  }

  const isRTL = ["he"].includes(language);

  return (
    <PrefrencesContext.Provider
      value={{
        initLaunch: initLaunch,
        setInitLaunch: setInitLaunch,
        language: language,
        setLanguage: setLanguage,
        isFemale: isFemale,
        setIsFemale: setIsFemale,
        selectText: selectText,
        loadFromStorage: loadFromStorage,
        userApprovesTracking: userApprovesTracking,
        isRTL: I18nManager.isRTL ? !isRTL : isRTL,
      }}
    >
      {children}
    </PrefrencesContext.Provider>
  );
}
