import HeroSection from '@/components/auth/HeroSection';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FloatingLabelInput from '@/components/ui/FloatingLabelInput';
import { showAlert } from '@/store/features/alerts/alertSlice';
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

const { height } = Dimensions.get('window');

const ForgotPasswordScreen: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const validateEmail = (): boolean => {
        if (!email) {
            setError('Email is required');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return false;
        }
        setError(undefined);
        return true;
    };

    const handleResetPassword = async (): Promise<void> => {
        if (!validateEmail()) return;

        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            dispatch(showAlert({ type: 'success', message: 'Password reset link sent to your email.' }));
            router.replace('/auth/login');
        } catch (error: any) {
            dispatch(showAlert({
                type: 'error',
                message: error?.data?.message || 'Failed to send reset link. Try again later.',
            }));
        } finally {
            setLoading(false);
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
                                    <Text className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</Text>
                                    <Text className="text-gray-600 text-center text-base">
                                        Enter your email to reset your password
                                    </Text>
                                </View>

                                <View className="space-y-4">
                                    <FloatingLabelInput
                                        label="Email Address"
                                        value={email}
                                        onChangeText={(text) => {
                                            setEmail(text);
                                            setError(undefined);
                                        }}
                                        error={error}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        returnKeyType="done"
                                        autoComplete="email"
                                    />

                                    <FloatingActionButton
                                        label="Reset Password"
                                        onPress={handleResetPassword}
                                        containerStyle={{ marginTop: 12 }}
                                        loading={loading}
                                        disabled={loading}
                                    />

                                    <View className="mt-6 items-center">
                                        <Text className="text-gray-700 text-base">Remember your password?</Text>
                                        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                                            <Text className="text-blue-600 font-semibold text-base mt-1">Back to Login</Text>
                                        </TouchableOpacity>
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

export default ForgotPasswordScreen;
