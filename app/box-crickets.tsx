import CardWithRating from "@/components/community/CardWithRating"
import Header from "@/components/community/Header"
import FloatingActionButton from "@/components/ui/FloatingActionButton"
import Tabs from "@/components/ui/Tabs"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const BoxCricketScreen = () => {
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState("Pakistan");
    const navigation = useNavigation();

    const filters = ["Limited Overs", "Box/Turf Cricket", "Test Match", "T20"]

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const venues = [
    {
      id: '1',
      name: "3 Dimensional ACA Cricket Academy",
      location: "Gurugram (Gurgaon)",
      rating: 3.6,
      reviews: 29,
      image: "/public/cricket-ground-facility.jpg",
    },
    {
      id: '2',
      name: "AAI Sportsaal",
      location: "Chennai",
      rating: 4.3,
      reviews: 48,
      image: "/public/cricket-nets-facility.jpg",
    },
    {
      id: '3',
      name: "Academy Modasa",
      location: "Modasa",
      rating: 4.1,
      reviews: 16,
      image: "/public/cricket-academy-logo.jpg",
    },
    {
      id: '4',
      name: "Adwan Sports Veritas Complex",
      location: "Noida",
      rating: 3.3,
      reviews: 6,
      image: "/public/sports-complex-logo.jpg",
    },
  ];

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
                <Header heading="Box Cricket & Nets" />
                {/* Scorers List */}
                <FlatList
                    data={venues}
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
                    onPress={() => router.push('/create-box-cricket')}
                />
            </View>
        </SafeAreaView>
    )
}

export default BoxCricketScreen;
