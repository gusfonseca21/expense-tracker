import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";
import { useEffect, useRef, useState, useContext } from "react";
import CurrencyInput from "react-native-currency-input";
import { globalStyles, palette } from "../global/styles";
import { format } from "date-fns";
import { Expense } from "../global/types";
import { useNavigation } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import axios from "axios";
import { callToast } from "../helpers";
import { ExpensesContext } from "../context/ExpensesContext";

const placeholderTextColor = palette.grey.light;

const valueTextColor = "#fff";

const inputText = {
  fontSize: 20,
  color: "#000",
};

const inputPadding = 10;

const inputHeight = 65;

const borderBottomStyle = {
  borderBottomWidth: 0.5,
  borderBottomColor: palette.grey.lighter,
};

type ExpenseFormPropType = {
  edit?: Expense | undefined;
};

export default function ExpenseForm({ edit }: ExpenseFormPropType) {
  const [paid, setPaid] = useState(true);
  const [title, setTitle] = useState(edit ? edit.title : "");
  const [titleInputError, setTitleInputError] = useState(false);
  const [amount, setAmount] = useState<number>(edit?.amount ?? 0);
  const [amountInputError, setAmountInputError] = useState(false);
  const [date, setDate] = useState(edit ? new Date(edit.date) : new Date());
  const [description, setDescription] = useState(edit ? edit.description : "");

  const amountRef = useRef<TextInput>(null);
  const dateRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const { addExpense } = useContext(ExpensesContext);

  const navigation = useNavigation();

  useEffect(() => {
    if (titleInputError && title !== "") setTitleInputError(false);
    if (amountInputError && amount !== 0) setAmountInputError(false);
  }, [title, amount, date]);

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

  function sendFormData() {
    if (title.trim() === "") {
      setTitleInputError(true);
      return;
    }

    const newExpenseObj: Expense = {
      title: title,
      amount: amount,
      date: new Date(date).toString(),
      description: description,
      paid: paid,
    };

    if (edit) newExpenseObj.id = edit.id;

    if (!edit) postExpense(newExpenseObj);
  }

  function showDateTimePicker(mode: "date" | "time") {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event) => {
        if (event.type === "set" && mode === "date") {
          setDate(new Date(Number(event.nativeEvent.timestamp)));
          showDateTimePicker("time");
        }
        if (event.type === "set" && mode === "time") {
          descriptionRef.current?.focus();
        }
      },
      mode: mode,
      is24Hour: true,
    });
  }

  return (
    <View style={[globalStyles.pageStyle, { padding: 0 }]}>
      <View style={styles.valueView}>
        <Text style={styles.valueTextStyle}>Valor</Text>
        <CurrencyInput
          style={styles.currencyInputStyle}
          value={amount}
          onChangeValue={(value) => setAmount(value ?? 0)}
          prefix='R$'
          delimiter='.'
          separator=','
          precision={2}
          minValue={0}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
      >
        <View style={styles.parentCard}>
          <View style={styles.childCard}>
            <View style={styles.paidInputView}>
              <Text style={inputText}>Pago</Text>
              <Switch
                trackColor={{
                  false: palette.grey.light,
                  true: palette.grey.light,
                }}
                thumbColor={paid ? palette.secondary.main : palette.grey.darker}
                onValueChange={() => setPaid((prevState) => !prevState)}
                value={paid}
              />
            </View>
            <TextInput
              style={styles.textInputStyle}
              placeholder={
                !titleInputError ? "Título *" : "Título é obrigatório!"
              }
              placeholderTextColor={
                titleInputError ? "red" : placeholderTextColor
              }
              onChangeText={setTitle}
              value={title}
              maxLength={20}
              autoFocus
              onSubmitEditing={() => amountRef.current?.focus()}
            />
            <TextInput
              ref={dateRef}
              style={styles.textInputStyle}
              value={format(date, "dd/MM/yyyy HH:mm")}
              onFocus={() => showDateTimePicker("date")}
            />
            <TextInput
              style={styles.textInputStyle}
              placeholder='Descrição'
              placeholderTextColor={placeholderTextColor}
              onChangeText={setDescription}
              value={description}
              multiline
              ref={descriptionRef}
            />
            <View style={styles.submitButton}>
              <Pressable
                onPress={sendFormData}
                android_ripple={{ color: palette.grey.main }}
              >
                <Text style={styles.buttonText}>
                  {edit ? "Atualizar Despesa" : "Adicionar Despesa"}
                </Text>
              </Pressable>
            </View>
            <Text style={styles.requiredText}>* Campo obrigatório</Text>
            <View style={{ height: 500 }} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  valueView: {
    width: "100%",
    padding: 15,
  },
  valueTextStyle: { fontSize: 18, fontWeight: "400", color: valueTextColor },
  currencyInputStyle: {
    fontSize: 28,
    fontWeight: "bold",
    color: valueTextColor,
  },
  scrollViewStyle: {
    width: "100%",
  },
  parentCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  childCard: {
    paddingHorizontal: 15,
  },
  paidInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: inputPadding,
    ...borderBottomStyle,
    height: inputHeight,
  },
  textInputStyle: {
    padding: inputPadding,
    height: inputHeight,
    ...inputText,
    ...borderBottomStyle,
  },
  submitButton: {
    backgroundColor: palette.primary.darker,
  },
  buttonText: {
    textAlign: "center",
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  requiredText: {
    fontSize: 18,
    color: "#000",
    marginTop: 15,
  },
});
