import { StyleSheet } from "react-native";
import { palette } from "../../../utils/styles";

const inputHeight = 65;

export const inputBorderBottomStyle = {
  borderBottomWidth: 0.5,
  borderBottomColor: palette.grey.lighter,
};

export const inputText = {
  fontSize: 20,
  color: "#000",
};

export const inputIconColor = palette.primary.main;

export const placeholderTextColor = palette.grey.light;

export const inputStyles = StyleSheet.create({
  paidInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...inputBorderBottomStyle,
    height: inputHeight,
  },
  inputIconView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    ...inputBorderBottomStyle,
  },
  textInputStyle: {
    width: "100%",
    height: inputHeight,
    ...inputText,
  },
});
