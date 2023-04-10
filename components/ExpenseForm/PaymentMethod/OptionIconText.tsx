import { View, Text, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { PaymentOption } from "../../../utils/types";
import { inputStyles } from "../inputStyles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { palette } from "../../../utils/styles";
import { UserContext } from "../../../context/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";

type OptionIconTextProps = {
  option: PaymentOption;
  selectedOption?: boolean;
};

export default function OptionIconText({
  option,
  selectedOption,
}: OptionIconTextProps) {
  const { setFavPaymentMethod } = useContext(UserContext);

  const logoSize = {
    height: 20,
    width: 20,
  };

  function pressCheckboxHandler(option: PaymentOption) {
    option.isFavourite = !option.isFavourite;
    setFavPaymentMethod(option);
  }

  return (
    <View style={styles.leftOptionView}>
      <Image source={option.logo} style={logoSize} />
      <Text
        style={[inputStyles.textInputStyle, { textAlignVertical: "center" }]}
      >
        {option.label}
      </Text>
      {selectedOption && (
        <View>
          <BouncyCheckbox
            size={32}
            fillColor='#fff'
            isChecked={option.isFavourite}
            unfillColor='#fff'
            innerIconStyle={{ borderWidth: 0 }}
            onPress={() => pressCheckboxHandler(option)}
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

const styles = StyleSheet.create({
  leftOptionView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    width: "77%",
  },
});
