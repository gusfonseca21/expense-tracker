import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./Navigator";

export default function App() {
  const text: number = 123;
  return (
    <>
      <StatusBar style='auto' />
      <Navigator />
    </>
  );
}
