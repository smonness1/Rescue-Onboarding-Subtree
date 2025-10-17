import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {SIZES} from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PopUpMenuButton({value, handlePress}){
    return (
        <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
            <MaterialCommunityIcons
                style={[styles.buttonContent, {transform: [{ rotate: '180deg' }]}]}
                name="triangle"
            />
            <View style={{width: 8}}/>
            <Text style={styles.buttonText}>{value}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: "Heebo",
        fontSize: SIZES.md,
    },
    buttonContent: {
        fontSize: 10,
        color: "black",
        top: 2,
    },
});
