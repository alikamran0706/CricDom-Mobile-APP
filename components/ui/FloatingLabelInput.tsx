import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  value: string;
  error?: string;
  onChangeText: (text: string) => void;
}

export default function FloatingLabelInput({
  label,
  value,
  onChangeText,
  error,
  style,
  ...props
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, animatedIsFocused]);

  const labelStyle: Animated.WithAnimatedObject<TextStyle> = {
    position: 'absolute' as const,
    left: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal: 4,
    zIndex: 1,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, -7], // Changed from [18, -8] to give more space above input
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: error
      ? '#DC2626'
      : animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: ['#9CA3AF', '#4B5563'],
        }),
  };

  const inputStyle = [
    styles.input,
    {
      borderColor: error 
        ? '#DC2626' 
        : isFocused 
          ? '#9CA3AF' 
          : '#9CA3AF',
      borderWidth: 0.5,
      backgroundColor: isFocused ? '#F9FAFB' : 'transparent',
    },
    style,
  ];

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>
        {label}
      </Animated.Text>
      
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? props.placeholder : ''}
        placeholderTextColor="#9CA3AF"
        style={inputStyle}
      />
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
    paddingTop: 3, 
  },
  input: {
    height: 56,
    fontSize: 16,
    color: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});