import { View, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState, useContext } from "react";
import { globalStyles } from "../utils/styles";
import { Expense, RootStackParamList } from "../utils/types";
import {
  useRoute,
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { callToast, compareExpenses } from "../utils/helpers";
import { ExpensesContext } from "../context/ExpensesContext";

import {
  confirmDeleteExpenseAlert,
  editExpense,
  postExpense,
} from "../utils/submitFunctions";
import {
  AmountInput,
  DateTimeInput,
  DescriptionInput,
  PaidInput,
  TitleInput,
  DeleteExpenseButton,
  SubmitButton,
} from "../components/ExpenseForm";

export default function ExpenseForm() {
  const route = useRoute<RouteProp<RootStackParamList, "ExpenseForm">>();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const existingExpense = route.params;

  useEffect(() => {
    if (existingExpense)
      navigation.setOptions({ title: "Detalhes da Despesa" });
    else navigation.setOptions({ title: "Adicionar Despesa" });
  }, []);

  const [paid, setPaid] = useState(
    existingExpense ? existingExpense.paid : true
  );
  const [title, setTitle] = useState(
    existingExpense ? existingExpense.title : ""
  );
  const [amount, setAmount] = useState<number>(
    existingExpense ? existingExpense.amount / 100 : 0
  ); // / 100 para sintonizar com a lib Dinero
  const [date, setDate] = useState(
    existingExpense ? new Date(existingExpense.date) : new Date()
  );
  const [description, setDescription] = useState(
    existingExpense ? existingExpense.description : ""
  );
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [expenseHasBeenModified, setExpenseHasBeenModified] = useState(false);
  const [isToastActive, setIsToastActive] = useState(false);

  const { addExpense, updateExpenses, deleteExpense } =
    useContext(ExpensesContext);

  function mountExpenseObj(): Expense {
    return {
      title: title,
      amount: amount * 100, // x100 para sintonizar com a lib Dinero
      date: new Date(date).toString(),
      description: description,
      paid: paid,
    };
  }

  function toastTimeOut() {
    setTimeout(() => {
      setIsToastActive(false);
    }, 3000);
  }

  function sendFormData() {
    if (isToastActive) return;

    if (!amount) {
      callToast("Defina um preço!", 3);
      setIsToastActive(true);
      toastTimeOut();
      return;
    }

    if (title.trim() === "") {
      callToast("Defina um título!", 3);
      setIsToastActive(true);
      toastTimeOut();
      return;
    }

    const expenseObj: Expense = mountExpenseObj();

    const expenseOptions = {
      expense: expenseObj,
      isSubmitLoading,
      setIsSubmitLoading,
      navigation,
    };

    if (existingExpense) {
      expenseOptions.expense.id = existingExpense.id;
      editExpense({
        ...expenseOptions,
        contextFunction: updateExpenses,
      });
    } else {
      postExpense({
        ...expenseOptions,
        contextFunction: addExpense,
      });
    }
  }

  useEffect(() => {
    if (existingExpense) {
      const expenseObj = mountExpenseObj();

      setExpenseHasBeenModified(compareExpenses(existingExpense, expenseObj));
    }
  }, [title, amount, date, description, paid]);

  function deleteExpenseHandler() {
    const expenseToDelete = mountExpenseObj();

    expenseToDelete.id = existingExpense?.id;

    confirmDeleteExpenseAlert({
      expense: expenseToDelete,
      isSubmitLoading: isDeleteLoading,
      setIsSubmitLoading: setIsDeleteLoading,
      contextFunction: deleteExpense,
      navigation,
    });
  }

  return (
    <View
      style={[globalStyles.pageStyle, { padding: 0, position: "relative" }]}
    >
      <AmountInput
        amount={amount}
        setAmount={setAmount}
        existingExpense={existingExpense}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
      >
        <View style={styles.parentCard}>
          <View style={styles.childCard}>
            <PaidInput paid={paid} setPaid={setPaid} />
            <TitleInput title={title} setTitle={setTitle} />
            <DateTimeInput date={date} setDate={setDate} />
            <DescriptionInput
              description={description}
              setDescription={setDescription}
            />
            {existingExpense && (
              <DeleteExpenseButton
                isDeleteLoading={isDeleteLoading}
                deleteExpenseHandler={deleteExpenseHandler}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <SubmitButton
        expenseHasBeenModified={expenseHasBeenModified}
        isSubmitLoading={isSubmitLoading}
        sendFormData={sendFormData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    width: "100%",
  },
  parentCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 633,
  },
  childCard: {
    paddingHorizontal: 15,
  },
});
