import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import CurrencyInput from "react-native-currency-input";
import { globalStyles, palette } from "../global/styles";
import { format } from "date-fns";
import { Expense, RootStackParamList } from "../global/types";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import axios from "axios";
import { callToast } from "../global/helpers";
import { ExpensesContext } from "../context/ExpensesContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DB_URL } from "../global/database";

type CompareExpense = Expense & { [key: string]: any };

const placeholderTextColor = palette.grey.light;

const valueTextColor = "#fff";

const inputText = {
  fontSize: 20,
  color: "#000",
};

const inputIconColor = palette.primary.main;

const inputHeight = 65;

const borderBottomStyle = {
  borderBottomWidth: 0.5,
  borderBottomColor: palette.grey.lighter,
};

export default function ExpenseForm() {
  const route = useRoute<RouteProp<RootStackParamList, "ExpenseForm">>();
  const navigation = useNavigation();

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
  const [expenseHasBeenModified, setExpenseHasBeenModified] = useState(false);

  const { addExpense, updateExpenses, deleteExpense } =
    useContext(ExpensesContext);

  function postExpense(newExpenseObj: Expense) {
    if (isSubmitLoading) return;
    setIsSubmitLoading(true);
    axios
      .post(`${DB_URL}expenses.json`, newExpenseObj)
      .then((response) => {
        setIsSubmitLoading(false);
        callToast("Sua despesa foi salva com sucesso!", 2);
        newExpenseObj.id = response.data.name;
        addExpense(newExpenseObj);
        navigation.goBack();
      })
      .catch((error) => {
        setIsSubmitLoading(false);
        callToast(`Houve um erro ao salvar sua despesa: ${error.message}`, 3);
      });
  }

  function editExpense(existingExpense: Expense) {
    if (isSubmitLoading) return;
    setIsSubmitLoading(true);
    axios
      .put(`${DB_URL}expenses/${existingExpense.id}.json`, existingExpense)
      .then(() => {
        setIsSubmitLoading(false);
        callToast("Sua despesa foi editada com sucesso!", 2);
        existingExpense.id = existingExpense.id;
        updateExpenses(existingExpense);
        navigation.goBack();
      })
      .catch((error) => {
        setIsSubmitLoading(false);
        callToast(`Houve um erro ao editar sua despesa: ${error.message}`, 3);
      });
  }

  function sendFormData() {
    if (!amount) {
      callToast("Defina um preço!", 3);
      return;
    }

    if (title.trim() === "") {
      callToast("Defina um título!", 3);
      return;
    }

    const expenseObj: Expense = {
      title: title,
      amount: amount * 100, // x100 para sintonizar com a lib Dinero
      date: new Date(date).toString(),
      description: description,
      paid: paid,
    };

    if (existingExpense) {
      expenseObj.id = existingExpense.id;
      editExpense(expenseObj);
    }

    if (!existingExpense) postExpense(expenseObj);
  }

  function showDateTimePicker(mode: "date" | "time") {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event) => {
        setDate(new Date(Number(event.nativeEvent.timestamp)));
      },
      mode: mode,
      is24Hour: true,
      style: {
        backgroundColor: "red",
      },
    });
  }

  function compareExpenses(
    prevExpense: CompareExpense,
    currentExpense: CompareExpense
  ) {
    for (const prop in prevExpense) {
      if (
        prop !== "id" &&
        prevExpense.hasOwnProperty(prop) &&
        prevExpense[prop] !== currentExpense[prop]
      ) {
        return false;
      }
    }

    for (const prop in currentExpense) {
      if (
        prop !== "id" &&
        currentExpense.hasOwnProperty(prop) &&
        currentExpense[prop] !== prevExpense[prop]
      ) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    if (existingExpense) {
      const expenseObj: Expense = {
        title: title,
        amount: amount * 100, // x100 para sintonizar com a lib Dinero
        date: new Date(date).toString(),
        description: description,
        paid: paid,
      };
      setExpenseHasBeenModified(compareExpenses(existingExpense, expenseObj));
    }
  }, [title, amount, date, description, paid]);

  function deleteExpenseHandler(expenseId: string) {
    axios
      .delete(`${DB_URL}expenses/${expenseId}.json`)
      .then(() => {
        deleteExpense(expenseId);
        callToast("Despesa deletada com sucesso!", 3);
        navigation.goBack();
      })
      .catch((error) =>
        callToast(
          `Houve um erro ao tentar deletar a despesa! ${error.message}`,
          3
        )
      );
  }

  function confirmDeleteExpense() {
    Alert.alert(
      `Deseja excluir a despesa ${title}?`,
      "",
      [
        {
          text: "Deletar",
          onPress: () => {
            if (existingExpense?.id) deleteExpenseHandler(existingExpense.id);
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

  return (
    <View
      style={[globalStyles.pageStyle, { padding: 0, position: "relative" }]}
    >
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
          autoFocus={!existingExpense}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
      >
        <View style={styles.parentCard}>
          <View style={styles.childCard}>
            <View style={styles.paidInputView}>
              <View style={[styles.inputIconView, { borderBottomWidth: 0 }]}>
                <Ionicons
                  name='logo-usd'
                  size={22}
                  color={paid ? "green" : "red"}
                />
                <Text style={inputText}>Pago</Text>
              </View>
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
            <View style={styles.inputIconView}>
              <Ionicons name='pencil-sharp' size={20} color={inputIconColor} />
              <TextInput
                style={styles.textInputStyle}
                placeholder='Título'
                placeholderTextColor={placeholderTextColor}
                onChangeText={setTitle}
                value={title}
                maxLength={20}
              />
            </View>
            <View
              style={[styles.inputIconView, { justifyContent: "flex-start" }]}
            >
              <View
                style={[
                  styles.inputIconView,
                  { width: "50%", borderBottomWidth: 0 },
                ]}
              >
                <Ionicons name='calendar' size={20} color={inputIconColor} />
                <TextInput
                  style={styles.textInputStyle}
                  value={format(date, "dd/MM/yyyy")}
                  onFocus={() => showDateTimePicker("date")}
                />
              </View>
              <View
                style={[
                  styles.inputIconView,
                  { paddingLeft: 15, borderBottomWidth: 0 },
                ]}
              >
                <Ionicons name='time' size={20} color={inputIconColor} />
                <TextInput
                  style={styles.textInputStyle}
                  value={format(date, "HH:mm")}
                  onFocus={() => showDateTimePicker("time")}
                />
              </View>
            </View>
            <View style={styles.inputIconView}>
              <Ionicons
                name='ellipsis-horizontal'
                size={20}
                color={inputIconColor}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder='Descrição'
                placeholderTextColor={placeholderTextColor}
                onChangeText={setDescription}
                value={description}
                multiline
              />
            </View>
            {existingExpense && (
              <Pressable
                style={styles.deleteExnsePressable}
                android_ripple={{ color: palette.grey.lighter }}
                onPress={confirmDeleteExpense}
              >
                <Text style={styles.deleteExpenseText}>Deletar Despesa</Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          styles.submitIcon,
          { display: expenseHasBeenModified ? "none" : "flex" },
        ]}
      >
        {!isSubmitLoading ? (
          <TouchableOpacity onPress={sendFormData}>
            <Ionicons name='save' size={30} color='#fff' />
          </TouchableOpacity>
        ) : (
          <ActivityIndicator
            animating
            size='large'
            color={palette.secondary.main}
          />
        )}
      </View>
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
    minHeight: 633,
  },
  childCard: {
    paddingHorizontal: 15,
  },
  inputIconView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    ...borderBottomStyle,
  },
  paidInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...borderBottomStyle,
    height: inputHeight,
  },
  textInputStyle: {
    width: "100%",
    height: inputHeight,
    ...inputText,
  },
  requiredText: {
    fontSize: 18,
    color: "#000",
    marginTop: 15,
    textAlign: "center",
  },
  submitIcon: {
    activeOpacity: 0.1,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    // paddingLeft: 3,
    borderRadius: 100,
    backgroundColor: palette.primary.darker,
    position: "absolute",
    bottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  deleteExnsePressable: {
    padding: 15,
    ...borderBottomStyle,
  },
  deleteExpenseText: {
    textAlign: "center",
    width: "100%",
    color: "red",
    fontSize: 15,
  },
});
