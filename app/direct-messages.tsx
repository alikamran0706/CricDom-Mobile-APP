import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const DirectMessagesScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const [showMenu, setShowMenu] = useState(false);

    const conversations = [
        {
            id: 1,
            name: "Rashid",
            lastMessage: "Hi",
            time: "05/09",
            image: "/user-rashid.jpg",
        },
    ];

    return (
        <View className="flex-1 bg-gray-100">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-black text-lg font-bold">Direct Messages (DM)</Text>
                <TouchableOpacity>
                    <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Chat Interface */}
            <View className="flex-1 p-2">
                {/* User Header */}
                <TouchableOpacity className="flex-row items-center px-4 py-3 relative rounded-lg bg-white"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 11,
                    }}
                    onPress={() => router.push('/message')}
                >
                    <View className="w-10 h-10 rounded-full mr-3 border border-gray-300">
                        <Image
                            source={{ uri: "/user-suresh.jpg" }}
                            className="w-[100%] h-[100%]"
                        />
                    </View>
                    <Text className="text-black text-base font-medium flex-1">Suresh</Text>
                    <TouchableOpacity
                        className="p-1"
                        onPress={() => setShowMenu(!showMenu)}
                    >
                        <Ionicons name="ellipsis-vertical" size={20} color="black" />
                    </TouchableOpacity>
                </TouchableOpacity>

                {/* Menu Dropdown */}
                {showMenu && (
                    <View className="absolute top-[100px] right-4 bg-white rounded-lg shadow-lg z-50 min-w-[150px]">
                        <TouchableOpacity className="py-3 px-4 border-b border-gray-100">
                            <Text className="text-sm text-gray-800">View Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="py-3 px-4 border-b border-gray-100">
                            <Text className="text-sm text-gray-800">Block User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="py-3 px-4 border-b border-gray-100">
                            <Text className="text-sm text-gray-800">Report User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="py-3 px-4">
                            <Text className="text-sm text-gray-800">Delete Chat</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Chat Content */}
                {/* <ScrollView className="flex-1 px-4 py-5">
                    <View className="items-center py-10">
                        <View className="mb-4">
                            <Ionicons name="chatbubbles-outline" size={40} color="#ccc" />
                        </View>
                        <Text className="text-sm text-gray-600 text-center leading-5 px-5">
                            Hey, you will be able to send only 1 message initially. You will be
                            able to send more once the recipient replies to your messages.
                        </Text>
                    </View>
                </ScrollView> */}
            </View>
        </View>
    );
};

export default DirectMessagesScreen;
