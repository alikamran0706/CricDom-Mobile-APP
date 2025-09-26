import CardWithRating from "@/components/community/CardWithRating"
import Header from "@/components/community/Header"
import FloatingActionButton from "@/components/ui/FloatingActionButton"
import Tabs from "@/components/ui/Tabs"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
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
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState("Pakistan");
    const navigation = useNavigation();

    const filters = ["Limited Overs", "Box/Turf Cricket", "Test Match", "T20"]

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

    const renderCard = ({ item }: any) => (
        <CardWithRating
            key={item.id}
            id={item.id}
            title={item.name}
            subTitle={item.location}
            image={item.image}
            rating={item.rating}
            reviews={item.reviews}
        />
    )

    const HeaderComponent = () => {
        return (
            <View>
                {/* Country Selection */}
                <View className="bg-white px-4">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-lg font-semibold text-gray-800">
                            Nearby <Text className="text-[#0e7ccb]">{selectedCountry}</Text> - All
                        </Text>
                        <TouchableOpacity className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                            <Ionicons name="swap-vertical" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tabs */}
                <Tabs
                    tabs={filters}
                    activeTab='Limited Overs'
                />
            </View>
        )
    }

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                {/* Header */}
                <Header heading={`Personal Coaching`} />
                {/* Scorers List */}
                <FlatList
                    data={coaches}
                    renderItem={renderCard}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
                    ListHeaderComponent={() => (
                        <HeaderComponent />
                    )}
                />

                {/* Bottom Buttons */}
                <FloatingActionButton
                    label="REGISTER"
                    onPress={() => router.push('/create-coach')}
                />
            </View>
        </SafeAreaView>
    )
}

export default PersonalCoachingScreen
