import { matchData } from '@/constants/match'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import KeyMoments from './KeyMoments'
import MatchStats from './MatchStats'
import TopBowlers from './TopBowlers'
import TopPerformers from './TopPerformers'

const Innings = ({ match }: any) => {
    const [selectedInnings, setSelectedInnings] = useState<0 | 1>(0);
    console.log(selectedInnings, 'ssss')
    return (
        <View>
            <View className="flex-row mx-4 mt-4 mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-1">
                <TouchableOpacity
                    className={`flex-1 py-3 rounded-lg ${selectedInnings === 0 ? 'bg-blue-500' : 'bg-transparent'}`}
                    onPress={() => setSelectedInnings(0)}
                >
                    <Text className={`text-center font-semibold ${selectedInnings === 0 ? 'text-white' : 'text-gray-600'}`}>
                        1st Innings
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 py-3 rounded-lg ${selectedInnings === 1 ? 'bg-blue-500' : 'bg-transparent'}`}
                    onPress={() => setSelectedInnings(1)}
                >
                    <Text className={`text-center font-semibold ${selectedInnings === 1 ? 'text-white' : 'text-gray-600'}`}>
                        2nd Innings
                    </Text>
                </TouchableOpacity>
            </View>
            {
                match?.innings[selectedInnings] ?
                    <>
                        {/* Match Stats Section */}
                        <MatchStats
                            totalRuns={match?.innings[selectedInnings]?.runs}
                            totalWickets={match?.innings[selectedInnings]?.wickets}
                            totalOvers={match?.innings[selectedInnings]?.overs?.length}
                        />
                        <TopPerformers performers={match?.innings[selectedInnings]?.player_scores} />

                        <TopBowlers bowlers={match?.innings[selectedInnings]?.bowler_stats} />
                        
                        <KeyMoments moments={matchData.keyMoments} />
                    </>
                    :
                    <Text className='mb-4 mx-6 text-gray-700'>Inning not started yet!</Text>
            }

        </View>
    )
}

export default Innings
