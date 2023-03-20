import { View } from "react-native";
import { useContext } from "react";
import { format, getWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

// Estilos
import { globalStyles } from "../global/styles";

// Tipos
import ExpenseList from "../components/ExpenseList";
import { groupExpenses } from "../helpers";
import { ExpensesContext } from "../context/ExpensesContext";

export default function WeekExpenses() {
  const { expenses } = useContext(ExpensesContext);

  const weekExpenses = groupExpenses(expenses, getWeek, (expense) =>
    format(new Date(expense.date), "EEEE", { locale: ptBR })
  );

  return (
    <View style={globalStyles.pageStyle}>
      <ExpenseList expenses={weekExpenses} />
    </View>
  );
}
