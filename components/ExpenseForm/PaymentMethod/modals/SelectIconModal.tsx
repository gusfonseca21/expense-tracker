import { View, Text, Image } from "react-native";
import React, { ReactNode } from "react";
import Modal from "../../../Modal";
import { modalStyles } from "./modalStyles";
import { inputBorderBottomStyle, inputStyles } from "../../Inputs/inputStyles";
import { allIcons } from "./allIcons";
import SelectableIcon from "./SelectableIcon";

type SelectIconModalProps = {
  iconsModalOpen: boolean;
  setIconsModalOpen: (value: boolean) => void;
  selectedIcon: number;
  setSelectedIcon: (icon: number) => void;
};

export default function SelectIconModal({
  iconsModalOpen,
  setIconsModalOpen,
  selectedIcon,
  setSelectedIcon,
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
            paddingBottom: 15,
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
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
              width: "100%",
            },
          ]}
        >
          Selecione um ícone
        </Text>
        {allIcons.map((icon, index) => (
          <View
            key={icon}
            style={{
              width: "25%",
              padding: 5,
              alignItems: "center",
            }}
          >
            <SelectableIcon
              iconSource={icon}
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
              setOpenSelectIconModal={setIconsModalOpen}
            />
          </View>
        ))}
      </View>
    </Modal>
  );
}
