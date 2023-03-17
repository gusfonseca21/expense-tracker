// Types
import { groupBy } from "lodash";
import { Expense, FilterFunctions } from "./global/types";

export function groupExpenses(
  expenses: Expense[],
  filterFunctions: FilterFunctions,
  titleFunction: (expense: Expense) => string
) {
  const filteredExpenses = expenses
    .filter(
      (expense) => filterFunctions(expense.date) === filterFunctions(new Date())
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const groupedExpenses = groupBy(filteredExpenses, titleFunction);

  return Object.keys(groupedExpenses).map((groupTitle) => ({
    title: groupTitle,
    data: groupedExpenses[groupTitle],
  }));
}
