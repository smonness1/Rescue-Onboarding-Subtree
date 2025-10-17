import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableHighlight,
} from "react-native";
import SplashImage from "../assets/images/hands.png";
import {globalStyles} from "../globalStyles";
import {COLORS, FONTS, SIZES} from "../constants";
import BackgroundOverlay from "../components/BackgroundOverlay";
import LogoOverlay from "../components/LogoOverlay";
import {usePreferencesContext} from "../hooks/usePreferencesContext";
import {useTrackerContext} from "../hooks/useTrackerContext";
import {logger} from "../utils/logger";
import {home as localization} from "../localization";
import {auth} from "../firebase/config";
import "react-native-get-random-values";
import useSession from "../hooks/useSession";
import useAnalytics, {AnalyticsEvent, EventType} from "../api/services/trackerService";


const languages = [
  {title: "עברית", value: "he"},
  {title: "English", value: "en"},
  {title: "ערבית", value: "ar"},
];

const log = logger.extend("SplashScreen");

function LanguageListItem({
  lang,
  setSelectedLanguage,
  setLanguage,
  initLaunch,
  setInitLaunch,
  setModalOpen,
  modalOpen,
}) {
  // mini-component to be rendered as list item for languages list
  return (
    <TouchableHighlight
      style={styles.listItem}
      onPress={() => {
        log.debug(lang);
        setSelectedLanguage(lang.title);
        setLanguage(lang.value);
        setInitLaunch(false);
        setModalOpen(!modalOpen);
      }}
    >
      <Text style={styles.listItemText}>{lang.title}</Text>
    </TouchableHighlight>
  );
}


export default function SplashScreen({navigation}) {
  const {
    selectedLanguage,
    setLanguage,
    setInitLaunch,
    initLaunch,
    selectText,
    language,
    loadFromStorage,
  } = usePreferencesContext();
  const {setUserActions, setUsageStartTime, setUsageEndTime} =
    useTrackerContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [_, setSelectedLanguage] = useState(languages[0].title); // Used to visualize the selected language in the picker *TEMP*
  const {initSession} = useSession();
  const {trackEvent, trackDevice} = useAnalytics();


  useEffect(() => {
    // On first load of the app, update the prefrences from local storage
    loadFromStorage();
  }, []);

  function handleChangeLanguage() { // *TEMP*: Switch language from hebrew to english
    if (language === 'en') setLanguage('he');
    else setLanguage('en')
  }


  // Next Page function
  const onPressStart = async () => {
    await initSession();
    await trackDevice(auth.currentUser.uid);
    await trackEvent({
      userId: auth.currentUser.uid,
      event: new AnalyticsEvent(EventType.SESSION, "START")
    });

    setUsageStartTime(new Date());
    setUsageEndTime(null);
    setUserActions(["Home"]);
    navigation.navigate("BreathingIntro");
  };

  return (
    <View style={globalStyles.mainContainer}>
      <BackgroundOverlay/>
      <LogoOverlay/>
      <Modal
        animationType="fade"
        visible={modalOpen}
        onRequestClose={() => setModalOpen(!modalOpen)}
      >
        <View style={styles.listContainer}>
          <FlatList
            data={languages}
            renderItem={({item}) => (
              <LanguageListItem
                {...{
                  lang: item,
                  setSelectedLanguage,
                  setLanguage,
                  setInitLaunch,
                  setModalOpen,
                  modalOpen,
                }}
              />
            )}
          />
        </View>
      </Modal>

      <View style={styles.splashContainer}>
        <Image
          style={styles.splashImage}
          accessibility={true}
          accessibilityLabel="A wondering person"
          source={SplashImage}
          resizeMode="contain"
        />
        <View style={styles.header}>
          <Text style={globalStyles.headerText}>
            {selectText(localization.header)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onPressStart}
          style={[globalStyles.bottomContainer, styles.startButton]}
        >
          <Text style={styles.startButtonText}>
            {selectText(localization.buttons.start)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* TODO: return when English will be supported fully */}
      {/*<View style={styles.privacyContainer}>*/}
      {/*  <TouchableOpacity onPress={handleChangeLanguage}>*/}
      {/*    <Text style={styles.textButton}>*/}
      {/*      {selectText(localization.buttons.languages)}*/}
      {/*    </Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    marginTop: '50%',
    width: "100%",
    height: '50%',
    alignItems: 'center',
    marginBottom: '35%'
  },
  splashImage: {
    width: "90%",
    flex: 1
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  startButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: SIZES.buttonBorderRadius,
  },
  startButtonText: {
    color: COLORS.base100,
    fontFamily: FONTS.main,
    fontSize: SIZES.md,
  },
  textButton: {
    fontFamily: FONTS.main,
    fontSize: SIZES.md,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    textDecorationColor: COLORS.accent,
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'flex-end',
  },


  langButton: {
    borderWidth: 1,
    borderRadius: 80,
    borderColor: COLORS.main,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 20,
  },
  langButtonText: {
    fontFamily: FONTS.main,
    fontSize: SIZES.md,
  },
  listItem: {
    backgroundColor: COLORS.main,
    marginVertical: 10,
    paddingVertical: 5,
  },
  listItemText: {
    color: COLORS.content,
    fontSize: SIZES.md,
  },
  listContainer: {
    gap: 30,
    marginTop: 40,
  },
});
