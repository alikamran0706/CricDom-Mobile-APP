import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MessageScreen = () => {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const playerData = {
        name: "Pramod Mohite",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
    }

    const sendMessage = () => {
        if (message.trim()) {
            // Handle message sending logic here
            setMessage("")
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-blue-200 px-4 py-3">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <View className="flex-row items-center flex-1 ml-4">
                        <Image source={{ uri: playerData.image }} className="w-10 h-10 rounded-full mr-3" />
                        <Text className="text-xl font-bold text-black">{playerData.name}</Text>
                    </View>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-vertical" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Message Area */}
            <View className="flex-1 items-center justify-center px-6">
                <View className="items-center mb-8">
                    <View className="w-24 h-24 bg-gray-300 rounded-2xl items-center justify-center mb-4">
                        <Ionicons name="chatbubbles-outline" size={40} color="#666" />
                    </View>

                    <Text className="text-center text-gray-600 leading-6 max-w-sm">
                        Hey, you will be able to send only 1 message initially. You will be able to send more once the recipient
                        replies to your messages.
                    </Text>
                </View>
            </View>

            {/* Message Input */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="bg-white">
                <View className="px-4 py-3 border-t border-gray-200">
                    <View className="flex-row justify-end mb-2">
                        <Text className="text-gray-400 text-sm">0/280</Text>
                    </View>

                    <View className="flex-row items-center">
                        <View className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-3">
                            <TextInput
                                className="text-base text-gray-800"
                                placeholder="Write a message..."
                                value={message}
                                onChangeText={setMessage}
                                multiline
                                maxLength={280}
                            />
                        </View>

                        <TouchableOpacity
                            className={`w-12 h-12 rounded-full items-center justify-center ${message.trim() ? "bg-green-500" : "bg-gray-300"
                                }`}
                            onPress={sendMessage}
                            disabled={!message.trim()}
                        >
                            <Ionicons name="send" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default MessageScreen
