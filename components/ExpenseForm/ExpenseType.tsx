import { View, Text, Animated, ScrollView } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
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

const fullHeightViewPos = 94;

const startBottomViewPos = { x: 0, y: 300 };

export default function ExpenseType({
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

  const viewRef = useRef(null);

  const animatedValue = useRef(new Animated.ValueXY()).current;

  function swipeCompleteHandler(event: { swipingDirection: string }) {
    const direction = event.swipingDirection;
    if (direction === "down") setOpen(false);
  }

  function scrollToHandler(event: { y: number }) {
    if (event.y > 10) {
      Animated.timing(animatedValue, {
        toValue: { x: 0, y: fullHeightViewPos },
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }

  useEffect(() => {
    animatedValue.setValue(startBottomViewPos);
  }, [open]);

  const animatedStyle = {
    transform: animatedValue.getTranslateTransform(),
  };

  return (
    <View style={inputStyles.inputIconView}>
      <Modal
        isVisible={open}
        scrollHorizontal={false}
        onSwipeComplete={(event) => swipeCompleteHandler(event)}
        swipeDirection={["down"]}
        style={{ flex: 1, margin: 0, position: "relative" }}
        onBackdropPress={() => setOpen(false)}
        onBackButtonPress={() => setOpen(false)}
        scrollTo={(event) => scrollToHandler(event)}
        scrollOffset={10}
      >
        <Animated.View
          ref={viewRef}
          style={[
            {
              backgroundColor: "white",
              width: "100%",
              height: 1200,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              // transform: animatedValue.getTranslateTransform(),
            },
            animatedStyle,
          ]}
        >
          <ScrollView style={{ height: "100%" }}>
            <View
              style={{
                height: 300,
                width: 300,
                bottom: -210,
                backgroundColor: "red",
              }}
            />
          </ScrollView>
        </Animated.View>
      </Modal>
      <Pressable onPress={() => setOpen(true)}>
        <Text
          style={[inputStyles.textInputStyle, { textAlignVertical: "center" }]}
        >
          Forma de pagamento
        </Text>
      </Pressable>
    </View>
  );
}
