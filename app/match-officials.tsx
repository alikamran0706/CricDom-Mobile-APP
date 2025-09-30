import FloatingActionButton from "@/components/ui/FloatingActionButton"
import Header from "@/components/ui/Header"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Official {
    id: string
    name: string
    type: "umpire" | "scorer" | "commentator" | "referee" | "streamer"
    position?: number
}

const MatchOfficialsScreen = () => {
    const router = useRouter()
    const [selectedTab, setSelectedTab] = useState("1st")
    const [selectedOfficials, setSelectedOfficials] = useState<{
        umpires: (Official | null)[]
        scorers: (Official | null)[]
        commentators: (Official | null)[]
        referee: Official | null
        streamers: Official | null
    }>({
        umpires: [null, null, null, null],
        scorers: [null, null],
        commentators: [null, null],
        referee: null,
        streamers: null,
    })

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const tabs = ["1st", "2nd", "3rd", "4th"]

    const handleDone = () => {
        router.back()
    }

    const imageMap: Record<string, any> = {
        umpire: require('../assets/images/umpire.png'),
        scorer: require('../assets/images/score.png'),
        referee: require('../assets/images/refree.png'),
        commentator: require('../assets/images/cricket-commentator.png'),
    }

    const renderOfficialSlot = (icon: string, label: string, image?: string | null, onPress?: () => void, isSelected?: boolean) => (
        <TouchableOpacity
            className={`flex-1 items-center p-6 mx-2 rounded-2xl ${isSelected ? "bg-green-50 border-2 border-green-500" : "bg-gray-100"
                }`}
            onPress={onPress}
        >
            <View className="w-20 h-20 rounded-full bg-gray-200 items-center justify-center mb-4">
                {image ?
                    <Image
                        source={imageMap[image]}
                        style={{ width: 28, height: 28, resizeMode: 'contain' }}
                    />
                    :
                    <Ionicons name={icon as any} size={32} color="#6b7280" />
                }
            </View>
            <Text className="text-gray-800 font-semibold text-center">{label}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                {/* Header */}
                <Header heading='Match Officials' />

                <ScrollView className="flex-1 px-4 py-6"
                    contentContainerStyle={{ paddingBottom: 80 }}
                >
                    {/* Select Umpires */}
                    <View className="mb-8">
                        <Text className="lg font-bold text-gray-800 mb-6">Select Umpires</Text>
                        <View className="flex-row">
                            {renderOfficialSlot("", "1st", 'umpire')}
                            {renderOfficialSlot("", "2nd", 'umpire')}
                        </View>
                    </View>

                    {/* Select Scorers Section */}
                    <View className="mb-8">
                        <Text className="lg font-bold text-gray-800 mb-6">Select Scorers</Text>
                        <View className="flex-row">
                            {renderOfficialSlot("", "1st", "scorer")}
                            {renderOfficialSlot("", "2nd", "scorer")}
                        </View>
                    </View>

                    {/* Select Commentators Section */}
                    <View className="mb-8">
                        <Text className="lg font-bold text-gray-800 mb-6">Select Commentators</Text>
                        <View className="flex-row">
                            {renderOfficialSlot("", "1st", 'commentator')}
                            {renderOfficialSlot("", "2nd", 'commentator')}
                        </View>
                    </View>

                    {/* Others Section */}
                    <View className="mb-8">
                        <Text className="lg font-bold text-gray-800 mb-6">Others</Text>
                        <View className="flex-row">
                            {renderOfficialSlot("", "Match Referee", "referee")}
                            {renderOfficialSlot("videocam", "Live Streamers")}
                        </View>
                    </View>
                </ScrollView>

                <FloatingActionButton
                    label="Done"
                    onPress={() => router.push("/toss")}
                />
            </View>
        </SafeAreaView>
    )
}

export default MatchOfficialsScreen
