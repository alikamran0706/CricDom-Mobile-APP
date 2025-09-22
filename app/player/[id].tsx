import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Match {
    id: string
    tournament: string
    venue: string
    date: string
    format: string
    team1: string
    team2: string
    team1Score: string
    team2Score: string
    result: string
    status: string
}

const PlayerProfileScreen = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("MATCHES");
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const tabs = ["ABOUT", "REVIEWS", "ACHIEVEMENTS", "MATCHES"];

    const matches: Match[] = [
        {
            id: "1",
            tournament: "Adil Memorial Cricket T...",
            venue: "Racecourse .., Karachi",
            date: "24-Nov-24",
            format: "The Hundred",
            team1: "Sunshine Cricket Club",
            team2: "ATTA CRICKET CLUB",
            team1Score: "180/6 (100 Balls)",
            team2Score: "175/7 (100 Balls)",
            result: "Sunshine Cricket Club won by 5 runs",
            status: "RESULT",
        },
        {
            id: "2",
            tournament: "Adil Memorial Cricket T...",
            venue: "ATTA CIRCKE.., Karachi",
            date: "22-Nov-24",
            format: "The Hundred",
            team1: "ATTA CRICKET CLUB",
            team2: "FRIENDS 11 DHA",
            team1Score: "96/10 (69 Balls)",
            team2Score: "97/3 (73 Balls)",
            result: "FRIENDS 11 DHA won by 7 wickets",
            status: "RESULT",
        },
    ]

    const renderMatchCard = (match: Match) => (
        <View key={match.id} className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-base font-semibold text-gray-800">{match.tournament}</Text>
                <View className="bg-[#0e7ccb] px-3 py-1 rounded-full">
                    <Text className="text-white text-xs font-medium">{match.status}</Text>
                </View>
            </View>

            <Text className="text-sm text-gray-600 mb-3">
                {match.venue} | {match.date} | {match.format}
            </Text>

            <View className="space-y-2 mb-3">
                <View className="flex-row justify-between items-center">
                    <Text className="text-black font-medium">{match.team1}</Text>
                    <Text className="text-base font-bold">{match.team1Score}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-800 font-medium">{match.team2}</Text>
                    <Text className="text-base font-bold">{match.team2Score}</Text>
                </View>
            </View>

            <Text className="text-sm text-gray-700 italic mb-3">{match.result}</Text>

            <View className="flex-row justify-around border-t border-gray-200 pt-3">
                <TouchableOpacity className="flex-1 items-center">
                    <Text className="text-black font-medium">INSIGHTS</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 items-center">
                    <Text className="text-black font-medium">TABLE</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 items-center">
                    <Text className="text-black font-medium">LEADERBOARD</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            {/* Header */}
            <LinearGradient colors={['#ffffff', '#a9d3f2', '#a9d3f2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-4 py-3"
            >
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#3b3b3b" />
                    </TouchableOpacity>
                    <View className="flex-row">
                        <TouchableOpacity className="mr-4">
                            <Ionicons name="share" size={24} color="#3b3b3b" />
                        </TouchableOpacity>
                        <TouchableOpacity className="relative">
                            <Ionicons name="funnel" size={24} color="#3b3b3b" />
                            <View className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full items-center justify-center">
                                <Text className="text-xs font-bold text-gray-800">1</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* Profile Section */}
                <View className="items-center pb-6">
                    <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
                        }}
                        className="w-24 h-24 rounded-full mb-4"
                    />
                    <Text className="text-2xl font-bold text-black mb-1">Saleem Khan</Text>
                    <Text className="text-gray-700 mb-4">(Scorer - Karachi)</Text>

                    <TouchableOpacity className="bg-[#0e7ccb] px-6 py-3 rounded-xl" onPress={() => router.push('/message')}>
                        <View className="flex-row items-center">
                            <Ionicons name="chatbubble" size={20} color="white" />
                            <Text className="text-white font-semibold ml-2">MESSAGE</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Rating and Price */}
                <View className="px-4 pb-4">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-800 text-lg">Rs.1600/day, 800/ma...</Text>
                        <View className="flex-row items-center">
                            <Text className="text-black text-lg font-bold mr-2">5.0</Text>
                            <View className="flex-row">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Ionicons key={star} name="star" size={16} color="#fbbf24" />
                                ))}
                            </View>
                            <Text className="text-gray-600 ml-2">(4)</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>

            {/* Tabs */}
            <View className="bg-white">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-3">
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            className={`px-4 py-2 mr-4 ${activeTab === tab ? "border-b-2 border-[#0e7ccbd6]" : ""}`}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text className={`font-medium ${activeTab === tab ? "text-gray-900" : "text-gray-600"}`}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Content */}
            <ScrollView className="flex-1 bg-gray-50 px-4 py-4">
                {activeTab === "MATCHES" && (
                    <View>
                        <Text className="text-sm text-gray-600 italic mb-4">*Matches scored by this scorer.</Text>
                        {matches.map(renderMatchCard)}
                    </View>
                )}

                {activeTab === "ABOUT" && (
                    <View className="bg-white rounded-2xl p-4">
                        <Text className="text-gray-800">Profile information and details about the scorer.</Text>
                    </View>
                )}

                {activeTab === "REVIEWS" && (
                    <View className="bg-white rounded-2xl p-4">
                        <Text className="text-gray-800">Customer reviews and ratings.</Text>
                    </View>
                )}

                {activeTab === "ACHIEVEMENTS" && (
                    <View className="bg-white rounded-2xl p-4">
                        <Text className="text-gray-800">Scorer achievements and certifications.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default PlayerProfileScreen
