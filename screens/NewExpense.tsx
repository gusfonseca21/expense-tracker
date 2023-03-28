import { View, Text } from "react-native";
import { useContext } from "react";

// Styles
import { globalStyles } from "../global/styles";
import axios from "axios";
import { callToast } from "../helpers";
import { ExpensesContext } from "../context/ExpensesContext";
import ExpenseInput from "./ExpenseForm";
import { Expense } from "../global/types";
import { useNavigation } from "@react-navigation/native";

export default function NewExpense() {
  const { addExpense } = useContext(ExpensesContext);

  const navigation = useNavigation();

  function postExpense(newExpenseObj: Expense) {
    axios
      .post(
        "https://expense-tracker-e759e-default-rtdb.firebaseio.com/expenses.json",
        newExpenseObj
      )
      .then((response) => {
        callToast("Sua despesa foi salva com sucesso!", 2);
        newExpenseObj.id = response.data.name;
        addExpense(newExpenseObj);
        navigation.goBack();
      })
      .catch((error) =>
        callToast(`Houve um erro ao salvar sua despesa: ${error.message}`, 3)
      );
  }

  return (
    <View style={globalStyles.pageStyle}>
      {/* <ExpenseInput
        buttonTitle='Adicionar Despesa'
        sendFormData={postExpense}
      /> */}
    </View>
  );
}
