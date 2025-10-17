import { Platform, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "./constants";

export const globalStyles = StyleSheet.create({
  // --Containers--
  mainContainer: {
    // flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.base200
  },
  contentContainer: {
    // flex: 0.85,
    height: '85%',
    borderColor: 'red',
    width: '100%',
    alignItems: 'center',
    // borderWidth: 1
  },
  promptConatiner: {
    // flex: 0.4,
    height: '35%',
    paddingTop: '30%',
  },
  answerButtonsContainer: {
    width: '100%',
    gap: 24,
  },
  insideContainer: {  //TBD
    justifyContent: "center",
    paddingBottom: 50,
  },
  // --Text--
  headerText: {
    color: COLORS.content,
    fontSize: SIZES.xl,
    fontFamily: "Heebo",
    textAlign: "center",
    textTransform: "uppercase",
    maxWidth: "80%",
  },
  selectionHeaderText: {
    color: COLORS.content,
    fontSize: SIZES.lg,
    fontFamily: "Heebo",
    textAlign: "center",
    textTransform: "uppercase",
    maxWidth: "80%",
    fontWeight: "700",
  },
  screenTitleText: {
    color: COLORS.content,
    fontSize: SIZES.lg,
    fontFamily: 'Heebo_700Bold',
    textAlign: "center",
  },
  // --Misc--
  button: {
    borderRadius: 80,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderColor: COLORS.support,
    borderWidth: 1,
    backgroundColor: COLORS.base100,
  },
  buttonText: {
    textAlign: "center",
    color: COLORS.content,
    fontFamily: FONTS.main,
    fontSize: SIZES.md,
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  bottomContainer: {
    marginBottom: 30,
  },
});
