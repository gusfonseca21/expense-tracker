import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  ToastAndroid,
} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";

import MaskInput, { Masks } from "react-native-mask-input";

// Styles
import { globalStyles } from "../global/styles";
import { palette } from "../global/styles";
import axios from "axios";
import { parse } from "date-fns";
import { callToast } from "../helpers";
import { ExpensesContext } from "../context/ExpensesContext";
// import { ToastAndroid } from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";

export default function NewExpense() {
  const [title, setTitle] = useState("");
  const [titleInputError, setTitleInputError] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountInputError, setAmountInputError] = useState(false);
  const [date, setDate] = useState("");
  const [dateInputError, setDateInputError] = useState(false);
  const [description, setDescription] = useState("");

  const { addExpenses } = useContext(ExpensesContext);

  const amountRef = useRef<TextInput>(null);
  const dateRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  function postExpense() {
    if (title.trim() === "") {
      setTitleInputError(true);
      return;
    }
    if (amount.trim() === "") {
      setAmountInputError(true);
      return;
    }
    if (date.trim() === "") {
      setDateInputError(true);
      return;
    }

    const newExpenseObj = {
      title: title,
      amount: Number(amount),
      date: parse(date, "dd/MM/yyyy", new Date()),
      description: description,
    };

    axios
      .post(
        "https://expense-tracker-e759e-default-rtdb.firebaseio.com/expenses.json",
        newExpenseObj
      )
      .then(() => {
        clearInputs();
        callToast("Sua despesa foi salva com sucesso!", 2);
        addExpenses(newExpenseObj);
      })
      .catch((error) =>
        callToast(`Houve um erro ao salvar sua despesa: ${error.message}`, 3)
      );
  }

  function clearInputs() {
    setTitle("");
    setAmount("");
    setDate("");
    setDescription("");
  }

  useEffect(() => {
    if (titleInputError && title !== "") setTitleInputError(false);
    if (amountInputError && amount !== "") setAmountInputError(false);
    if (dateInputError && date !== "") setDateInputError(false);
  }, [title, amount, date]);

  return (
    <View style={[globalStyles.pageStyle, { paddingHorizontal: 20 }]}>
      <TextInput
        style={styles.input}
        placeholder={!titleInputError ? "Título *" : "Título é obrigatório!"}
        placeholderTextColor={titleInputError ? "red" : "#aaa"}
        onChangeText={setTitle}
        value={title}
        maxLength={20}
        autoFocus
        onSubmitEditing={() => amountRef.current?.focus()}
      />
      <MaskInput
        style={styles.input}
        placeholder={!amountInputError ? "Valor *" : "Valor é obrigatório!"}
        placeholderTextColor={amountInputError ? "red" : "#aaa"}
        onChangeText={(_, unmasked) => setAmount(unmasked)}
        inputMode='numeric'
        value={amount}
        mask={Masks.BRL_CURRENCY}
        ref={amountRef}
        onSubmitEditing={() => dateRef.current?.focus()}
      />
      <MaskInput
        style={styles.input}
        placeholder={!dateInputError ? "Data *" : "Data é obrigatório!"}
        placeholderTextColor={dateInputError ? "red" : "#aaa"}
        onChangeText={setDate}
        inputMode='numeric'
        value={date}
        mask={Masks.DATE_DDMMYYYY}
        ref={dateRef}
        onSubmitEditing={() => descriptionRef.current?.focus()}
      />
      <TextInput
        style={styles.input}
        placeholder='Descrição'
        onChangeText={setDescription}
        value={description}
        multiline
        ref={descriptionRef}
      />
      <View style={styles.button}>
        <Pressable
          onPress={postExpense}
          android_ripple={{ color: palette.grey.main }}
        >
          <Text style={styles.buttonText}>Adicionar Despesa</Text>
        </Pressable>
      </View>
      <Text style={styles.requiredText}>* Campo obrigatório</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: palette.secondary.main,
    padding: 10,
    marginBottom: 15,
    fontSize: 20,
  },
  button: {
    backgroundColor: palette.primary.darker,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  requiredText: {
    fontSize: 18,
    color: "#fff",
    marginTop: 15,
  },
});
