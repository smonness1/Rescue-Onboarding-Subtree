import {lazy, useRef} from "react";
import { Image, StyleSheet, View } from "react-native";
import { useRoute } from '@react-navigation/native';


import { COLORS } from "../constants";

import backgroundImage from "../assets/images/blobs_cropped.png";
import SideMenuButton from "./SideMenuButton";
import SideMenuView from "./SideMenuView";
import {usePreferencesContext} from "../hooks";

export default function BackgroundOverlay({ children }) {
  const sideNavRef = useRef();
  const route = useRoute()
  const { isRTL } = usePreferencesContext();
  const nonButtonScreens = ['Splash','First','Privacy','Muscle'];   // TODO: enum screens' names
  const hideSideMenuButton = nonButtonScreens.includes(route.name)

  return (
    <View style={styles.mainContainer}>
      <Image style={styles.image} source={backgroundImage} />
      <View style={styles.menu(isRTL)}>
        {!hideSideMenuButton && <SideMenuButton sideNavRef={sideNavRef}/>}
      </View>
      <SideMenuView ref={sideNavRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  },
  image: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%",
    tintColor: COLORS.base100,
  },
  menu: (isRTL) => ({
    position: "absolute",
    top: 64,
    left: !isRTL ? 32 : null,
    right: isRTL ? 32 : null,
    zIndex: 10,   // make sure this the most top
  }),
});
