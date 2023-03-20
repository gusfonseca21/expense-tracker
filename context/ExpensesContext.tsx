import React, { createContext, useState } from "react";
import { Expense } from "../global/types";

export const ExpensesContext = createContext<{
  expenses: Expense[];
  addExpenses: (expenseObj: Expense) => void;
  setExpenses: (value: Expense[]) => void;
}>({
  expenses: [],
  addExpenses: () => {},
  setExpenses: () => {},
});

const ExpensesProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpenses = (expenseObj: Expense) => {
    setExpenses((prevState) => [...prevState, expenseObj]);
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpenses, setExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
