
import React, { useEffect, useState } from 'react';
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
    runs: number;
    wickets: any;
    overs: number; // ✅ Change from number to string
    runRate: number;
    extras: Extras;
    batting_team: any;
    bowling_team: any;
    player_scores: any
    bowler_stats: any
    yetToBat: string[];
    fallOfWickets: any[]; // or a defined FallOfWicket[] type
    renderBattingCard: (player: any) => React.ReactNode;
    renderBowlingCard: (player: any) => React.ReactNode;
    renderFallOfWickets: () => React.ReactNode;
}

interface Props {
    innings: Innings;
}

const calculateExtras = (bowlerStatsArray: any[]) => {
  let wides = 0;
  let noBalls = 0;
  let byes = 0;
  let legByes = 0;
  let total = 0;

  // If the bowler_stats is not an array (just one bowler), wrap it
  const bowlers = Array.isArray(bowlerStatsArray)
    ? bowlerStatsArray
    : [bowlerStatsArray];

  bowlers.forEach((bowler) => {
    const overs = bowler?.overs || [];

    overs.forEach((over: any) => {
      over?.over_balls?.forEach((ball: any) => {
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
          }
        }
      });
    });
  });

  return { wides, noBalls, byes, legByes, total };
};


const InningsAccordion: React.FC<Props> = ({ innings }) => {
    const {
        teamName,
        runs,
        wickets,
        overs,
        runRate,
        batting_team,
        bowling_team,
        player_scores,
        bowler_stats,
        yetToBat,
        renderBattingCard,
        renderBowlingCard,
        renderFallOfWickets,
    } = innings;

    const [extras, setExtras] = useState({
        wides: 0,
        noBalls: 0,
        byes: 0,
        legByes: 0,
        total: 0,
    });

    useEffect(() => {
        if (bowler_stats) {
            const extraSummary = calculateExtras(bowler_stats);
            setExtras(extraSummary);
        }
    }, [bowler_stats])

    return (
        <Accordion
            title={teamName}
            headerComponent={
                <View>
                    <Text className="text-sm font-bold text-gray-800">{teamName}</Text>
                    <View className="flex-row items-center">
                        <Text className="text-sm font-bold text-gray-900 mr-2">
                            {runs}/{wickets}
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
                    {player_scores?.map(renderBattingCard)}
                </View>
            </View>

            {/* Extras */}
            <View className="mx-4 mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <View className="flex-row justify-between items-center">
                    <Text className="text-base font-semibold text-gray-800">Extras</Text>
                    <Text className="text-base font-bold text-gray-900">Total : {extras?.total}</Text>
                    <Text className="text-sm text-gray-600">
                        b ({extras?.byes}) lb ({extras?.legByes}) nb ({extras?.noBalls}) wd ({extras?.wides})
                    </Text>
                </View>
            </View>

            {/* Total Runs */}
            <View className="mx-4 mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-bold text-gray-800">Total Runs</Text>
                    <Text className="text-xl font-bold text-gray-900">
                        {runs}/{wickets} ({overs} OV)
                    </Text>
                    <Text className="text-base text-gray-600">RR: {runRate}</Text>
                </View>
            </View>

            {/* Yet to Bat */}
            {yetToBat?.length < 1 && (
                <View className="mb-4 bg-white p-4">
                    <Text className="text-base font-semibold text-gray-800 mb-3">Yet to bat</Text>
                    <Text className="text-sm text-gray-600 leading-5">{yetToBat?.join(' | ')}</Text>
                </View>
            )}

            {/* Bowling */}
            {bowler_stats?.length > 0 && (
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
                    {bowler_stats?.map(renderBowlingCard)}
                </View>
            )}

            {/* Fall of Wickets */}
            {wickets?.length > 0 && renderFallOfWickets()}
        </Accordion>
    );
};

export default InningsAccordion;
