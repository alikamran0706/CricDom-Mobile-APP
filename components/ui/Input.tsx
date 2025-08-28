import React from 'react';
import { KeyboardTypeOptions, Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends Omit<TextInputProps, 'placeholder' | 'value' | 'onChangeText'> {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  required = false,
  ...props
}) => {
  return (
    <View className="mb-6">
      {
        label &&
        <Text className="text-base font-medium text-gray-800 mb-2">
          {label}
          {required && <Text className="text-red-600"> *</Text>}
        </Text>
      }
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className={`bg-gray-50 border rounded-lg px-4 py-3 text-base text-gray-800 ${error ? 'border-red-500' : 'border-gray-300'
          }`}
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;