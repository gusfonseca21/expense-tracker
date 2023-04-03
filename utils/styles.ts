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

export const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 1,
  shadowRadius: 10,
  elevation: 5,
};

export const textShadow = {
  textShadowOffset: { width: 1, height: 1 },
  textShadowColor: "#000000",
  textShadowRadius: 3,
};

export const globalStyles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.primary.main,
    paddingHorizontal: 15,
  },
  noExpensesText: {
    fontSize: 25,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
