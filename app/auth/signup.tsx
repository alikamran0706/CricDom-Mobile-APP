import HeroSection from '@/components/auth/HeroSection';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import { showAlert } from '@/store/features/alerts/alertSlice';
import { useRegisterMutation } from '@/store/features/user/userApi';
import { setProfile, setToken } from '@/store/features/user/userSlice';
import { Ionicons } from '@expo/vector-icons';
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

interface SignupFormData {
    username: string;
    email: string;
    password: string;
}

interface SignupErrors {
    username?: string;
    email?: string;
    password?: string;
}

const { width, height } = Dimensions.get('window');

const SignupScreen: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<SignupErrors>({});
    const [register, { isLoading }] = useRegisterMutation();
    const [formData, setFormData] = useState<SignupFormData>({
        username: '',
        email: '',
        password: '',
    });

    const validateForm = (): boolean => {
        const newErrors: SignupErrors = {};

        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (): Promise<void> => {
        if (!validateForm()) return;
        try {
            const response: any = await register(formData).unwrap();
            if (response) {

                dispatch(setToken(response.jwt));
                dispatch(setProfile(response.user));
                dispatch(showAlert({ type: 'success', message: 'Register successful!' }));
                router.replace('/(tabs)'); 
            }
        } catch (error: any) {
            dispatch(
                showAlert({
                    type: 'error',
                    message: error?.data?.message || 'Register failed. Please try again.',
                })
            );
        }
    };

    const updateFormData = (field: keyof SignupFormData) => (value: string): void => {
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

                            {/* Form Section */}
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
                                    <Text className="text-2xl font-bold text-gray-900 mb-2">Create Account</Text>
                                    <Text className="text-gray-600 text-center text-base">
                                        Join the game and start your cricket journey
                                    </Text>
                                </View>

                                <View className="space-y-2">
                                    <FloatingLabelInput
                                        label="Username"
                                        value={formData.username}
                                        onChangeText={updateFormData('username')}
                                        error={errors.username}
                                        returnKeyType="next"
                                    />

                                    <FloatingLabelInput
                                        label="Email"
                                        value={formData.email}
                                        onChangeText={updateFormData('email')}
                                        error={errors.email}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                    />

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

                                    <FloatingActionButton
                                        label={`Sign Up`}
                                        onPress={handleSignup}
                                        containerStyle={{ marginTop: 8 }}
                                        loading={isLoading}
                                        disabled={isLoading}
                                    />

                                    {/* Footer Links */}
                                    <View className="flex-row justify-between items-center mt-6 mb-2">
                                        <Text className="text-gray-700 text-base">Already have an account?</Text>
                                        <TouchableOpacity onPress={() => router.replace('/auth/login')}
                                            className="py-2 px-4"
                                        >
                                            <Text className="text-[#0e7ccb] font-medium text-base">Login</Text>
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

export default SignupScreen;
