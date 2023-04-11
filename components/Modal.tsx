import React, { ReactNode } from "react";
import ReactNativeModal from "react-native-modal";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
  backdropColor?: string;
}

export default function Modal({
  children,
  open,
  setOpen,
  backdropColor,
}: ModalProps) {
  return (
    <ReactNativeModal
      isVisible={open}
      scrollHorizontal={false}
      onSwipeComplete={() => setOpen(false)}
      swipeDirection={["down"]}
      style={{ margin: 0, justifyContent: "flex-end" }}
      onBackdropPress={() => setOpen(false)}
      onBackButtonPress={() => setOpen(false)}
      animationOut='slideOutDown'
      backdropColor={backdropColor ?? "black"}
      backdropTransitionOutTiming={0}
    >
      {children}
    </ReactNativeModal>
  );
}
