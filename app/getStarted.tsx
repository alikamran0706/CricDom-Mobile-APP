import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';

const partialReactLogo = require('../assets/images/partial-react-logo.png');
const { width, height } = Dimensions.get('window');

const GetStartedScreen = () => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            <ScrollView 
                className="flex-1" 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
               <View className="w-full">
                            <Image
                                source={partialReactLogo}
                                style={{ 
                                    width: '100%', 
                                    height: undefined, 
                                    aspectRatio: 1.8 
                                }}
                                resizeMode="contain"
                            />
                        </View>

                {/* Main Content */}
                <View className="flex-1 px-6 pt-8">
                    {/* Brand Section */}
                    <View className="items-center mb-8">
                        <View className="flex-row items-center mb-4">
                            <View className="w-12 h-12 bg-[#0e7ccb] rounded-full items-center justify-center mr-3">
                                <Ionicons name="baseball" size={24} color="white" />
                            </View>
                            <Text className="text-3xl font-bold text-gray-900">
                                Cric<Text className="text-[#0e7ccb]">dom</Text>
                            </Text>
                        </View>
                        
                        <Text className="text-lg font-semibold text-gray-800 text-center mb-3">
                            Your Ultimate Cricket Companion
                        </Text>
                        
                        <Text className="text-base text-gray-600 text-center leading-6 max-w-sm">
                            Manage teams, track player statistics, organize matches, and elevate your cricket experience.
                        </Text>
                    </View>

                    {/* Features Section */}
                    <View className="mb-10">
                        <View className="flex-row items-center mb-4">
                            <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                                <Ionicons name="people" size={16} color="#059669" />
                            </View>
                            <Text className="text-sm text-gray-700 flex-1">
                                Team & Player Management
                            </Text>
                        </View>
                        
                        <View className="flex-row items-center mb-4">
                            <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                                <Ionicons name="stats-chart" size={16} color="#2563eb" />
                            </View>
                            <Text className="text-sm text-gray-700 flex-1">
                                Live Scoring & Statistics
                            </Text>
                        </View>
                        
                        <View className="flex-row items-center mb-4">
                            <View className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center mr-3">
                                <Ionicons name="trophy" size={16} color="#7c3aed" />
                            </View>
                            <Text className="text-sm text-gray-700 flex-1">
                                Tournament Organization
                            </Text>
                        </View>
                        
                        <View className="flex-row items-center">
                            <View className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center mr-3">
                                <Ionicons name="analytics" size={16} color="#ea580c" />
                            </View>
                            <Text className="text-sm text-gray-700 flex-1">
                                Performance Analytics
                            </Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="gap-y-4 mb-8">
                        {/* Get Started Button */}
                        <Pressable
                            onPress={() => router.replace('/auth/signup')}
                            className="w-full rounded-2xl overflow-hidden"
                        >
                            <LinearGradient
                                colors={['#3b82f6', '#0e7ccb']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className="rounded-2xl py-4 px-6 shadow-lg"
                                style={{
                                    shadowColor: '#3b82f6',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 8,
                                }}
                            >
                                <View className="flex-row items-center justify-center">
                                    <Text className="text-white text-lg font-semibold mr-2">
                                        Get Started
                                    </Text>
                                    <Ionicons name="arrow-forward" size={20} color="white" />
                                </View>
                            </LinearGradient>
                        </Pressable>

                        {/* Login Button */}
                        <Pressable
                            onPress={() => router.replace('/auth/login')}
                            className="w-full border border-gray-200 rounded-2xl py-4 px-6 bg-white"
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 3,
                            }}
                        >
                            <View className="flex-row items-center justify-center">
                                <Ionicons name="log-in-outline" size={20} color="#374151" className="mr-2" />
                                <Text className="text-gray-700 text-lg font-semibold">
                                    Already have an account? Login
                                </Text>
                            </View>
                        </Pressable>
                    </View>

                    {/* Footer */}
                    <View className="items-center pb-8">
                        <Text className="text-xs text-gray-500 text-center mb-2">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default GetStartedScreen;