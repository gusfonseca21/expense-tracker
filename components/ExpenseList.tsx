import { View, Text, SectionList, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Dinero from "dinero.js";
// Tipos
import { Expense, RootStackParamList } from "../global/types";

// Estilos
import { palette } from "../global/styles";

export default function ExpenseList({
  expenses,
}: {
  expenses: {
    title: string;
    data: Expense[];
  }[];
}) {
  function transformAmount(amount: number) {
    return Dinero({ amount: amount, currency: "BRL" }).toFormat("$0,0.00");
  }

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SectionList
      style={styles.section}
      sections={expenses}
      renderItem={({ item }) => (
        <Pressable
          android_ripple={{ color: palette.grey.main }}
          onPress={() => navigation.navigate("ExpenseDetails", item)}
          style={styles.item}
        >
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>{transformAmount(item.amount)}</Text>
          </View>
        </Pressable>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: palette.primary.lighter,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  header: {
    fontSize: 20,
    backgroundColor: palette.secondary.main,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
    padding: 1,
    textAlign: "center",
    textTransform: "capitalize",
  },
  title: {
    fontSize: 20,
  },
  priceBox: {
    backgroundColor: palette.primary.darker,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  priceText: {
    fontSize: 18,
    color: "white",
  },
});
