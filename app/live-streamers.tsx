import CardWithRating from "@/components/community/CardWithRating"
import Header from "@/components/community/Header"
import FloatingActionButton from "@/components/ui/FloatingActionButton"
import Tabs from "@/components/ui/Tabs"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const streamers = [
    {
        id: '1',
        name: "TheExtreme Media",
        location: 481,
        rating: 5.0,
        reviews: 30,
        image: "https://yourdomain.com/extreme-media-logo.jpg", // Replace with actual URL or require()
    },
    {
        id: '2',
        name: "A1 Sky Sports",
        location: 1826,
        rating: 4.8,
        reviews: 102,
        image: "https://yourdomain.com/a1-sky-sports-logo.jpg",
    },
    {
        id: '3',
        name: "SKY CRICKET LIVE",
        location: 6916,
        rating: 4.6,
        reviews: 137,
        image: "https://yourdomain.com/sky-cricket-logo.jpg",
    },
    {
        id: '4',
        name: "OnAir Broadcast (Premium)",
        location: 179,
        rating: 4.2,
        reviews: 45,
        image: "https://yourdomain.com/onair-broadcast-logo.jpg",
    },
]

const LiveStreamersScreen = () => {
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState("Pakistan");
    const navigation = useNavigation();

    const filters = ["Limited Overs", "Box/Turf Cricket", "Test Match", "T20"]

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const trainers = [
        {
            id: '1',
            name: "A AHAMED RYAZ",
            location: "Madurai",
            rating: 4.8,
            reviews: 46,
            image: "/trainer-profile.jpg",
        },
        {
            id: '2',
            name: "A to Z Rehab",
            location: "New Delhi",
            rating: 4.4,
            reviews: 7,
            image: "/rehab-center.jpg",
        },
        {
            id: '3',
            name: "AA CHANGPUNG MAN...",
            location: "Shillong",
            rating: 4.9,
            reviews: 30,
            image: "/fitness-trainer.jpg",
        },
        {
            id: '4',
            name: "Aarogya physio Care",
            location: "Kullu",
            rating: 4.8,
            reviews: 5,
            image: "/physio-care.jpg",
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
                <Header heading={`Live Streamer (0)`} />
                {/* Scorers List */}
                <FlatList
                    data={streamers}
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
                    onPress={() => router.push('/looking-for-list')}
                />
            </View>
        </SafeAreaView>
    )
}

export default LiveStreamersScreen;
