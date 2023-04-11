import { TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  inputIconColor,
  inputStyles,
  placeholderTextColor,
} from "./inputStyles";

type TitleInputProps = {
  title: string;
  setTitle: (value: string) => void;
};

export default function TitleInput({ title, setTitle }: TitleInputProps) {
  return (
    <View style={inputStyles.inputIconView}>
      <Ionicons name='pencil-sharp' size={20} color={inputIconColor} />
      <TextInput
        style={inputStyles.textInputStyle}
        placeholder='Título'
        placeholderTextColor={placeholderTextColor}
        onChangeText={setTitle}
        value={title}
        maxLength={20}
      />
    </View>
  );
}
