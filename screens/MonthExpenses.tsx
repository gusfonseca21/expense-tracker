import { View, Text } from "react-native";

// Estilos
import { globalStyles } from "../styles/global";

export default function MonthExpenses() {
  return (
    <View style={globalStyles.pageStyle}>
      <Text>Despesas Mensais</Text>
    </View>
  );
}
