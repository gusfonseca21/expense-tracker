import { StyleSheet } from "react-native";

const primary = {
  lighter: "#8c97d3",
  light: "#6574c4",
  main: "#3f51b5",
  dark: "#324191",
  darker: "#26316d",
};

const secondary = {
  lighter: "#ffda6a",
  light: "#ffcd39",
  main: "#ffc107",
  dark: "#cc9a06",
  darker: "#997404",
};

const grey = {
  lighter: "#a7acb1",
  light: "#899197",
  main: "#6C757D",
  dark: "#565e64",
  darker: "#41464b",
};

const white = "#fff";

export const palette = { primary, secondary, grey, white };

export const globalStyles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.primary.main,
    padding: 20,
  },
  noExpensesText: {
    fontSize: 25,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
