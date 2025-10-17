import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { Platform } from "react-native";

export default function AnimationButton({
  imgSource,
  accessibilityLabel,
  handlePress,
  circleColor = COLORS.main,
  animationColor = null,
  size = "lg",
  title,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.circle(circleColor)}>
        <Image
          style={Platform.select({
            ios: { width: 100, height: 100 },
            android: styles.image(animationColor),
            web: { width: 100, height: 100 },
          })}
          source={imgSource}
          accessibility={true}
          accessibilityLabel={accessibilityLabel}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
    padding: 2,
  },
  circle: (circleColor) => ({
    backgroundColor: circleColor,
    width: 150,
    height: 150,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  }),
  image: (animationColor) => ({
    width: 100,
    height: 100,
    tintColor: animationColor,
    resizeMode: "center",
  }),
  title: {
    color: COLORS.content,
    fontFamily: FONTS.main,
    fontSize: SIZES.sm,
    marginTop: 4,
    width: 'auto',
    maxWidth: 200,
    textAlign: 'center'
  },
});
