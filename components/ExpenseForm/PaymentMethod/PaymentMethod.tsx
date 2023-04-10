import { View, Pressable } from "react-native";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { inputStyles } from "../inputStyles";
import { UserContext } from "../../../context/UserContext";
import PaymentOptionsModal from "./modals/PaymentOptionsModal";
import OptionIconText from "./OptionIconText";
import CreateNewOptionModal from "./modals/CreateNewOptionModal";

type PaymentMethodProps = {
  openOptionsModal: boolean;
  setOpenOptionsModal: Dispatch<SetStateAction<boolean>>;
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
};

export default function PaymentMethod({
  openOptionsModal,
  setOpenOptionsModal,
  value,
  setValue,
}: PaymentMethodProps) {
  const [selectedValue, setSelectedValue] = useState(value);
  const [openCreateOptionModal, setOpenCreateOptionModal] = useState(false);

  const { paymentOptions } = useContext(UserContext);

  function renderSelectedOption() {
    const selectedOption = paymentOptions.find(
      (option) => option.value === selectedValue
    );

    return selectedOption ? (
      <OptionIconText option={selectedOption} selectedOption />
    ) : null;
  }
  const optionsModalProps = {
    open: openOptionsModal,
    setOpen: setOpenOptionsModal,
    paymentOptions,
    setValue,
    selectedValue,
    setSelectedValue,
    setCreatePayMethodModalOpen: setOpenCreateOptionModal,
  };

  const createOptionModalProps = {
    open: openCreateOptionModal,
    setOpen: setOpenCreateOptionModal,
  };

  return (
    <View style={inputStyles.inputIconView}>
      <PaymentOptionsModal {...optionsModalProps} />
      <CreateNewOptionModal {...createOptionModalProps} />
      <Pressable onPress={() => setOpenOptionsModal(true)}>
        {renderSelectedOption()}
      </Pressable>
    </View>
  );
}
