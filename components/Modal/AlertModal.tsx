import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface AlertModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  emoji?: string;
  showCloseIcon?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (e: GestureResponderEvent) => void;
  onCancel?: (e: GestureResponderEvent) => void;
  onlyConfirm?: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  onClose,
  title,
  description,
  emoji,
  showCloseIcon = true,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  onlyConfirm = false,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-4">
        <View className="bg-white rounded-2xl w-full p-6 relative shadow-lg">

          {showCloseIcon && (
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-3 right-3 p-1"
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          )}
  
          {emoji && (
            <Text className="text-4xl text-center mb-3">{emoji}</Text>
          )}

          {title && (
            <Text className="text-xl font-semibold text-center mb-2 text-gray-900">
              {title}
            </Text>
          )}

          {description && (
            <Text className="text-base text-center text-gray-600 mb-4">
              {description}
            </Text>
          )}

          <View className={`flex-row ${onlyConfirm ? 'justify-center' : 'justify-between'} gap-4 mt-2`}>
            {!onlyConfirm && (
              <Pressable
                onPress={onCancel || onClose}
                className="flex-1 py-2 bg-gray-200 rounded-full"
              >
                <Text className="text-center text-gray-700 font-medium">
                  {cancelText}
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={onConfirm}
              className="flex-1 py-2 bg-blue-600 rounded-full"
            >
              <Text className="text-center text-white font-medium">
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;
