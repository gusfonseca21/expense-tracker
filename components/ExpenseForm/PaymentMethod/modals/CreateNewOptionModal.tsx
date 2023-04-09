import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { inputBorderBottomStyle } from "../../inputStyles";

export default function CreateNewOptionModal() {
  return (
    <Modal
      isVisible={open}
      scrollHorizontal={false}
      onSwipeComplete={() => setOpen(false)}
      swipeDirection={["down"]}
      style={{ margin: 0, justifyContent: "flex-end" }}
      onBackdropPress={() => setOpen(false)}
      onBackButtonPress={() => setOpen(false)}
      animationOut='slideOutDown'
      backdropTransitionOutTiming={0}
    >
      <View style={styles.flatListWrapper}>
        <FlatList
          data={paymentOptions}
          renderItem={({ item }) => renderItemComponent(item)}
          ListFooterComponent={() => (
            <Pressable android_ripple={{ color: palette.grey.lighter }}>
              <View style={[styles.itemView, { gap: 6 }]}>
                <Ionicons name='add-circle-outline' size={22} />
                <Text
                  style={[
                    inputStyles.textInputStyle,
                    { textAlignVertical: "center" },
                  ]}
                >
                  Adicionar forma de pagamento
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flatListWrapper: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },

  itemView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...inputBorderBottomStyle,
  },
});
