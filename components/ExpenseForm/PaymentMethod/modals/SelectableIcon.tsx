import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { palette } from "../../../../utils/styles";

const iconSize = {
  height: 24,
  width: 24,
};

type SelectableIconProps = {
  iconSource: number;
  selectedIcon: number;
  setSelectedIcon: (icon: number) => void;
  setOpenSelectIconModal?: (value: boolean) => void;
};

export default function SelectableIcon({
  iconSource,
  selectedIcon,
  setSelectedIcon,
  setOpenSelectIconModal,
}: SelectableIconProps) {
  function selectIconHandler() {
    setSelectedIcon(iconSource);
    if (setOpenSelectIconModal) setOpenSelectIconModal(false);
  }

  return (
    <Pressable
      onPress={selectIconHandler}
      style={{
        height: 35,
        width: 35,
        backgroundColor:
          iconSource === selectedIcon ? palette.primary.lighter : "transparent",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
      }}
    >
      <Image source={iconSource} style={iconSize} />
    </Pressable>
  );
}
