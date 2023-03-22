import { getWeek, getMonth, getYear } from "date-fns";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

export type Expense = {
  id?: string;
  amount: number;
  date: string;
  title: string;
  description: string;
};

export type ExpensesDividedByDay = {
  title: string;
  data: Expense[];
}[];

type GetWeek = typeof getWeek;

type GetMonth = typeof getMonth;

type GetYear = typeof getYear;

export type FilterFunctions = GetWeek | GetMonth | GetYear;

export type RootStackParamList = {
  WeekExpenses: undefined;
  MonthExpenses: undefined;
  YearExpenses: undefined;
  NewExpense: undefined;
  Expenses: undefined;
  ExpenseDetails: Expense;
};

export type Navigation = NavigationProp<ParamListBase>;
