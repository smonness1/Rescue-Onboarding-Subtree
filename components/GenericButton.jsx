import { Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../globalStyles";
import { usePreferencesContext } from "../hooks";
import { components as localization } from "../localization";

export default function GenericButton({
  text,
  additionalButtonStyles,
  additionalTextStyles,
  onPress,
  template,
}) {
  const { selectText } = usePreferencesContext();

  switch (template) {
    case "continue":
      text = selectText(localization.GenericButton.continue);
      break;
    case "previous":
      text = selectText(localization.GenericButton.previous);
      break;
    case "skip":
      text = selectText(localization.GenericButton.skip);
      break;
    case "home":
      text = selectText(localization.GenericButton.home);
      break;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[globalStyles.button, additionalButtonStyles]}
    >
      <Text style={[globalStyles.buttonText, additionalTextStyles]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
