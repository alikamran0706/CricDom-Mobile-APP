import Header from "@/components/community/Header";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

const TrainersListScreen = () => {
    const router = useRouter()
    const [selectedLocation, setSelectedLocation] = useState("All Locations");
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const trainers = [
        {
            id: 1,
            name: "A AHAMED RYAZ",
            location: "Madurai",
            rating: 4.8,
            reviews: 46,
            image: "/trainer-profile.jpg",
        },
        {
            id: 2,
            name: "A to Z Rehab",
            location: "New Delhi",
            rating: 4.4,
            reviews: 7,
            image: "/rehab-center.jpg",
        },
        {
            id: 3,
            name: "AA CHANGPUNG MAN...",
            location: "Shillong",
            rating: 4.9,
            reviews: 30,
            image: "/fitness-trainer.jpg",
        },
        {
            id: 4,
            name: "Aarogya physio Care",
            location: "Kullu",
            rating: 4.8,
            reviews: 5,
            image: "/physio-care.jpg",
        },
    ]

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <Header
                heading={`Fitness Trainer`}
            />

            <ScrollView className="flex-1">

                {/* Location Filter */}
                <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
                    <Text className="text-gray-800 text-lg">Nearby </Text>
                    <TouchableOpacity>
                        <Text className="text-[#0e7ccb] text-lg font-medium">All Locations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="ml-auto">
                        <Ionicons name="swap-vertical" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Trainers List */}
                {trainers.map((trainer) => (
                    <TouchableOpacity
                        key={trainer.id}
                        className="bg-white flex-row items-center p-4 m-2 rounded-xl"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3, // for Android shadow
                        }}
                    >
                        <View className="w-16 h-16 rounded-full mr-4 border border-gray-300">
                            <Image source={{ uri: trainer.image }} className="w-[100%] h-[100%]" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-800 text-lg font-bold mb-1">{trainer.name}</Text>
                            <Text className="text-gray-600 text-sm">{trainer.location}</Text>
                        </View>
                        <View className="items-end">
                            <View className="bg-[#0e7ccb] px-3 py-1 rounded-full mb-1">
                                <Text className="text-white text-xs font-bold">{trainer.rating}/5</Text>
                            </View>
                            <Text className="text-gray-600 text-xs">{trainer.reviews} Review(s)</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Bottom Buttons */}
            <FloatingActionButton
                label="REGISTER"
                onPress={() => router.push('/create-ground')}
            />
        </SafeAreaView>
    )
}

export default TrainersListScreen
