import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import ExpenseList from "../components/ExpenseList";
import { ExpensesContext } from "../context/ExpensesContext";

// Estilos
import { globalStyles, palette } from "../global/styles";
import { getNoExpensesText, groupExpenses } from "../global/helpers";

export default function YearExpenses() {
  const { expenses, loadingExpenses } = useContext(ExpensesContext);

  const yearExpenses = groupExpenses(expenses, getYear, (expense) =>
    format(new Date(expense.date), "LLLL", { locale: ptBR })
  );

  return (
    <View style={globalStyles.pageStyle}>
      {loadingExpenses ? (
        <ActivityIndicator
          animating
          size='large'
          color={palette.secondary.main}
        />
      ) : yearExpenses.length ? (
        <ExpenseList expenses={yearExpenses} />
      ) : (
        <Text style={globalStyles.noExpensesText}>
          {getNoExpensesText("ano")}
        </Text>
      )}
    </View>
  );
}
