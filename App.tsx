import { StatusBar } from "expo-status-bar";
import ExpensesProvider from "./context/ExpensesContext";
import Navigator from "./Navigator";
import { View } from "react-native";
import { palette } from "./global/styles";

export default function App() {
  return (
    <>
      <ExpensesProvider>
        <StatusBar style='light' />
        <View style={{ flex: 1, backgroundColor: palette.primary.main }}>
          <Navigator />
        </View>
      </ExpensesProvider>
    </>
  );
}
