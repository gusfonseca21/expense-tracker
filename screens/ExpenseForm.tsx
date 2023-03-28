import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Switch,
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

const inputTextColor = "#000";

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
        <Text style={{ fontSize: 18, fontWeight: "400", color: "#fff" }}>
          Valor
        </Text>
        <CurrencyInput
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#fff",
          }}
          value={amount}
          onChangeValue={(value) => setAmount(value ?? 0)}
          prefix='R$'
          delimiter='.'
          separator=','
          precision={2}
          minValue={0}
        />
      </View>
      <View style={styles.outterCardView}>
        <View>
          <View style={styles.paidSwitchView}>
            <Text style={styles.inputText}>Pago</Text>
            <Switch
              trackColor={{
                false: palette.grey.light,
                true: palette.primary.lighter,
              }}
              thumbColor={paid ? palette.secondary.main : palette.grey.main}
              onValueChange={() => setPaid((prevState) => !prevState)}
              value={paid}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder={
              !titleInputError ? "Título *" : "Título é obrigatório!"
            }
            placeholderTextColor={titleInputError ? "red" : inputTextColor}
            onChangeText={setTitle}
            value={title}
            maxLength={20}
            autoFocus
            onSubmitEditing={() => amountRef.current?.focus()}
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
            placeholderTextColor={inputTextColor}
            onChangeText={setDescription}
            value={description}
            multiline
            ref={descriptionRef}
          />
          <View style={styles.button}>
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  valueView: { justifyContent: "flex-start", width: "100%", padding: 10 },
  paidSwitchView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
    ...borderBottomStyle,
  },
  inputText: {
    fontSize: 20,
    color: "#000",
  },
  outterCardView: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    paddingVertical: 15,
    fontSize: 20,
    color: "#000",
    ...borderBottomStyle,
  },
  button: {
    backgroundColor: palette.primary.darker,
    width: "100%",
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
