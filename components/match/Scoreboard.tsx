import { manOfTheMatch, teamA } from '@/constants/match';
import { BattingStats, BowlingStats } from '@/lib/types/match';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import AvatarImage from '../AvatarImage';
import InningsAccordion from './ScoreboardTeamPerformance';


const Scoreboard = ({ match }: any) => {

    const currentInnings = teamA;
    const teamB = teamA;

    const renderBattingCard = (item: BattingStats) => (
        <View key={item.id} className="flex-row items-center py-3 border-b border-gray-100">
            <View className="flex-row items-center flex-1">
                <AvatarImage
                    uri={item.player?.image?.formats?.thumbnail?.url}
                    size={42}
                    borderRadius={80}
                    rounded={true}
                    backgroundColor='transparent'
                    extraStyle={{ marginRight: 12, }}
                />
                <View className="flex-1">

                    <View className="flex-1 overflow-hidden">
                        <Text
                            className="text-sm font-medium text-gray-800"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {item.player?.name}
                        </Text>

                        {item.isCaptain && (
                            <Text className="text-xs text-blue-500">(C)</Text>
                        )}

                        {item.isWicketKeeper && (
                            <Text className="text-xs font-bold text-green-600">(WK)</Text>
                        )}
                    </View>
                    {item.is_out && (
                        <Text className="text-xs text-green-600 mt-1">not out</Text>
                    )}
                </View>
            </View>

            <View className="flex-row justify-between w-48">
                <Text className="text-sm font-bold text-gray-800 w-8 text-center">{item.runs}</Text>
                <Text className="text-sm text-gray-600 w-8 text-center">{item.balls}</Text>
                <Text className="text-sm text-gray-600 w-8 text-center">{item.fours}</Text>
                <Text className="text-sm text-gray-600 w-8 text-center">{item.sixes}</Text>
                <Text className="text-sm text-gray-600 w-12 text-center">{item.strike_rate?.toFixed(2) || 0}</Text>
            </View>
            <Ionicons name="trending-up" size={16} color="#666" className="ml-2" />
        </View>
    );

    const calculateExtras = (bowlerData: any) => {
        const overs = bowlerData?.overs || [];

        let wides = 0;
        let noBalls = 0;
        let byes = 0;
        let legByes = 0;
        let total = 0;

        overs.forEach((over: any) => {
            over?.over_balls?.forEach((ball: any) => {
                console.log('..................................................')
                console.log(ball)
                console.log('..................................................')
                if (ball.is_extra && ball.extra_type) {
                    total += ball.runs || 0;

                    switch (ball.extra_type) {
                        case "wide":
                            wides += ball.runs || 0;
                            break;
                        case "no-ball":
                            noBalls += ball.runs || 0;
                            break;
                        case "bye":
                            byes += ball.runs || 0;
                            break;
                        case "leg-bye":
                            legByes += ball.runs || 0;
                            break;
                        default:
                            break;
                    }
                }
            });
        });

        return { wides, noBalls, byes, legByes, total };
    };

    const renderBowlingCard = (bowlerStats: BowlingStats) => {
        const extra = calculateExtras(bowlerStats);

        console.log(extra)
        return (
            <View key={bowlerStats.id} className="flex-row items-center px-2 py-3 border-b border-gray-100">
                <View className="flex-row items-center flex-1">
                    <AvatarImage
                        uri={bowlerStats.bowler?.image?.formats?.thumbnail?.url}
                        size={42}
                        borderRadius={80}
                        rounded={true}
                        backgroundColor='transparent'
                        extraStyle={{ marginRight: 12, }}
                    />
                    <View className="flex-1">
                        <View className="flex-row items-center">
                            <Text className="text-sm font-medium text-gray-800 mr-2" numberOfLines={1}>
                                {bowlerStats.bowler?.name}
                            </Text>
                            {bowlerStats.isCaptain && (
                                <Text className="text-xs font-bold text-[#0e7ccb]">(C)</Text>
                            )}
                        </View>
                    </View>
                </View>

                <View className="flex-row w-48 justify-between">
                    <Text className="text-xs text-gray-800 w-6 text-center">{bowlerStats.overs?.length}</Text>
                    <Text className="text-xs text-gray-800 w-6 text-center">{bowlerStats.maidens}</Text>
                    <Text className="text-xs text-gray-800 w-6 text-center">{bowlerStats.runs_conceded}</Text>
                    <Text className="text-xs text-gray-800 w-6 text-center">{bowlerStats.wickets?.length}</Text>
                    <Text className="text-xs text-gray-800 w-6 text-center">{bowlerStats.runs_conceded / bowlerStats.overs?.length}</Text>
                    <Text className="text-xs text-gray-800 w-6 text-center">{extra?.wides}</Text>
                    <Text className="text-xs text-gray-800 w-6 text-center">{extra?.noBalls}</Text>
                </View>
            </View>
        );
    }

    const renderFallOfWickets = () => (
        <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-4 px-2">Fall of wickets</Text>
            <View className="bg-white">
                <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                    <Text className="text-base font-semibold text-gray-800">Fall of wickets</Text>
                    <View className="flex-row">
                        <Text className="text-sm font-semibold text-gray-600 w-16 text-center">Score</Text>
                        <Text className="text-sm font-semibold text-gray-600 w-16 text-center">Over</Text>
                    </View>
                </View>
                {currentInnings.fallOfWickets.map((wicket, index) => (
                    <View key={index} className="flex-row justify-between items-center p-4 border-b border-gray-100">
                        <Text className="text-sm text-gray-800 flex-1">{wicket.playerName}</Text>
                        <View className="flex-row">
                            <Text className="text-sm text-gray-800 w-16 text-center">
                                {wicket.score}-{wicket.wicket}
                            </Text>
                            <Text className="text-sm text-gray-600 w-16 text-center">{wicket.over} ov</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );

    const renderManOfTheMatch = () => (
        <View className="mx-4 mb-6 rounded-xl  border border-gray-200 overflow-hidden">
            {/* Header */}
            <LinearGradient
                colors={['#fffbe6', '#fceabb']} // light yellow tones
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    // borderTopLeftRadius: 16,
                    // borderTopRightRadius: 16,
                    padding: 16,
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="trophy" size={24} color="#8d6e63" style={{ marginRight: 8 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#5d4037' }}>
                        {manOfTheMatch.award}
                    </Text>
                </View>
            </LinearGradient>

            {/* Player Info */}
            <View className="p-6">
                <View className="flex-row items-center mb-4">
                    <View className="relative">
                        <Image
                            source={{ uri: manOfTheMatch.image }}
                            className="w-20 h-20 rounded-full border-4 border-yellow-300"
                        />
                        <View className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full items-center justify-center border-2 border-white">
                            <Ionicons name="star" size={16} color="white" />
                        </View>
                    </View>

                    <View className="flex-1 ml-4">
                        <Text className="text-2xl font-bold text-gray-800">{manOfTheMatch.name}</Text>
                        <Text className="text-base text-gray-600 mb-2">{manOfTheMatch.team}</Text>
                    </View>
                </View>

                {/* Performance Stats */}
                <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                    <Text className="text-lg font-bold text-gray-800 mb-3">Match Performance</Text>

                    {/* Batting Stats */}
                    {manOfTheMatch.performance.batting && (
                        <View className="mb-4">
                            <Text className="text-sm font-semibold text-gray-600 mb-2">Batting</Text>
                            <View className="flex-row justify-between items-center bg-gray-50 rounded-lg p-3">
                                <View className="items-center">
                                    <Text className="text-2xl font-bold text-[#0e7ccb]">{manOfTheMatch.performance.batting.runs}</Text>
                                    <Text className="text-xs text-gray-500">Runs</Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-lg font-semibold text-gray-800">{manOfTheMatch.performance.batting.balls}</Text>
                                    <Text className="text-xs text-gray-500">Balls</Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-lg font-semibold text-gray-800">{manOfTheMatch.performance.batting.fours}</Text>
                                    <Text className="text-xs text-gray-500">4s</Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-lg font-semibold text-gray-800">{manOfTheMatch.performance.batting.sixes}</Text>
                                    <Text className="text-xs text-gray-500">6s</Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-lg font-semibold text-green-600">
                                        {manOfTheMatch.performance.batting.strikeRate.toFixed(2)}
                                    </Text>
                                    <Text className="text-xs text-gray-500">SR</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Bowling Stats */}
                    {manOfTheMatch.performance.bowling && (
                        <View className="mb-4">
                            <Text className="text-sm font-semibold text-gray-600 mb-2">Bowling</Text>
                            <View className="flex-row justify-between items-center bg-gray-50 rounded-lg p-3">
                                <View className="items-center">
                                    <Text className="text-lg font-semibold text-gray-800">{manOfTheMatch.performance.bowling.overs}</Text>
                                    <Text className="text-xs text-gray-500">Overs</Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-2xl font-bold text-red-600">{manOfTheMatch.performance.bowling.wickets}</Text>
                                    <Text className="text-xs text-gray-500">Wickets</Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-lg font-semibold text-gray-800">{manOfTheMatch.performance.bowling.runs}</Text>
                                    <Text className="text-xs text-gray-500">Runs</Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-lg font-semibold text-green-600">
                                        {manOfTheMatch.performance.bowling.economy}
                                    </Text>
                                    <Text className="text-xs text-gray-500">Economy</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Fielding Stats */}
                    {manOfTheMatch.performance.fielding &&
                        (manOfTheMatch.performance.fielding.catches > 0 || manOfTheMatch.performance.fielding.runOuts > 0) && (
                            <View>
                                <Text className="text-sm font-semibold text-gray-600 mb-2">Fielding</Text>
                                <View className="flex-row justify-around bg-gray-50 rounded-lg p-3">
                                    <View className="items-center">
                                        <Text className="text-xl font-bold text-[#0e7ccb]">
                                            {manOfTheMatch.performance.fielding.catches}
                                        </Text>
                                        <Text className="text-xs text-gray-500">Catches</Text>
                                    </View>
                                    <View className="items-center">
                                        <Text className="text-xl font-bold text-[#0e7ccb]">
                                            {manOfTheMatch.performance.fielding.runOuts}
                                        </Text>
                                        <Text className="text-xs text-gray-500">Run Outs</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                </View>

                {/* Description */}
                <View className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <Text className="text-sm text-gray-700 leading-5 italic">"{manOfTheMatch.description}"</Text>
                </View>
            </View>
        </View>
    )

    const innigABalls = match?.innings[0]?.overs[match?.innings[0]?.overs?.length - 1]?.over_balls?.length;

    const teamAInnings = {
        ...match?.innings[0],
        overs: innigABalls < 6 ? `${match?.innings[0]?.overs?.length - 1}.${innigABalls}` : match?.innings[0]?.overs?.length,
        runRate: parseFloat(teamA.runRate),
        renderBattingCard,
        renderBowlingCard,
        renderFallOfWickets,
    };

    const innigBBalls = match?.innings[1]?.overs[match?.innings[0]?.overs?.length - 1]?.over_balls?.length;

    const teamBInnings = {
        ...match?.innings[1],
        overs: innigBBalls < 6 ? `${match?.innings[1]?.overs?.length - 1}.${innigBBalls}` : match?.innings[1]?.overs?.length,
        runRate: parseFloat(teamA.runRate),
        yetToBat: !match?.innings[1] ? !match?.innings[1] : [],
        renderBattingCard,
        renderBowlingCard,
        renderFallOfWickets,
    };

    return (
        <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
            <View className='pt-2'>
                <InningsAccordion innings={teamAInnings} />
            </View>
            {
                match?.innings[1] &&
                <View>
                    <InningsAccordion innings={teamBInnings} />
                </View>
            }

            {/* Man of the Match */}
            {match?.status_type !== 'Live' && renderManOfTheMatch()}

        </ScrollView>
    );
};

export default Scoreboard;