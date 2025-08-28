import { RootState } from '@/store';
import { clearAlert } from '@/store/features/alerts/alertSlice';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const icons = {
  success: <Ionicons name="checkmark-circle" size={22} color="#22c55e" />,
  warning: <MaterialIcons name="warning" size={22} color="#facc15" />,
  error: <MaterialIcons name="error" size={22} color="#ef4444" />,
};

const bgColors = {
  success: 'bg-green-100',
  warning: 'bg-yellow-100',
  error: 'bg-red-100',
};

const ToastAlert = () => {
  const alert = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch();
  const opacity = useRef(new Animated.Value(0)).current; // ✅ Persist across renders

  useEffect(() => {
    if (alert.type && alert.message) {
      // Animate in
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Auto dismiss
      const timeout = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => dispatch(clearAlert()));
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [alert]);

  if (!alert.type || !alert.message) return null;

  return (
    <Animated.View
      className={`absolute top-10 left-5 right-5 z-50 p-4 rounded-xl flex-row items-center gap-2 shadow-lg ${bgColors[alert.type]}`}
      style={{ opacity }}
    >
      {icons[alert.type]}
      <Text className="text-sm font-medium text-gray-800">{alert.message}</Text>
    </Animated.View>
  );
};

export default ToastAlert;
