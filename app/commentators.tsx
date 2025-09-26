import Card from "@/components/community/Card"
import Header from "@/components/community/Header"
import FloatingActionButton from "@/components/ui/FloatingActionButton"
import Tabs from "@/components/ui/Tabs"
import { commentators } from "@/constants/commentator"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const CommentatorsScreen = () => {
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState("Pakistan");
    const navigation = useNavigation();

    const filters = ["Limited Overs", "Box/Turf Cricket", "Test Match", "T20"]

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const renderCommentatorCard = ({ item }: any) => (
        <Card
            name={item.name}
            matches={item.matches}
            points={item.points}
            rank={item.rank}
            dailyRate={item.dailyRate}
            matchRate={item.matchRate}
            image={item.image}
            link={'/'}
        />
    )

    const HeaderComponent = () => {
        return (
            <View>
                {/* Country Selection */}
                <View className="bg-white px-4">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-lg font-semibold text-gray-800">
                            Top Commentators of <Text className="text-[#0e7ccb]">{selectedCountry}</Text> - All
                        </Text>
                        <TouchableOpacity className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                            <Ionicons name="information-circle-outline" size={20} color="#666" />
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
                <Header heading="Commentators" />
                {/* Scorers List */}
                <FlatList
                    data={commentators}
                    renderItem={renderCommentatorCard}
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
                    onPress={() => router.push('/create-commentator')}
                />
            </View>
        </SafeAreaView>
    )
}

export default CommentatorsScreen
