import React, { createContext, useState } from "react";
import { Expense } from "../global/types";

export const ExpensesContext = createContext<{
  expenses: Expense[];
  addExpense: (expenseObj: Expense) => void;
  deleteExpense: (expenseId: string | undefined) => void;
  setExpenses: (value: Expense[]) => void;
}>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  setExpenses: () => {},
});

const ExpensesProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expenseObj: Expense) => {
    setExpenses((prevState) => [...prevState, expenseObj]);
  };

  const deleteExpense = (expenseId: string | undefined) => {
    setExpenses((prevState) =>
      prevState.filter((expense) => expense.id !== expenseId)
    );
  };

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, setExpenses, deleteExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
