import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { inputBorderBottomStyle } from "./inputStyles";
import { palette } from "../../utils/styles";

type DeleteExpenseButtonProps = {
  isDeleteLoading: boolean;
  deleteExpenseHandler: () => void;
};

export default function DeleteExpenseButton({
  isDeleteLoading,
  deleteExpenseHandler,
}: DeleteExpenseButtonProps) {
  return (
    <>
      {isDeleteLoading ? (
        <ActivityIndicator
          style={styles.deleteExpense}
          animating
          size='small'
          color='red'
        />
      ) : (
        <Pressable
          style={styles.deleteExpense}
          android_ripple={{ color: palette.grey.lighter }}
          onPress={deleteExpenseHandler}
        >
          <Text style={styles.deleteExpenseText}>Deletar Despesa</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  deleteExpense: {
    padding: 15,
    ...inputBorderBottomStyle,
  },
  deleteExpenseText: {
    textAlign: "center",
    width: "100%",
    color: "red",
    fontSize: 15,
  },
});
