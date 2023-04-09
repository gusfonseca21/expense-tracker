import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { PaymentOption } from "../../../../utils/types";
import { palette } from "../../../../utils/styles";
import { inputBorderBottomStyle, inputStyles } from "../../inputStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import OptionIconText from "../OptionIconText";

type PaymentOptionsProps = {
  openOptionsModal: boolean;
  setOpenOptionsModal: (value: boolean) => void;
  paymentOptions: PaymentOption[];
  setValue: (selectedOptionValue: string) => void;
  selectedValue: string | null;
  setSelectedValue: (selectedOptionValue: string) => void;
};

export default function PaymentOptionsModal({
  openOptionsModal,
  setOpenOptionsModal,
  paymentOptions,
  setValue,
  selectedValue,
  setSelectedValue,
}: PaymentOptionsProps) {
  function renderItemComponent(item: PaymentOption) {
    function onPressOptionHandler() {
      setSelectedValue(item.value);
      setValue(item.value);
      setOpenOptionsModal(false);
    }

    return (
      <Pressable
        android_ripple={{ color: palette.grey.lighter }}
        onPress={onPressOptionHandler}
      >
        <View style={styles.itemView}>
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

  return (
    <Modal
      isVisible={openOptionsModal}
      scrollHorizontal={false}
      onSwipeComplete={() => setOpenOptionsModal(false)}
      swipeDirection={["down"]}
      style={{ margin: 0, justifyContent: "flex-end" }}
      onBackdropPress={() => setOpenOptionsModal(false)}
      onBackButtonPress={() => setOpenOptionsModal(false)}
      animationOut='slideOutDown'
      backdropTransitionOutTiming={0}
    >
      <View style={styles.flatListWrapper}>
        <FlatList
          data={paymentOptions}
          renderItem={({ item }) => renderItemComponent(item)}
          ListFooterComponent={() => (
            <Pressable android_ripple={{ color: palette.grey.lighter }}>
              <View style={[styles.itemView, { gap: 6 }]}>
                <Ionicons name='add-circle-outline' size={22} />
                <Text
                  style={[
                    inputStyles.textInputStyle,
                    { textAlignVertical: "center" },
                  ]}
                >
                  Adicionar forma de pagamento
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flatListWrapper: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },

  itemView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...inputBorderBottomStyle,
  },
});
