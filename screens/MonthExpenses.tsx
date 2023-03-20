import { getMonth, getWeekOfMonth } from "date-fns";
import { useContext } from "react";
import { View } from "react-native";
import ExpenseList from "../components/ExpenseList";
import { ExpensesContext } from "../context/ExpensesContext";

// Estilos
import { globalStyles } from "../global/styles";
import { Expense } from "../global/types";
import { groupExpenses } from "../helpers";

export default function MonthExpenses() {
  const { expenses } = useContext(ExpensesContext);

  const monthExpenses = groupExpenses(
    expenses,
    getMonth,
    (expense) => `Semana ${getWeekOfMonth(new Date(expense.date))}`
  );
  return (
    <View style={globalStyles.pageStyle}>
      <ExpenseList expenses={monthExpenses} />
    </View>
  );
}
