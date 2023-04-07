import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";

import { Dispatch, SetStateAction, useContext } from "react";

import { inputStyles } from "./inputStyles";
import Modal from "react-native-modal";
import { inputBorderBottomStyle } from "./inputStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { palette } from "../../utils/styles";
import { UserContext } from "../../context/UserContext";
import { PaymentOption } from "../../utils/types";

type PaymentMethodProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  value: string | null;
  setValue: Dispatch<SetStateAction<string>>;
};

const logoStyle = {
  height: 20,
  width: 20,
};

export default function PaymentMethod({
  open,
  setOpen,
  value,
  setValue,
}: PaymentMethodProps) {
  const { paymentOptions } = useContext(UserContext);

  function renderOptionIconText(option: PaymentOption) {
    return (
      <View style={styles.leftOptionView}>
        <Image source={option.logo} style={logoStyle} />
        <Text
          style={[inputStyles.textInputStyle, { textAlignVertical: "center" }]}
        >
          {option.label}
        </Text>
      </View>
    );
  }

  function renderItemComponent(item: PaymentOption) {
    function onPressOptionHandler() {
      setValue(item.value);
      setOpen(false);
    }

    return (
      <Pressable
        android_ripple={{ color: palette.grey.lighter }}
        onPress={onPressOptionHandler}
      >
        <View style={styles.itemView}>
          {renderOptionIconText(item)}
          <Ionicons
            name='checkmark-circle'
            color={palette.primary.main}
            size={24}
            style={{ opacity: value === item.value ? 1 : 0 }}
          />
        </View>
      </Pressable>
    );
  }

  function renderSelectedOption() {
    const selectedOption = paymentOptions.filter(
      (option) => option.value === value
    )[0];

    return renderOptionIconText(selectedOption);
  }

  return (
    <View style={inputStyles.inputIconView}>
      <Modal
        isVisible={open}
        scrollHorizontal={false}
        onSwipeComplete={() => setOpen(false)}
        swipeDirection={["down"]}
        style={{ flex: 1, margin: 0, justifyContent: "flex-end" }}
        onBackdropPress={() => setOpen(false)}
        onBackButtonPress={() => setOpen(false)}
        animationOut='slideOutDown'
        backdropTransitionOutTiming={0}
      >
        <View style={styles.flatListWrapper}>
          <FlatList
            data={paymentOptions}
            renderItem={({ item }) => renderItemComponent(item)}
            ListFooterComponent={() => (
              <Pressable android_ripple={{ color: palette.grey.lighter }}>
                <View style={styles.itemView}>
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
      <Pressable onPress={() => setOpen(true)} style={{ flex: 1 }}>
        {renderSelectedOption()}
      </Pressable>
    </View>
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
  leftOptionView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "50%",
  },
});
