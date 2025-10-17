import {StyleSheet, View, Text, Image, Pressable} from "react-native";
import {COLORS, SIZES} from "../constants";


export default function ToggleButton({size, isSelected, icon, handlePress, text = ''}) {
    const backgroundColor  = isSelected ? COLORS.support : 'white';
    const iconColor = !isSelected ? COLORS.support : 'white';
    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: 2,
                    borderColor: COLORS.support,
                    marginBottom: 4,
                    backgroundColor,
                }}
            >
                <View style={{padding: 10}}>
                    <Image style={styles.icon} source={icon} tintColor={iconColor}/>
                </View>

            </View>
            <Text style={styles.text(isSelected)}>{text}</Text>

        </Pressable>

    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 60,
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    text: (isSelected) => ({
        fontFamily: isSelected ? "Heebo_700Bold": "Heebo_300Light",
        fontSize: SIZES.sm,
        alignSelf: 'center',
    })
})
