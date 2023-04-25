import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { PaymentOption } from "../utils/types";
import {
  getPaymentMethods,
  savePaymentOptions,
} from "../utils/async-storage-function/submitPaymentMethods";
import { clearAllExpenses, clearPaymentMethods } from "../utils/helpers";

const logoPix = require("../assets/icons/payment-method/logo-pix.png");
const logoDinheiro = require("../assets/icons/payment-method/logo-dinheiro.png");
const logoDebito = require("../assets/icons/payment-method/logo-debito.png");
const logoCredito = require("../assets/icons/payment-method/logo-credito.png");

const defaultPaymentOptions = [
  {
    label: "PIX",
    value: "pix",
    logo: logoPix,
    isFavourite: false,
  },
  {
    label: "Dinheiro",
    value: "dinheiro",
    logo: logoDinheiro,
    isFavourite: false,
  },
  {
    label: "Débito",
    value: "debito",
    logo: logoDebito,
    isFavourite: false,
  },
  {
    label: "Crédito",
    value: "credito",
    logo: logoCredito,
    isFavourite: false,
  },
];

clearPaymentMethods();

export const UserContext = createContext<{
  paymentOptions: PaymentOption[];
  setFavPaymentMethod: (updatedMethod: PaymentOption) => void;
  addPaymentOption: (newPaymentOption: PaymentOption) => void;
}>({
  paymentOptions: defaultPaymentOptions,
  setFavPaymentMethod: () => {},
  addPaymentOption: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [paymentOptions, setPaymentOptions] = useState(defaultPaymentOptions);

  useLayoutEffect(() => {
    getPaymentMethods(setPaymentOptions);
  }, []);

  function setFavPaymentMethod(updatedMethod: PaymentOption) {
    const updatedOptions = paymentOptions.map((prevMethod) =>
      prevMethod.value === updatedMethod.value ? updatedMethod : prevMethod
    );

    if (updatedMethod.isFavourite) {
      const favouriteOption = updatedOptions.find(
        (option) => option.value === updatedMethod.value
      );
      if (favouriteOption) {
        updatedOptions.forEach((option) => {
          option.isFavourite = option === favouriteOption;
        });
      }
    }

    savePaymentOptions(updatedOptions);
    setPaymentOptions(updatedOptions);
  }

  function addPaymentOption(newPaymentMethod: PaymentOption) {
    setPaymentOptions((prevState) => [...prevState, newPaymentMethod]);
  }

  return (
    <UserContext.Provider
      value={{ paymentOptions, setFavPaymentMethod, addPaymentOption }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
