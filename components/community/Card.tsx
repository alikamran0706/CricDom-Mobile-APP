import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const getRankColor = (rank: number) => {
    switch (rank) {
        case 1:
            return "#ffd700"
        case 2:
            return "#ff9800"
        case 3:
            return "#ff5722"
        default:
            return "#666"
    }
}

const Card = ({ name, matches, points, rank, dailyRate, matchRate, image, link }: any) => {
    const router = useRouter();
    return (
        <TouchableOpacity
            className="bg-white rounded-2xl p-4 mb-4 mx-4 border border-gray-100"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 11,
            }}
            onPress={() => {
                if (link) {
                    router.push(link as `/`);
                }
            }}
        >
            <View className="flex-row items-center mb-3">
                <Image
                    source={{ uri: image }}
                    className="w-15 h-15 rounded-full bg-gray-200 mr-4"
                    style={{ width: 60, height: 60 }}
                />
                <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-800 mb-1">{name}</Text>
                    <Text className="text-sm text-gray-600 mb-2">Matches Scored: <Text className="text-black font-bold">{matches}</Text></Text>
                    <Text className="text-sm text-gray-800">
                        Total Points = <Text className="text-black font-bold">{points}</Text>
                    </Text>
                </View>
                <Text className="text-2xl font-bold ml-3" style={{ color: getRankColor(rank) }}>
                    {rank}
                </Text>
            </View>

            <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                <Text className="text-sm text-gray-600">
                    {dailyRate}/day, {matchRate}/match
                </Text>
                <TouchableOpacity className="bg-[#0e7ccb] rounded-full p-2" onPress={() => router.push('/message')}>
                    <Ionicons name="chatbubble" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default Card