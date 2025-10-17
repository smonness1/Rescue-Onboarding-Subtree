import {Text, TouchableOpacity, StyleSheet} from "react-native";
import {FONTS} from "../constants";

export default function SideMenuItem({title, handlePress, enabled = true}) {
    return (
        <TouchableOpacity disabled={!enabled} onPress={handlePress}>
            <Text style={styles.navItem(enabled)}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    navItem: (enabled) => ({
        // alignSelf: 'flex-end',
        opacity: enabled ? 1 : 0.4,
        fontSize: 18,
        fontFamily: FONTS.main,
        paddingVertical: 10,
    }),
})
