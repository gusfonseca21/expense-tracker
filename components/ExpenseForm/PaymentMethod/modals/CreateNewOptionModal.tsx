import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  inputBorderBottomStyle,
  inputIconColor,
  inputStyles,
  placeholderTextColor,
} from "../../Inputs/inputStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { modalStyles } from "./modalStyles";
import { palette, shadow } from "../../../../utils/styles";
import { allIcons } from "./allIcons";
import Modal from "../../../Modal";
import SelectIconModal from "./SelectIconModal";

const iconSize = {
  height: 24,
  width: 24,
};

type CreateNewOptionModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

type IconToSelectProps = {
  iconSource: number;
  isSelected: boolean;
  position: number;
  onPress: (position: number) => void;
};

function IconToSelect({
  iconSource,
  isSelected,
  position,
  onPress,
}: IconToSelectProps) {
  return (
    <Pressable
      onPress={() => onPress(position)}
      style={{
        height: 35,
        width: 35,
        backgroundColor: isSelected ? palette.primary.lighter : "transparent",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
      }}
    >
      <Image source={iconSource} style={iconSize} />
    </Pressable>
  );
}

export default function CreateNewOptionModal({
  open,
  setOpen,
}: CreateNewOptionModalProps) {
  const [title, setTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(1);
  const [iconsModalOpen, setIconsModalOpen] = useState(false);

  function selectIconHandler(position: number) {
    setSelectedIcon(position);
  }

  return (
    <>
      <SelectIconModal
        iconsModalOpen={iconsModalOpen}
        setIconsModalOpen={setIconsModalOpen}
      />
      <Modal open={open} setOpen={setOpen}>
        <View style={[modalStyles.optionsRootView, { paddingHorizontal: 20 }]}>
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
            Novo método de pagamento
          </Text>
          <View style={inputStyles.inputIconView}>
            <Ionicons name='pencil-sharp' size={20} color={inputIconColor} />
            <TextInput
              style={inputStyles.textInputStyle}
              placeholder='Título'
              placeholderTextColor={placeholderTextColor}
              onChangeText={setTitle}
              value={title}
              maxLength={20}
            />
          </View>
          <View style={[inputStyles.inputIconView, { width: "100%" }]}>
            <Ionicons name='image-outline' size={20} color={inputIconColor} />
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                gap: 35,
              }}
            >
              <View>
                <Text
                  style={[
                    inputStyles.textInputStyle,
                    {
                      color: placeholderTextColor,
                      textAlignVertical: "center",
                    },
                  ]}
                >
                  Ícone
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <IconToSelect
                  position={1}
                  iconSource={allIcons[0]}
                  isSelected={selectedIcon === 1}
                  onPress={selectIconHandler}
                />
                <IconToSelect
                  position={2}
                  iconSource={allIcons[1]}
                  isSelected={selectedIcon === 2}
                  onPress={selectIconHandler}
                />
                <IconToSelect
                  position={3}
                  iconSource={allIcons[2]}
                  isSelected={selectedIcon === 3}
                  onPress={selectIconHandler}
                />
                <View
                  style={{
                    height: 35,
                    width: 70,
                    backgroundColor: palette.primary.lighter,
                    borderRadius: 30,
                    overflow: "hidden",
                  }}
                >
                  <Pressable
                    onPress={() => setIconsModalOpen(true)}
                    android_ripple={{ color: palette.grey.lighter }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        textAlignVertical: "center",
                        height: "100%",
                      }}
                    >
                      Outros...
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 15,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                height: 45,
                width: 150,
                borderRadius: 30,
                borderColor: palette.primary.main,
                borderWidth: 1,
                overflow: "hidden",
              }}
            >
              <Pressable android_ripple={{ color: palette.primary.lighter }}>
                <Text
                  style={{
                    fontSize: 22,
                    color: palette.primary.main,
                    textAlign: "center",
                    textAlignVertical: "center",
                    height: "100%",
                  }}
                >
                  Cancelar
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                height: 45,
                width: 150,
                borderRadius: 30,
                overflow: "hidden",
                ...shadow,
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 22,
                    backgroundColor: palette.primary.main,
                    color: "#fff",
                    fontWeight: "500",
                    textAlign: "center",
                    textAlignVertical: "center",
                    height: "100%",
                  }}
                >
                  Concluído
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selectedIcon: {},
});
