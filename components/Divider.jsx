import {StyleSheet, View} from "react-native";
import {COLORS} from "../constants";

export default function Divider({color = COLORS.divider, height = 12}) {
    return (
        <View style={[styles.divider, {marginTop: height, marginBottom: height, backgroundColor: color}]}/>
    )
}

const styles = StyleSheet.create({
    divider: {
        marginHorizontal: 4,
        height: 2,
        marginTop: 12,
        marginBottom: 12,
        width: 'auto',
    }
})
