import getWeek from "date-fns/getWeek";

export type Expense = {
  id: number;
  amount: number;
  date: Date;
  title: string;
  description: string;
};

export type ExpensesDividedByDay = {
  title: string;
  data: Expense[];
}[];

export type GetWeekFunction = typeof getWeek;
