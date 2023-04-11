import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { PaymentOption } from "../../../../utils/types";
import { palette } from "../../../../utils/styles";
import { inputStyles } from "../../Inputs/inputStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import OptionIconText from "../OptionIconText";
import { modalStyles } from "./modalStyles";
import Modal from "../../../Modal";

type PaymentOptionsProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  paymentOptions: PaymentOption[];
  setValue: (selectedOptionValue: string) => void;
  selectedValue: string | null;
  setSelectedValue: (selectedOptionValue: string) => void;
  setCreatePayMethodModalOpen: (value: boolean) => void;
};

export default function PaymentOptionsModal({
  open,
  setOpen,
  paymentOptions,
  setValue,
  selectedValue,
  setSelectedValue,
  setCreatePayMethodModalOpen,
}: PaymentOptionsProps) {
  function renderItemComponent(item: PaymentOption) {
    function onPressOptionHandler() {
      setSelectedValue(item.value);
      setValue(item.value);
      setOpen(false);
    }

    return (
      <Pressable
        android_ripple={{ color: palette.grey.lighter }}
        onPress={onPressOptionHandler}
      >
        <View style={modalStyles.optionView}>
          <OptionIconText option={item} />
          <Ionicons
            name='checkmark-circle'
            color={palette.primary.main}
            size={24}
            style={{ opacity: selectedValue === item.value ? 1 : 0 }}
          />
        </View>
      </Pressable>
    );
  }

  function createPayMethodHandler() {
    setOpen(false);
    setCreatePayMethodModalOpen(true);
  }

  const createPayMethodComponent = (
    <Pressable
      onPress={createPayMethodHandler}
      android_ripple={{ color: palette.grey.lighter }}
    >
      <View style={[modalStyles.optionView, { gap: 6 }]}>
        <Ionicons name='add-circle-outline' size={22} />
        <Text
          style={[inputStyles.textInputStyle, { textAlignVertical: "center" }]}
        >
          Adicionar forma de pagamento
        </Text>
      </View>
    </Pressable>
  );

  return (
    <Modal open={open} setOpen={setOpen}>
      <View style={modalStyles.optionsRootView}>
        <FlatList
          data={paymentOptions}
          renderItem={({ item }) => renderItemComponent(item)}
          ListFooterComponent={() => createPayMethodComponent}
        />
      </View>
    </Modal>
  );
}
