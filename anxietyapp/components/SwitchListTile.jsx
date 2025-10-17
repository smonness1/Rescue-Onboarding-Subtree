import {Text, StyleSheet, Pressable, I18nManager} from "react-native";
import {COLORS, SIZES} from "../constants";
import ToggleSwitch from "./ToggleSwitch";
import React, {useCallback, useEffect, useState} from "react";
import {usePreferencesContext} from "../hooks";

export default function SwitchListTile({title, onChangeLogic, defaultValue}) {
    const { isRTL } = usePreferencesContext();

    const [isOn, setIsOn] = useState(false)

    useEffect(() => {
        setIsOn(defaultValue);
    }, [])

    const onChange = useCallback(() => {
        setIsOn(!isOn);
        if (onChangeLogic) {
            onChangeLogic(isOn);
        }
    }, [isOn]);

    return (
        <Pressable style={styles.container(isRTL)} onPress={() => setIsOn(!isOn)}>
            <Text style={styles.title}>{title}</Text>
            <ToggleSwitch isOn={isOn}
                          isRTL={isRTL}
                          onBgColor={COLORS.support}
                          offBgColor="transparent"
                          borderRadius={24}
                          animationSpeed={180}
                          circleColor={'white'}
                          circleColorOff={COLORS.support}

                          onChange={onChange}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: (isRTL) => ({
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        padding: 4,
    }),
    title: {
        fontSize: SIZES.md,
        fontFamily: 'Heebo_500Medium',
    }
})
