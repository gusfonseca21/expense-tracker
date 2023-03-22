import { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { globalStyles, palette } from "../global/styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../global/types";
import type { RouteProp } from "@react-navigation/native";
import { callToast, getAmount } from "../helpers";
import { format } from "date-fns";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { DB_URL } from "../global/database";
import { ExpensesContext } from "../context/ExpensesContext";

export default function ExpenseDetails() {
  const route = useRoute<RouteProp<RootStackParamList, "ExpenseDetails">>();

  const navigation = useNavigation();

  const { deleteExpense } = useContext(ExpensesContext);

  const { title, amount, date, description, id } = route.params;

  function confirmDeleteExpense() {
    Alert.alert(
      `Deseja excluir a despesa ${title}?`,
      "",
      [
        {
          text: "Deletar",
          onPress: () => deleteExpenseHandler(id),
        },
        {},
        { text: "Cancelar" },
      ],
      {
        cancelable: true,
      }
    );
  }

  function deleteExpenseHandler(expenseId: string | undefined) {
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

  return (
    <View style={globalStyles.pageStyle}>
      <View style={styles.card}>
        <View>
          <Text style={styles.detailTitle}>Título</Text>
          <Text style={styles.detailValue}>{title}</Text>
        </View>
        <View>
          <Text style={styles.detailTitle}>Valor</Text>
          <Text style={styles.detailValue}>{getAmount(amount)}</Text>
        </View>
        <View>
          <Text style={styles.detailTitle}>Data</Text>
          <Text style={styles.detailValue}>
            {format(new Date(date), "dd/MM/yyyy")}
          </Text>
        </View>
        <View>
          <Text style={styles.detailTitle}>Descrição</Text>
          <Text style={[styles.detailValue, { textTransform: "none" }]}>
            {description !== ""
              ? description
              : "Esta despesa não possui uma descrição"}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 100,
        }}
      >
        <View style={styles.iconsView}>
          <Pressable
            onPress={confirmDeleteExpense}
            android_ripple={{ color: palette.grey.dark }}
          >
            <Ionicons
              name='trash-outline'
              size={35}
              color='#fff'
              style={styles.icon}
            />
          </Pressable>
        </View>

        <View style={styles.iconsView}>
          <Pressable
            android_ripple={{ color: palette.grey.dark }}
            style={styles.icon}
          >
            <Ionicons name='pencil-sharp' size={35} color='#fff' />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    gap: 10,
  },
  detailValue: {
    fontSize: 20,
    backgroundColor: palette.primary.dark,
    fontWeight: "bold",
    padding: 1,
    textAlign: "center",
    textTransform: "capitalize",
    color: "#fff",
  },
  detailTitle: {
    fontSize: 20,
    backgroundColor: palette.secondary.main,
    fontWeight: "bold",
    padding: 1,
    textAlign: "center",
    textTransform: "capitalize",
  },
  iconsView: {
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
  },
  icon: {
    padding: 10,
  },
});
