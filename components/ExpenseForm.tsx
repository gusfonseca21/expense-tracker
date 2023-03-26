import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MaskInput, { Masks } from "react-native-mask-input";
import { palette } from "../global/styles";
import { format } from "date-fns";
import { Expense } from "../global/types";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

type ExpenseFormPropType = {
  buttonTitle: string;
  sendFormData: (newExpenseObj: Expense) => void;
  edit?: Expense | undefined;
};

export default function ExpenseForm({
  buttonTitle,
  sendFormData,
  edit,
}: ExpenseFormPropType) {
  const [title, setTitle] = useState(edit ? edit.title : "");
  const [titleInputError, setTitleInputError] = useState(false);
  const [amount, setAmount] = useState(edit ? edit.amount.toString() : "");
  const [amountInputError, setAmountInputError] = useState(false);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState(edit ? edit.description : "");

  const amountRef = useRef<TextInput>(null);
  const dateRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  useEffect(() => {
    if (titleInputError && title !== "") setTitleInputError(false);
    if (amountInputError && amount !== "") setAmountInputError(false);
  }, [title, amount, date]);

  function postExpense() {
    if (title.trim() === "") {
      setTitleInputError(true);
      return;
    }
    if (amount.trim() === "") {
      setAmountInputError(true);
      return;
    }

    const newExpenseObj: Expense = {
      title: title,
      amount: Number(amount),
      date: new Date(date).toString(),
      description: description,
    };

    if (edit) newExpenseObj.id = edit.id;

    sendFormData(newExpenseObj);
  }

  function showDateTimePicker(mode: "date" | "time") {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event) => {
        setDate(new Date(Number(event.nativeEvent.timestamp)));
        if (event.type === "set" && mode === "date") showDateTimePicker("time");
        if (event.type === "set" && mode === "time")
          descriptionRef.current?.focus();
      },
      mode: mode,
      is24Hour: true,
    });
  }

  return (
    <>
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
      <TextInput
        ref={dateRef}
        style={styles.input}
        value={format(date, "dd/MM/yyyy HH:mm")}
        onFocus={() => showDateTimePicker("date")}
      />
      <TextInput
        style={styles.input}
        placeholder='Descrição'
        placeholderTextColor='#aaa'
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
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </Pressable>
      </View>
      <Text style={styles.requiredText}>* Campo obrigatório</Text>
    </>
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
