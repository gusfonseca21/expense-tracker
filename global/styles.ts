import { StyleSheet } from "react-native";

const primary = {
  lighter: "#66c7b9",
  light: "#33b5a1",
  main: "#00A28A",
  dark: "#00826e",
  darker: "#006153",
};

const secondary = {
  lighter: "#ffe466",
  light: "#ffdb33",
  main: "#FFD200",
  dark: "#cca800",
  darker: "#997e00",
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
});
