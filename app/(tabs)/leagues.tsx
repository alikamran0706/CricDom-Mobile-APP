import { Feather, FontAwesome5 } from '@expo/vector-icons'; // Expo Vector Icons (Feather set)
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGetLeaguesQuery } from '@/store/features/league/leagueApi';
import { router, useLocalSearchParams } from 'expo-router';

const PAGE_SIZE = 10;

export default function LeaguesScreen() {
    const [page, setPage] = useState(1);
    const params = useLocalSearchParams();

    const {
        data: leagues,
        isLoading,
        isFetching,
        refetch,
    } = useGetLeaguesQuery({ page, pageSize: PAGE_SIZE });

    const leagueList = leagues?.data || [];
    const total = leagues?.meta?.pagination?.total || 0;
    const hasMore = leagueList.length < total;

    useEffect(() => {
        if (params?.refetch === 'true') {
            refetch();
            router.setParams({ refetch: undefined });
        }
    }, [params?.refetch]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ongoing':
                return 'bg-green-500';
            case 'completed':
                return 'bg-gray-500';
            default:
                return 'bg-blue-500';
        }
    };

    const handleLoadMore = () => {
        if (!isFetching && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    const renderLeagueItem = ({ item: league }: any) => (
        <TouchableOpacity
            key={league.id}
            onPress={() => router.push(`/league-detail/${league.documentId}`)}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4"
        >
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-900">{league.name}</Text>
                    {league.description && (
                        <Text className="text-gray-600 mt-1">{league.description}</Text>
                    )}
                </View>
                <View className={`px-2 py-1 rounded-full ${getStatusColor(league.status_type)}`}>
                    <Text className="text-white text-xs font-semibold uppercase">
                        {league.status_type}
                    </Text>
                </View>
            </View>

            <View className="flex-row items-center">
                <Feather name="calendar" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2 text-sm">
                    {league.start_date ? new Date(league.start_date).toLocaleDateString() : ''} -{' '}
                    {league.end_date ? new Date(league.end_date).toLocaleDateString() : ''}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const ListHeader = () => (
        <View className="flex items-center flex-wrap gap-4 mb-6">
            <View className="flex-row items-center mb-3">
                <FontAwesome5 name="trophy" size={24} color="#3B82F6" />
                <Text className="text-2xl font-bold text-gray-900 ml-2">Leagues</Text>
            </View>

            <View className="flex-row">
                <TouchableOpacity
                    onPress={() => router.push('/create-league')}
                    className="bg-green-500 p-2 rounded-lg flex-row items-center mr-2"
                >
                    <Feather name="plus-circle" size={18} color="white" />
                    <Text className="text-white text-xs font-semibold ml-1">Add League</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push('/create-match')}
                    className="bg-blue-500 p-2 rounded-lg flex-row items-center"
                >
                    <Feather name="zap" size={18} color="white" />
                    <Text className="text-white text-xs font-semibold ml-1">Add Match</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <FlatList
                className="p-4"
                data={leagueList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderLeagueItem}
                ListHeaderComponent={ListHeader}
                ListEmptyComponent={
                    !isLoading
                        ? (
                            <View className="bg-white rounded-lg p-8 border border-gray-200">
                                <Text className="text-gray-600 text-center">No leagues found</Text>
                            </View>
                        )
                        : null
                }
                refreshControl={
                    <RefreshControl refreshing={isFetching} onRefresh={refetch} />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    hasMore && !isLoading ? (
                        <ActivityIndicator size="small" className="mt-4 mb-6" />
                    ) : null
                }
            />
        </SafeAreaView>
    );
}
