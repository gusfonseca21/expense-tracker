import { View, Text, Switch } from "react-native";
import React from "react";
import { palette } from "../../utils/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { inputStyles, inputText } from "./inputStyles";

type PaidInputProps = {
  paid: boolean;
  setPaid: (prevState: boolean) => void;
};

export default function PaidInput({ paid, setPaid }: PaidInputProps) {
  return (
    <View
      style={[inputStyles.paidInputView, { zIndex: 100, paddingRight: 6.3 }]}
    >
      <View style={[inputStyles.inputIconView, { borderBottomWidth: 0 }]}>
        <Ionicons name='logo-usd' size={22} color={paid ? "green" : "red"} />
        <Text style={inputText}>Pago</Text>
      </View>
      <Switch
        trackColor={{
          false: palette.grey.light,
          true: palette.grey.light,
        }}
        thumbColor={paid ? palette.secondary.main : palette.grey.darker}
        onValueChange={() => setPaid(!paid)}
        value={paid}
      />
    </View>
  );
}
