import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HelpScreen() {
    const router = useRouter();

    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const helpItems = [
        {
            id: 1,
            question: "How to change the playing squad in the live match?",
            answer:
                "You can change the playing squad by going to the team management section during the match. Tap on the player you want to substitute and select a replacement from your squad.",
        },
        {
            id: 2,
            question: "How to change match over?",
            answer:
                "To change match overs, go to match settings before starting the game. You can select from various formats like T20, ODI, or custom overs.",
        },
        {
            id: 3,
            question: "How to replace/change a bowler?",
            answer:
                "During the match, tap on the current bowler's name and select 'Change Bowler' from the options. Choose a new bowler from your team's bowling lineup.",
        },
        {
            id: 4,
            question: "How to add bonus runs?",
            answer:
                "Bonus runs can be added by tapping the '+' button next to the score. Select the type of bonus (byes, leg-byes, etc.) and enter the number of runs.",
        },
        {
            id: 5,
            question: "How to give penalty runs?",
            answer:
                "Penalty runs can be awarded by accessing the match controls menu. Select 'Penalty Runs' and choose the reason and number of runs to be awarded.",
        },
    ]

    const toggleExpanded = (id: number) => {
        setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {/* Hero Section */}
            <View className="relative overflow-hidden" style={{ width: '100%' }}>
                <Image
                    source={require("../assets/images/cricket-equipment.jpg")}
                    style={{ width: '100%', height: 270 }}
                    resizeMode="contain"
                />

                <View
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    }}
                />

                {/* Title centered */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 28,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        How To Score Match
                    </Text>
                </View>

                {/* Back button */}
                <View className="flex-row items-center"
                    style={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        zIndex: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => router.back()}
                    >
                        <Entypo name="arrow-bold-left" size={29} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-semibold ml-4">
                        Help
                    </Text>
                </View>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
                {helpItems.map((item, index) => (
                    <View
                        key={item.id}
                        className="border-b border-gray-300 bg-white"
                    >
                        <TouchableOpacity
                            className="px-4 py-4 flex-row justify-between items-center"
                            onPress={() => toggleExpanded(item.id)}
                        >
                            <View className="flex-row items-center flex-1">
                                <Text className="text-lg font-semibold text-black mr-2">
                                    {index + 1}.
                                </Text>
                                <Text className="text-base font-medium text-gray-800 flex-1 leading-6">
                                    {item.question}
                                </Text>
                            </View>

                            <Ionicons
                                name={expandedItems.includes(item.id) ? "chevron-up" : "chevron-down"}
                                size={20}
                                color="#9CA3AF"
                            />
                        </TouchableOpacity>

                        {expandedItems.includes(item.id) && (
                            <View className="px-4 py-4 pl-10">
                                <Text className="text-sm text-gray-500 leading-5">
                                    {item.answer}
                                </Text>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
