import { View, Text } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { inputStyles, inputText } from "./inputStyles";
import { Image } from "react-native";
import { palette } from "../../utils/styles";
import Modal from "react-native-modal";
import { TextInput } from "react-native";
import { Pressable } from "react-native";

const logoPix = require("../../assets/icons/logo-pix.png");
const logoDinheiro = require("../../assets/icons/logo-dinheiro.png");
const logoDebito = require("../../assets/icons/logo-debito.png");
const logoCredito = require("../../assets/icons/logo-credito.png");

type PaymentMethodProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  value: string | null;
  setValue: Dispatch<SetStateAction<null>>;
};

const logoStyle = {
  height: 24,
  width: 24,
};

const initialCardPosition = -400;

export default function PaymentMethod({
  open,
  setOpen,
  value,
  setValue,
}: PaymentMethodProps) {
  const [paymentOptions, setPaymentOptions] = useState([
    {
      label: "PIX",
      value: "pix",
      logo: () => <Image source={logoPix} style={logoStyle} />,
    },
    {
      label: "Dinheiro",
      value: "dinheiro",
      logo: () => <Image source={logoDinheiro} style={logoStyle} />,
    },
    {
      label: "Débito",
      value: "debito",
      logo: () => <Image source={logoDebito} style={logoStyle} />,
    },
    {
      label: "Crédito",
      value: "credito",
      logo: () => <Image source={logoCredito} style={logoStyle} />,
    },
  ]);
  const [bottomPosition, setBottomPosition] = useState(initialCardPosition);

  useEffect(() => {
    if (!open) setBottomPosition(initialCardPosition);
  }, [open]);

  function swipeHandler(direction: string) {
    if (direction === "down") setOpen(false);
    if (direction === "up") setBottomPosition(-110);
  }

  console.log(bottomPosition);

  return (
    <View style={inputStyles.inputIconView}>
      <Modal
        isVisible={open}
        onSwipeMove={(value) => console.log(value)}
        scrollHorizontal={false}
        onSwipeComplete={(event) => {
          console.log(event);
          swipeHandler(event.swipingDirection);
        }}
        swipeDirection={["up", "down"]}
        style={{ flex: 1, margin: 0, position: "relative" }}
        onBackdropPress={() => setOpen(false)}
        onBackButtonPress={() => setOpen(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            position: "absolute",
            bottom: bottomPosition,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <Text>Oi</Text>
        </View>
      </Modal>
      <Pressable onPress={() => setOpen(true)}>
        <Text
          style={[inputStyles.textInputStyle, { textAlignVertical: "center" }]}
        >
          Forma de pagamento
        </Text>
      </Pressable>
      {/* <TextInput
        style={inputStyles.textInputStyle}
        value={"teste"}
        onFocus={() => setOpen(true)}
        disable
      /> */}
    </View>
  );
}
