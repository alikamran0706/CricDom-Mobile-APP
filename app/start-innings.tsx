import InningPlayerSelection from "@/components/Modal/InningPlayerSelection";
import PlayerCard from "@/components/PlayerCard";
import { Player } from "@/lib/types/match";
import { getFullStrapiUrl } from "@/lib/utils/common";
import {
    useCreateBowlerStatsMutation,
    useCreateInningMutation,
    useCreateOverMutation,
    useCreatePlayerScoreMutation,
} from "@/store/features/inning/inningApi";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartInningsScreen() {
    const router = useRouter();
    const navigation = useNavigation();

    // 🧩 API Hooks
    const [createInning] = useCreateInningMutation();
    const [createOver] = useCreateOverMutation();
    const [createPlayerScore] = useCreatePlayerScoreMutation();
    const [createBowlerStats] = useCreateBowlerStatsMutation();

    // 🧠 Get Route Params
    const params: any = useLocalSearchParams();
    const match = params?.match ? JSON.parse(params.match) : null;
    const battingTeam = params?.battingTeam ? JSON.parse(params.battingTeam) : null;
    const bowlingTeam = params?.bowlingTeam ? JSON.parse(params.bowlingTeam) : null;

    // ⚡ Local State
    const [player, setPlayer] = useState<Player | null>(null);
    const [nonStriker, setNonStriker] = useState<Player | null>(null);
    const [bowler, setBowler] = useState<Player | null>(null);

    const [showAddNonStrinkerModal, setShowAddNonStrinkerModal] = useState(false);
    const [showAddBowlerModal, setShowAddBowlerModal] = useState(false);
    const [showAddPlayersModal, setShowAddPlayersModal] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    // 🎯 Handle Player Selection
    const handleAddPlayer = (newPlayer: any) => {
        if (showAddNonStrinkerModal) setNonStriker(newPlayer);
        else if (showAddPlayersModal) setPlayer(newPlayer);
        else setBowler(newPlayer);
    };

    // 🏏 Start Inning Function
    const handleStartScoring = async () => {
        if (!player || !nonStriker || !bowler) return;

        try {
            // 1️⃣ Create Inning in Strapi
            const inningPayload = {
                match: match?.documentId,
                batting_team: battingTeam?.documentId,
                bowling_team: bowlingTeam?.documentId,
                runs: 0,
                wickets: 0,
                current_over: 0,
                innings_number: 1,
                current_striker: player.documentId,
                current_non_striker: nonStriker.documentId,
                current_bowler: bowler.documentId,
                // status: "Live",
            };

            const inningRes = await createInning({ data: inningPayload }).unwrap();
            const inningData = inningRes?.data || inningRes;

            // 2️⃣ Create Player Score for both batsmen and get their IDs
            const strikerScoreRes = await createPlayerScore({
                data: {
                    player: player.documentId,
                    inning: inningData.documentId,
                    isStriker: true,
                    runs: 0,
                    balls_faced: 0,
                    fours: 0,
                    sixes: 0,
                },
            }).unwrap();
            const strikerScore = strikerScoreRes?.data || strikerScoreRes;

            const nonStrikerScoreRes = await createPlayerScore({
                data: {
                    player: nonStriker.documentId,
                    inning: inningData.documentId,
                    isStriker: false,
                    runs: 0,
                    balls_faced: 0,
                    fours: 0,
                    sixes: 0,
                },
            }).unwrap();
            const nonStrikerScore = nonStrikerScoreRes?.data || nonStrikerScoreRes;

            // 3️⃣ Create Bowler Stats Record
            const bowlerStatsRes = await createBowlerStats({
                data: {
                    bowler: bowler.documentId,
                    inning: inningData.documentId,
                    overs_bowled: 0,
                    maidens: 0,
                    runs_conceded: 0,
                    wickets_taken: 0,
                },
            }).unwrap();
            const bowlerStats = bowlerStatsRes?.data || bowlerStatsRes;

            // 4️⃣ Create First Over
            const overRes = await createOver({
                data: {
                    over_number: 1,
                    inning: inningData.documentId,
                    bowler: bowler.documentId,
                    runs_in_over: 0,
                },
            }).unwrap();
            const overData = overRes?.data || overRes;

            const newInningData = {
                ...inningData,
                overs: [...(inningData.overs || []), overData],
            };

            // 5️⃣ Navigate to Scoring Screen with all IDs
            router.replace({
                pathname: "/scoring",
                params: {
                    match: JSON.stringify(match),
                    battingTeam: JSON.stringify(battingTeam),
                    bowlingTeam: JSON.stringify(bowlingTeam),
                    inning: JSON.stringify(newInningData),
                    currentOver: JSON.stringify(overData),
                    striker: JSON.stringify(player),
                    nonStriker: JSON.stringify(nonStriker),
                    bowler: JSON.stringify(bowler),
                    strikerScore: JSON.stringify(strikerScore),
                    nonStrikerScore: JSON.stringify(nonStrikerScore),
                    bowlerStats: JSON.stringify(bowlerStats),
                },
            });
        } catch (error) {
            console.error("❌ Error starting inning:", error);
        }
    };
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-4 py-4 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Entypo name="arrow-bold-left" size={29} color="#3b3b3b" />
                    </TouchableOpacity>
                </View>
                <Text className="text-black text-xl font-semibold">
                    Start Innings
                </Text>
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
                            onPress={() => {
                                setShowAddPlayersModal(true)
                                setShowAddNonStrinkerModal(false)
                                setShowAddBowlerModal(false)
                            }}
                            isSelected={player !== undefined && player !== null}
                        />
                        <PlayerCard
                            title={nonStriker?.name || "Select Non-striker"}
                            iconSource={require("../assets/images/non-striker.png")}
                            onPress={() => {
                                setShowAddNonStrinkerModal(true)
                                setShowAddPlayersModal(false)
                                setShowAddBowlerModal(false)
                            }}
                            isSelected={nonStriker !== null}
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
                            title={bowler?.name || "Select Bowler"}
                            iconSource={require("../assets/images/bowler.png")}
                            onPress={() => {
                                setShowAddNonStrinkerModal(false)
                                setShowAddPlayersModal(false)
                                setShowAddBowlerModal(true)
                            }}
                            isSelected={bowler !== null}
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
                    className={`flex-1 py-4 bg-[#0e7ccb] items-center ${!((player !== undefined && player !== null) &&
                        nonStriker !== null && bowler !== null) ? "opacity-50" : ""
                        }`}
                    onPress={handleStartScoring}
                    disabled={!((player !== undefined && player !== null) && nonStriker !== null && bowler !== null)}
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
                allFetchedPlayers={battingTeam?.players?.filter((data: any) => data.documentId !== nonStriker?.documentId)}
            // visible={true}
            />

            <InningPlayerSelection
                visible={showAddNonStrinkerModal}
                onClose={() => setShowAddNonStrinkerModal(false)}
                onAddPlayers={handleAddPlayer}
                existingPlayerIds={nonStriker?.documentId}
                allFetchedPlayers={battingTeam?.players?.filter((data: any) => data.documentId !== player?.documentId)}
            />

            <InningPlayerSelection
                visible={showAddBowlerModal}
                onClose={() => setShowAddBowlerModal(false)}
                onAddPlayers={handleAddPlayer}
                existingPlayerIds={bowler?.documentId}
                allFetchedPlayers={bowlingTeam?.players}
            />

        </SafeAreaView>
    );
}
