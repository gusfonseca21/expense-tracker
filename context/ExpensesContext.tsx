import React, { createContext, useState } from "react";
import { Expense } from "../global/types";

export const ExpensesContext = createContext<{
  expenses: Expense[];
  addExpense: (expenseObj: Expense) => void;
  deleteExpense: (expenseId: string | undefined) => void;
  setExpenses: (value: Expense[]) => void;
  updateExpenses: (expenseObj: Expense) => void;
  loadingExpenses: boolean;
  setLoadingExpenses: (bool: boolean) => void;
}>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  setExpenses: () => {},
  updateExpenses: () => {},
  loadingExpenses: false,
  setLoadingExpenses: () => {},
});

const ExpensesProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loadingExpenses, setLoadingExpenses] = useState(true);

  const addExpense = (expenseObj: Expense) => {
    setExpenses((prevState) => [...prevState, expenseObj]);
  };

  const deleteExpense = (expenseId: string | undefined) => {
    setExpenses((prevState) =>
      prevState.filter((expense) => expense.id !== expenseId)
    );
  };

  const updateExpenses = (expenseObj: Expense) => {
    setExpenses((prevState) =>
      prevState.map((prevExpense): Expense => {
        if (prevExpense.id === expenseObj.id) {
          return expenseObj;
        }
        return prevExpense;
      })
    );
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        setExpenses,
        deleteExpense,
        updateExpenses,
        loadingExpenses,
        setLoadingExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
