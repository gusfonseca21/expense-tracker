import AsyncStorage from "@react-native-async-storage/async-storage";
import { PAYMENT_METHODS_STORAGE } from "../database";
import { PaymentOption } from "../types";
import { parseAsyncData } from "../helpers";

export function getPaymentMethods(
  setPaymentOptions: (PaymentOptions: PaymentOption[]) => void
) {
  AsyncStorage.getItem(PAYMENT_METHODS_STORAGE)
    .then((response) => {
      response && setPaymentOptions(JSON.parse(response));
    })
    .catch();
}

export function saveFavouritePaymentMethod(PaymentOptions: PaymentOption[]) {
  AsyncStorage.setItem(PAYMENT_METHODS_STORAGE, JSON.stringify(PaymentOptions));
}
