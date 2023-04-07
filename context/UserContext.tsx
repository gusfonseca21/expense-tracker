import React, { createContext, useState } from "react";
import { PaymentOption } from "../utils/types";

const logoPix = require("../assets/icons/logo-pix.png");
const logoDinheiro = require("../assets/icons/logo-dinheiro.png");
const logoDebito = require("../assets/icons/logo-debito.png");
const logoCredito = require("../assets/icons/logo-credito.png");

const defaultPaymentOptions = [
  {
    label: "PIX",
    value: "pix",
    logo: logoPix,
  },
  {
    label: "Dinheiro",
    value: "dinheiro",
    logo: logoDinheiro,
  },
  {
    label: "Débito",
    value: "debito",
    logo: logoDebito,
  },
  {
    label: "Crédito",
    value: "credito",
    logo: logoCredito,
  },
];

export const UserContext = createContext<{
  paymentOptions: PaymentOption[];
}>({
  paymentOptions: defaultPaymentOptions,
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [paymentOptions, setPaymentOptions] = useState(defaultPaymentOptions);

  return (
    <UserContext.Provider value={{ paymentOptions }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
