import { View, TextInput } from "react-native";
import React from "react";
import {
  inputIconColor,
  inputStyles,
  placeholderTextColor,
} from "./inputStyles";
import Ionicons from "@expo/vector-icons/Ionicons";

type DescriptionInputProps = {
  description: string;
  setDescription: (value: string) => void;
};

export default function DescriptionInput({
  description,
  setDescription,
}: DescriptionInputProps) {
  return (
    <View style={inputStyles.inputIconView}>
      <Ionicons name='ellipsis-horizontal' size={20} color={inputIconColor} />
      <TextInput
        style={inputStyles.textInputStyle}
        placeholder='Descrição'
        placeholderTextColor={placeholderTextColor}
        onChangeText={setDescription}
        value={description}
        multiline
      />
    </View>
  );
}
