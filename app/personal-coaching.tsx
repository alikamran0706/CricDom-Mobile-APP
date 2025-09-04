"use client"

import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Coach {
    id: string
    name: string
    location: string
    image: string
    rating: number
    reviewCount: number
}

const PersonalCoachingScreen = () => {
    const router = useRouter()
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const coaches: Coach[] = [
        {
            id: "1",
            name: "REGIONAL CRICKET C...",
            location: "Bhopal",
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&auto=format&fit=crop&q=60",
            rating: 4.4,
            reviewCount: 20,
        },
        {
            id: "2",
            name: "Throwdown Speacialist",
            location: "Mysore",
            image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=100&auto=format&fit=crop&q=60",
            rating: 4.1,
            reviewCount: 16,
        },
        {
            id: "3",
            name: "22 Yards Of Happiness",
            location: "Bhopal",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&auto=format&fit=crop&q=60",
            rating: 4.1,
            reviewCount: 23,
        },
        {
            id: "4",
            name: "30 Yards",
            location: "Hosur",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&auto=format&fit=crop&q=60",
            rating: 4.5,
            reviewCount: 6,
        },
    ]

    const renderCoachCard = ({ item }: { item: Coach }) => (
        <TouchableOpacity
            className="bg-white rounded-2xl p-4 mb-4 mx-4 shadow-sm border border-gray-100"
        //   onPress={() => router.push(`/coach/${item.id}`)}
        >
            <View className="flex-row items-center">
                <Image source={{ uri: item.image }} className="w-16 h-16 rounded-2xl mr-4" />

                <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-800 mb-1">{item.name}</Text>
                    <Text className="text-sm text-gray-600 mb-3">{item.location}</Text>
                </View>
            </View>

            <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <View className="flex-row items-center">
                    <View className="bg-orange-100 px-3 py-1 rounded-full mr-3">
                        <Text className="text-orange-600 font-semibold">{item.rating}/5</Text>
                    </View>
                    <Text className="text-gray-600">{item.reviewCount} Review(s)</Text>
                </View>
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
                    <Text className="text-xl font-bold text-white">Community</Text>
                    <View className="flex-row">
                        <TouchableOpacity className="mr-4">
                            <Ionicons name="search" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="funnel" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Section Header */}
            <View className="bg-white px-4 py-4 border-b border-gray-200">
                <View className="flex-row items-center justify-between">
                    <Text className="text-xl font-bold text-gray-800">Personal Coaching</Text>
                    <TouchableOpacity className="bg-red-600 px-4 py-2 rounded-full">
                        <View className="flex-row items-center">
                            <Ionicons name="add" size={16} color="white" />
                            <Text className="text-white font-semibold ml-1">Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Location Filter */}
            <View className="bg-white px-4 py-3 border-b border-gray-200">
                <View className="flex-row items-center justify-between">
                    <Text className="text-base text-gray-600">
                        Nearby <Text className="text-green-600 font-semibold">All Locations</Text>
                    </Text>
                    <View className="flex-row items-center">
                        <Ionicons name="swap-vertical" size={20} color="#666" />
                        <Text className="text-gray-600 ml-1">1</Text>
                    </View>
                </View>
            </View>

            {/* Coaches List */}
            <FlatList
                data={coaches}
                renderItem={renderCoachCard}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 8 }}
            />
        </SafeAreaView>
    )
}

export default PersonalCoachingScreen
