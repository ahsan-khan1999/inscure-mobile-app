import React from "react";
import {
  TouchableOpacity as TouchableOpacityRN,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import { TouchableOpacity as TouchableOpacityRNGH } from "react-native-gesture-handler";


const TouchableOpacity =
  Platform.OS === "ios" ? TouchableOpacityRNGH : TouchableOpacityRN;

export default ({
  onPress,
  propStyling,
  buttonText,
  buttonTextStyling,
  disabled
}) => (
  <TouchableOpacity
    style={[customStyling, ...propStyling, disabled ? disabledStyle : {}]}
    {...{ onPress, disabled: !!disabled }}
  >
    <Text style={[...buttonTextStyling, disabled ? disabledTextStyle : {}]}>
      {buttonText}
    </Text>
  </TouchableOpacity>
);

const { customStyling, disabledStyle, disabledTextStyle } = StyleSheet.create({
  customStyling: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 7.5
  },
  disabledStyle: {
    backgroundColor: "#ccc"
  },
  disabledTextStyle: {
    color: "black"
  }
});
