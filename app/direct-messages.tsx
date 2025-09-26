import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateMatch() {
    const router = useRouter();
    const [showMenuId, setShowMenuId] = useState<string | null>(null);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const chatUsers = [
        {
            id: '1',
            name: 'Ali',
            image: '/user-ali.jpg',
        },
        {
            id: '2',
            name: 'Ahmed',
            image: '/user-ahmed.jpg',
        },
        {
            id: '3',
            name: 'Kabir',
            image: '/user-kabir.jpg',
        },
        // Add more static users as needed
    ];

    const refetch = () => {

    }

    const renderItem = ({ item }: { item: typeof chatUsers[0] }) => (
        <View className="mb-3">
            <TouchableOpacity
                className="flex-row items-center px-4 py-3 relative rounded-lg bg-white"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 11,
                }}
                onPress={() => router.push('/message')}
            >
                <View className="w-10 h-10 rounded-full mr-3 border border-gray-300 overflow-hidden">
                    <Image
                        source={{ uri: item.image }}
                        className="w-[100%] h-[100%]"
                    />
                </View>
                <Text className="text-black text-base font-medium flex-1">{item.name}</Text>
                <TouchableOpacity
                    className="p-1"
                    onPress={() =>
                        setShowMenuId(showMenuId === item.id ? null : item.id)
                    }
                >
                    <Ionicons name="ellipsis-vertical" size={20} color="black" />
                </TouchableOpacity>
            </TouchableOpacity>

            {/* Menu Dropdown */}
            {showMenuId === item.id && (
                <View className="absolute top-[65px] right-4 bg-white rounded-lg shadow-lg z-50 min-w-[150px]">
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
        </View>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1">
                    {/* Header */}
                    <View className="flex-row items-center justify-between px-4 py-4">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Entypo name="arrow-bold-left" size={29} color="#3b3b3b" />
                        </TouchableOpacity>
                        <Text className="text-black text-lg font-bold">
                            Direct Messages (DM)
                        </Text>
                        <TouchableOpacity>
                            <Ionicons name="add" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={chatUsers}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={false} onRefresh={refetch} />
                        }
                        contentContainerStyle={{
                            padding: 16,
                        }}
                    />
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

