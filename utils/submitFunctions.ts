import axios from "axios";
import { Expense } from "./types";
import { DB_URL } from "./database";
import { callToast } from "./helpers";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Alert } from "react-native";

type SubmitExpensesParams = {
  expense: Expense;
  isSubmitLoading: boolean;
  setIsSubmitLoading: (value: boolean) => void;
  contextFunction: (expense: Expense) => void;
  navigation?: NavigationProp<ParamListBase>;
};

export function postExpense({
  expense,
  isSubmitLoading,
  setIsSubmitLoading,
  contextFunction,
  navigation,
}: SubmitExpensesParams) {
  if (isSubmitLoading) return;
  setIsSubmitLoading(true);
  axios
    .post(`${DB_URL}expenses.json`, expense)
    .then((response) => {
      setIsSubmitLoading(false);
      callToast("Sua despesa foi salva com sucesso!", 2);
      expense.id = response.data.name;
      contextFunction(expense);
      navigation?.goBack();
    })
    .catch((error) => {
      setIsSubmitLoading(false);
      callToast(`Houve um erro ao salvar sua despesa: ${error.message}`, 3);
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
  axios
    .put(`${DB_URL}expenses/${expense.id}.json`, expense)
    .then(() => {
      setIsSubmitLoading(false);
      callToast("Sua despesa foi editada com sucesso!", 2);
      expense.id = expense.id;
      contextFunction(expense);
    })
    .catch((error) => {
      setIsSubmitLoading(false);
      callToast(`Houve um erro ao editar sua despesa: ${error.message}`, 3);
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
          setIsSubmitLoading(true);
          axios
            .delete(`${DB_URL}expenses/${expense.id}.json`)
            .then(() => {
              setIsSubmitLoading(false);
              contextFunction(expense);
              callToast("Despesa deletada com sucesso!", 3);
              navigation?.goBack();
            })
            .catch((error) => {
              setIsSubmitLoading(false);
              callToast(
                `Houve um erro ao tentar deletar a despesa! ${error.message}`,
                3
              );
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
