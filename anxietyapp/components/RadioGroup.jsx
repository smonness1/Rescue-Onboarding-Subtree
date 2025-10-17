import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from "../constants";
import {usePreferencesContext} from "../hooks";

export default function RadioGroup({options, onSelectedOption, initialValue}){
    const { isRTL } = usePreferencesContext();
    const [checked, setChecked] = useState(initialValue);

    const handleSelected = useCallback((key) => {
        setChecked(key)
        onSelectedOption(key);
    }, [checked]);

    return (
        <View>
            <View style={styles.btnGroup(isRTL)}>
                {Object.entries(options).map((option) => {
                    const [key, optionName] = option
                    return (
                        <View key={key}>
                                <TouchableOpacity style={styles.button(isRTL)} onPress={() => handleSelected(key)}>
                                    <View style={checked === key ? styles.radioChecked : styles.radio}></View>
                                    <Text style={styles.option}>{optionName}</Text>
                                </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    btnGroup: (isRTL) => ({
        flex: 1,
        flexDirection: 'column',
        justifyContent: isRTL ? 'flex-start' : 'flex-end',
        alignItems: isRTL ? 'flex-end' : 'flex-start',
    }),
    button: (isRTL) =>({
        padding: 8,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center'
    }),
    radio: {
        height: 20,
        width: 20,
        backgroundColor: "#fff",
        marginHorizontal: 6,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: COLORS.support
    },
    radioChecked: {
        height: 20,
        width: 20,
        backgroundColor: "#fff",
        marginHorizontal: 6,
        borderRadius: 100,
        borderWidth: 6,
        borderColor: COLORS.support
    },
    option: {
        fontSize: SIZES.md
    },
});
