import ToggleButton from "./ToggleButton";
import {View, StyleSheet} from "react-native";
import React, {useCallback, useState} from "react";
import {usePreferencesContext} from "../hooks";
import { components as localization } from "../localization";

export default function GenderToggleButtons() {
    const {selectText} = usePreferencesContext();

    const ICONS = {
        MALE: require("../assets/images/male_sign.png"),
        FEMALE: require("../assets/images/female_sign.png"),
    }
    const [isMaleSelected, setMaleSelected] = useState(true);

    const selectMale = useCallback(() => {
        setMaleSelected(true);
    }, [isMaleSelected])

    const selectFemale = useCallback(() => {
        setMaleSelected(false);
    }, [isMaleSelected])

    return (
        <View style={styles.container}>

            <ToggleButton
                size={48}
                text={selectText(localization.genderToggleButton.male)}
                icon={ICONS.MALE}
                isSelected={isMaleSelected}
                handlePress={selectMale}
            />
            <View style={{width: 20}}/>
            <ToggleButton
                size={48}
                text={selectText(localization.genderToggleButton.female)}
                icon={ICONS.FEMALE}
                isSelected={!isMaleSelected}
                handlePress={selectFemale}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
