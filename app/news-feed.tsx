import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Post {
    id: string
    content: string
    author: string
    timestamp: string
    reactions: number
    comments: number
    image?: string
    quickReactions: string[]
}

const NewsFeedScreen = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("FOR YOU");
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const posts: Post[] = [
        {
            id: "1",
            content:
                "You've got a juicy half-volley... Are you guiding it with the field, or going big on your favourite side?",
            author: "cricheroes",
            timestamp: "28-08-2025 01:00 PM",
            reactions: 47,
            comments: 62,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&auto=format&fit=crop&q=60",
            quickReactions: ["Straight drive 💯", "Loft it", "Leg side any day 😎", "Deep"],
        },
    ]

    const renderPost = ({ item }: { item: Post }) => (
        <View className="bg-white mb-4 shadow-sm">
            {/* Post Image */}
            {item.image && (
                <View className="relative">
                    <Image source={{ uri: item.image }} className="w-full h-64" />
                    <View className="absolute inset-0 bg-black/30" />
                    <View className="absolute bottom-4 left-4 right-4">
                        <Text className="text-white text-xl font-bold mb-2">{item.content}</Text>
                    </View>
                </View>
            )}

            {/* Post Footer */}
            <View className="p-4">
                <View className="flex-row items-center mb-3">
                    <View className="w-8 h-8 bg-red-600 rounded-full items-center justify-center mr-2">
                        <Ionicons name="baseball" size={16} color="white" />
                    </View>
                    <Text className="font-semibold text-gray-800">{item.author}</Text>
                </View>

                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-gray-500 text-sm">{item.timestamp}</Text>
                    <Text className="text-gray-500 text-sm">{item.comments} comments</Text>
                </View>

                <View className="flex-row items-center mb-4">
                    <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center mr-2">
                        <Ionicons name="thumbs-up" size={12} color="white" />
                    </View>
                    <Text className="text-gray-600 text-sm">{item.reactions} reactions</Text>
                </View>

                {/* Action Buttons */}
                <View className="flex-row justify-around border-t border-gray-200 pt-4 mb-4">
                    <TouchableOpacity className="flex-row items-center">
                        <Ionicons name="thumbs-up-outline" size={20} color="#666" />
                        <Text className="text-gray-600 ml-2">React</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center"
                        onPress={() => router.push("/comments")}
                    >
                        <Ionicons name="chatbubble-outline" size={20} color="#666" />
                        <Text className="text-gray-600 ml-2">Comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center">
                        <Ionicons name="share-outline" size={20} color="#666" />
                        <Text className="text-gray-600 ml-2">Share</Text>
                    </TouchableOpacity>
                </View>

                {/* Quick Reactions */}
                <View className="flex-row flex-wrap mb-4">
                    {item.quickReactions.map((reaction) => (
                        <TouchableOpacity key={reaction} className="bg-gray-100 px-3 py-2 rounded-full mr-2 mb-2">
                            <Text className="text-gray-700 text-sm">{reaction}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Sample Comment */}
                <View className="flex-row items-start">
                    <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
                        }}
                        className="w-8 h-8 rounded-full mr-3"
                    />
                    <View className="flex-1">
                        <Text className="font-semibold text-gray-800 mb-1">Md Asif Alam</Text>
                        <Text className="text-gray-700">Straight drive 💯</Text>
                    </View>
                </View>
            </View>
        </View>
    )

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-red-600 px-4 py-3">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity>
                        <Ionicons name="menu" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-white rounded-full items-center justify-center mr-2">
                            <Ionicons name="baseball" size={16} color="#dc2626" />
                        </View>
                        <TouchableOpacity className="bg-green-500 px-3 py-1 rounded-full">
                            <Text className="text-white font-semibold text-sm">GO PRO</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row">
                        <TouchableOpacity className="mr-4">
                            <Ionicons name="search" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity className="mr-4">
                            <Ionicons name="chatbubbles" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="notifications" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Tabs */}
            <View className="bg-red-600 px-4 pb-3">
                <View className="flex-row">
                    <TouchableOpacity
                        className={`mr-8 pb-2 ${activeTab === "FOR YOU" ? "border-b-2 border-yellow-400" : ""}`}
                        onPress={() => setActiveTab("FOR YOU")}
                    >
                        <Text className={`font-semibold ${activeTab === "FOR YOU" ? "text-white" : "text-red-200"}`}>FOR YOU</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`pb-2 ${activeTab === "PRO CLUB" ? "border-b-2 border-yellow-400" : ""}`}
                        onPress={() => setActiveTab("PRO CLUB")}
                    >
                        <View className="flex-row items-center">
                            <Text className={`font-semibold mr-1 ${activeTab === "PRO CLUB" ? "text-white" : "text-red-200"}`}>
                                PRO
                            </Text>
                            <Text className={`font-semibold ${activeTab === "PRO CLUB" ? "text-white" : "text-red-200"}`}>CLUB</Text>
                            <View className="w-2 h-2 bg-yellow-400 rounded-full ml-1" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Posts Feed */}
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 8 }}
            />
        </SafeAreaView>
    )
}

export default NewsFeedScreen
