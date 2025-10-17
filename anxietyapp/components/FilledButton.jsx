import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../constants";

const FilledButton = ({ title, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FilledButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: COLORS.secondary,
    color: COLORS.content,
    height: SIZES.buttonHeight,
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 18,
    position: "relative",

    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
  },
  title: {
    color: COLORS.base100,
    fontSize: SIZES.lg,
    textAlign: "center",
    fontFamily: "Heebo",
  },
});
