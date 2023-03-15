import { View, Text, SectionList, StyleSheet } from "react-native";
import React from "react";

// Tipos
import Expense from "../../global/types";

// Data
import format from "date-fns/format";

// Estilos
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
      renderItem={({ item, index }) => (
        <View style={[styles.item, index === 0 && styles.firstItem]}>
          <View style={styles.leftView}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>{`R$ ${item.amount}`}</Text>
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
  firstItem: {
    marginTop: 5,
  },
  item: {
    backgroundColor: palette.primary.lighter,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    backgroundColor: palette.secondary.main,
    marginTop: 10,
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
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  priceText: {
    fontSize: 20,
    color: "white",
  },
  leftView: {},
});
