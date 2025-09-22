import Header from "@/components/community/Header"
import FloatingActionButton from "@/components/ui/FloatingActionButton"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const ScorersScreen = () => {
    const router = useRouter();
    const [showSortModal, setShowSortModal] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Ratings - High to Low");
    const navigation = useNavigation();

    const grounds = [
        {
            id: '1',
            name: "New Melgiri Cricket Ground",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
            rating: 4.4,
            reviews: 12,
            location: "Hyderabad (Telangana)",
            type: "Turf",
            matches: 215,
            price: "Rs.2500-6500",
            verified: true,
        },
        {
            id: '2',
            name: "PMR Cricket County (Ground-1)",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
            rating: 4.4,
            reviews: 47,
            location: "Hyderabad (Telangana)",
            type: "Turf",
            matches: 448,
            price: "Rs.2500-7000",
            verified: true,
        },
    ]

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const renderGroundCard = ({ item }: any) => (
        <View
            key={item.id}
            className="bg-white rounded-xl mt-4 overflow-hidden"
            style={{
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            }}
        >
            <Image source={{ uri: item.image }} className="w-full h-52 bg-gray-200" />

            <View className="p-4">
                <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-gray-800 text-base font-semibold flex-1">
                        {item.id} - {item.name}
                    </Text>
                    {item.verified && (
                        <Ionicons name="checkmark-circle" size={20} color="#0e7ccb" />
                    )}
                </View>

                <View className="flex-row items-center mb-2">
                    <View className="bg-yellow-400 px-3 py-1 rounded-full mr-2">
                        <Text className="text-black text-xs font-semibold">
                            {item.rating}/5
                        </Text>
                    </View>
                    <Text className="text-gray-600 text-sm">
                        {item.reviews} Review{item.reviews !== 1 ? "s" : ""}
                    </Text>
                </View>

                <View className="flex-row items-center flex-wrap mb-3">
                    <Text className="text-gray-600 text-sm mr-4">
                        {item.location}
                    </Text>
                    <Text className="text-gray-600 text-sm mr-4">
                        {item.type}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                        Matches Played: {item.matches}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="text-[#c41e3a] text-base font-semibold">
                        {item.price}
                    </Text>
                    <TouchableOpacity className="bg-[#0e7ccb] px-4 py-2 rounded-md">
                        <Text className="text-white text-sm font-semibold">BOOK NOW</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    const HeaderComponent = () => {
        return (
            <View className="flex-row items-center justify-between py-2">
                <View className="flex-row items-center">
                    <Text className="text-gray-800 text-base mr-2">Nearby</Text>
                    <Text className="text-[#0e7ccb] text-base font-semibold">All Locations</Text>
                </View>
                <View className="flex-row items-center">
                    <TouchableOpacity className="mr-4">
                        <Ionicons name="location-outline" size={20} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowSortModal(true)}>
                        <Ionicons name="swap-vertical" size={20} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                {/* Header */}
                <Header
                    heading={`Grounds (3783)`}
                />
                {/* Scorers List */}
                <FlatList
                    data={grounds}
                    renderItem={renderGroundCard}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ marginHorizontal: 12, paddingBottom: 100 }}
                    ListHeaderComponent={() => (
                        <HeaderComponent />
                    )}
                />

                {/* Bottom Buttons */}
                <FloatingActionButton
                    label="REGISTER"
                    onPress={() => router.push('/create-ground')}
                />
            </View>
        </SafeAreaView>
    )
}

export default ScorersScreen
