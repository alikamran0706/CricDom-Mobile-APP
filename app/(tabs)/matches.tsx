import Tabs from "@/components/ui/Tabs"
import { useGetMatchesQuery } from "@/store/features/match/matchApi"
import { Ionicons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


type TabType = "Upcoming" | "past" | "today"

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Completed':
      return { backgroundColor: '#D1FAE5', color: '#065F46' };
    case 'Live':
      return { backgroundColor: '#FEE2E2', color: '#991B1B' };
    case 'Upcoming':
      return { backgroundColor: '#DBEAFE', color: '#1E40AF' };
    default:
      return { backgroundColor: '#F3F4F6', color: '#374151' };
  }
};


export default function MatchesScreen() {
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("Upcoming")
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetMatchesQuery({
    page,
    pageSize,
  });

  // const filteredMatches = matchesData.filter((match) => match.status === activeTab)

  const matches = data?.data || [];
  const meta = data?.meta?.pagination || {};

  // Filter matches by active tab (status)
  const filteredMatches = matches.filter(
    (match: any) => match?.status_type === activeTab
  );

  const loadMore = () => {
    if (!isFetching && page < meta.pageCount) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (params?.refetch === 'true') {
      refetch();
      router.setParams({ refetch: undefined });
    }
  }, [params?.refetch]);

  const tabs = ['Upcoming', 'Past', 'Today'];

  const renderMatchItem = ({ item: match }: any) => {
    const tournamentName = match?.description || "Cricket Match";
    const tournamentDivision = match?.tournament_division || "";
    const teamA = match?.team_a?.name || "Team A";
    const teamB = match?.team_b?.name || "Team B";
    const date = match?.date || "TBD";
    const time = match?.time || "";
    const venue = match?.location?.address || "Venue TBD";
    const status = match?.status_type || "Upcoming";
    const matchType = match?.game_format || "T20";
    const result = match?.result || "";

    // Team scores with proper formatting
    const teamAScore = match?.team_a?.score
      ? `${match.team_a.score}${match.team_a.wickets ? `/${match.team_a.wickets}` : ''} ${match.team_a.overs ? `(${match.team_a.overs} OV)` : ''}`
      : `0/0 (${match.overs_limit || 0}.0 OV)`;

    const teamBScore = match?.team_b?.score
      ? `${match.team_b.score}${match.team_b.wickets ? `/${match.team_b.wickets}` : ''} ${match.team_b.overs ? `(${match.team_b.overs} OV)` : ''}`
      : `0/0 (${match.overs_limit || 0}.0 OV)`;

    const statusStyle = getStatusStyle(status);
    return (
      <TouchableOpacity
        className="bg-white rounded-2xl border border-gray-100 p-4 mb-3 shadow-sm"
        onPress={() => router.push(`/match/${match.documentId}`)}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        {/* Tournament Header */}
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-base font-bold text-black mb-1">
              {tournamentName}
            </Text>
            {tournamentDivision && (
              <Text className="text-sm font-medium text-black">
                {tournamentDivision}
              </Text>
            )}
          </View>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: statusStyle.backgroundColor }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: statusStyle.color }}
            >
              {status}
            </Text>
          </View>
        </View>

        {/* Date and Venue */}
        <View className="flex-row items-center mb-4">
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text className="text-sm text-gray-600 ml-2">
            {date} {time && `• ${time}`} {venue && `• ${venue}`}
          </Text>
        </View>

        {/* Teams and Scores */}
        <View className="gap-y-3 mb-4">
          {/* Team A */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              {match?.team_a?.logo ? (
                <Image
                  source={{ uri: match.team_a.logo }}
                  className="w-8 h-8 rounded-full mr-3"
                />
              ) : (
                <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-3">
                  <Text className="text-blue-600 font-bold text-xs">
                    {teamA.charAt(0)}
                  </Text>
                </View>
              )}
              <Text className="text-base font-semibold text-gray-900 flex-1">
                {teamA}
              </Text>
            </View>
            <Text className="text-lg font-bold text-gray-900">
              {teamAScore}
            </Text>
          </View>

          {/* Team B */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              {match?.team_b?.logo ? (
                <Image
                  source={{ uri: match.team_b.logo }}
                  className="w-8 h-8 rounded-full mr-3"
                />
              ) : (
                <View className="w-8 h-8 rounded-full bg-red-100 items-center justify-center mr-3">
                  <Text className="text-red-600 font-bold text-xs">
                    {teamB.charAt(0)}
                  </Text>
                </View>
              )}
              <Text className="text-base font-semibold text-gray-900 flex-1">
                {teamB}
              </Text>
            </View>
            <Text className="text-lg font-bold text-gray-900">
              {teamBScore}
            </Text>
          </View>
        </View>

        {/* Match Result and Type */}
        <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
          <Text className="text-sm font-medium text-gray-700 flex-1">
            {result || `${teamA} vs ${teamB}`}
          </Text>
          <View className="bg-gray-100 px-2 py-1 rounded">
            <Text className="text-xs font-semibold text-gray-600">
              {matchType}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-4">
          <Text className="text-xl font-semibold text-black">Matches</Text>
          <TouchableOpacity className="items-center justify-center bg-[#0e7ccb] px-2 py-1 rounded-full" onPress={() => router.push('/create-match')}>
            {/* <Ionicons name="add" size={24} color="#000" /> */}
            <Text className="text-white">Start Match</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          activeTab='Upcoming'
        />

        {/* Active Tab Content */}
        <View className="px-4 pb-6">
          <Text className="text-lg font-semibold capitalize text-black">{activeTab}</Text>

          {/* Match List */}
          {isLoading && page === 1 ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : isError ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-red-500">Failed to load matches.</Text>
            </View>
          ) : (
            <FlatList
              data={filteredMatches}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingVertical: 20, paddingBottom: 80 }}
              renderItem={renderMatchItem}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isFetching && page > 1 ? (
                  <View className="py-4">
                    <ActivityIndicator size="small" color="#000" />
                  </View>
                ) : null
              }
              ListEmptyComponent={
                <View className="items-center justify-center py-12">
                  <Ionicons name="calendar-outline" size={48} color="#D1D5DB" />
                  <Text className="text-gray-500 mt-4">No {activeTab} matches</Text>
                </View>
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}
