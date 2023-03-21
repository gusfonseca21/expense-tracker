import { getWeek, getMonth, getYear } from "date-fns";

export type Expense = {
  id?: number;
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
