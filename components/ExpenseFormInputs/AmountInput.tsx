import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CurrencyInput from "react-native-currency-input";
import { Expense } from "../../utils/types";

const valueTextColor = "#fff";

type AmountInputProps = {
  amount: number;
  setAmount: (value: number) => void;
  existingExpense: Expense | undefined;
};

export default function AmountInput({
  amount,
  setAmount,
  existingExpense,
}: AmountInputProps) {
  return (
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
});
