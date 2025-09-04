import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Challenge {
    id: string
    title: string
    description: string
    type: string
    duration: string
    badge: string
    color: string
}

const JoinChallengeScreen = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("NEW")
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const challenges: Challenge[] = [
        {
            id: "1",
            title: "15 Boundaries",
            description: "Hit 15 Boundaries in Tennis Ball",
            type: "Limited Overs",
            duration: "Jul 31 to Aug 31, 2025",
            badge: "15\nBOUNDARIES",
            color: "#dc2626",
        },
        {
            id: "2",
            title: "150 Runs",
            description: "Score 150 Runs in Tennis Ball",
            type: "Limited Overs",
            duration: "Jul 31 to Aug 31, 2025",
            badge: "150\nRUNS",
            color: "#f59e0b",
        },
    ]

    const renderChallengeCard = (challenge: Challenge) => (
        <View key={challenge.id} className="bg-white rounded-2xl p-6 mb-4 mx-4 shadow-sm border border-gray-100">
            <View className="items-center mb-4">
                <View
                    className="w-20 h-20 rounded-2xl items-center justify-center mb-3"
                    style={{ backgroundColor: challenge.color }}
                >
                    <Text className="text-white font-bold text-center text-sm leading-tight">{challenge.badge}</Text>
                </View>
                <Text className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</Text>
                <Text className="text-gray-600 text-center mb-3">{challenge.description}</Text>
            </View>

            <View className="flex-row items-center justify-center mb-4">
                <View className="w-4 h-4 bg-green-500 rounded-full mr-2" />
                <Text className="text-gray-600 mr-4">{challenge.type}</Text>
                <Text className="text-gray-500">{challenge.duration}</Text>
            </View>

            <TouchableOpacity className="bg-green-500 rounded-xl py-4">
                <Text className="text-center text-white font-semibold text-lg">JOIN</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-red-600 px-4 py-3">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-white rounded-full items-center justify-center mr-2">
                            <Text className="text-red-600 font-bold">C</Text>
                        </View>
                        <Text className="text-xl font-bold text-white">CHALLENGES</Text>
                    </View>
                    <TouchableOpacity>
                        <Ionicons name="share" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Hero Section */}
            <View className="relative">
                <Image
                    source={{
                        uri: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&auto=format&fit=crop&q=60",
                    }}
                    className="w-full h-48"
                />
                <View className="absolute inset-0 bg-black/50 items-center justify-center px-6">
                    <Text className="text-3xl font-bold text-white text-center mb-2">WELCOME TO CHALLENGES</Text>
                    <Text className="text-white text-center leading-6">
                        Get ready to show your passion for the game and push your limits like never before!
                    </Text>
                </View>
            </View>

            {/* Tabs */}
            <View className="bg-gray-900 px-4 py-3">
                <View className="flex-row">
                    <TouchableOpacity
                        className={`flex-1 py-3 ${activeTab === "NEW" ? "border-b-2 border-white" : ""}`}
                        onPress={() => setActiveTab("NEW")}
                    >
                        <Text className={`text-center font-semibold ${activeTab === "NEW" ? "text-white" : "text-gray-400"}`}>
                            NEW
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`flex-1 py-3 ${activeTab === "MY CHALLENGES" ? "border-b-2 border-orange-500" : ""}`}
                        onPress={() => setActiveTab("MY CHALLENGES")}
                    >
                        <Text
                            className={`text-center font-semibold ${activeTab === "MY CHALLENGES" ? "text-orange-500" : "text-gray-400"
                                }`}
                        >
                            MY CHALLENGES
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1">
                {activeTab === "NEW" && (
                    <View className="py-6">
                        <Text className="text-center text-gray-600 mb-6 px-6">
                            Looks like you've not joined any challenges yet. Explore & join!
                        </Text>

                        <Text className="text-xl font-bold text-gray-800 mb-4 px-4">Latest Challenges</Text>

                        {challenges.map(renderChallengeCard)}
                    </View>
                )}

                {activeTab === "MY CHALLENGES" && (
                    <View className="flex-1 items-center justify-center py-20">
                        <Text className="text-gray-600 text-center px-6">No challenges joined yet. Start exploring!</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default JoinChallengeScreen
