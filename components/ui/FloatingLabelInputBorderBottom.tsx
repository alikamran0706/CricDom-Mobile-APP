import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
  customBoxClass?: string
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onChangeText,
  required,
  customBoxClass,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute" as const,
    left: 0,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["#9CA3AF", "black"], 
    }),
  };

  return (
    <View className={`mb-6 ${customBoxClass}`}>
      <View className="relative border-b border-gray-300 pb-1">
        <Animated.Text style={labelStyle}>
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Animated.Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`text-base text-gray-800 pt-4 ${Platform.OS === "android" ? "pb-1" : ""}`}
          style={{ height: 40 }}
          {...rest}
        />
      </View>
    </View>
  );
};

export default FloatingLabelInput;
