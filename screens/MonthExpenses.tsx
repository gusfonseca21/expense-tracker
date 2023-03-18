import { getMonth, getWeekOfMonth } from "date-fns";
import { View } from "react-native";
import ExpenseList from "../components/ExpenseList";

// Estilos
import { globalStyles } from "../global/styles";
import { Expense } from "../global/types";
import { groupExpenses } from "../helpers";

const expenses: Expense[] = [
  {
    id: 1,
    amount: 10.5,
    date: new Date("2023-02-10"),
    title: "Cachorro quente",
    description: "Pelo débito",
  },
  {
    id: 2,
    amount: 20.0,
    date: new Date("2023-03-02"),
    title: "Passagem de metrô",
    description: "Em dinheiro",
  },
  {
    id: 3,
    amount: 15.75,
    date: new Date("2023-03-12"),
    title: "Sorvete",
    description: "Dividido em 3X",
  },
  {
    id: 4,
    amount: 5.0,
    date: new Date("2023-03-12"),
    title: "Caneta",
    description: "Pelo PIX",
  },
  {
    id: 5,
    amount: 30.0,
    date: new Date("2023-03-13"),
    title: "Corre",
    description: "Com o Cleitinho, em dinheiro",
  },
  {
    id: 6,
    amount: 40.0,
    date: new Date("2023-03-01"),
    title: "Teste 1",
    description: "Com o Cleitinho, em dinheiro",
  },
  {
    id: 7,
    amount: 50.0,
    date: new Date("2023-03-08"),
    title: "Teste 2",
    description: "Com o Cleitinho, em dinheiro",
  },
  {
    id: 8,
    amount: 60.0,
    date: new Date("2023-03-19"),
    title: "Alabama",
    description: "Com o Cleitinho, em dinheiro",
  },
];

export default function MonthExpenses() {
  const monthExpenses = groupExpenses(
    expenses,
    getMonth,
    (expense) => `Semana ${getWeekOfMonth(expense.date)}`
  );
  return (
    <View style={globalStyles.pageStyle}>
      <ExpenseList expenses={monthExpenses} />
    </View>
  );
}
