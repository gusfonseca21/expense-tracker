import { View, ActivityIndicator, Text } from "react-native";
import { useContext } from "react";
import { format, getWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

// Estilos
import { globalStyles, palette } from "../utils/styles";

// Tipos
import ExpenseList from "../components/ExpenseList";
import { getNoExpensesText, groupExpenses } from "../utils/helpers";
import { ExpensesContext } from "../context/ExpensesContext";

export default function WeekExpenses() {
  const { expenses, loadingExpenses } = useContext(ExpensesContext);

  const weekExpenses = groupExpenses(expenses, getWeek, (expense) =>
    format(new Date(expense.date), "EEEE", { locale: ptBR })
  );

  return (
    <View style={globalStyles.pageStyle}>
      {loadingExpenses ? (
        <ActivityIndicator
          animating
          size='large'
          color={palette.secondary.main}
        />
      ) : weekExpenses.length ? (
        <ExpenseList expenses={weekExpenses} />
      ) : (
        <Text style={globalStyles.noExpensesText}>
          {getNoExpensesText("semana")}
        </Text>
      )}
    </View>
  );
}
