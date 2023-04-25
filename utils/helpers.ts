// Types
import { groupBy } from "lodash";
import { Expense, FilterFunctions } from "./types";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPENSES_STORAGE, PAYMENT_METHODS_STORAGE } from "./database";

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

export function generateRandomId() {
  const randomString = Math.random().toString(36).substring(2, 8);
  const timestamp = Date.now().toString(36).substring(4, 12);
  return `${randomString}-${timestamp}`;
}

export function parseAsyncData(jsonData: string) {
  return jsonData ? JSON.parse(jsonData) : [];
}

export async function clearAllExpenses() {
  await AsyncStorage.removeItem(EXPENSES_STORAGE);
}

export async function clearPaymentMethods() {
  await AsyncStorage.removeItem(PAYMENT_METHODS_STORAGE);
}

export async function clearNullAsyncStorage() {
  AsyncStorage.getItem(EXPENSES_STORAGE).then((response) => {
    if (response) {
      const existingData = parseAsyncData(response);
      const cleanData = existingData.filter((data: Expense | null) => data);
      AsyncStorage.setItem(EXPENSES_STORAGE, JSON.stringify(cleanData));
    }
  });
}
