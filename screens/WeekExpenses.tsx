import { View } from "react-native";
import { format, getWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

// Estilos
import { globalStyles } from "../global/styles";

// Tipos
import { Expense } from "../global/types";
import ExpenseList from "../components/List/ExpenseList";
import { groupExpenses } from "../helpers";

const expenses: Expense[] = [
  {
    id: 1,
    amount: 10.5,
    date: new Date("2023-03-10"),
    title: "Cachorro quente",
    description: "Pelo débito",
  },
  {
    id: 2,
    amount: 20.0,
    date: new Date("2023-03-11"),
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
    amount: 30.0,
    date: new Date("2023-03-16"),
    title: "Gilette",
    description: "Com o Cleitinho, em dinheiro",
  },
  {
    id: 7,
    amount: 30.0,
    date: new Date("2023-03-17"),
    title: "Sete",
    description: "Com o Cleitinho, em dinheiro",
  },
];

export default function WeekExpenses() {
  const weekExpenses = groupExpenses(expenses, getWeek, (expense) =>
    format(expense.date, "EEEE", { locale: ptBR })
  );

  return (
    <View style={globalStyles.pageStyle}>
      <ExpenseList expenses={weekExpenses} />
    </View>
  );
}
