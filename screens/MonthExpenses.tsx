import { getMonth, getWeekOfMonth } from "date-fns";
import { useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import ExpenseList from "../components/ExpenseList";
import { ExpensesContext } from "../context/ExpensesContext";

// Estilos
import { globalStyles, palette } from "../utils/styles";
import { getNoExpensesText, groupExpenses } from "../utils/helpers";

export default function MonthExpenses() {
  const { expenses, loadingExpenses } = useContext(ExpensesContext);

  const monthExpenses = groupExpenses(
    expenses,
    getMonth,
    (expense) => `Semana ${getWeekOfMonth(new Date(expense.date))}`
  );
  return (
    <View style={globalStyles.pageStyle}>
      {loadingExpenses ? (
        <ActivityIndicator
          animating
          size='large'
          color={palette.secondary.main}
        />
      ) : monthExpenses.length ? (
        <ExpenseList expenses={monthExpenses} />
      ) : (
        <Text style={globalStyles.noExpensesText}>
          {getNoExpensesText("mês")}
        </Text>
      )}
    </View>
  );
}
