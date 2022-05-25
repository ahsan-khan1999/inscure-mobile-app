import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";


export const styleCancelSaveButtonUI = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    margin: 7.5,
    backgroundColor: "white"
  },
  buttonCommon: {
    borderWidth: 1,
    borderColor: 'salmon',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 5,
    borderRadius: 5,
    padding: 5
  }
});

export default function TaskCancelSaveButton({
  cancelButtonTitle,
  saveButtonTitle,
  cancelFn,
  saveFn,
  dontShowCancelFn,
  dontShowIcon
}) {
  return (
    <View style={[styleCancelSaveButtonUI.row]}>
      {!dontShowCancelFn && (
        <TouchableOpacity
          style={[styleCancelSaveButtonUI.buttonCommon, { marginRight: 5 }]}
          onPress={cancelFn}
        >
          {!dontShowIcon && (
            <Feather size={22} name="x" color={'salmon'} />
          )}
          <Text style={{ color: 'salmon' }}>
            {cancelButtonTitle || "Cancel"}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[
          styleCancelSaveButtonUI.buttonCommon,
          { marginLeft: 5, backgroundColor: 'salmon' }
        ]}
        onPress={saveFn}
      >
        {!dontShowIcon && <Feather size={22} name="check" color="white" />}
        <Text style={{ color: "white" }}>{saveButtonTitle || "Save"}</Text>
      </TouchableOpacity>
    </View>
  );
}
