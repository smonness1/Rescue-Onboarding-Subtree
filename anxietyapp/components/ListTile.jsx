import {Pressable, View, Text, StyleSheet} from "react-native";
import {SIZES} from "../constants";
import {usePreferencesContext} from "../hooks";

export default function ListTile({title, subtitle, trailing}){
    const { isRTL } = usePreferencesContext();

    return (
        <Pressable style={styles.container(isRTL)}>
            <View>
                <Text style={styles.title}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
            {(trailing ?? <View/>)}
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
    subtitle: {
        marginTop: 12,
        fontSize: SIZES.md,
        fontFamily: 'Heebo_300Light',
    }
})
