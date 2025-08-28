import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'link';

interface ButtonProps extends Omit<TouchableOpacityProps, 'onPress'> {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  disabled = false,
  className = '',
  loading = false,
  ...props 
}) => {
  const getButtonStyles = (): string => {
    const baseStyles = 'py-4 items-center justify-center';
    
    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-blue-500 ${disabled || loading ? 'opacity-50' : ''}`;
      case 'secondary':
        return `${baseStyles} bg-transparent border border-blue-500`;
      case 'link':
        return 'py-2';
      default:
        return `${baseStyles} bg-blue-500`;
    }
  };

  const getTextStyles = (): string => {
    switch (variant) {
      case 'primary':
        return ' text-base font-semibold text-black';
      case 'secondary':
        return 'text-blue-500 text-base font-semibold'; 
      case 'link':
        return 'text-blue-500 text-sm font-medium';
      default:
        return 'text-white text-base font-semibold';
    }
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={disabled || loading}
      className={`${getButtonStyles()} ${className}`}
      {...props}
    >
      <Text className={getTextStyles()}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;