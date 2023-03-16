// // Types
// import { ptBR } from "date-fns/locale";
// import { groupBy } from "lodash";
// import { Expense, GetWeekFunction } from "./global/types";

// export default function filterAndGroupExpenses(
//   expenses: Expense[],
//   comparisonFunction: GetWeekFunction
// ) {
//   const filteredExpenses = expenses.filter(
//     (expense) =>
//       comparisonFunction(expense.date, { locale: ptBR }) ===
//       comparisonFunction(new Date(), { locale: ptBR })
//   );

//   const expensesByDayOfWeek = groupBy(
//     filteredExpenses,
//     (expense) =>
//       `${format(expense.date, "EEEE", { locale: ptBR })} - ${format(
//         expense.date,
//         "dd/MM"
//       )}`
//   );

//   return filteredExpenses;
// }
