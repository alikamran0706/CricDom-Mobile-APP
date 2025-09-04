import { RootState } from "@/store";
import { playerApi } from "@/store/features/player/playerApi";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

interface MatchHistory {
    id: string
    matchNumber: string
    opponent: string
    runs: number
}

const playerData = {
    name: "Ethan Carter",
    position: "Right-hand batsman",
    team: "Team: Titans",
    avatar: "https://images.unsplash.com/photo-1646282814550-f521d9b57a59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNyaWNrZXRlcnxlbnwwfHwwfHx8Mg%3D%3D",
    stats: {
        matches: 120,
        runs: 4500,
        wickets: 250,
        average: 35.71,
        strikeRate: 120.5,
    },
    matchHistory: [
        { id: "1", matchNumber: "Match 1", opponent: "Titans vs. Warriors", runs: 50 },
        { id: "2", matchNumber: "Match 2", opponent: "Titans vs. Strikers", runs: 75 },
        { id: "3", matchNumber: "Match 3", opponent: "Titans vs. Rangers", runs: 100 },
    ] as MatchHistory[],
}

export default function PlayerProfileScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const cachedPlayers = useSelector((state: RootState) =>
        playerApi.endpoints.getPlayers.select({ page: 1, pageSize: 10 })(state)
    );

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text className="text-xl font-semibold ml-4">Player Profile</Text>
                </View>

                <ScrollView className="flex-1">
                    {/* Profile Info */}
                    <View className="items-center py-8">
                        <Image source={{ uri: playerData.avatar }} className="w-24 h-24 rounded-full mb-4" />
                        <Text className="text-2xl font-bold text-black">{playerData.name}</Text>
                        <Text className="text-gray-600 mt-1">{playerData.position}</Text>
                        <Text className="text-gray-500 mt-1">{playerData.team}</Text>
                    </View>

                    {/* Stats Section */}
                    <View className="px-4 mb-6">
                        <Text className="text-lg font-semibold mb-4 text-black">Stats</Text>

                        {/* Stats Grid */}
                        <View className="flex-row justify-between mb-4">
                            {/* Matches Card */}
                            <View className="flex-1 bg-white border border-gray-200 rounded-lg p-4 mr-2">
                                <Text className="text-gray-600 text-sm mb-2">Matches</Text>
                                <Text className="text-3xl font-bold text-gray-800">{playerData.stats.matches}</Text>
                            </View>

                            {/* Runs Card */}
                            <View className="flex-1 bg-white border border-gray-200 rounded-lg p-4 ml-2">
                                <Text className="text-gray-600 text-sm mb-2">Runs</Text>
                                <Text className="text-3xl font-bold text-gray-800">{playerData.stats.runs}</Text>
                            </View>
                        </View>

                        {/* Wickets Card - Full Width */}
                        <View className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                            <Text className="text-gray-600 text-sm mb-2">Wickets</Text>
                            <Text className="text-3xl font-bold text-gray-800">{playerData.stats.wickets}</Text>
                        </View>

                        {/* Additional Stats */}
                        <View className="flex-row justify-between">
                            {/* Average Card */}
                            <View className="flex-1 bg-white border border-gray-200 rounded-lg p-4 mr-2">
                                <Text className="text-gray-600 text-sm mb-2">Average</Text>
                                <Text className="text-2xl font-bold text-gray-800">{playerData.stats.average}</Text>
                            </View>

                            {/* Strike Rate Card */}
                            <View className="flex-1 bg-white border border-gray-200 rounded-lg p-4 ml-2">
                                <Text className="text-gray-600 text-sm mb-2">Strike Rate</Text>
                                <Text className="text-2xl font-bold text-gray-800">{playerData.stats.strikeRate}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Match History */}
                    <View className="px-4 mb-6">
                        <Text className="text-lg font-semibold mb-4 text-black">Match History</Text>
                        <View className="gap-y-3">
                            {playerData.matchHistory.map((match) => (
                                <TouchableOpacity
                                    key={match.id}
                                    className="bg-white border border-gray-200 rounded-lg p-4"
                                    onPress={() => router.push(`/match/${match.id}`)}
                                >
                                    <View className="flex-row justify-between items-center">
                                        <View className="flex-1">
                                            <Text className="font-semibold text-black">{match.matchNumber}</Text>
                                            <Text className="text-gray-600 text-sm mt-1">{match.opponent}</Text>
                                        </View>
                                        <Text className="text-lg font-bold text-black">{match.runs} runs</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}