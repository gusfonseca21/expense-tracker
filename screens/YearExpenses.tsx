import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useContext } from "react";
import { View } from "react-native";
import ExpenseList from "../components/ExpenseList";
import { ExpensesContext } from "../context/ExpensesContext";

// Estilos
import { globalStyles } from "../global/styles";
import { Expense } from "../global/types";
import { groupExpenses } from "../helpers";

export default function YearExpenses() {
  const { expenses } = useContext(ExpensesContext);

  const yearExpenses = groupExpenses(expenses, getYear, (expense) =>
    format(new Date(expense.date), "LLLL", { locale: ptBR })
  );

  return (
    <View style={globalStyles.pageStyle}>
      <ExpenseList expenses={yearExpenses} />
    </View>
  );
}
