import Header from '@/components/ui/Header';
import { useGetLeagueQuery } from '@/store/features/league/leagueApi';
import { useGetMatchesQuery } from '@/store/features/match/matchApi';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MatchCard from '../../components/MatchCard';

export default function LeagueDetailScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    // Changed from leagueId: number to leagueId: string
    const { id } = useLocalSearchParams();
    const leagueStringId = Array.isArray(id) ? id[0] : id;
    const leagueId = id ? Number(id) : undefined;
    // Pass documentId to useLeague hook
    const { data: league, isLoading: leagueLoading, error: leagueError, refetch: refetchLeague } = useGetLeagueQuery(leagueStringId);
    // Matches still use league's internal ID for filtering, so we need to get it from the fetched league data
    const { data: matches, isLoading: matchesLoading, error: matchesError, refetch: refetchMatches } = useGetMatchesQuery({
        leagueId: leagueId,
    });

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleRefresh = () => {
        refetchLeague();
        refetchMatches();
    };

    if (leagueError || matchesError) {
        return (
            <Text>Failed to load league details</Text>
        );
    }

    const leagueData = league?.data;
    if (!leagueData) return null;

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <Header heading='League' />

            {
                leagueLoading ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                ) : leagueError ? (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-red-500">Failed to load league.</Text>
                    </View>
                ) :
                    (
                        <ScrollView
                            className="flex-1"
                            contentContainerStyle={{ paddingBottom: 70 }}
                            refreshControl={
                                <RefreshControl refreshing={false} onRefresh={handleRefresh} />
                            }
                        >
                            <View className="p-4">
                                {/* League Info */}
                                <View className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                                    <Text className="text-2xl font-bold text-gray-900 mb-2">{leagueData?.name}</Text>
                                    {leagueData?.description && (
                                        <Text className="text-gray-600 mb-3">{leagueData.description}</Text>
                                    )}
                                    <View className="flex-row justify-between">
                                        <View>
                                            <Text className="text-sm text-gray-500">Start Date</Text>
                                            <Text className="font-semibold">{leagueData?.start_date ? new Date(leagueData?.start_date).toLocaleDateString() : 'N/A'}</Text>
                                        </View>
                                        <View>
                                            <Text className="text-sm text-gray-500">End Date</Text>
                                            <Text className="font-semibold">{leagueData?.end_date ? new Date(leagueData?.end_date).toLocaleDateString() : 'N/A'}</Text>
                                        </View>
                                        <View>
                                            <Text className="text-sm text-gray-500">Status</Text>
                                            <Text className="font-semibold capitalize">{leagueData?.status_type}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Matches */}

                                {
                                    matchesLoading ? (
                                        <View className="flex-1 items-center justify-center">
                                            <ActivityIndicator size="large" color="#000" />
                                        </View>
                                    ) : matchesError ? (
                                        <View className="flex-1 items-center justify-center">
                                            <Text className="text-red-500">Failed to load match.</Text>
                                        </View>
                                    ) :
                                        (
                                            <View>
                                                <Text className="text-lg font-semibold text-gray-900 mb-3">Matches</Text>
                                                {matches?.data.map((match: any) => (
                                                    <MatchCard
                                                        key={match.id}
                                                        match={match}
                                                        onPress={() => {
                                                            //   if (match.status_type === 'live') { // Direct access, no .attributes
                                                            //     navigation.navigate('LiveScoring', { matchId: match.documentId });
                                                            //   } else {
                                                            //     navigation.navigate('MatchDetail', { matchId: match.documentId });
                                                            //   }
                                                        }}
                                                    />
                                                ))}

                                                {matches?.data.length === 0 && (
                                                    <View className="bg-white rounded-lg p-8 border border-gray-200">
                                                        <Text className="text-gray-600 text-center">No matches found for this league</Text>
                                                    </View>
                                                )}
                                            </View>
                                        )
                                }
                            </View>
                        </ScrollView>
                    )
            }
        </SafeAreaView>
    );
}
