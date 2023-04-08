import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";

import { Dispatch, SetStateAction, useContext, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

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
  setValue: Dispatch<SetStateAction<string | null>>;
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
  const [selectedValue, setSelectedValue] = useState(value);

  const { paymentOptions, favouritePaymentMethod } = useContext(UserContext);

  function renderOptionIconText(
    option: PaymentOption,
    selectedOption?: boolean
  ) {
    return (
      <View style={styles.leftOptionView}>
        <Image source={option.logo} style={logoStyle} />
        <Text
          style={[inputStyles.textInputStyle, { textAlignVertical: "center" }]}
        >
          {option.label}
        </Text>
        {selectedOption && (
          <View>
            <BouncyCheckbox
              size={32}
              fillColor={palette.secondary.main}
              isChecked={option.isFavourite}
              unfillColor='#fff'
              innerIconStyle={{ borderWidth: 1 }}
              onPress={() => {
                option.isFavourite = !option.isFavourite;
                favouritePaymentMethod(option);
              }}
              disableBuiltInState
              disableText
              iconComponent={
                <Ionicons
                  name={option.isFavourite ? "bookmark" : "bookmark-outline"}
                  size={20}
                  color={palette.primary.main}
                />
              }
              style={{ justifyContent: "flex-end", padding: 2 }}
            />
          </View>
        )}
      </View>
    );
  }

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
        <View style={styles.itemView}>
          {renderOptionIconText(item)}
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

  function renderSelectedOption() {
    const selectedOption = paymentOptions.find(
      (option) => option.value === selectedValue
    );

    return selectedOption ? renderOptionIconText(selectedOption, true) : null;
  }

  return (
    <View style={inputStyles.inputIconView}>
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
      <Pressable onPress={() => setOpen(true)}>
        {renderSelectedOption()}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  leftOptionView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    width: "77%",
  },
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
