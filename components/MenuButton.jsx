import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";

export default function MenuButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons
        style={styles.buttonContent}
        name="dots-vertical"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    borderColor: COLORS.support,
  },
  buttonContent: {
    fontSize: 20,
    textAlign: "center",
    color: COLORS.support,
  },
});
