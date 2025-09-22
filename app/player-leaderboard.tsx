import Header from "@/components/community/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

interface Player {
    id: string;
    name: string;
    location: string;
    profileImage: string;
    rank: number;
    isPro?: boolean;
    stats: {
        batting?: {
            innings: number;
            runs: number;
            average: number;
            strikeRate: number;
        };
        bowling?: {
            matches: number;
            wickets: number;
            average: number;
            economy: number;
        };
        fielding?: {
            matches: number;
            dismissals: number;
            catches: number;
            stumpings: number;
        };
    };
}

interface Challenge {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    format: string;
}

const LeaderboardScreen = () => {
    const [selectedBallType, setSelectedBallType] = useState("BOX CRICKET");
    const [selectedCategory, setSelectedCategory] = useState("Batting");
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const ballTypes = ["LEATHER", "TENNIS", "BOX CRICKET"];
    const categories = ["Batting", "Bowling", "Fielding"];

    const battingPlayers: Player[] = [
        {
            id: "1",
            name: "Atta Jan",
            location: "Karachi",
            profileImage: "/cricket-player-batting.png",
            rank: 1,
            stats: {
                batting: {
                    innings: 698,
                    runs: 28612,
                    average: 45.85,
                    strikeRate: 186.87,
                },
            },
        },
        {
            id: "2",
            name: "Adil Umer",
            location: "Karachi",
            profileImage: "/cricket-player-pro.jpg",
            rank: 2,
            stats: {
                batting: {
                    innings: 977,
                    runs: 25380,
                    average: 32.88,
                    strikeRate: 136.93,
                },
            },
        },
        {
            id: "3",
            name: "Sh Ery",
            location: "Karachi",
            profileImage: "/cricket-player-yellow-jersey.jpg",
            rank: 3,
            stats: {
                batting: {
                    innings: 772,
                    runs: 24159,
                    average: 33.93,
                    strikeRate: 170.21,
                },
            },
        },
        {
            id: "4",
            name: "Tehseen Shahid Ansari",
            location: "Karachi",
            profileImage: "/placeholder-8zrl2.png",
            rank: 4,
            stats: {
                batting: {
                    innings: 549,
                    runs: 20138,
                    average: 41.01,
                    strikeRate: 182.46,
                },
            },
        },
    ];

    const fieldingPlayers: Player[] = [
        {
            id: "1",
            name: "Muhammad Anas",
            location: "Karachi",
            profileImage: "/placeholder-o2rso.png",
            rank: 1,
            stats: {
                fielding: {
                    matches: 17,
                    dismissals: 26,
                    catches: 11,
                    stumpings: 0,
                },
            },
        },
        {
            id: "2",
            name: "RAZA ABBAS",
            location: "Karachi",
            profileImage: "/placeholder-th0p2.png",
            rank: 2,
            stats: {
                fielding: {
                    matches: 12,
                    dismissals: 22,
                    catches: 18,
                    stumpings: 0,
                },
            },
        },
        {
            id: "3",
            name: "Hassan Nanji",
            location: "Karachi",
            profileImage: "/placeholder-3qpgh.png",
            rank: 2,
            stats: {
                fielding: {
                    matches: 17,
                    dismissals: 22,
                    catches: 16,
                    stumpings: 0,
                },
            },
        },
        {
            id: "4",
            name: "Ali Gondal",
            location: "Karachi",
            profileImage: "/placeholder-rzzjs.png",
            rank: 3,
            stats: {
                fielding: {
                    matches: 15,
                    dismissals: 20,
                    catches: 5,
                    stumpings: 1,
                },
            },
        },
    ];

    const challenges: Challenge[] = [
        {
            id: "1",
            title: "3 50s",
            subtitle: "Limited Overs",
            icon: "3",
            format: "Limited Overs",
        },
        {
            id: "2",
            title: "20 4s",
            subtitle: "Limited Overs",
            icon: "20",
            format: "Limited Overs",
        },
        {
            id: "3",
            title: "250",
            subtitle: "Limited Overs",
            icon: "250",
            format: "Limited Overs",
        },
    ];

    const getCurrentPlayers = () =>
        selectedCategory === "Batting" ? battingPlayers : fieldingPlayers;

    const getLeaderboardTitle = () => {
        if (selectedCategory === "Batting") {
            return "Most runs in Pakistan (All Time, All Overs)";
        } else if (selectedCategory === "Fielding") {
            return "Most dismissals in Pakistan (All Time)";
        }
        return "Most wickets in Pakistan (All Time)";
    };

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1:
                return "text-yellow-400";
            case 2:
                return "text-orange-400";
            case 3:
                return "text-orange-500";
            default:
                return "text-orange-600";
        }
    };

    const renderPlayerStats = (player: Player) => {
        if (selectedCategory === "Batting" && player.stats.batting) {
            const { innings, runs, average, strikeRate } = player.stats.batting;
            return (
                <Text className="text-gray-600 text-sm">
                    Inn: {innings} Runs: {runs} Avg: {average} SR: {strikeRate}
                </Text>
            );
        } else if (selectedCategory === "Fielding" && player.stats.fielding) {
            const { matches, dismissals, catches, stumpings } = player.stats.fielding;
            return (
                <>
                    <Text className="text-gray-600 text-sm">
                        Mat: {matches} Dismissals: {dismissals} Catches: {catches} St.: {stumpings}
                    </Text>
                    {player.rank === 1 && (
                        <View className="bg-gray-100 rounded px-2 py-1 mt-1">
                            <Text className="text-xs text-gray-500">R/O: 15 C&B: 3 C.B.: 0</Text>
                        </View>
                    )}
                </>
            );
        }
        return null;
    };

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">

                {/* Header */}
                <Header
                    heading="Leaderboard"
                />

                {/* Ball Type Tabs */}
                <View className="flex-row px-4 pb-4">
                    {ballTypes.map((type) => (
                        <TouchableOpacity
                            key={type}
                            className={`flex-1 items-center py-2 ${selectedBallType === type ? "border-b border-black" : ""
                                }`}
                            onPress={() => setSelectedBallType(type)}
                        >
                            <Text
                                className={`text-sm font-medium ${selectedBallType === type ? "text-black font-semibold" : "text-black/70"
                                    }`}
                            >
                                {type}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {/* Category Tabs */}
                    <View className="flex-row px-4 py-4 space-x-3">
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                className={`px-5 py-2 rounded-full ${selectedCategory === category ? "bg-[#0e7ccb]" : "bg-slate-200"
                                    }`}
                                onPress={() => setSelectedCategory(category)}
                            >
                                <Text
                                    className={`text-sm font-medium ${selectedCategory === category ? "text-white" : "text-slate-500"
                                        }`}
                                >
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Leaderboard Title */}
                    <Text className="text-back font-semibold text-base px-4 mb-4">
                        {getLeaderboardTitle()}
                    </Text>

                    {/* Player List */}
                    <View className="px-4 gap-y-3">
                        {getCurrentPlayers().map((player) => (
                            <View
                                key={player.id}
                                className="bg-white rounded-xl p-4 flex-row items-center justify-between shadow-sm"
                            >
                                <View className="flex-row items-center flex-1">
                                    <View className="relative mr-3">
                                        <Image
                                            source={{ uri: player.profileImage }}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        {player.isPro && (
                                            <View className="absolute -bottom-1 -right-1 bg-green-500 px-1.5 py-0.5 rounded-md">
                                                <Text className="text-white text-[10px] font-bold">PRO</Text>
                                            </View>
                                        )}
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row items-center mb-1">
                                            <Text className="text-gray-800 font-semibold text-base mr-2">
                                                {player.name}
                                            </Text>
                                            <Text className="text-gray-500 italic text-sm">({player.location})</Text>
                                        </View>
                                        {renderPlayerStats(player)}
                                    </View>
                                </View>
                                <Text className={`text-2xl font-bold ml-4 ${getRankColor(player.rank)}`}>
                                    {player.rank}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Challenges */}
                    {selectedCategory === "Batting" && (
                        <View className="m-4 bg-white rounded-xl p-4 shadow-sm">
                            <View className="flex-row justify-between items-center mb-4">
                                <View className="flex-row items-center gap-x-2">
                                    <Ionicons name="trophy" size={20} color="black" />
                                    <Text className="text-black font-semibold text-base">
                                        Ready to CHALLENGE yourself?
                                    </Text>
                                </View>
                                <TouchableOpacity>
                                    <Ionicons name="close" size={24} color="#666" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {challenges.map((challenge) => (
                                    <View key={challenge.id} className="w-[120px] items-center mr-4">
                                        <View className="w-16 h-16 rounded-full bg-[#0e7ccb] items-center justify-center mb-2">
                                            <Text className="text-white text-base font-bold">{challenge.icon}</Text>
                                        </View>
                                        <Text className="text-gray-900 font-semibold text-sm mb-1">
                                            {challenge.title}
                                        </Text>
                                        <Text className="text-gray-500 text-xs mb-2">{challenge.subtitle}</Text>
                                        <View className="flex-row mb-3">
                                            <View className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                        </View>
                                        <TouchableOpacity className="bg-[#0e7ccb] px-5 py-2 rounded-full">
                                            <Text className="text-white text-xs font-semibold">JOIN</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default LeaderboardScreen;
