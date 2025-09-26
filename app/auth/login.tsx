import HeroSection from '@/components/auth/HeroSection';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import { showAlert } from '@/store/features/alerts/alertSlice';
import { useLoginMutation } from '@/store/features/user/userApi';
import { setProfile, setToken } from '@/store/features/user/userSlice';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

interface LoginFormData {
    identifier: string;
    password: string;
}

interface LoginErrors {
    identifier?: string;
    password?: string;
}

const { height } = Dimensions.get('window');

const LoginScreen: React.FC = () => {
    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<LoginFormData>({
        identifier: '',
        password: '',
    });
    const [errors, setErrors] = useState<LoginErrors>({});
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: LoginErrors = {};
        if (!formData.identifier) {
            newErrors.identifier = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.identifier)) {
            newErrors.identifier = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (): Promise<void> => {
        if (!validateForm()) return;

        try {
            const response: any = await login(formData).unwrap();
            // dispatch(setToken(response.token));
            if (response) {
                const { jwt, user } = response;

                dispatch(setToken(jwt));
                dispatch(setProfile(user));

                // Save to AsyncStorage
                await AsyncStorage.setItem('token', jwt);
                await AsyncStorage.setItem('user', JSON.stringify(user));

                dispatch(showAlert({ type: 'success', message: 'Welcome back to Cricdom!' }));
                router.replace('/(tabs)');
            }
        } catch (error: any) {
            dispatch(
                showAlert({
                    type: 'error',
                    message: error?.data?.message || 'Login failed. Please try again.',
                })
            );
        }
    };

    const handleCreateAccount = (): void => {
        router.replace('/auth/signup');
    };

    const handleForgotPassword = (): void => {
        router.push('/auth/forgot-password');
    };

    const updateFormData = (field: keyof LoginFormData) => (value: string): void => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#bfdbfe" />
            <SafeAreaView className="flex-1">
                <LinearGradient
                    colors={['#bfdbfe', '#dbeafe', '#e0f2fe', '#f0f9ff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="flex-1"
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        className="flex-1"
                    >
                        <ScrollView
                            className="flex-1"
                            contentContainerStyle={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            {/* Hero Section */}
                            <HeroSection />

                            {/* Login Form */}
                            <View
                                className="flex-1 bg-white rounded-t-3xl px-6 pt-6 pb-4"
                                style={{
                                    minHeight: height * 0.55,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: -4 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 12,
                                    elevation: 20,
                                }}
                            >
                                <View className="items-center mb-2">
                                    <Text className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</Text>
                                    <Text className="text-gray-600 text-center text-base">
                                        Sign in to continue your cricket journey
                                    </Text>
                                </View>

                                <View className="gap-y-2">
                                    {/* Email Input */}
                                    <View>
                                        <FloatingLabelInput
                                            label="Email Address"
                                            value={formData.identifier}
                                            onChangeText={updateFormData('identifier')}
                                            error={errors.identifier}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            returnKeyType="next"
                                            autoComplete="email"
                                        />
                                    </View>

                                    {/* Password Input */}
                                    <View className="relative">
                                        <FloatingLabelInput
                                            label="Password"
                                            value={formData.password}
                                            onChangeText={updateFormData('password')}
                                            error={errors.password}
                                            secureTextEntry={!showPassword}
                                            returnKeyType="done"
                                            autoComplete="password"
                                        />
                                        <TouchableOpacity
                                            className="absolute right-4 top-6"
                                            onPress={() => setShowPassword(!showPassword)}
                                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        >
                                            <Ionicons
                                                name={showPassword ? "eye-off" : "eye"}
                                                size={22}
                                                color="#9CA3AF"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {/* Floating Add Player Button */}
                                    <FloatingActionButton
                                        label={`Login`}
                                        onPress={handleLogin}
                                        containerStyle={{ marginTop: 6 }}
                                        loading={isLoading}
                                        disabled={isLoading}
                                    />

                                    {/* Footer Links */}
                                    <View className="flex-row justify-between items-center mt-6 mb-2">
                                        <TouchableOpacity
                                            onPress={handleCreateAccount}
                                            className="px-4"
                                        >
                                            <Text className="text-[#0e7ccb] font-semibold text-base">Create Account</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={handleForgotPassword}
                                            className="px-4"
                                        >
                                            <Text className="text-gray-600 font-medium text-base">Forgot Password?</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Terms and Privacy */}
                                    <View className="items-center">
                                        <Text
                                            className="text-xs text-gray-500 text-center"
                                            style={{ flexWrap: 'wrap', textAlign: 'center' }}
                                        >
                                            By signing in, you agree to our{' '}
                                            <Text
                                                className="text-[#0e7ccb] font-medium"
                                                onPress={() => console.log('Terms pressed')}
                                            >
                                                Terms of Service
                                            </Text>{' '}
                                            and{' '}
                                            <Text
                                                className="text-[#0e7ccb] font-medium"
                                                onPress={() => console.log('Privacy pressed')}
                                            >
                                                Privacy Policy
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </LinearGradient>
            </SafeAreaView>
        </>
    );
};

export default LoginScreen;