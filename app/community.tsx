import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect } from "react"
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface CommunityCategory {
    id: string
    title: string
    icon?: string
    image?: any
    color: string
    link?: string
}

const { height, width } = Dimensions.get('window');
const squareSize = 0.45 * Math.min(width, height);

const CommunityScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation]);

    const categories: CommunityCategory[] = [
        { id: "1", title: "Scorers", image: require('../assets/images/score.png'), color: "#b6b3b3", link: "/scorers" },
        { id: "2", title: "Umpires", image: require('../assets/images/umpire.png'), color: "#b6b3b3", link: "/umpires" },
        { id: "3", title: "Commentators", image: require('../assets/images/cricket-commentator.png'), color: "#b6b3b3", link: "/commentators" },
        { id: "4", title: "Streamers", icon: "videocam", color: "#b6b3b3", link: "/live-streamers" },
        { id: "5", title: "Organisers", icon: "people", color: "#b6b3b3" },
        { id: "7", title: "Grounds", image: require('../assets/images/stadium.png'), color: "#b6b3b3", link: "/grounds" },
        { id: "9", title: "Physio & Trainers", image: require('../assets/images/physio.png'), color: "#b6b3b3", link: "/trainers" },
        { id: "10", title: "Personal Coaching", icon: "person-circle", color: "#b6b3b3", link: "/personal-coaching" },
        { id: "11", title: "Box Cricket & Nets", image: require('../assets/images/net.png'), color: "#b6b3b3", link: "/box-crickets" },
    ]

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                {/* Header */}
                <View className="px-4 py-3">
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-xl font-bold text-black">Community</Text>
                        <View className="flex-row items-center">
                            <TouchableOpacity className="mr-4" onPress={() => router.push(`/search`)}>
                                <Ionicons name="search" size={22} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity className="mr-4" onPress={() => router.push(`/direct-messages`)}>
                                <Ionicons name="chatbubbles" size={22} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity className="relative" onPress={() => router.push(`/filters`)}>
                                <Ionicons name="funnel" size={22} color="black" />
                                <View className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-yellow-400 rounded-full items-center justify-center">
                                    <Text className="text-[10px] font-bold text-gray-800">1</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Location Header */}
                <View className="px-4 py-3">
                    <Text className="text-base font-semibold text-gray-800">
                        Cricket Community in <Text className="text-[#0e7ccb]">Islamabad</Text>
                    </Text>
                </View>

                {/* Categories Grid */}
                <ScrollView className="flex-1 px-3 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
                    <View className="flex-row flex-wrap gap-x-3 gap-y-4 justify-start">
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                activeOpacity={0.8}
                                className="bg-white rounded-2xl p-4 items-center justify-center"
                                style={{
                                    backgroundColor: '#e0f2fe', // light blue (Tailwind's sky-100)
                                    width: squareSize,
                                    height: squareSize,
                                    aspectRatio: 1,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 10,
                                    elevation: 3, // lighter shadow for Android
                                }}
                                onPress={() => {
                                    if (category.link) {
                                        router.push(category.link as `/`); // or `as any` to suppress TS
                                    }
                                }}
                            >
                                <View
                                    className="w-12 h-12 rounded-full items-center justify-center mb-3"
                                    style={{ backgroundColor: `${category.color}20` }}
                                >
                                    {
                                        category.icon
                                            ?
                                            <Ionicons name={category.icon as any} size={26} color={category.color} />
                                            :
                                            <Image
                                                source={category.image}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor: '#6b7280',
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                    }
                                </View>
                                <Text className="text-center text-gray-800 font-medium text-xs leading-4">
                                    {category.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default CommunityScreen
