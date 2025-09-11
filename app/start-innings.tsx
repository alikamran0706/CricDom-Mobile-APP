import InningPlayerSelection from "@/components/Modal/InningPlayerSelection";
import { Player } from "@/lib/types/match";
import { getFullStrapiUrl } from "@/lib/utils/common";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartInningsScreen() {
    const router = useRouter();
    const navigation = useNavigation();

    const [selectedStriker, setSelectedStriker] = useState<string | null>(null);
    const [selectedNonStriker, setSelectedNonStriker] = useState<string | null>(null);
    const [selectedBowler, setSelectedBowler] = useState<string | null>(null);
    const [showAddPlayersModal, setShowAddPlayersModal] = useState(false);
    const [player, setPlayers] = useState<Player>();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleAddPlayer = (newPlayer: any) => {
        setPlayers(newPlayer);
    };

    const handleStartScoring = () => {
        console.log('hellooooo')
        if ((player !== undefined && player !== null) && selectedNonStriker && selectedBowler) {
           router.push("/scoring")
        }
    };

    const PlayerCard = ({
        title,
        iconSource,
        onPress,
        isSelected,
    }: {
        title: string;
        iconSource: any;
        onPress: () => void;
        isSelected: boolean;
    }) => {
        return (
            <TouchableOpacity
                className={`flex-1 mx-2 items-center p-4 rounded-xl ${isSelected ? "bg-red-100 border-2 border-red-600" : "bg-gray-100"
                    }`}
                onPress={onPress}
            >
                <Image
                    source={iconSource}
                    style={{ width: 80, height: 80 }}
                    resizeMode="contain"
                    className="mb-3"
                />
                <Text className="text-base font-semibold text-gray-700 text-center">
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-4 py-4 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-black text-xl font-semibold ml-4">
                        Start Innings
                    </Text>
                </View>
                <TouchableOpacity onPress={() => router.push("/match-help")}>
                    <Ionicons name="help-circle-outline" size={24} color="gray-500" />
                </TouchableOpacity>
            </View>

            {/* Scroll Content */}
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Batting Section */}
                <View className="p-4">
                    <Text className="text-lg font-semibold text-gray-800 mb-4">
                        Batting - Pakistan
                    </Text>
                    <View className="flex-row mb-8">
                        <PlayerCard
                            title={player?.name || "Select Striker"}
                            iconSource={player?.avatar ? { uri: getFullStrapiUrl(player.avatar) } : require("../assets/images/striker-dark.png")}
                            onPress={() => setShowAddPlayersModal(true)}
                            isSelected={player !== undefined && player !== null}
                        />
                        <PlayerCard
                            title="Select Non-striker"
                            iconSource={require("../assets/images/non-striker.png")}
                            onPress={() => setSelectedNonStriker("nonstriker1")}
                            isSelected={selectedNonStriker === "nonstriker1"}
                        />
                    </View>
                </View>

                {/* Bowling Section */}
                <View className="px-4">
                    <Text className="text-lg font-semibold text-gray-800 mb-4">
                        Bowling - Fitness Team
                    </Text>
                    <View className="flex-row">
                        <PlayerCard
                            title="Select Bowler"
                            iconSource={require("../assets/images/bowler.png")}
                            onPress={() => setSelectedBowler("bowler1")}
                            isSelected={selectedBowler === "bowler1"}
                        />
                        <View className="flex-1" />
                    </View>
                </View>
            </ScrollView>

            {/* Floating Camera Button */}
            <TouchableOpacity
                className=""
                style={{
                    position: "absolute",
                    bottom: 100,
                    right: 20,
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "lightgray",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                }}
            >
                <Ionicons name="camera" size={24} color="black" />
            </TouchableOpacity>

            {/* Bottom Buttons */}
            <View className="flex-row bg-white border-t border-gray-200">
                <TouchableOpacity className="flex-1 py-4 bg-gray-200 items-center" onPress={() => router.push("/match-rules")}>
                    <Text className="text-black text-base font-semibold">MATCH RULES</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`flex-1 py-4 bg-[#0e7ccb] items-center ${!((player !== undefined && player !== null) && selectedNonStriker && selectedBowler) ? "opacity-50" : ""
                        }`}
                    onPress={handleStartScoring}
                    disabled={!((player !== undefined && player !== null) && selectedNonStriker && selectedBowler)}
                >
                    <Text className="text-white text-base font-semibold">
                        START SCORING
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Select Player Modal */}
            <InningPlayerSelection
                visible={showAddPlayersModal}
                onClose={() => setShowAddPlayersModal(false)}
                onAddPlayers={handleAddPlayer}
                existingPlayerIds={player?.documentId}
            // visible={true}
            />
        </SafeAreaView>
    );
}
