import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface CommunityCategory {
    id: string
    title: string
    icon: string
    color: string
}

const CommunityScreen = () => {
    const router = useRouter()
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const categories: CommunityCategory[] = [
        { id: "1", title: "Scorers", icon: "calculator", color: "#ef4444" },
        { id: "2", title: "Umpires", icon: "person", color: "#ef4444" },
        { id: "3", title: "Commentators", icon: "mic", color: "#ef4444" },
        { id: "4", title: "Streamers", icon: "videocam", color: "#ef4444" },
        { id: "5", title: "Organisers", icon: "people", color: "#ef4444" },
        { id: "6", title: "Academies", icon: "school", color: "#ef4444" },
        { id: "7", title: "Grounds", icon: "location", color: "#ef4444" },
        { id: "8", title: "Shops", icon: "storefront", color: "#ef4444" },
        { id: "9", title: "Physio and\nFitness Trainer", icon: "fitness", color: "#ef4444" },
        { id: "10", title: "Personal\nCoaching", icon: "person-circle", color: "#ef4444" },
        { id: "11", title: "Box Cricket &\nNets", icon: "grid", color: "#ef4444" },
    ]

    const renderCategoryCard = (category: CommunityCategory) => (
        <TouchableOpacity
            key={category.id}
            className="bg-white rounded-2xl p-6 m-2 shadow-sm border border-gray-100 items-center justify-center"
            style={{ width: "30%", aspectRatio: 1 }}
        //   onPress={() => router.push(`/community/${category.id}`)}
        >
            <View className="w-12 h-12 items-center justify-center mb-3">
                <Ionicons name={category.icon as any} size={32} color={category.color} />
            </View>
            <Text className="text-center text-gray-800 font-medium text-sm leading-5">{category.title}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="px-4 py-3">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-black">Community</Text>
                    <View className="flex-row">
                        <TouchableOpacity className="mr-4">
                            <Ionicons name="search" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity className="mr-4">
                            <Ionicons name="chatbubbles" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity className="relative">
                            <Ionicons name="funnel" size={24} color="black" />
                            <View className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full items-center justify-center">
                                <Text className="text-xs font-bold text-gray-800">1</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Location Header */}
            <View className="bg-white px-4 py-4 border-b border-gray-200">
                <Text className="text-lg font-semibold text-gray-800">
                    Cricket Community in <Text className="text-green-600">Islamabad</Text>
                </Text>
            </View>

            {/* Categories Grid */}
            <ScrollView className="flex-1 px-2 py-4">
                <View className="flex-row flex-wrap justify-between">{categories.map(renderCategoryCard)}</View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CommunityScreen
