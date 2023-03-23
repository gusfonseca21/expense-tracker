import { View, Text, SectionList, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAmount } from "../helpers";

// Tipos
import { AppNavigationProp, Expense } from "../global/types";

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
  const navigation = useNavigation<AppNavigationProp>();

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
            <Text style={styles.priceText}>{getAmount(item.amount)}</Text>
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
    width: "100%",
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
