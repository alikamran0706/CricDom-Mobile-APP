import QRCodeModal from "@/components/Modal/QRCodeModal";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateMatch() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [showQRModal, setShowQRModal] = useState(false);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    type GoToOption = {
        icon: keyof typeof Ionicons.glyphMap; // Ensures that the icon is a valid key from Ionicons glyphMap
        title: string;
        link: string;
    };

    const recentSearches = ["Amethi Cricket Association", "Union Territory Cricket As..."]

    const goToOptions: GoToOption[] = [
        { icon: "baseball-outline", title: "Matches Near Me", link: "/matches" },
    ]

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1">
                    {/* Header */}
                    <View className="flex-row items-center px-4 py-4">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Entypo name="arrow-bold-left" size={29} color="#3b3b3b" />
                        </TouchableOpacity>
                        <View className="flex-1 mx-3">
                            <TextInput
                                style={{ fontSize: 16 }}
                                className="text-gray-800 py-2"
                                placeholderTextColor="#A0A0A0"
                                placeholder="Search scorers"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>
                        <TouchableOpacity className="p-2 mr-2" onPress={() => setShowQRModal(true)}>
                            <Ionicons name="qr-code-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                        {/* Recent Searches */}
                        <View>
                            <View className="flex-row justify-between items-center mb-4">
                                <View className="flex-row items-center">
                                    <Ionicons name="time-outline" size={20} color="#666" />
                                    <Text className="ml-2 text-lg font-semibold text-gray-800">Recent</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text className="text-[#0e7ccb] text-lg font-medium">Clear</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row flex-wrap gap-3">
                                {recentSearches.map((search, index) => (
                                    <TouchableOpacity key={index} className="bg-gray-300 px-4 py-2 rounded-full">
                                        <Text className="text-gray-600 text-sm">{search}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Go To Section */}
                        <View className="mt-6">
                            <Text className="text-lg font-semibold text-gray-800 mb-4">Go To</Text>

                            {goToOptions.map((option, index) => (
                                <TouchableOpacity key={index}
                                    onPress={() => router.push(option.link as `/`)}
                                    className="flex-row items-center justify-between py-4 border-b border-gray-100">
                                    <View className="flex-row items-center">
                                        <Ionicons name={option.icon} size={24} color="#666" />
                                        <Text className="ml-4 text-lg text-gray-800">{option.title}</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                    {/* Tabs */}
                    <View className="mx-4 mt-6 flex-row px-4 py-3 border-t border-gray-200">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                            <TouchableOpacity
                                className={`px-4 py-2 rounded-full mr-3 bg-gray-200`}
                            >
                                <Text className={`font-medium text-gray-700`}>Start A Match</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`px-4 py-2 rounded-full mr-3 bg-gray-200`}
                            >
                                <Text className={`font-medium text-gray-700`}>Add A Tournament/Series</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`px-4 py-2 rounded-full mr-3 bg-gray-200`}
                            >
                                <Text className={`font-medium text-gray-700`}>Go Live</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                    <QRCodeModal
                        visible={showQRModal}
                        onClose={() => setShowQRModal(false)}
                        teamName={"Search"}
                        teamLocation="Lahore"
                        teamId="10818998"
                        teamInitials={"FT"}
                        teamColor="#3B82F6"
                    />

                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

