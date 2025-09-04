import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface LeaderboardEntry {
    id: string
    name: string
    location: string
    image: string
    boundaries: number
    innings: number
    ballsFaced: number
    strikeRate: number
    rank: number
}

const ChallengeScreen = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("OVERALL")
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const leaderboard: LeaderboardEntry[] = [
        {
            id: "1",
            name: "Ali Kamran",
            location: "Lahore",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
            boundaries: 16,
            innings: 1,
            ballsFaced: 29,
            strikeRate: 348.28,
            rank: 1,
        },
        {
            id: "2",
            name: "Pramod Mohite",
            location: "Ras Al Khaimah",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
            boundaries: 16,
            innings: 1,
            ballsFaced: 29,
            strikeRate: 348.28,
            rank: 1,
        },
        {
            id: "3",
            name: "Vikrant Dangi",
            location: "Delhi",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
            boundaries: 16,
            innings: 1,
            ballsFaced: 33,
            strikeRate: 309.09,
            rank: 2,
        },
        {
            id: "4",
            name: "NOOR AKKAS",
            location: "Karachi",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
            boundaries: 16,
            innings: 1,
            ballsFaced: 36,
            strikeRate: 286.11,
            rank: 3,
        },
        {
            id: "5",
            name: "JS",
            location: "Leh",
            image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&auto=format&fit=crop&q=60",
            boundaries: 16,
            innings: 1,
            ballsFaced: 37,
            strikeRate: 272.97,
            rank: 4,
        },
    ]

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1:
                return "#FFD700"
            case 2:
                return "#FFA500"
            case 3:
                return "#CD7F32"
            default:
                return "#666"
        }
    }

    const renderLeaderboardItem = ({ item }: { item: LeaderboardEntry }) => (
        <TouchableOpacity
            className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm border border-gray-100"
            onPress={() => router.push(`/player/${item.id}`)}
        >
            <View className="flex-row items-center">
                <Image source={{ uri: item.image }} className="w-16 h-16 rounded-full mr-4" />

                <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-800 mb-1">
                        {item.name} <Text className="text-gray-500 font-normal">({item.location})</Text>
                    </Text>

                    <View className="flex-row justify-between items-center">
                        <View className="flex-row space-x-4">
                            <View>
                                <Text className="text-xs text-gray-500">Boundaries :</Text>
                                <Text className="text-sm font-semibold">{item.boundaries}+</Text>
                            </View>
                            <View>
                                <Text className="text-xs text-gray-500">Inns :</Text>
                                <Text className="text-sm font-semibold">{item.innings}</Text>
                            </View>
                            <View>
                                <Text className="text-xs text-gray-500">Balls faced :</Text>
                                <Text className="text-sm font-semibold">{item.ballsFaced}</Text>
                            </View>
                            <View>
                                <Text className="text-xs text-gray-500">SR :</Text>
                                <Text className="text-sm font-semibold">{item.strikeRate}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="items-center ml-4">
                    <Text className="text-4xl font-bold mb-2" style={{ color: getRankColor(item.rank) }}>
                        {item.rank}
                    </Text>
                    <TouchableOpacity>
                        <Ionicons name="remove" size={20} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="px-4 py-3">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-black rounded-full items-center justify-center mr-2">
                            <Text className="text-white font-bold">C</Text>
                        </View>
                        <Text className="text-xl font-bold text-black">CHALLENGES</Text>
                    </View>
                    <TouchableOpacity>
                        <Ionicons name="share" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Challenge Info */}
            <View className="bg-white px-4 py-4 border-b border-gray-200">
                <View className="flex-row items-center mb-2">
                    <Ionicons name="calendar-outline" size={20} color="#666" />
                    <Text className="text-gray-600 ml-2">Jul 31, 2025 to Aug 31, 2025 -- 2 days left</Text>
                </View>

                <View className="flex-row items-center mb-2">
                    <View className="w-6 h-6 bg-red-600 rounded-full items-center justify-center mr-2">
                        <Text className="text-white font-bold text-xs">C</Text>
                    </View>
                    <Text className="text-gray-800 font-semibold">Hit 15 Boundaries in Tennis Ball</Text>
                </View>

                <View className="flex-row items-center mb-2">
                    <Ionicons name="trophy" size={20} color="#f59e0b" />
                    <Text className="text-gray-600 ml-2">All challenge finishers will receive a digital finisher's badge.</Text>
                </View>

                <View className="flex-row items-center mb-3">
                    <Ionicons name="people" size={20} color="#666" />
                    <Text className="text-gray-600 ml-2">3.2K players have accepted this challenge.</Text>
                </View>

                <TouchableOpacity>
                    <Text className="text-green-600 font-semibold underline">Eligibility criteria & rules</Text>
                </TouchableOpacity>
            </View>

            {/* Leaderboard Header */}
            <View className="bg-white px-4 py-3 border-b border-gray-200">
                <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-xl font-bold text-gray-800">Leaderboard</Text>
                    <Text className="text-gray-500 text-sm">Updated 6 hours ago</Text>
                </View>

                <View className="flex-row">
                    <TouchableOpacity
                        className={`flex-1 py-3 rounded-full mr-2 ${activeTab === "OVERALL" ? "bg-green-500" : "bg-gray-200"}`}
                        onPress={() => setActiveTab("OVERALL")}
                    >
                        <Text className={`text-center font-semibold ${activeTab === "OVERALL" ? "text-white" : "text-gray-700"}`}>
                            OVERALL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`flex-1 py-3 rounded-full ml-2 ${activeTab === "FOLLOWING" ? "bg-green-500" : "bg-gray-200"}`}
                        onPress={() => setActiveTab("FOLLOWING")}
                    >
                        <Text className={`text-center font-semibold ${activeTab === "FOLLOWING" ? "text-white" : "text-gray-700"}`}>
                            FOLLOWING
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Leaderboard List */}
            <FlatList
                data={leaderboard}
                renderItem={renderLeaderboardItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 8 }}
            />
        </SafeAreaView>
    )
}

export default ChallengeScreen
