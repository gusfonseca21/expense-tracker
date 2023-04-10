import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import Modal from "react-native-modal";
import {
  inputBorderBottomStyle,
  inputIconColor,
  inputStyles,
  placeholderTextColor,
} from "../../inputStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { modalStyles } from "./modalStyles";

type CreateNewOptionModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function CreateNewOptionModal({
  open,
  setOpen,
}: CreateNewOptionModalProps) {
  const [title, setTitle] = useState("");

  return (
    <Modal
      isVisible={open}
      scrollHorizontal={false}
      onSwipeComplete={() => setOpen(false)}
      swipeDirection={["down"]}
      style={{ margin: 0, justifyContent: "flex-end" }}
      onBackdropPress={() => setOpen(false)}
      onBackButtonPress={() => setOpen(false)}
      animationOut='slideOutDown'
      backdropTransitionOutTiming={0}
    >
      <View style={modalStyles.optionsRootView}>
        <Text
          style={[
            inputStyles.textInputStyle,
            { textAlignVertical: "center", paddingHorizontal: 10 },
          ]}
        >
          Novo método de pagamento
        </Text>
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
