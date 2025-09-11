import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface LookingOption {
    id: string
    title: string
    icon: string
    color: string
    route: string
}

const CreateLookingOptionsScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const options: LookingOption[] = [
        {
            id: "1",
            title: "TEAMS FOR MY TOURNAMENT",
            icon: "trophy",
            color: "#ec4899",
            route: "/create-tournament",
        },
        {
            id: "2",
            title: "A TOURNAMENT TO PARTICIPATE",
            icon: "trophy",
            color: "#60a5fa",
            route: "/find-tournament",
        },
        {
            id: "3",
            title: "AN OPPONENT TO PLAY A MATCH",
            icon: "people",
            color: "#f87171",
            route: "/find-opponent",
        },
        {
            id: "4",
            title: "A TEAM TO JOIN AS A PLAYER",
            icon: "people",
            color: "#fbbf24",
            route: "/join-team",
        },
        {
            id: "5",
            title: "A PLAYER TO JOIN MY TEAM",
            icon: "person-add",
            color: "#34d399",
            route: "/find-player",
        },
        {
            id: "6",
            title: "A GROUND TO PLAY",
            icon: "location",
            color: "#a78bfa",
            route: "/find-ground",
        },
        {
            id: "7",
            title: "AN UMPIRE TO HIRE",
            icon: "person",
            color: "#4ade80",
            route: "/hire-umpire",
        },
        {
            id: "8",
            title: "A SCORER TO HIRE",
            icon: "calculator",
            color: "#fb923c",
            route: "/hire-scorer",
        },
        {
            id: "9",
            title: "A COMMENTATOR TO HIRE",
            icon: "mic",
            color: "#a855f7",
            route: "/hire-commentator",
        },
        {
            id: "10",
            title: "A LIVE STREAMER",
            icon: "videocam",
            color: "#22d3ee",
            route: "/hire-streamer",
        },
    ]

    const renderOptionCard = (option: LookingOption) => (
        <TouchableOpacity
            key={option.id}
            className="rounded-3xl p-6 m-2 items-center justify-center"
            style={{
                backgroundColor: '#e0f2fe', // light blue (Tailwind's sky-100)
                width: '45%',
                aspectRatio: 1,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 3, // lighter shadow for Android
            }}
            onPress={() => router.push(option.route as any)}
        >
            <View className="items-center justify-center flex-1">
                <Ionicons name={option.icon as any} size={40} color="#0284c7" className="mb-4" />
                <Text className="text-[#0284c7] font-bold text-center text-sm leading-5">
                    {option.title}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="px-4 py-3">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-black ml-4">What are you looking for?</Text>
                </View>
            </View>

            {/* Options Grid */}
            <ScrollView className="flex-1 px-2 py-6">
                <View className="flex-row flex-wrap justify-between">{options.map(renderOptionCard)}</View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateLookingOptionsScreen
