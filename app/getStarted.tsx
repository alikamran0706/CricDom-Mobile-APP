import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { Dimensions, Image, Pressable, ScrollView, StatusBar, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const partialReactLogo = require('../assets/images/map-bg.png');
const { width, height } = Dimensions.get('window');
const ScorersScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="bg-white flex-1">
            <StatusBar backgroundColor="#ebe8de" barStyle="dark-content" />
            <View className="flex-1">
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View className="w-full">
                        <Image
                            source={partialReactLogo}
                            style={{
                                width: width,
                                height: 150,
                                alignSelf: 'flex-start',
                            }}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Main Content */}
                    <View className="flex-1 px-6 mt-4">
                        {/* Brand Section */}
                        <View className="items-center mb-6">
                            <View className="flex-row items-center mb-4">
                                <Image
                                    source={require('../assets/images/crickdom-team.png')}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        resizeMode: 'contain',
                                        transform: [{ scale: 1.2 }],
                                    }}
                                />
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
                        <View className="gap-y-4 mb-6">
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
                        <View className="items-center pb-2">
                            <Text className="text-xs text-gray-500 text-center mb-2">
                                By continuing, you agree to our Terms of Service and Privacy Policy
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ScorersScreen
