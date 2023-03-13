import { View, Text, SectionList, StyleSheet } from "react-native";
import React from "react";

// Tipos
import Expense from "../../global/types";

export default function ExpenseList({
  expenses,
}: {
  expenses: {
    title: string;
    data: Expense[];
  }[];
}) {
  return (
    <SectionList
      sections={expenses}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.amount}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
    width: 300,
  },
  title: {
    fontSize: 24,
  },
});
