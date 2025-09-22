import { RootState } from '@/store'
import { useGetTeamsQuery } from '@/store/features/team/teamApi'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import AvatarImage from '../AvatarImage'

const recentMatches = [
    {
        id: "1",
        title: "County Championship: Day 3",
        subtitle: "Highlights",
        description: "Watch the key moments from yesterday's matches.",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&auto=format&fit=crop&q=60",
        backgroundColor: "#F3F4F6"
    },
    {
        id: "2",
        title: "T20 Blast: Match",
        subtitle: "Get ready for tonight!",
        description: "Clash.",
        image: "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?w=500&auto=format&fit=crop&q=60",
        backgroundColor: "#F3F4F6"
    }
]

const OtherComponentsAbove = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user.profile);
    const { data, isLoading, isFetching, isError, refetch } = useGetTeamsQuery({
        page: 1,
        pageSize: 5,
        ownerId: user?.documentId,
    });

    const teams = data?.data || [];
    const teamsPagination = data?.meta?.pagination;

    return (
        <View className="px-4">
            {/* Recent Match */}
            <View className="mb-6">
                <Text className="text-lg font-semibold mb-4 text-black">Recent Match</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
                    {recentMatches.map((match) => (
                        <TouchableOpacity
                            key={match.id}
                            className="w-64 rounded-xl p-4 mr-4"
                            style={{ backgroundColor: match.backgroundColor }}
                            onPress={() => router.push(`/match/${match.id}`)}
                        >
                            <Image
                                source={{ uri: match.image }}
                                className="w-full h-32 rounded-lg mb-3"
                                resizeMode="cover"
                            />
                            <View>
                                <Text className="text-gray-800 font-bold text-base mb-1">
                                    {match.title}
                                </Text>
                                <Text className="text-gray-800 font-semibold text-sm mb-1">
                                    {match.subtitle}
                                </Text>
                                <Text className="text-gray-600 text-sm">
                                    {match.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Your Teams */}
            <View className="mb-6">
                <Text className="text-lg font-semibold mb-4 text-black">Your Teams</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 16 }}
                >


                    {
                        isLoading ?
                            <View style={{ alignItems: 'flex-start' }}>
                                <ActivityIndicator size="large" color="#000" />
                            </View>
                            :
                            <View className="flex-row gap-x-3">
                                {teams?.map((team: any) => (
                                    <TouchableOpacity
                                        key={team.id}
                                        className="items-center justify-center"
                                        onPress={() => (router.push(`/team/${team.documentId}`))}
                                    >
                                        {/* {team.isAdd ? (
                        <Ionicons name="add" size={24} color="#3B82F6" />
                      ) : team.count ? (
                        <Text className="text-white font-bold text-lg">{team.count}</Text>
                      ) : null} */}

                                        {
                                            team?.image?.formats?.thumbnail?.url ? (
                                                <AvatarImage
                                                    uri={team?.image?.formats?.thumbnail?.url}
                                                    size={62}
                                                    // borderRadius={8}
                                                    // rounded={false}
                                                    extraStyle={{ marginRight: 12, }}
                                                />
                                            )
                                                :
                                                <View
                                                    className="w-16 h-16 rounded-full items-center justify-center mr-4"
                                                    style={{ backgroundColor: "#000" }}
                                                >
                                                    <Ionicons name="people" size={24} color="white" />
                                                </View>
                                        }
                                    </TouchableOpacity>
                                ))}

                                <TouchableOpacity
                                    className="w-16 h-16 rounded-full items-center justify-center"
                                    style={{ backgroundColor: '#DBEAFE' }}
                                    onPress={() => (router.push("/create-team"))}
                                >
                                    <Ionicons name="add" size={24} color="#3B82F6" />
                                </TouchableOpacity>
                            </View>
                    }
                </ScrollView>
            </View>

            {/* Manage Players Card */}
            <TouchableOpacity className="bg-blue-50 rounded-lg p-4 mb-6" onPress={() => router.push("/create-inning")}>
                <View className="flex-row items-center mb-2">
                    <Ionicons name="people" size={20} color="#0e7ccb" />
                    <Text className="text-[#0e7ccb] font-semibold ml-2">Create inning</Text>
                </View>
                <Text className="text-gray-600 text-sm mb-3">Track team performance easily!</Text>
            </TouchableOpacity>

            {/* Quick Stats */}
            <View className="bg-gray-50 rounded-lg mb-6 p-2">
                <Text className="text-lg font-semibold mb-3 text-black">Quick Stats</Text>
                <View className="flex-row justify-between">
                    <Pressable className="items-center" onPress={() => router.push('/teams')}>
                        <Text className="text-2xl font-bold text-[#0e7ccb]">{teamsPagination?.total}</Text>
                        <Text className="text-gray-600">Teams</Text>
                    </Pressable>
                    <Pressable className="items-center" onPress={() => router.push('/leagues')}>
                        <Text className="text-2xl font-bold text-green-600">38</Text>
                        <Text className="text-gray-600">Leagues</Text>
                    </Pressable>
                    <Pressable className="items-center" onPress={() => router.push('/matches')}>
                        <Text className="text-2xl font-bold text-orange-600">12</Text>
                        <Text className="text-gray-600">Matches</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default OtherComponentsAbove