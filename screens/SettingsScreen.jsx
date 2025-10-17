import {ScrollView, StyleSheet, Text, View} from "react-native";
import {COLORS, LANGS} from "../constants";
import BackgroundOverlay from "../components/BackgroundOverlay";
import {globalStyles} from "../globalStyles";
import GenericButton from "../components/GenericButton";
import {useNavContext, usePreferencesContext} from "../hooks";
import ListTile from "../components/ListTile";
import Divider from "../components/Divider";
import React from "react";
import SwitchListTile from "../components/SwitchListTile";
import PopMenuListTile from "../components/PopMenuListTile";
import GenderToggleButtons from "../components/GenderToggleButtons";
import {settings, settings as localization} from "../localization";

export default function SettingsScreen(){
    const { selectText, language } = usePreferencesContext();
    const { bottomSheetRef } = useNavContext();
    function showLangDialog(){
        bottomSheetRef.current.open();
    }

    return (
        <View style={{flex: 1, backgroundColor: COLORS.base200}}>
            <BackgroundOverlay />
            <View style={styles.headerContainer}>
                <Text style={globalStyles.screenTitleText}>{selectText(localization.title)}</Text>
            </View>
            <ScrollView contentContainerStyle={{width: '80%', alignSelf: 'center', paddingBottom: 24}}>
                    <PopMenuListTile
                        title={selectText(settings.prompts.language)}
                        value={selectText(settings.buttons.language)}
                        handlePress={showLangDialog}
                    />
                    <Divider color={COLORS.dividerSettings} height={16}/>
                    <SwitchListTile
                        title={selectText(localization.prompts.doNotDisturb)}
                        onChangeLogic={() => {}}
                    />
                    <Divider color={COLORS.dividerSettings} height={16}/>
                    <SwitchListTile
                        title={selectText(localization.prompts.sound)}
                        onChangeLogic={() => {}}
                    />
                    <Divider color={COLORS.dividerSettings} height={16}/>
                    <PopMenuListTile
                        title={selectText(localization.prompts.yourGender)}
                        value={selectText(settings.buttons.genderSelectOptions.male)}
                    />
                    <Divider color={COLORS.dividerSettings} height={16}/>
                    <SwitchListTile
                        title={selectText(localization.prompts.timer)}
                        onChangeLogic={() => {}}
                    />
                    <Divider color={COLORS.dividerSettings} height={16}/>
                    <ListTile
                        title={selectText(localization.prompts.narratorVoice)}
                        trailing={<GenderToggleButtons/>}
                    />
                    <Divider color={COLORS.dividerSettings} height={16}/>
                    <ListTile
                        title={selectText(localization.prompts.emergencyContact)}
                        subtitle={selectText(localization.emergencyContactExplanation)}
                    />
                    <View style={{height: 24}}/>
                    <GenericButton
                        text={selectText(localization.buttons.enableAccessToContacts)}
                        onPress={() => {/** TODO: enable contacts access */}}
                    />
                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: '25%',
        marginBottom: '10%'
    },
    contentContainer: {

    },
    buttonsContainer: {
        justifyContent: 'space-evenly',
        width: "80%",
    },
    scrollContainer: {

    }
})
