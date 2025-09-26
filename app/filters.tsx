import Header from "@/components/ui/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateMatch() {
    const [selectedYear, setSelectedYear] = useState("All");
    const [selectedCountry, setSelectedCountry] = useState("Australia");
    const [selectedState, setSelectedState] = useState("Select State");
    const [selectedMatchType, setSelectedMatchType] = useState("Box/Turf Cricket");

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1">
                    {/* Header */}
                    <Header heading='Filters' />

                    <View className="flex-1 px-4 pt-6">
                        {/* Year Filter */}
                        <View className="mb-8">
                            <Text className="text-black text-base font-medium mb-3">Year</Text>
                            <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-300">
                                <Text className="text-base text-gray-800">{selectedYear}</Text>
                                <Ionicons name="chevron-down" size={20} color="#666" />
                            </TouchableOpacity>
                        </View>

                        {/* Country Filter */}
                        <View className="mb-8">
                            <Text className="text-black text-base font-medium mb-3">Country</Text>
                            <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-300">
                                <Text className="text-base text-gray-800">{selectedCountry}</Text>
                                <Ionicons name="chevron-down" size={20} color="#666" />
                            </TouchableOpacity>
                        </View>

                        {/* State/Province Filter */}
                        <View className="mb-8">
                            <Text className="text-black text-base font-medium mb-3">State/Province</Text>
                            <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-300">
                                <Text className="text-base text-gray-400">{selectedState}</Text>
                                <Ionicons name="chevron-down" size={20} color="#666" />
                            </TouchableOpacity>
                        </View>

                        {/* Match Type Filter */}
                        <View className="mb-8">
                            <Text className="text-black text-base font-medium mb-3">
                                Match Type
                                <Text className="text-red-700">*</Text>
                            </Text>
                            <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-300">
                                <Text className="text-base text-gray-800">{selectedMatchType}</Text>
                                <Ionicons name="chevron-down" size={20} color="#666" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Bottom Buttons */}
                    <View className="bg-white p-4">
                        <View className="flex-row gap-x-3">
                            <TouchableOpacity className="flex-1 bg-gray-200 rounded-xl py-4 items-center">
                                <Text className="text-gray-700 font-bold">RESET ALL</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#0e7ccb",
                                }}
                                className="flex-1 rounded-xl py-4 items-center"
                            >
                                <Text className="text-white font-bold">APPLY</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

