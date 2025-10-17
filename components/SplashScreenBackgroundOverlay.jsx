import {useRef} from "react";
import {Image, StyleSheet, View} from "react-native";

import backgroundImage from "../assets/images/bg_splash.png";
import ResuceLogo from "../assets/images/rescue_icon.png";
import SideMenuView from "./SideMenuView";

export default function SplashScreenBackgroundOverlay({children}) {
  const sideNavRef = useRef();

  return (
    <View style={styles.mainContainer}>
      <Image style={styles.image} source={backgroundImage}/>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={ResuceLogo}/>
      </View>
      <SideMenuView ref={sideNavRef}/>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "stretch",
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: "contain",
    width: 234,
    height: 234,
  },
});
