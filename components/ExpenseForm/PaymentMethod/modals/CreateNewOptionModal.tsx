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
import { useContext, useEffect, useState } from "react";
import { modalStyles } from "./modalStyles";
import { palette, shadow } from "../../../../utils/styles";
import { allIcons } from "./allIcons";
import Modal from "../../../Modal";
import SelectIconModal from "./SelectIconModal";
import SelectableIcon from "./SelectableIcon";
import { callToast } from "../../../../utils/helpers";
import { UserContext } from "../../../../context/UserContext";
import { PaymentOption } from "../../../../utils/types";

type CreateNewOptionModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const firstIcon = allIcons[0];

export default function CreateNewOptionModal({
  open,
  setOpen,
}: CreateNewOptionModalProps) {
  const [title, setTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(firstIcon);
  const [iconsModalOpen, setIconsModalOpen] = useState(false);
  const [firstRenderedIcon, setFirstRenderedIcon] = useState(firstIcon);

  const { addPaymentOption, paymentOptions } = useContext(UserContext);

  console.log(paymentOptions);

  useEffect(() => {
    if (!open) setFirstRenderedIcon(firstIcon);
  }, [open]);

  useEffect(() => {
    if (
      selectedIcon !== allIcons[0] &&
      selectedIcon !== allIcons[1] &&
      selectedIcon !== allIcons[2]
    ) {
      setFirstRenderedIcon(selectedIcon);
    }
  }, [selectedIcon]);

  function addPayMethodHandler() {
    if (title.trim() === "") {
      callToast("É preciso definir um Título", 4);
      return;
    }
    const newPayMethod: PaymentOption = {
      label: title,
      value: title.trim().toLowerCase(),
      logo: selectedIcon,
      isFavourite: false,
    };

    addPaymentOption(newPayMethod);
  }

  return (
    <>
      <SelectIconModal
        iconsModalOpen={iconsModalOpen}
        setIconsModalOpen={setIconsModalOpen}
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
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
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                gap: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  width: "30%",
                }}
              >
                <Ionicons
                  name='image-outline'
                  size={20}
                  color={inputIconColor}
                />
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
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "60%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    width: 125,
                  }}
                >
                  <SelectableIcon
                    iconSource={firstRenderedIcon}
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                  />
                  <SelectableIcon
                    iconSource={allIcons[1]}
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                  />
                  <SelectableIcon
                    iconSource={allIcons[2]}
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                  />
                </View>
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
              <Pressable
                onPress={() => setOpen(false)}
                android_ripple={{ color: palette.primary.lighter }}
              >
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
              <TouchableOpacity onPress={addPayMethodHandler}>
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
