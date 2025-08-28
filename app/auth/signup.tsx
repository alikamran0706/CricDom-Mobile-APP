import HeroSection from '@/components/auth/HeroSection';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import { showAlert } from '@/store/features/alerts/alertSlice';
import { useRegisterMutation } from '@/store/features/user/userApi';
import { setProfile, setToken } from '@/store/features/user/userSlice';
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
    const [formData, setFormData] = useState<SignupFormData>({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<SignupErrors>({});
    const [register, { isLoading }] = useRegisterMutation();

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
            console.log(response, 'REGGGISTERRR');
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
                                <View className="items-center mb-4">
                                    <Text className="text-2xl font-bold text-gray-900 mb-2">Create Account</Text>
                                    <Text className="text-gray-600 text-center text-base">
                                        Join the game and start your cricket journey
                                    </Text>
                                </View>

                                <View className="space-y-4">
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

                                    <FloatingLabelInput
                                        label="Password"
                                        value={formData.password}
                                        onChangeText={updateFormData('password')}
                                        error={errors.password}
                                        secureTextEntry
                                        returnKeyType="done"
                                    />

                                    <FloatingActionButton
                                        label={`Sign Up`}
                                        onPress={handleSignup}
                                        containerStyle={{ marginTop: 12 }}
                                        loading={isLoading}
                                        disabled={isLoading}
                                    />

                                    <View className="mt-6 items-center">
                                        <Text className="text-gray-700 text-base">Already have an account?</Text>
                                        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                                            <Text className="text-blue-600 font-semibold text-base mt-1">Login</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Terms and Privacy */}
                                    <View className="items-center">
                                        <Text
                                            className="text-xs text-gray-500 text-center px-4"
                                            style={{ flexWrap: 'wrap', textAlign: 'center' }}
                                        >
                                            By signing in, you agree to our{' '}
                                            <Text
                                                className="text-blue-600 font-medium"
                                                onPress={() => console.log('Terms pressed')}
                                            >
                                                Terms of Service
                                            </Text>{' '}
                                            and{' '}
                                            <Text
                                                className="text-blue-600 font-medium"
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
