import { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { globalStyles, palette } from "../global/styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AppNavigationProp, RootStackParamList } from "../global/types";
import type { RouteProp } from "@react-navigation/native";
import { callToast, getAmount } from "../helpers";
import { format } from "date-fns";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { DB_URL } from "../global/database";
import { ExpensesContext } from "../context/ExpensesContext";

const iconColor = palette.primary.lighter;

export default function ExpenseDetails() {
  const route = useRoute<RouteProp<RootStackParamList, "ExpenseDetails">>();

  const navigation = useNavigation<AppNavigationProp>();

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
      <View style={styles.expense}>
        <Text style={styles.expenseDetail}>{title}</Text>
        <Text style={styles.expenseDetail}>{getAmount(amount)}</Text>
        <Text style={styles.expenseDetail}>
          {format(new Date(date), "dd/MM/yyyy HH:mm")}
        </Text>
        <Text style={styles.expenseDetail}>{description}</Text>
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
              color={iconColor}
              style={styles.icon}
            />
          </Pressable>
        </View>

        <View style={styles.iconsView}>
          <Pressable
            android_ripple={{ color: palette.grey.dark }}
            style={styles.icon}
            onPress={() => navigation.navigate("EditExpense", route.params)}
          >
            <Ionicons name='pencil-sharp' size={35} color={iconColor} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  expense: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
  },
  expenseDetail: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
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
