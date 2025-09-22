import Header from "@/components/community/Header"
import FloatingActionButton from "@/components/ui/FloatingActionButton"
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
            key={item.id}
            className="bg-white flex-row items-center p-4 m-2 rounded-xl"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            }}
        >
            <View className="w-16 h-16 rounded-full mr-4 border border-gray-300">
                <Image source={{ uri: item.image }} className="w-[100%] h-[100%]" />
            </View>
            <View className="flex-1">
                <Text className="text-gray-800 text-lg font-bold mb-1">{item.name}</Text>
                <Text className="text-gray-600 text-sm">{item.location}</Text>
            </View>
            <View className="items-end">
                <View className="bg-[#0e7ccb] px-3 py-1 rounded-full mb-1">
                    <Text className="text-white text-xs font-bold">{item.rating}/5</Text>
                </View>
                <Text className="text-gray-600 text-xs">{item.reviewCount} Review(s)</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <Header
                heading={`Personal Coaching`}
            />

            {/* Location Filter */}
            <View className="bg-white px-4 py-3 border-b border-gray-200">
                <View className="flex-row items-center justify-between">
                    <Text className="text-base text-gray-600">
                        Nearby <Text className="text-[#0e7ccb] font-semibold">All Locations</Text>
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

            {/* Bottom Buttons */}
            <FloatingActionButton
                label="REGISTER"
                onPress={() => router.push('/create-ground')}
            />
        </SafeAreaView>
    )
}

export default PersonalCoachingScreen
