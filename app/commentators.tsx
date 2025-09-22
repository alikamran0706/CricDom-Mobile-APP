import Card from "@/components/community/Card"
import Header from "@/components/community/Header"
import FloatingActionButton from "@/components/ui/FloatingActionButton"
import Tabs from "@/components/ui/Tabs"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"

interface Commentator {
    id: string
    name: string
    image: string
    matches: number
    totalPoints: number
    dailyRate: number
    matchRate: number
    rank: number
}

const CommentatorsScreen = () => {
    const [selectedFilter, setSelectedFilter] = useState("Limited Overs")
    const navigation = useNavigation()
    const router = useRouter()

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const commentators: Commentator[] = [
        {
            id: "1",
            name: "PADMAKAR PATIL (...",
            image: "https://yourdomain.com/cricket-commentator-professional.jpg", // replace with proper URI or require if local
            matches: 2384,
            totalPoints: 269658,
            dailyRate: 5000,
            matchRate: 2500,
            rank: 1,
        },
        {
            id: "2",
            name: "Abhishek Prajapati",
            image: "https://yourdomain.com/cricket-commentator-with-sunglasses.jpg",
            matches: 1677,
            totalPoints: 251402,
            dailyRate: 4000,
            matchRate: 1500,
            rank: 2,
        },
        {
            id: "3",
            name: "Jigs Kadiwala (Sac...",
            image: "https://yourdomain.com/cricket-commentator-in-white-shirt.jpg",
            matches: 1757,
            totalPoints: 244439,
            dailyRate: 5555,
            matchRate: 3555,
            rank: 3,
        },
        {
            id: "4",
            name: "Noor Malak (90354...",
            image: "https://yourdomain.com/cricket-commentator-purple-shirt.jpg",
            matches: 1456,
            totalPoints: 198765,
            dailyRate: 3500,
            matchRate: 1200,
            rank: 4,
        },
    ]

    const filters = ["Limited Overs", "Box/Turf Cricket", "Test Match", "T20"]

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1:
                return "text-yellow-400" // Gold
            case 2:
                return "text-orange-500"
            case 3:
                return "text-orange-600"
            default:
                return "text-gray-400"
        }
    }

    const formatPoints = (points: number) => {
        return points.toLocaleString()
    }

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">

                {/* Header */}
                <Header heading="Commentators" />

                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {/* Title */}
                    <View className="flex-row items-center justify-between px-4 py-4">
                        <Text className="text-lg font-semibold text-gray-800">
                            Top Commentators of{" "}
                            <Text className="text-emerald-500">India - All</Text>
                        </Text>
                        <TouchableOpacity>
                            <Ionicons name="information-circle-outline" size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    {/* Filter Tabs */}
                    <View className="px-4 mb-4">
                        <Tabs tabs={filters} activeTab={selectedFilter} onTabPress={(tab: any) => setSelectedFilter(tab)} />
                    </View>

                    {/* Commentators List */}
                    <View className="px-4 space-y-4">
                        {commentators.map((commentator) => (
                            <Card
                                key={commentator.id}
                                name={commentator.name}
                                matches={commentator.matches}
                                points={commentator.totalPoints}
                                rank={commentator.rank}
                                dailyRate={commentator.dailyRate}
                                matchRate={commentator.matchRate}
                                image={commentator.image}
                                link={'/'}
                            />

                        ))}
                    </View>
                </ScrollView>

                {/* Bottom Actions */}
                <FloatingActionButton
                    label="REGISTER"
                    onPress={() => router.push('/create-commentator')}
                />
            </View>
        </SafeAreaView>
    )
}

export default CommentatorsScreen
