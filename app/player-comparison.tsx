import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface PlayerStats {
    batting: {
        matches: number
        innings: number
        runs: number
        average: number
        strikeRate: number
        centuries: number
        fifties: number
        highestScore: number
        ballsFaced: number
        fours: number
        sixes: number
    }
    bowling: {
        matches: number
        innings: number
        wickets: number
        average: number
        economy: number
        strikeRate: number
        bestFigures: string
        fiveWickets: number
        ballsBowled: number
        runsConceded: number
    }
}

interface Player {
    id: string
    name: string
    image: string
    team: string
    role: string
    stats: PlayerStats
}

const PlayerComparisonUnlockedScreen = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("COMPARE");
    const [activeStatsTab, setActiveStatsTab] = useState("Batting");

    const tabs = ["BATTING", "BOWLING", "COMPARE", "FACE OFF"];
    const statsTypes = ["Batting", "Bowling"];
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const player1: Player = {
        id: "1",
        name: "Ali Kamran",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
        team: "Karachi Kings",
        role: "All-rounder",
        stats: {
            batting: {
                matches: 45,
                innings: 42,
                runs: 1250,
                average: 32.89,
                strikeRate: 142.5,
                centuries: 2,
                fifties: 8,
                highestScore: 89,
                ballsFaced: 877,
                fours: 98,
                sixes: 45,
            },
            bowling: {
                matches: 45,
                innings: 38,
                wickets: 52,
                average: 24.5,
                economy: 7.2,
                strikeRate: 20.4,
                bestFigures: "4/23",
                fiveWickets: 1,
                ballsBowled: 1061,
                runsConceded: 1274,
            },
        },
    }

    const player2: Player = {
        id: "2",
        name: "Babar Azam",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
        team: "Lahore Qalandars",
        role: "Batsman",
        stats: {
            batting: {
                matches: 52,
                innings: 50,
                runs: 1850,
                average: 42.05,
                strikeRate: 135.8,
                centuries: 4,
                fifties: 12,
                highestScore: 122,
                ballsFaced: 1362,
                fours: 156,
                sixes: 38,
            },
            bowling: {
                matches: 52,
                innings: 8,
                wickets: 3,
                average: 45.0,
                economy: 8.5,
                strikeRate: 31.7,
                bestFigures: "1/15",
                fiveWickets: 0,
                ballsBowled: 95,
                runsConceded: 135,
            },
        },
    }

    const renderPlayerCard = (player: Player) => (
        <View className="bg-white rounded-2xl p-4 flex-1 mx-2 shadow-sm">
            <View className="items-center">
                <Image source={{ uri: player.image }} className="w-20 h-20 rounded-2xl mb-3" />
                <Text className="text-gray-800 font-bold text-center mb-1">{player.name}</Text>
                <Text className="text-gray-600 text-sm text-center mb-1">{player.team}</Text>
                <View className="bg-blue-100 px-2 py-1 rounded-full">
                    <Text className="text-blue-600 text-xs font-medium">{player.role}</Text>
                </View>
            </View>
        </View>
    )

    const renderStatRow = (label: string, value1: string | number, value2: string | number, isHigherBetter = true) => {
        const val1 = typeof value1 === "string" ? Number.parseFloat(value1) || 0 : value1
        const val2 = typeof value2 === "string" ? Number.parseFloat(value2) || 0 : value2

        let player1Better = false
        let player2Better = false

        if (isHigherBetter) {
            player1Better = val1 > val2
            player2Better = val2 > val1
        } else {
            player1Better = val1 < val2
            player2Better = val2 < val1
        }

        return (
            <View className="flex-row items-center py-3 border-b border-gray-100">
                <View className="flex-1 items-center">
                    <Text className={`font-semibold ${player1Better ? "text-green-600" : "text-gray-800"}`}>{value1}</Text>
                </View>
                <View className="flex-2 px-4">
                    <Text className="text-gray-600 text-center text-sm">{label}</Text>
                </View>
                <View className="flex-1 items-center">
                    <Text className={`font-semibold ${player2Better ? "text-green-600" : "text-gray-800"}`}>{value2}</Text>
                </View>
            </View>
        )
    }

    const renderBattingStats = () => (
        <View className="bg-white rounded-2xl mx-4 p-4 shadow-sm">
            <Text className="text-lg font-bold text-gray-800 text-center mb-4">Batting Comparison</Text>

            {renderStatRow("Matches", player1.stats.batting.matches, player2.stats.batting.matches)}
            {renderStatRow("Innings", player1.stats.batting.innings, player2.stats.batting.innings)}
            {renderStatRow("Runs", player1.stats.batting.runs, player2.stats.batting.runs)}
            {renderStatRow("Average", player1.stats.batting.average.toFixed(2), player2.stats.batting.average.toFixed(2))}
            {renderStatRow(
                "Strike Rate",
                player1.stats.batting.strikeRate.toFixed(1),
                player2.stats.batting.strikeRate.toFixed(1),
            )}
            {renderStatRow("Centuries", player1.stats.batting.centuries, player2.stats.batting.centuries)}
            {renderStatRow("Fifties", player1.stats.batting.fifties, player2.stats.batting.fifties)}
            {renderStatRow("Highest Score", player1.stats.batting.highestScore, player2.stats.batting.highestScore)}
            {renderStatRow("Balls Faced", player1.stats.batting.ballsFaced, player2.stats.batting.ballsFaced)}
            {renderStatRow("Fours", player1.stats.batting.fours, player2.stats.batting.fours)}
            {renderStatRow("Sixes", player1.stats.batting.sixes, player2.stats.batting.sixes)}
        </View>
    )

    const renderBowlingStats = () => (
        <View className="bg-white rounded-2xl mx-4 p-4 shadow-sm">
            <Text className="text-lg font-bold text-gray-800 text-center mb-4">Bowling Comparison</Text>

            {renderStatRow("Matches", player1.stats.bowling.matches, player2.stats.bowling.matches)}
            {renderStatRow("Innings", player1.stats.bowling.innings, player2.stats.bowling.innings)}
            {renderStatRow("Wickets", player1.stats.bowling.wickets, player2.stats.bowling.wickets)}
            {renderStatRow(
                "Average",
                player1.stats.bowling.average.toFixed(2),
                player2.stats.bowling.average.toFixed(2),
                false,
            )}
            {renderStatRow(
                "Economy",
                player1.stats.bowling.economy.toFixed(1),
                player2.stats.bowling.economy.toFixed(1),
                false,
            )}
            {renderStatRow(
                "Strike Rate",
                player1.stats.bowling.strikeRate.toFixed(1),
                player2.stats.bowling.strikeRate.toFixed(1),
                false,
            )}
            {renderStatRow("Best Figures", player1.stats.bowling.bestFigures, player2.stats.bowling.bestFigures)}
            {renderStatRow("5 Wickets", player1.stats.bowling.fiveWickets, player2.stats.bowling.fiveWickets)}
            {renderStatRow("Balls Bowled", player1.stats.bowling.ballsBowled, player2.stats.bowling.ballsBowled)}
            {renderStatRow("Runs Conceded", player1.stats.bowling.runsConceded, player2.stats.bowling.runsConceded, false)}
        </View>
    )

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            {/* Header */}
            <View className="bg-red-600 px-4 py-3">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-white">Player Comparison</Text>
                    <View className="flex-row">
                        <TouchableOpacity className="mr-4">
                            <Ionicons name="search" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity className="relative">
                            <Ionicons name="funnel" size={24} color="white" />
                            <View className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full items-center justify-center">
                                <Text className="text-xs font-bold text-gray-800">1</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Tab Navigation */}
            <View className="bg-gray-800 px-4 py-3">
                <View className="flex-row justify-around">
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            className={`pb-2 ${activeTab === tab ? "border-b-2 border-yellow-400" : ""}`}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text className={`font-medium ${activeTab === tab ? "text-white" : "text-gray-400"}`}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Player Comparison Cards */}
                <View className="px-4 py-6">
                    <View className="flex-row items-center">
                        {renderPlayerCard(player1)}

                        {/* VS Indicator */}
                        <View className="w-12 h-12 bg-white rounded-full items-center justify-center mx-2 shadow-sm">
                            <Text className="text-gray-800 font-bold">VS</Text>
                        </View>

                        {renderPlayerCard(player2)}
                    </View>
                </View>

                {/* Stats Type Toggle */}
                <View className="px-4 mb-6">
                    <View className="flex-row bg-gray-700 rounded-xl p-1">
                        {statsTypes.map((type) => (
                            <TouchableOpacity
                                key={type}
                                className={`flex-1 py-3 rounded-lg ${activeStatsTab === type ? "bg-gray-600" : "bg-transparent"}`}
                                onPress={() => setActiveStatsTab(type)}
                            >
                                <Text className={`text-center font-medium ${activeStatsTab === type ? "text-white" : "text-gray-400"}`}>
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Stats Section Header */}
                <View className="px-4 mb-4">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <Text className="text-white text-lg font-semibold mr-2">{activeStatsTab.toUpperCase()} STATS</Text>
                            <TouchableOpacity>
                                <Ionicons name="information-circle-outline" size={20} color="#9ca3af" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row">
                            <TouchableOpacity className="mr-4">
                                <Ionicons name="play" size={20} color="#9ca3af" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="share" size={20} color="#9ca3af" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Stats Content */}
                <View className="mb-6">{activeStatsTab === "Batting" ? renderBattingStats() : renderBowlingStats()}</View>

                {/* Legend */}
                <View className="px-4 mb-6">
                    <View className="bg-gray-800 rounded-xl p-4">
                        <View className="flex-row items-center justify-center">
                            <View className="flex-row items-center mr-6">
                                <View className="w-3 h-3 bg-green-600 rounded-full mr-2" />
                                <Text className="text-gray-300 text-sm">Better Performance</Text>
                            </View>
                            <View className="flex-row items-center">
                                <View className="w-3 h-3 bg-gray-600 rounded-full mr-2" />
                                <Text className="text-gray-300 text-sm">Standard</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PlayerComparisonUnlockedScreen
