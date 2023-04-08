import React, { createContext, useEffect, useState } from "react";
import { Expense } from "../utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { callToast } from "../utils/helpers";
import { EXPENSES_STORAGE } from "../utils/database";
import { getExpenses } from "../utils/Async Storage Functions/submitExpenses";

export const ExpensesContext = createContext<{
  expenses: Expense[];
  addExpense: (expenseObj: Expense) => void;
  deleteExpense: (expenseObj: Expense) => void;
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

  useEffect(() => {
    getExpenses(setLoadingExpenses, setExpenses);
  }, []);

  const addExpense = (expenseObj: Expense) => {
    setExpenses((prevState) => [...prevState, expenseObj]);
  };

  const deleteExpense = (expenseObj: Expense) => {
    setExpenses((prevState) => {
      return prevState.filter((expense) => expense.id !== expenseObj.id);
    });
  };

  const updateExpenses = (expenseObj: Expense) => {
    setExpenses((prevState) =>
      prevState.map((prevExpense): Expense => {
        if (prevExpense.id === expenseObj.id) {
          prevExpense = expenseObj;
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
