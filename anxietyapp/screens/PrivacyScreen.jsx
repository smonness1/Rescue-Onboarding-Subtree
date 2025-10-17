import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { globalStyles } from "../globalStyles";
import { COLORS } from "../constants";
import BackgroundOverlay from "../components/BackgroundOverlay";
import LogoOverlay from "../components/LogoOverlay";
import GenericButton from "../components/GenericButton"
import { useContext } from "react";
import { PrefrencesContext } from "../context/prefrencesContext";
import SplashImage from "../assets/images/hands.png"
import { TrackerContext } from "../context/TrackerContext";

export default function PrivacyScreen({ navigation }) {

    const { selectText, setUserApprovesTracking } = useContext(PrefrencesContext);

    function answerRequest(answer) {
        setUserApprovesTracking(answer);
        navigation.navigate('BreathingIntro');
    }

    const promptTextOptions = {
        he: 'אנחנו שולחים נתונים אנונימיים לחלוטין על השימוש באפליקציה לצורך שיפור חווית השימוש.\n\n האם אתם מאשרים את שליחת הנתונים?',
        en: "The app sends completely anonymous analytics to help us improve user experience, this information will not be shaed with anyone except our development team\n Is this ok with you?"
    }


    return (

        <View style={{flex: 1, backgroundColor: COLORS.base200}}>
                <BackgroundOverlay />
                <LogoOverlay />
            <ScrollView contentContainerStyle={[globalStyles.mainContainer, {backgroundColor: 'transparent', height: 'auto'}]}>
                <View style={styles.headerContainer}>
                    <Text style={[globalStyles.selectionHeaderText, {}]}>{selectText(promptTextOptions)}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <GenericButton onPress={e => answerRequest(true)} text={selectText({ he: 'כן', en: 'Yes' })} />
                    <GenericButton onPress={e => answerRequest(false)} text={selectText({ he: 'לא', en: 'No' })} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: '40%',
        marginBottom: '20%'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
    },
    scrollContainer: {
        
    }
})