import AsyncStorage from "@react-native-async-storage/async-storage";
import { PAYMENT_METHODS_STORAGE } from "../database";
import { PaymentOption } from "../types";
import { parseAsyncData } from "../helpers";

export function getPaymentMethods() {
  return AsyncStorage.getItem(PAYMENT_METHODS_STORAGE)
    .then((response) => {
      response && JSON.parse(response);
    })
    .catch();
}

export function savePaymentOptions(PaymentOptions: PaymentOption[]) {
  AsyncStorage.setItem(PAYMENT_METHODS_STORAGE, JSON.stringify(PaymentOptions));
}
