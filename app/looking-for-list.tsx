import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LookingForPost {
    id: string
    userName: string
    userImage: string
    lookingFor: string
    role: string
    details: string[]
    timeAgo: string
    distance: string
    ballType: "tennis" | "leather"
}

const LookingForListScreen = () => {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("Ground");
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const filters = ["Ground", "Umpire", "Scorer", "Commentator"];

    const posts: LookingForPost[] = [
        {
            id: "1",
            userName: "Talha Rajput",
            userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
            lookingFor: "Team to join as a Batter",
            role: "Batter",
            details: ["OPEN GROUND"],
            timeAgo: "3 days ago",
            distance: "-- KM",
            ballType: "leather",
        },
        {
            id: "2",
            userName: "Muhammad Hanzallah",
            userImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
            lookingFor: "Scorer for Tournament",
            role: "Scorer",
            details: ["Sun, Oct 05 2025", "Tournament"],
            timeAgo: "5 days ago",
            distance: "-- KM",
            ballType: "tennis",
        },
        {
            id: "3",
            userName: "Muhammad Hanzallah",
            userImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
            lookingFor: "Team for their Tournament",
            role: "Organizer",
            details: ["Sun, Oct 05 2025", "Open Ground", "Weekend"],
            timeAgo: "6 days ago",
            distance: "-- KM",
            ballType: "tennis",
        },
    ];

    const getBorderColor = (index: number) => {
        const colors = ["border-l-yellow-400", "border-l-orange-400", "border-l-red-400"];
        return colors[index % colors.length];
    }

    const renderPostCard = ({ item, index }: { item: LookingForPost; index: number }) => (
        <TouchableOpacity
            className={`bg-white rounded-2xl p-4 mb-4 mx-4 shadow-sm border-l-4 ${getBorderColor(index)}`}
        //   onPress={() => router.push(`/post/${item.id}`)}
        >
            <View className="flex-row items-start justify-between mb-3">
                <View className="flex-row items-center flex-1">
                    <Image source={{ uri: item.userImage }} className="w-12 h-12 rounded-full mr-3" />
                    <View className="flex-1">
                        <Text className="text-base font-semibold text-gray-800">
                            {item.userName} is looking for a {item.lookingFor}.
                        </Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Ionicons name="share" size={20} color="#10b981" />
                </TouchableOpacity>
            </View>

            <View className="ml-15 space-y-1 mb-4">
                {item.details.map((detail, idx) => (
                    <View key={idx} className="flex-row items-center">
                        <View className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2" />
                        <Text className="text-gray-700 font-medium">{detail}</Text>
                    </View>
                ))}
            </View>

            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <Text className="text-gray-500 text-sm mr-4">{item.timeAgo}</Text>
                    <View className="flex-row items-center">
                        <View
                            className={`w-4 h-4 rounded-full mr-2 ${item.ballType === "tennis" ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <Ionicons name="location-outline" size={16} color="#10b981" />
                        <Text className="text-gray-500 text-sm ml-1">{item.distance}</Text>
                    </View>
                </View>
                <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-full">
                    <Text className="text-white font-semibold text-sm">CONTACT</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-red-600 px-4 py-3">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-white">Looking For</Text>
                    <View className="flex-row">
                        <TouchableOpacity className="mr-4">
                            {/* <Ionicons name="target" size={24} color="white" /> */}
                        </TouchableOpacity>
                        <TouchableOpacity className="mr-4">
                            <Ionicons name="chatbubbles" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity className="relative">
                            <Ionicons name="funnel" size={24} color="white" />
                            <View className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full items-center justify-center">
                                <Text className="text-xs font-bold text-gray-800">1</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Section Header */}
            <View className="bg-white px-4 py-4 border-b border-gray-200">
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-semibold text-gray-800">
                        Looking for <Text className="text-green-600">Ground?</Text>
                    </Text>
                    <View className="flex-row">
                        <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-full mr-2">
                            <View className="flex-row items-center">
                                <Ionicons name="add" size={16} color="white" />
                                <Text className="text-white font-semibold ml-1">Post</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-full">
                            <View className="flex-row items-center">
                                <Ionicons name="person" size={16} color="white" />
                                <Text className="text-white font-semibold ml-1">You</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Filter Tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="bg-white px-4 py-3 border-b border-gray-200"
            >
                {filters.map((filter) => (
                    <TouchableOpacity
                        key={filter}
                        className={`px-4 py-2 rounded-full mr-3 border ${activeFilter === filter ? "bg-green-500 border-green-500" : "bg-transparent border-green-500"
                            }`}
                        onPress={() => setActiveFilter(filter)}
                    >
                        <Text className={`font-medium ${activeFilter === filter ? "text-white" : "text-green-600"}`}>{filter}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Posts List */}
            <FlatList
                data={posts}
                renderItem={renderPostCard}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 8 }}
            />
        </SafeAreaView>
    )
}

export default LookingForListScreen
