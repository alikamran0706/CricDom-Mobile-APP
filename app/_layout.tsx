import ToastAlert from '@/components/ui/ToastAlert';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RootState, store } from '@/store';
import { setProfile, setToken } from '@/store/features/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Provider, useDispatch, useSelector } from 'react-redux';
import '../global.css';

// Create a separate component that uses Redux hooks
function AppContent() {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [tokenRestored, setTokenRestored] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Get authentication state from Redux
  const isAuthenticated = useSelector((state: RootState) => !!state.user.token);

  useEffect(() => {
    const restoreAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      if (token) dispatch(setToken(token));
      if (user) dispatch(setProfile(JSON.parse(user)));
      setTokenRestored(true);
    };
    restoreAuth();
  }, []);

  if (!loaded || !tokenRestored) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Protected routes - only accessible when NOT authenticated */}
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="getStarted" options={{ headerShown: false }} />
          <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
        </Stack.Protected>

        {/* Protected routes - only accessible when authenticated */}
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <ToastAlert />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}