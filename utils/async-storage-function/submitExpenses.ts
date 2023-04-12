import { Expense } from "../types";
import { EXPENSES_STORAGE } from "../database";
import { callToast, parseAsyncData } from "../helpers";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SubmitExpensesParams = {
  expense: Expense;
  isSubmitLoading: boolean;
  setIsSubmitLoading: (value: boolean) => void;
  contextFunction: (expense: Expense) => void;
  navigation?: NavigationProp<ParamListBase>;
};

export function getExpenses(
  setLoadingExpenses: (value: boolean) => void,
  setExpenses: (value: Expense[]) => void
) {
  AsyncStorage.getItem(EXPENSES_STORAGE)
    .then((response) => {
      setLoadingExpenses(false);
      response && setExpenses(JSON.parse(response));
    })
    .catch((error) => {
      callToast(
        `Houve um erro ao tentar carregar suas despesas: ${error.message}`,
        3
      );
      setLoadingExpenses(false);
    });
}

export function postExpense({
  expense,
  isSubmitLoading,
  setIsSubmitLoading,
  contextFunction,
  navigation,
}: SubmitExpensesParams) {
  if (isSubmitLoading) return;
  setIsSubmitLoading(true);
  AsyncStorage.getItem(EXPENSES_STORAGE)
    .then((response) => {
      let data: Expense[];

      if (response) {
        const existingData = parseAsyncData(response);
        data = [...existingData, expense];
      } else {
        data = [expense];
      }

      AsyncStorage.setItem(EXPENSES_STORAGE, JSON.stringify(data))
        .then(() => {
          contextFunction(expense);
          setIsSubmitLoading(false);
          callToast("Sua despesa foi salva com sucesso!", 3);
          navigation?.goBack();
        })
        .catch((error) => {
          setIsSubmitLoading(false);
          callToast(
            `Houve um erro ao carregar suas despesas: ${error.message}`,
            4.5
          );
        });
    })
    .catch((error) => {
      setIsSubmitLoading(false);
      callToast(
        `Houve um erro ao carregar suas despesas: ${error.message}`,
        4.5
      );
    });
}

export function editExpense({
  expense,
  isSubmitLoading,
  setIsSubmitLoading,
  contextFunction,
}: SubmitExpensesParams) {
  if (isSubmitLoading) return;
  setIsSubmitLoading(true);
  AsyncStorage.getItem(EXPENSES_STORAGE)
    .then((response) => {
      if (response) {
        const existingData = parseAsyncData(response);
        const newData = JSON.stringify(
          existingData.map((existingExpense: Expense) => {
            if (existingExpense.id === expense.id) return expense;
            else return existingExpense;
          })
        );

        AsyncStorage.setItem(EXPENSES_STORAGE, newData)
          .then(() => {
            setIsSubmitLoading(false);
            contextFunction(expense);
            callToast("Sua despesa foi editada com sucesso!", 3);
          })
          .catch((error) => {
            setIsSubmitLoading(false);
            callToast(
              `Houve um erro ao editar sua despesa: ${error.message}`,
              4.5
            );
          });
      }
    })
    .catch((error) => {
      setIsSubmitLoading(false);
      callToast(`Houve um erro ao editar sua despesa: ${error.message}`, 4.5);
    });
}

export function confirmDeleteExpenseAlert({
  expense,
  isSubmitLoading,
  setIsSubmitLoading,
  contextFunction,
  navigation,
}: SubmitExpensesParams) {
  if (isSubmitLoading) return;
  Alert.alert(
    `Deseja excluir a despesa ${expense.title}?`,
    "",
    [
      {
        text: "Deletar",
        onPress: () => {
          AsyncStorage.getItem(EXPENSES_STORAGE).then((response) => {
            if (response) {
              const existingData = parseAsyncData(response);
              const newData = JSON.stringify(
                existingData.filter(
                  (existingExpense: Expense) =>
                    existingExpense.id !== expense.id
                )
              );
              AsyncStorage.setItem(EXPENSES_STORAGE, newData)
                .then(() => {
                  setIsSubmitLoading(false);
                  contextFunction(expense);
                  callToast("Despesa deletada com sucesso!", 3);
                  navigation?.goBack();
                })
                .catch((error) => {
                  setIsSubmitLoading(false);
                  callToast(
                    `Houve um erro ao tentar deletar a despesa: ${error.message}`,
                    4.5
                  );
                });
            }
          });
        },
      },
      {},
      { text: "Cancelar" },
    ],
    {
      cancelable: true,
    }
  );
}
