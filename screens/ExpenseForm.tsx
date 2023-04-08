import { View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState, useContext } from "react";
import { globalStyles } from "../utils/styles";
import { Expense, PaymentOption, RootStackParamList } from "../utils/types";
import {
  useRoute,
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { callToast, compareExpenses, generateRandomId } from "../utils/helpers";
import { ExpensesContext } from "../context/ExpensesContext";
import {
  confirmDeleteExpenseAlert,
  editExpense,
  postExpense,
} from "../utils/Async Storage Functions/submitExpenses";

import {
  AmountInput,
  DateTimeInput,
  DescriptionInput,
  PaidInput,
  TitleInput,
  DeleteExpenseButton,
  SubmitButton,
  PaymentMethod,
} from "../components/ExpenseForm";
import { UserContext } from "../context/UserContext";

export default function ExpenseForm() {
  const route = useRoute<RouteProp<RootStackParamList, "ExpenseForm">>();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    if (existingExpense)
      navigation.setOptions({ title: "Detalhes da Despesa" });
    else navigation.setOptions({ title: "Adicionar Despesa" });
  }, []);

  const { paymentOptions } = useContext(UserContext);

  const defaultPaymentMethod =
    paymentOptions.find((method) => method.isFavourite)?.value || "pix";

  const [existingExpense, setExistingExpense] = useState(route.params);
  const [paid, setPaid] = useState(
    existingExpense ? existingExpense.paid : true
  );
  const [title, setTitle] = useState(
    existingExpense ? existingExpense.title : ""
  );
  const [amount, setAmount] = useState<number>(
    existingExpense ? existingExpense.amount : 0
  );
  const [date, setDate] = useState(
    existingExpense ? new Date(existingExpense.date) : new Date()
  );
  const [description, setDescription] = useState(
    existingExpense ? existingExpense.description : ""
  );
  const [paymentMethod, setPaymentMethod] = useState(
    existingExpense ? existingExpense.method : defaultPaymentMethod
  );
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [expenseHasBeenModified, setExpenseHasBeenModified] = useState(false);
  const [isToastActive, setIsToastActive] = useState(false);
  const [paymentPickerOpen, setPaymentPickerOpen] = useState(false);

  const { addExpense, updateExpenses, deleteExpense } =
    useContext(ExpensesContext);

  function mountExpenseObj(): Expense {
    return {
      title: title,
      amount: amount,
      date: new Date(date).toString(),
      description: description,
      paid: paid,
      method: paymentMethod,
      id: generateRandomId(),
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
    };

    if (existingExpense) {
      expenseOptions.expense.id = existingExpense.id;
      setExistingExpense(expenseOptions.expense);
      editExpense({
        ...expenseOptions,
        contextFunction: updateExpenses,
      });
    } else {
      postExpense({
        ...expenseOptions,
        contextFunction: addExpense,
        navigation,
      });
    }
  }

  useEffect(() => {
    if (existingExpense) {
      const currentExpense = mountExpenseObj();

      currentExpense.id = existingExpense.id; // Na função de comparação o id será ignorado

      setExpenseHasBeenModified(
        compareExpenses(existingExpense, currentExpense)
      );
    }
  }, [title, amount, date, description, paid, paymentMethod, sendFormData]);

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

  useEffect(() => {
    if (!paid) setPaymentMethod(null);
    if (paid) {
      if (existingExpense?.method) setPaymentMethod(existingExpense.method);
      else setPaymentMethod(defaultPaymentMethod);
    }
  }, [paid]);

  return (
    <View style={[globalStyles.pageStyle, styles.customPageStyle]}>
      <AmountInput
        amount={amount}
        setAmount={setAmount}
        existingExpense={existingExpense}
      />
      <FlatList
        data={[{ key: "parentCard" }]}
        renderItem={() => (
          <View style={styles.parentCard}>
            <View style={styles.childCard}>
              <PaidInput paid={paid} setPaid={setPaid} />
              <TitleInput title={title} setTitle={setTitle} />
              <DateTimeInput date={date} setDate={setDate} />
              {paymentMethod && (
                <PaymentMethod
                  open={paymentPickerOpen}
                  setOpen={setPaymentPickerOpen}
                  value={paymentMethod}
                  setValue={setPaymentMethod}
                />
              )}
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
        )}
        showsVerticalScrollIndicator={false}
        style={styles.flatListStyle}
      />
      <SubmitButton
        expenseHasBeenModified={expenseHasBeenModified}
        isSubmitLoading={isSubmitLoading}
        sendFormData={sendFormData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  customPageStyle: {
    paddingHorizontal: 0,
    paddingTop: 0,
    position: "relative",
  },
  flatListStyle: {
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
