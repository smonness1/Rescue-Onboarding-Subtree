import {Text, StyleSheet, Pressable} from "react-native";
import {SIZES} from "../constants";
import {useCallback, useEffect, useRef, useState} from "react";
import PopUpMenuButton from "./PopUpMenuButton";
import {usePreferencesContext} from "../hooks";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function PopMenuListTile({title, handlePress, value}) {
    const { isRTL } = usePreferencesContext();

    return (
        <Pressable style={styles.container(isRTL)} onPress={handlePress}>
            <Text style={styles.title}>{title}</Text>
            <PopUpMenuButton value={value} handlePress={handlePress}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: (isRTL) => ({
        flexDirection: isRTL ? 'row-reverse': 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        padding: 4,
    }),
    title: {
        fontSize: SIZES.md,
        fontFamily: 'Heebo_500Medium',
    },
})
