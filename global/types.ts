import { getWeek, getMonth, getYear } from "date-fns";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type Expense = {
  id?: string;
  amount: number;
  date: string;
  title: string;
  description: string;
  paid: boolean;
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
  ExpenseForm: Expense | undefined;
};

export type Navigation = NavigationProp<ParamListBase>;

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;
