type Expense = {
  id: number;
  amount: number;
  date: Date;
  title: string;
  description: string;
};

type ExpensesDividedByDay = {
  title: string;
  data: Expense[];
}[];

export default Expense;
