import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";

import MaskInput, { Masks } from "react-native-mask-input";

// Styles
import { globalStyles } from "../global/styles";
import { palette } from "../global/styles";

export default function NewExpense() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  function sendExpense() {
    console.log("first");
  }

  return (
    <View style={[globalStyles.pageStyle, { paddingHorizontal: 20 }]}>
      <TextInput
        style={styles.input}
        placeholder='Título'
        onChangeText={setName}
        value={name}
      />
      <MaskInput
        style={styles.input}
        placeholder='Valor'
        onChangeText={(_, unmasked) => setAmount(unmasked)}
        inputMode='numeric'
        value={amount}
        mask={Masks.BRL_CURRENCY}
      />
      <MaskInput
        style={styles.input}
        placeholder='Data'
        onChangeText={setDate}
        inputMode='numeric'
        value={date}
        mask={Masks.DATE_DDMMYYYY}
      />
      <TextInput
        style={styles.input}
        placeholder='Descrição'
        onChangeText={setDescription}
        value={description}
        multiline
      />
      <Button
        onPress={sendExpense}
        title='Adicionar Despesa'
        color='#841584'
        accessibilityLabel='Learn more about this purple button'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: palette.secondary.main,
    padding: 10,
    marginBottom: 15,
    fontSize: 20,
  },
});
