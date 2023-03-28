import { View } from "react-native";
import { useContext } from "react";

// Styles
import { globalStyles } from "../global/styles";
import axios from "axios";
import { callToast } from "../helpers";
import { ExpensesContext } from "../context/ExpensesContext";
import ExpenseInput from "./ExpenseForm";
import {
  AppNavigationProp,
  Expense,
  RootStackParamList,
} from "../global/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

export default function EditExpense() {
  const { updateExpenses } = useContext(ExpensesContext);

  const route = useRoute<RouteProp<RootStackParamList, "EditExpense">>();

  const navigation = useNavigation<AppNavigationProp>();

  const expenseToEdit = route.params;

  function editExpense(expenseToEdit: Expense) {
    const editedExpense: Expense = {
      amount: expenseToEdit.amount,
      date: expenseToEdit.date,
      description: expenseToEdit.description,
      title: expenseToEdit.title,
      paid: expenseToEdit.paid,
    };

    axios
      .put(
        `https://expense-tracker-e759e-default-rtdb.firebaseio.com/expenses/${expenseToEdit.id}.json`,
        editedExpense
      )
      .then(() => {
        callToast("Sua despesa foi editada com sucesso!", 2);

        editedExpense.id = expenseToEdit.id;

        updateExpenses(expenseToEdit);
        navigation.navigate("ExpenseDetails", editedExpense);
      })
      .catch((error) =>
        callToast(`Houve um erro ao editar sua despesa: ${error.message}`, 3)
      );
  }

  return (
    <View style={[globalStyles.pageStyle, { paddingHorizontal: 20 }]}>
      <ExpenseInput
        buttonTitle='Atualizar Despesa'
        sendFormData={editExpense}
        edit={expenseToEdit}
      />
    </View>
  );
}
