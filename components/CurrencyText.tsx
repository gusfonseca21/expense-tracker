import { StyleProp, ViewStyle, TextStyle } from "react-native";
import React from "react";
import CurrencyInput from "react-native-currency-input";

type CurrencyTextProps = {
  amount: number;
  style?: StyleProp<ViewStyle | TextStyle>;
};

export default function CurrencyText({ amount, style }: CurrencyTextProps) {
  return (
    <CurrencyInput
      style={style}
      value={amount}
      prefix='R$'
      delimiter='.'
      separator=','
      editable={false}
    />
  );
}
