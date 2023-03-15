import { View, Text, SectionList, StyleSheet } from "react-native";
import React from "react";

// Tipos
import Expense from "../../global/types";

import { palette } from "../../global/styles";

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
      style={styles.section}
      sections={expenses}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.leftView}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>{item.amount}</Text>
          </View>
        </View>
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
    padding: 2,
    marginVertical: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    backgroundColor: palette.secondary.main,
    marginVertical: 5,
    fontWeight: "bold",
    padding: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
  },
  priceBox: {},
  priceText: {
    fontSize: 20,
  },
  leftView: {},
});
