import { StyleSheet } from "react-native";
import { inputBorderBottomStyle } from "../../Inputs/inputStyles";

export const modalStyles = StyleSheet.create({
  optionsRootView: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  optionView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...inputBorderBottomStyle,
  },
});
