import React from "react";
import { Modal, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default ({
  animation,
  visible,
  onClose,
  children,
  transparent
}) => (
  <Modal
    animationType={animation || "slide"}
    transparent={transparent || false}
    {...{ visible }}
    onRequestClose={onClose}
  >
    <SafeAreaView style={styles.flex}>{children}</SafeAreaView>
  </Modal>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1
  }
});
