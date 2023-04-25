import AsyncStorage from "@react-native-async-storage/async-storage";
import { PAYMENT_METHODS_STORAGE } from "../database";
import { PaymentOption } from "../types";
import { callToast, parseAsyncData } from "../helpers";

export async function getPaymentMethods(
  setPaymentOptions: (paymentOptions: PaymentOption[]) => void
) {
  try {
    const response = await AsyncStorage.getItem(PAYMENT_METHODS_STORAGE);

    if (response) setPaymentOptions(JSON.parse(response));
  } catch {
    callToast("Houve um erro ao carregas as opções de pagamento!", 4);
  }
}

export function savePaymentOptions(paymentOptions: PaymentOption[]) {
  AsyncStorage.setItem(PAYMENT_METHODS_STORAGE, JSON.stringify(paymentOptions));
}

export async function saveNewPaymentOptions(
  newPaymentOption: PaymentOption,
  prevPaymentOptions: PaymentOption[],
  setModalOpen: (value: boolean) => void
) {
  const newPaymentOptionsArr = [...prevPaymentOptions, newPaymentOption];
  AsyncStorage.setItem(
    PAYMENT_METHODS_STORAGE,
    JSON.stringify(newPaymentOptionsArr)
  )
    .then(() => {
      callToast("Nova opção de pagamento criada com sucesso!", 4);
      setModalOpen(false);
    })
    .catch(() =>
      callToast("Houve um erro ao criar uma nova opção de pagamento!", 4)
    );
}
