import { Image, StyleSheet, View } from "react-native";
import LogoImage from "../assets/images/logo.png";

export default function LogoOverlay({ logoSize = 80 }) {
  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.image(logoSize)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 25,
    right: 30,
  },
  image: (logoSize) => ({
    resizeMode: "cover",
    width: logoSize,
    height: logoSize,
  }),
});
