import React, { createContext, useEffect, useState } from "react";
import { PaymentOption } from "../utils/types";
import {
  getPaymentMethods,
  saveFavouritePaymentMethod,
} from "../utils/Async Storage Functions/submitPaymentMethods";

const logoPix = require("../assets/icons/logo-pix.png");
const logoDinheiro = require("../assets/icons/logo-dinheiro.png");
const logoDebito = require("../assets/icons/logo-debito.png");
const logoCredito = require("../assets/icons/logo-credito.png");

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

export const UserContext = createContext<{
  paymentOptions: PaymentOption[];
  favouritePaymentMethod: (updatedMethod: PaymentOption) => void;
}>({
  paymentOptions: defaultPaymentOptions,
  favouritePaymentMethod: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [paymentOptions, setPaymentOptions] = useState(defaultPaymentOptions);

  useEffect(() => {
    getPaymentMethods(setPaymentOptions);
  }, []);

  function favouritePaymentMethod(updatedMethod: PaymentOption) {
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

    saveFavouritePaymentMethod(updatedOptions);
    setPaymentOptions(updatedOptions);
  }

  return (
    <UserContext.Provider value={{ paymentOptions, favouritePaymentMethod }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
