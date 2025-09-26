import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const upcomingActivities = [
    { id: "1", title: "Leagues", icon: "calendar", color: "#DBEAFE" },
    { id: "3", title: "Matches", icon: "trophy", color: "#DBEAFE" },
    { id: "2", title: "Teams", icon: "checkmark-circle", color: "#DBEAFE" },
    { id: "4", title: "Innings", icon: "trending-up", color: "#DBEAFE" },
]

const MoreComponentsBelow = () => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState('list');
    const [playersData, setPlayersData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const recentActivities = [
        {
            id: 1,
            title: "Team Titans vs Warriors",
            description: "Match scheduled for tomorrow",
            route: "/match/1"
        },
        {
            id: 2,
            title: "New player added to Strikers",
            description: "John Doe joined the team",
            route: "/match/1"
        }
    ];

    return (
        <View className="px-4">
            {/* Today's Matches */}
            <View className="mb-6">
                <Text className="text-lg font-semibold mb-4 text-black">Live Matches</Text>
                <View className="bg-blue-50 rounded-lg p-4">
                    <View className="flex-row justify-between items-center">
                        <View>
                            <Text className="font-semibold text-gray-800">Team A vs Team B</Text>
                            <Text className="text-gray-600 text-sm">Score: 158/3</Text>
                        </View>
                        <TouchableOpacity className="bg-white rounded-lg px-4 py-2" onPress={() => router.push(`/match/1`)}>
                            <Text className="text-[#0e7ccb] font-medium">View</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Upcoming Activities */}
            <View className="mb-6">
                <Text className="text-lg font-semibold mb-4 text-black">My Activities</Text>
                <View className="flex-row flex-wrap justify-between">
                    {upcomingActivities.map((activity) => (
                        <TouchableOpacity
                            key={activity.id}
                            className="w-[48%] rounded-lg p-4 mb-3 items-center"
                            style={{ backgroundColor: activity.color }}
                        >
                            <Ionicons name={activity.icon as any} size={32} color="#0e7ccb" />
                            <Text className="text-[#0e7ccb] font-medium mt-2">{activity.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Recent Activity */}
            <View className="mb-6">
                {/* <Text className="text-lg font-semibold mb-3 text-black">Recent Activity</Text>
                <View className="gap-y-3">
                    <TouchableOpacity className="bg-white border border-gray-200 rounded-lg p-4" onPress={() => router.push(`/match/1`)}>
                        <Text className="font-medium text-black">Team Titans vs Warriors</Text>
                        <Text className="text-gray-600 text-sm">Match scheduled for tomorrow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white border border-gray-200 rounded-lg p-4" onPress={() => router.push(`/match/1`)}>
                        <Text className="font-medium text-black">New player added to Strikers</Text>
                        <Text className="text-gray-600 text-sm">John Doe joined the team</Text>
                    </TouchableOpacity>
                </View> */}

                <View className="flex-row justify-between items-center mb-4 px-4">
                    <Text className="text-lg font-semibold text-black">Recent Activity</Text>

                    <View className="flex-row bg-gray-200 rounded-lg p-1">
                        <TouchableOpacity
                            className={`px-4 py-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                            onPress={() => router.push(`/teams`)}
                        >
                            <Text className={`font-medium ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-600'}`}>
                                List
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className={`px-4 py-2 rounded-md ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
                            onPress={() => router.push(`/find-on-map`)}
                        >
                            <Text className={`font-medium ${viewMode === 'map' ? 'text-blue-600' : 'text-gray-600'}`}>
                                Map
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Conditional Rendering based on view mode */}
                <View className="gap-y-3">
                    <TouchableOpacity className="bg-white border border-gray-200 rounded-lg p-4" onPress={() => router.push(`/match/1`)}>
                        <Text className="font-medium text-black">Team Titans vs Warriors</Text>
                        <Text className="text-gray-600 text-sm">Match scheduled for tomorrow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white border border-gray-200 rounded-lg p-4" onPress={() => router.push(`/match/1`)}>
                        <Text className="font-medium text-black">New player added to Strikers</Text>
                        <Text className="text-gray-600 text-sm">John Doe joined the team</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default MoreComponentsBelow