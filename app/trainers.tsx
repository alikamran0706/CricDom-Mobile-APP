import CardWithRating from "@/components/community/CardWithRating"
import Header from "@/components/community/Header"
import FloatingActionButton from "@/components/ui/FloatingActionButton"
import Tabs from "@/components/ui/Tabs"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const TrainersScreen = () => {
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
                            Top Trainers of <Text className="text-[#0e7ccb]">{selectedCountry}</Text> - All
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
                <Header heading={`Fitness Trainer`} />
                {/* Scorers List */}
                <FlatList
                    data={trainers}
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
                    onPress={() => router.push('/create-trainer')}
                />
            </View>
        </SafeAreaView>
    )
}

export default TrainersScreen;
