import { StatusBar } from "expo-status-bar";
import ExpensesProvider from "./context/ExpensesContext";
import Navigator from "./Navigator";
import { View } from "react-native";
import { palette } from "./utils/styles";
import UserProvider from "./context/UserContext";

export default function App() {
  return (
    <>
      <UserProvider>
        <ExpensesProvider>
          <StatusBar style='light' />
          <View style={{ flex: 1, backgroundColor: palette.primary.main }}>
            <Navigator />
          </View>
        </ExpensesProvider>
      </UserProvider>
    </>
  );
}
