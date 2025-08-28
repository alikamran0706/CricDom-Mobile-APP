import { BattingStats, BowlingStats } from '@/lib/types/match';
import React from 'react';
import { Text, View } from 'react-native';
import Accordion from '../ui/Accordion';

// TypeScript (optional): Define innings type if needed
interface Extras {
    byes: number;
    legByes: number;
    noBalls: number;
    wides: number;
    total: number;
}

interface Innings {
    teamName: string;
    totalRuns: number;
    wickets: number;
    overs: number; // ✅ Change from number to string
    runRate: number;
    extras: Extras;
    battingStats: BattingStats[];
    bowlingStats: BowlingStats[];
    yetToBat: string[];
    fallOfWickets: any[]; // or a defined FallOfWicket[] type
    renderBattingCard: (player: BattingStats) => React.ReactNode;
    renderBowlingCard: (player: BowlingStats) => React.ReactNode;
    renderFallOfWickets: () => React.ReactNode;
}

interface Props {
    innings: Innings;
}

const InningsAccordion: React.FC<Props> = ({ innings }) => {
    const {
        teamName,
        totalRuns,
        wickets,
        overs,
        runRate,
        extras,
        battingStats,
        bowlingStats,
        yetToBat,
        fallOfWickets,
        renderBattingCard,
        renderBowlingCard,
        renderFallOfWickets,
    } = innings;

    return (
        <Accordion
            title={teamName}
            headerComponent={
                <View>
                    <Text className="text-sm font-bold text-gray-800">{teamName}</Text>
                    <View className="flex-row items-center">
                        <Text className="text-sm font-bold text-gray-900 mr-2">
                            {totalRuns}/{wickets}
                        </Text>
                        <Text className="text-sm text-gray-600">({overs} OV)</Text>
                    </View>
                </View>
            }
        >
            {/* Batting */}
            <View className="mb-6 bg-white shadow-sm">
                <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                    <Text className="text-lg font-bold text-gray-800">Batting</Text>
                    <View className="flex-row justify-between w-48">
                        <Text className="text-xs font-semibold text-gray-600 w-8 text-center">R</Text>
                        <Text className="text-xs font-semibold text-gray-600 w-8 text-center">B</Text>
                        <Text className="text-xs font-semibold text-gray-600 w-8 text-center">4s</Text>
                        <Text className="text-xs font-semibold text-gray-600 w-8 text-center">6s</Text>
                        <Text className="text-xs font-semibold text-gray-600 w-12 text-center">SR</Text>
                    </View>
                </View>
                <View className="px-2">
                    {battingStats.map(renderBattingCard)}
                </View>
            </View>

            {/* Extras */}
            <View className="mx-4 mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <View className="flex-row justify-between items-center">
                    <Text className="text-base font-semibold text-gray-800">Extras</Text>
                    <Text className="text-base font-bold text-gray-900">Total : {extras.total}</Text>
                    <Text className="text-sm text-gray-600">
                        b ({extras.byes}) lb ({extras.legByes}) nb ({extras.noBalls}) wd ({extras.wides})
                    </Text>
                </View>
            </View>

            {/* Total Runs */}
            <View className="mx-4 mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-bold text-gray-800">Total Runs</Text>
                    <Text className="text-xl font-bold text-gray-900">
                        {totalRuns}/{wickets} ({overs} OV)
                    </Text>
                    <Text className="text-base text-gray-600">RR: {runRate}</Text>
                </View>
            </View>

            {/* Yet to Bat */}
            {yetToBat.length > 0 && (
                <View className="mb-4 bg-white p-4">
                    <Text className="text-base font-semibold text-gray-800 mb-3">Yet to bat</Text>
                    <Text className="text-sm text-gray-600 leading-5">{yetToBat.join(' | ')}</Text>
                </View>
            )}

            {/* Bowling */}
            {bowlingStats.length > 0 && (
                <View className="mx-2 mb-6 bg-white">
                    <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                        <Text className="text-lg font-bold text-gray-800">Bowling</Text>
                        <View className="flex-row w-48 justify-between">
                            <Text className="text-xs font-semibold text-gray-600 w-6 text-center">O</Text>
                            <Text className="text-xs font-semibold text-gray-600 w-6 text-center">M</Text>
                            <Text className="text-xs font-semibold text-gray-600 w-6 text-center">R</Text>
                            <Text className="text-xs font-semibold text-gray-600 w-6 text-center">W</Text>
                            <Text className="text-xs font-semibold text-gray-600 w-6 text-center">ER</Text>
                            <Text className="text-xs font-semibold text-gray-600 w-6 text-center">WD</Text>
                            <Text className="text-xs font-semibold text-gray-600 w-6 text-center">NB</Text>
                        </View>
                    </View>
                    {bowlingStats.map(renderBowlingCard)}
                </View>
            )}

            {/* Fall of Wickets */}
            {fallOfWickets.length > 0 && renderFallOfWickets()}
        </Accordion>
    );
};

export default InningsAccordion;
