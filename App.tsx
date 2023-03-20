import { StatusBar } from "expo-status-bar";
import ExpensesProvider from "./context/ExpensesContext";
import Navigator from "./Navigator";

export default function App() {
  return (
    <>
      <ExpensesProvider>
        <StatusBar style='auto' />
        <Navigator />
      </ExpensesProvider>
    </>
  );
}
