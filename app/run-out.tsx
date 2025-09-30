import InningPlayerSelection from "@/components/Modal/InningPlayerSelection";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Header from "@/components/ui/Header";
import { Player } from "@/lib/types/match";
import { getFullStrapiUrl } from "@/lib/utils/common";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RunOutScreen() {
    const router = useRouter();
    const navigation = useNavigation();

    const [selectedStriker, setSelectedStriker] = useState<string | null>(null);
    const [selectedNonStriker, setSelectedNonStriker] = useState<string | null>(null);
    const [selectedBowler, setSelectedBowler] = useState<string | null>(null);
    const [showAddPlayersModal, setShowAddPlayersModal] = useState(false);
    const [player, setPlayers] = useState<Player>();
    const [deliveryType, selectedDeliveryType] = useState("BYE");
    const deliveryTypes = ["WD", "NB", "BYE", "LB"];


    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleAddPlayer = (newPlayer: any) => {
        setPlayers(newPlayer);
    };

    const handleStartScoring = () => {
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
                className={`flex-1 items-center p-4 rounded-xl ${isSelected ? "bg-red-100 border-2 border-red-600" : "bg-gray-100"
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
            <View className="flex-1">
                {/* Header */}
                <Header heading='Run Out' />

                {/* Scroll Content */}
                <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 120 }}>
                    {/* Batting Section */}
                    <View>
                        <Text className="text-lg font-semibold text-gray-800 mb-4">
                            Who?
                        </Text>
                        <View className="flex-row mb-8 gap-x-2">
                            <PlayerCard
                                title={player?.name || "Striker"}
                                iconSource={player?.avatar ? { uri: getFullStrapiUrl(player.avatar) } : require("../assets/images/scoring/19.png")}
                                onPress={() => setShowAddPlayersModal(true)}
                                isSelected={player !== undefined && player !== null}
                            />
                            <PlayerCard
                                title="Non-striker"
                                iconSource={require("../assets/images/scoring/28.png")}
                                onPress={() => setSelectedNonStriker("nonstriker1")}
                                isSelected={selectedNonStriker === "nonstriker1"}
                            />
                        </View>
                    </View>

                    {/* Bowling Section */}
                    <View >
                        <Text className="text-lg font-semibold text-gray-800 mb-4">
                            Select Fielder
                        </Text>
                        <View className="flex-row mb-8 gap-x-2">
                            <PlayerCard
                                title={player?.name || "Fielder 1"}
                                iconSource={player?.avatar ? { uri: getFullStrapiUrl(player.avatar) } : require("../assets/images/scoring/9.png")}
                                onPress={() => setShowAddPlayersModal(true)}
                                isSelected={player !== undefined && player !== null}
                            />
                            <PlayerCard
                                title="Fielder 2"
                                iconSource={require("../assets/images/scoring/23.png")}
                                onPress={() => setSelectedNonStriker("nonstriker1")}
                                isSelected={selectedNonStriker === "nonstriker1"}
                            />
                        </View>
                    </View>

                    {/* Delivery Types */}
                    <View className="mb-6">
                        <Text className="text-base font-medium text-gray-800 mb-3">Delivery Type</Text>
                        <View className="flex-row flex-wrap">
                            {deliveryTypes.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    className={`px-4 py-2 rounded-full mr-3 mb-2 ${deliveryType === type ? "bg-[#0e7ccb]" : "bg-gray-200"}`}
                                    onPress={() => selectedDeliveryType(type)}
                                >
                                    <Text className={deliveryType === type ? 'text-white' : "text-gray-700"}>{type}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View>
                        <Text className="text-base font-medium text-gray-800 mb-3">Runs Scored</Text>

                        {/* Run buttons */}
                        <View className="flex-row gap-2">
                            {[0, 1, 2, 3, 4].map((runs) => (
                                <TouchableOpacity
                                    key={runs}
                                    // onPress={() => onLegBye(runs)}
                                    className="w-12 h-12 rounded-lg border border-gray-400 items-center justify-center"
                                >
                                    <Text className="text-gray-500 text-lg font-semibold">{runs}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity className="w-12 h-12 rounded-lg border border-gray-400 items-center justify-center">
                                <Text className="text-gray-500 text-xl font-bold">+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {/* Floating Create Button */}
                <FloatingActionButton
                    label={'OUT'}
                    onPress={() => { }}
                />

                {/* Select Player Modal */}
                <InningPlayerSelection
                    visible={showAddPlayersModal}
                    onClose={() => setShowAddPlayersModal(false)}
                    onAddPlayers={handleAddPlayer}
                    existingPlayerIds={player?.documentId}
                // visible={true}
                />
            </View>
        </SafeAreaView>
    );
}
