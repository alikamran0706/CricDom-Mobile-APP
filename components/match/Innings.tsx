import { matchData } from '@/constants/match'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import KeyMoments from './KeyMoments'
import MatchStats from './MatchStats'
import TopBowlers from './TopBowlers'
import TopPerformers from './TopPerformers'

interface FallOfWicket {
    playerName: string;
    score: number;
    wicket: number;
    over: string;
}

interface BattingStats {
    id: string;
    name: string;
    image: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
    isOut: boolean;
    dismissal?: string;
    isNotOut?: boolean;
    isCaptain?: boolean;
    isWicketKeeper?: boolean;
}

interface BowlingStats {
    id: string;
    name: string;
    image: string;
    overs: string;
    maidens: number;
    runs: number;
    wickets: number;
    economy: string;
    wides: number;
    noBalls: number;
    isCaptain?: boolean;
}

interface TeamInnings {
    teamName: string;
    totalRuns: number;
    wickets: number;
    overs: string;
    runRate: string;
    battingStats: BattingStats[];
    bowlingStats: BowlingStats[];
    extras: {
        byes: number;
        legByes: number;
        noBalls: number;
        wides: number;
        total: number;
    };
    fallOfWickets: FallOfWicket[];
    yetToBat: string[];
}
const secondInnings: TeamInnings = {
    teamName: "Continental CC",
    totalRuns: 249,
    wickets: 7,
    overs: "36.5",
    runRate: "6.76",
    battingStats: [
        {
            id: "1",
            name: "Gaurav Vashisht",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
            runs: 2,
            balls: 6,
            fours: 0,
            sixes: 0,
            strikeRate: 33.33,
            isOut: true,
            dismissal: "c †Rahul R b Ankush K",
        },
        {
            id: "2",
            name: "Anirudh Jonnavitula",
            image: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=100&auto=format&fit=crop&q=60",
            runs: 11,
            balls: 12,
            fours: 1,
            sixes: 0,
            strikeRate: 91.67,
            isOut: true,
            dismissal: "c Raj S b Ankush K",
        },
        {
            id: "3",
            name: "Koti Vanga",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
            runs: 45,
            balls: 33,
            fours: 0,
            sixes: 4,
            strikeRate: 136.36,
            isOut: false,
            isNotOut: true,
        },
        {
            id: "4",
            name: "Tarun Garg",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
            runs: 42,
            balls: 17,
            fours: 1,
            sixes: 5,
            strikeRate: 247.06,
            isOut: false,
            isNotOut: true,
        },
    ],
    bowlingStats: [],
    extras: {
        byes: 1,
        legByes: 1,
        noBalls: 3,
        wides: 15,
        total: 20,
    },
    fallOfWickets: [],
    yetToBat: [
        "Taha Farooqi",
        "Shanmukh Pavan Kumar Varma Sagi"
    ],
};

const firstInnings: TeamInnings = {
    teamName: "Greater Minnesota CC",
    totalRuns: 248,
    wickets: 6,
    overs: "40.0",
    runRate: "6.20",
    battingStats: [
        {
            id: "1",
            name: "Raj Shekhar",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
            runs: 8,
            balls: 13,
            fours: 1,
            sixes: 0,
            strikeRate: 61.54,
            isOut: true,
            dismissal: "c Kaushik A b Gaurav V",
            isWicketKeeper: true,
        },
        {
            id: "2",
            name: "Karthik Goud Resu",
            image: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=100&auto=format&fit=crop&q=60",
            runs: 25,
            balls: 36,
            fours: 1,
            sixes: 1,
            strikeRate: 69.44,
            isOut: true,
            dismissal: "c Tarun G b Vinay Y",
        },
        {
            id: "3",
            name: "Naveen Sama",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
            runs: 53,
            balls: 55,
            fours: 4,
            sixes: 3,
            strikeRate: 96.36,
            isOut: true,
            dismissal: "c Param P b Vinay Y",
        },
        {
            id: "4",
            name: "Vinodh Rajagopalan",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
            runs: 0,
            balls: 3,
            fours: 0,
            sixes: 0,
            strikeRate: 0.00,
            isOut: true,
            dismissal: "c&b Vinay Y",
        },
        {
            id: "5",
            name: "Rahul Radhakrishna",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
            runs: 25,
            balls: 40,
            fours: 2,
            sixes: 0,
            strikeRate: 62.50,
            isOut: true,
            dismissal: "c Pranav M b Shanmukh Pavan Kumar Varma S",
        },
        {
            id: "6",
            name: "Dhruva Kota",
            image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&auto=format&fit=crop&q=60",
            runs: 60,
            balls: 66,
            fours: 2,
            sixes: 4,
            strikeRate: 90.91,
            isOut: true,
            dismissal: "c Anirudh J b Taha F",
            isCaptain: true,
        },
        {
            id: "7",
            name: "Ankush Kalohia",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60",
            runs: 41,
            balls: 28,
            fours: 1,
            sixes: 2,
            strikeRate: 146.43,
            isOut: false,
            isNotOut: true,
        },
        {
            id: "8",
            name: "Ranaveer Aelgani",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60",
            runs: 0,
            balls: 1,
            fours: 0,
            sixes: 0,
            strikeRate: 0.00,
            isOut: false,
            isNotOut: true,
        },
    ],
    bowlingStats: [
        {
            id: "1",
            name: "Taha Farooqi",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
            overs: "8.0",
            maidens: 0,
            runs: 49,
            wickets: 1,
            economy: "6.1",
            wides: 7,
            noBalls: 0,
        },
        {
            id: "2",
            name: "Gaurav Vashisht",
            image: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=100&auto=format&fit=crop&q=60",
            overs: "3.0",
            maidens: 0,
            runs: 19,
            wickets: 1,
            economy: "6.3",
            wides: 2,
            noBalls: 1,
        },
        {
            id: "3",
            name: "Shanmukh Pavan Kumar Varma Sagi",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
            overs: "8.0",
            maidens: 0,
            runs: 46,
            wickets: 1,
            economy: "5.8",
            wides: 0,
            noBalls: 1,
        },
        {
            id: "4",
            name: "Pranav Madhusoodana",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
            overs: "8.0",
            maidens: 0,
            runs: 36,
            wickets: 0,
            economy: "4.5",
            wides: 1,
            noBalls: 0,
        },
    ],
    extras: {
        byes: 2,
        legByes: 2,
        noBalls: 2,
        wides: 30,
        total: 36,
    },
    fallOfWickets: [
        { playerName: "Raj S", score: 18, wicket: 1, over: "3.6" },
        { playerName: "Karthik Goud R", score: 99, wicket: 2, over: "15.4" },
        { playerName: "Vinodh R", score: 105, wicket: 3, over: "17.1" },
        { playerName: "Naveen S", score: 109, wicket: 4, over: "17.4" },
        { playerName: "Rahul R", score: 163, wicket: 5, over: "31.5" },
        { playerName: "Ankush K", score: 245, wicket: 6, over: "39.4" },
    ],
    yetToBat: [
        "Ravi S Kandru",
        "Sai Vineeth Putchala",
        "Mounish Kumar Vinnakota"
    ],
};
const Innings = () => {
    const [selectedInnings, setSelectedInnings] = useState<'first' | 'second'>('first');
    const currentInnings = selectedInnings === 'first' ? firstInnings : secondInnings;
    
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
