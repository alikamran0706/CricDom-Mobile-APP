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
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const categories: CommunityCategory[] = [
        { id: "1", title: "Scorers", icon: "calculator", color: "#0ea5e9" },
        { id: "2", title: "Umpires", icon: "person", color: "#0ea5e9" },
        { id: "3", title: "Commentators", icon: "mic", color: "#0ea5e9" },
        { id: "4", title: "Streamers", icon: "videocam", color: "#0ea5e9" },
        { id: "5", title: "Organisers", icon: "people", color: "#0ea5e9" },
        { id: "6", title: "Academies", icon: "school", color: "#0ea5e9" },
        { id: "7", title: "Grounds", icon: "location", color: "#0ea5e9" },
        { id: "8", title: "Shops", icon: "storefront", color: "#0ea5e9" },
        { id: "9", title: "Physio & Trainers", icon: "fitness", color: "#0ea5e9" },
        { id: "10", title: "Personal Coaching", icon: "person-circle", color: "#0ea5e9" },
        { id: "11", title: "Box Cricket & Nets", icon: "grid", color: "#0ea5e9" },
    ]

    const renderCategoryCard = (category: CommunityCategory) => (
        <TouchableOpacity
            key={category.id}
            activeOpacity={0.8}
            className="bg-white rounded-2xl p-4 m-2 items-center justify-center"
            style={{
                width: "30%",
                aspectRatio: 1,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 3,
            }}
        >
            <View
                className="w-12 h-12 rounded-full items-center justify-center mb-3"
                style={{ backgroundColor: `${category.color}20` }} // Light tint of icon color
            >
                <Ionicons name={category.icon as any} size={28} color={category.color} />
            </View>
            <Text className="text-center text-gray-800 font-medium text-xs leading-4">
                {category.title}
            </Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="px-4 py-3 bg-white border-b border-gray-200">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-black">Community</Text>
                    <View className="flex-row items-center">
                        <TouchableOpacity className="mr-4">
                            <Ionicons name="search" size={22} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity className="mr-4">
                            <Ionicons name="chatbubbles" size={22} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity className="relative">
                            <Ionicons name="funnel" size={22} color="black" />
                            <View className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-yellow-400 rounded-full items-center justify-center">
                                <Text className="text-[10px] font-bold text-gray-800">1</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Location Header */}
            <View className="bg-white px-4 py-3 border-b border-gray-200">
                <Text className="text-base font-semibold text-gray-800">
                    Cricket Community in <Text className="text-green-600">Islamabad</Text>
                </Text>
            </View>

            {/* Categories Grid */}
            <ScrollView className="flex-1 px-3 py-4">
                <View className="flex-row flex-wrap gap-x-3 gap-y-4 justify-start">
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            activeOpacity={0.8}
                            className="bg-white rounded-2xl p-4 items-center justify-center"
                            style={{
                                width: "31%", // fits 3 in a row with small gaps
                                aspectRatio: 1,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.08,
                                shadowRadius: 4,
                                elevation: 2,
                            }}
                        // onPress={() => router.push(`/community/${category.id}`)}
                        >
                            <View
                                className="w-12 h-12 rounded-full items-center justify-center mb-3"
                                style={{ backgroundColor: `${category.color}20` }}
                            >
                                <Ionicons name={category.icon as any} size={26} color={category.color} />
                            </View>
                            <Text className="text-center text-gray-800 font-medium text-xs leading-4">
                                {category.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default CommunityScreen
