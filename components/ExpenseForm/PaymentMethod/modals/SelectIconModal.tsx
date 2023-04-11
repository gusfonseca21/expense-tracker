import { View, Text, Image } from "react-native";
import React from "react";
import Modal from "../../../Modal";
import { modalStyles } from "./modalStyles";
import { inputBorderBottomStyle, inputStyles } from "../../Inputs/inputStyles";
import { allIcons } from "./allIcons";

type SelectIconModalProps = {
  iconsModalOpen: boolean;
  setIconsModalOpen: (value: boolean) => void;
};

export default function SelectIconModal({
  iconsModalOpen,
  setIconsModalOpen,
}: SelectIconModalProps) {
  return (
    <Modal
      open={iconsModalOpen}
      setOpen={setIconsModalOpen}
      backdropColor='transparent'
    >
      <View
        style={[
          modalStyles.optionsRootView,
          {
            paddingHorizontal: 20,
            flexWrap: "wrap",
            flexDirection: "row",
            gap: 12,
            paddingBottom: 15,
          },
        ]}
      >
        <Text
          style={[
            inputStyles.textInputStyle,
            {
              textAlignVertical: "center",
              ...inputBorderBottomStyle,
              textAlign: "center",
            },
          ]}
        >
          Selecione um ícone
        </Text>
        {allIcons.map((icon) => (
          <Image key={icon} source={icon} style={{ height: 40, width: 40 }} />
        ))}
      </View>
    </Modal>
  );
}
