import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Comment {
    id: string
    userName: string
    userImage: string
    comment: string
    timeAgo: string
    likes: number
    hasLiked: boolean
}

const CommentsScreen = () => {
    const router = useRouter()
    const [newComment, setNewComment] = useState("")
    const [selectedReaction, setSelectedReaction] = useState("")
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const quickReactions = ["Straight drive 💯", "Loft it", "Leg side any day 😎", "Deep"]

    const comments: Comment[] = [
        {
            id: "1",
            userName: "Abhradeep Dutta",
            userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
            comment: "Straight drive 💯",
            timeAgo: "2h",
            likes: 0,
            hasLiked: false,
        },
        {
            id: "2",
            userName: "Ali Kamran",
            userImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
            comment: "Hi",
            timeAgo: "22 ms ago",
            likes: 1,
            hasLiked: true,
        },
        {
            id: "3",
            userName: "Virat",
            userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
            comment: "Straight drive 💯",
            timeAgo: "1h",
            likes: 0,
            hasLiked: false,
        },
        {
            id: "4",
            userName: "ADIL BASHIR 18*",
            userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
            comment: "Straight drive 💯",
            timeAgo: "46m",
            likes: 0,
            hasLiked: false,
        },
        {
            id: "5",
            userName: "Md Asif Alam",
            userImage: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&auto=format&fit=crop&q=60",
            comment: "Straight drive 💯",
            timeAgo: "20m",
            likes: 0,
            hasLiked: false,
        },
    ]

    const addComment = () => {
        if (newComment.trim()) {
            // Handle comment submission logic here
            setNewComment("")
        }
    }

    const renderComment = ({ item }: { item: Comment }) => (
        <View className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm border border-gray-100">
            <View className="flex-row items-start justify-between">
                <View className="flex-row items-start flex-1">
                    <Image source={{ uri: item.userImage }} className="w-10 h-10 rounded-full mr-3" />
                    <View className="flex-1">
                        <Text className="text-base font-semibold text-gray-800 mb-1">{item.userName}</Text>
                        <Text className="text-gray-700 mb-2">{item.comment}</Text>
                        <View className="flex-row items-center">
                            <Text className="text-gray-500 text-sm mr-4">{item.timeAgo}</Text>
                            <TouchableOpacity className="mr-4">
                                <Text className={`text-sm font-medium ${item.hasLiked ? "text-[#0e7ccb]" : "text-gray-600"}`}>
                                    {item.hasLiked ? "Liked it" : "React"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text className="text-gray-600 text-sm font-medium">Reply</Text>
                            </TouchableOpacity>
                            {item.likes > 0 && (
                                <View className="flex-row items-center ml-4">
                                    <Text className="text-gray-600 text-sm mr-1">{item.likes}</Text>
                                    <View className="w-5 h-5 bg-[#0e7ccb] rounded-full items-center justify-center">
                                        <Ionicons name="thumbs-up" size={12} color="white" />
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-4 py-3">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#3b3b3b" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-black ml-4">Comments</Text>
                </View>
            </View>

            {/* View Previous Comments */}
            <View className="px-4 py-3 bg-white border-b border-gray-200">
                <TouchableOpacity>
                    <Text className="text-gray-700 font-semibold">View Previous comments</Text>
                </TouchableOpacity>
            </View>

            {/* Comments List */}
            <FlatList
                data={comments}
                renderItem={renderComment}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 8 }}
            />

            {/* Quick Reactions */}
            <View className="bg-white px-4 py-3 border-t border-gray-200">
                <View className="flex-row flex-wrap mb-3">
                    {quickReactions.map((reaction) => (
                        <TouchableOpacity
                            key={reaction}
                            className={`px-3 py-2 rounded-full mr-2 mb-2 ${selectedReaction === reaction ? "bg-[#0e7ccb]" : "bg-gray-200"
                                }`}
                            onPress={() => setSelectedReaction(reaction)}
                        >
                            <Text className={selectedReaction === reaction ? "text-white text-sm" : "text-gray-700 text-sm"}>
                                {reaction}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Comment Input */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="bg-white">
                <View className="px-4 py-3 border-t border-gray-200">
                    <View className="flex-row justify-end mb-2">
                        <Text className="text-gray-400 text-sm">0/280</Text>
                    </View>

                    <View className="flex-row items-center">
                        <View className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-3">
                            <TextInput
                                className="text-base text-gray-800"
                                placeholder="Add a comment..."
                                placeholderTextColor="#A0A0A0"
                                value={newComment}
                                onChangeText={setNewComment}
                                multiline
                                maxLength={280}
                            />
                        </View>

                        <TouchableOpacity
                            className={`w-12 h-12 rounded-full items-center justify-center ${newComment.trim() ? "bg-[#0e7ccb]" : "bg-gray-300"
                                }`}
                            onPress={addComment}
                            disabled={!newComment.trim()}
                        >
                            <Ionicons name="send" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default CommentsScreen
