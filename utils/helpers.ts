// Types
import { groupBy } from "lodash";
import { Expense, FilterFunctions } from "./types";
import { ToastAndroid } from "react-native";
import Dinero from "dinero.js";

export function groupExpenses(
  expenses: Expense[],
  filterFunctions: FilterFunctions,
  titleFunction: (expense: Expense) => string
) {
  const filteredExpenses = expenses
    .filter(
      (expense) =>
        filterFunctions(new Date(expense.date)) === filterFunctions(new Date())
    )
    .sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return bDate.getTime() - aDate.getTime();
    });

  const groupedExpenses = groupBy(filteredExpenses, titleFunction);

  return Object.keys(groupedExpenses).map((groupTitle) => ({
    title: groupTitle,
    data: groupedExpenses[groupTitle],
  }));
}

export function callToast(message: string, seconds: number) {
  ToastAndroid.showWithGravityAndOffset(
    message,
    seconds,
    ToastAndroid.TOP,
    25,
    50
  );
}

export function getAmount(amount: number) {
  return Dinero({ amount: amount, currency: "BRL" }).toFormat("$0,0.00");
}

export function getNoExpensesText(period: "semana" | "mês" | "ano") {
  return `Nenhum gasto ${
    period === "semana" ? "nesta" : "neste"
  } ${period} até agora`;
}

type CompareExpense = Expense & { [key: string]: any };

export function compareExpenses(
  prevExpense: CompareExpense,
  currentExpense: CompareExpense
) {
  for (const prop in prevExpense) {
    if (
      prop !== "id" &&
      prevExpense.hasOwnProperty(prop) &&
      prevExpense[prop] !== currentExpense[prop]
    ) {
      return false;
    }
  }

  for (const prop in currentExpense) {
    if (
      prop !== "id" &&
      currentExpense.hasOwnProperty(prop) &&
      currentExpense[prop] !== prevExpense[prop]
    ) {
      return false;
    }
  }

  return true;
}