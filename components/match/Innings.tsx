import { matchData } from '@/constants/match'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import KeyMoments from './KeyMoments'
import MatchStats from './MatchStats'
import TopBowlers from './TopBowlers'
import TopPerformers from './TopPerformers'

const Innings = () => {
    const [selectedInnings, setSelectedInnings] = useState<'first' | 'second'>('first');

    return (
        <View>
            <View className="flex-row mx-4 mt-4 mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-1">
                <TouchableOpacity
                    className={`flex-1 py-3 rounded-lg ${selectedInnings === 'first' ? 'bg-blue-500' : 'bg-transparent'}`}
                    onPress={() => setSelectedInnings('first')}
                >
                    <Text className={`text-center font-semibold ${selectedInnings === 'first' ? 'text-white' : 'text-gray-600'}`}>
                        1st Innings
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 py-3 rounded-lg ${selectedInnings === 'second' ? 'bg-blue-500' : 'bg-transparent'}`}
                    onPress={() => setSelectedInnings('second')}
                >
                    <Text className={`text-center font-semibold ${selectedInnings === 'second' ? 'text-white' : 'text-gray-600'}`}>
                        2nd Innings
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Match Stats Section */}
            <MatchStats
                totalRuns={563}
                totalWickets={18}
                totalOvers="99.2"
            />

            <TopPerformers performers={matchData.topPerformers} />

            <TopBowlers bowlers={matchData.topBowlers} />

            <KeyMoments moments={matchData.keyMoments} />
        </View>
    )
}

export default Innings
