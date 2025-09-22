import CardWithRating from "@/components/community/CardWithRating";
import Header from "@/components/community/Header";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

const LiveStreamersScreen = () => {
    const navigation = useNavigation();
    const router = useRouter();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const streamers = [
        {
            id: 1,
            name: "TheExtreme Media",
            streamedVideos: 481,
            rating: 5.0,
            reviews: 30,
            logo: "https://yourdomain.com/extreme-media-logo.jpg", // Replace with actual URL or require()
        },
        {
            id: 2,
            name: "A1 Sky Sports",
            streamedVideos: 1826,
            rating: 4.8,
            reviews: 102,
            logo: "https://yourdomain.com/a1-sky-sports-logo.jpg",
        },
        {
            id: 3,
            name: "SKY CRICKET LIVE",
            streamedVideos: 6916,
            rating: 4.6,
            reviews: 137,
            logo: "https://yourdomain.com/sky-cricket-logo.jpg",
        },
        {
            id: 4,
            name: "OnAir Broadcast (Premium)",
            streamedVideos: 179,
            rating: 4.2,
            reviews: 45,
            logo: "https://yourdomain.com/onair-broadcast-logo.jpg",
        },
    ]

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                {/* <StatusBar backgroundColor="#C53030" barStyle="light-content" /> */}

                {/* Header */}
                <Header
                    heading={`Live Streamer (0)`}
                />
                <ScrollView className="flex-1">
                    {/* Location Filter */}
                    <View className="flex-row justify-between items-center px-4 mb-4">
                        <Text className="text-base text-gray-800">
                            Nearby <Text className="text-[#0e7ccb] font-semibold">All Locations</Text>
                        </Text>
                        <TouchableOpacity>
                            <Ionicons name="swap-vertical" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>

                    {/* Streamers List */}
                    <View className="px-4">
                        {streamers.map((streamer) => (
                            <CardWithRating
                                key={streamer.id}
                                id={streamer.id}
                                title={streamer.name}
                                subTitle={streamer.streamedVideos}
                                image={streamer.logo}
                                rating={streamer.rating}
                                reviews={streamer.reviews}
                            />
                        ))}
                    </View>
                </ScrollView>

                <FloatingActionButton
                    label="REGISTER"
                    onPress={() => router.push('/create-livestreamer')}
                />
            </View>
        </SafeAreaView>
    )
}

export default LiveStreamersScreen
