import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { palette, shadow } from "../../utils/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

type SubmitButtonProps = {
  expenseHasBeenModified: boolean;
  isSubmitLoading: boolean;
  sendFormData: () => void;
};

export default function SubmitButton({
  expenseHasBeenModified,
  isSubmitLoading,
  sendFormData,
}: SubmitButtonProps) {
  return (
    <View
      style={[
        styles.submitIcon,
        { display: expenseHasBeenModified ? "none" : "flex" },
      ]}
    >
      {!isSubmitLoading ? (
        <TouchableOpacity onPress={sendFormData}>
          <Ionicons name='save' size={30} color='#fff' />
        </TouchableOpacity>
      ) : (
        <ActivityIndicator
          animating
          size='large'
          color={palette.secondary.main}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  submitIcon: {
    activeOpacity: 0.1,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: palette.primary.darker,
    position: "absolute",
    bottom: 10,
    ...shadow,
  },
});
