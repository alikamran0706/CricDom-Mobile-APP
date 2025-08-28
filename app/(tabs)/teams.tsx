import AvatarImage from "@/components/AvatarImage";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { useGetTeamsQuery } from "@/store/features/team/teamApi";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TeamsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const params = useLocalSearchParams();
  const pageSize = 10;

  const { data, isLoading, isFetching, isError, refetch } = useGetTeamsQuery({
    page,
    pageSize,
  });
  const teams = data?.data || [];
  const meta = data?.meta?.pagination || { pageCount: 1 };

  // Filtered teams based on search
  const filteredTeams = teams.filter((team: any) =>
    team?.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Handle load more
  const loadMore = () => {
    if (!isFetching && page < meta.pageCount) {
      setPage((prev) => prev + 1);
    }
  };

  // Pull-to-refresh
  const onRefresh = async () => {
    setIsRefreshing(true);
    setPage(1);
    await refetch();
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (params?.refetch === 'true') {
      refetch();
      router.setParams({ refetch: undefined });
    }
  }, [params?.refetch]);

  // Render each team
  const renderTeam = ({ item }: any) => {
    const { name, color, players, image } = item;
    const playerCount = players?.length;
    const imageUrl = image?.formats?.thumbnail?.url || null;

    return (
      <TouchableOpacity
        className="flex-row items-center bg-white border border-gray-200 rounded-lg p-4 mb-3"
        onPress={() => router.push(`/team/${item.documentId}`)}
      >
        {
          imageUrl ? (
            <AvatarImage
              uri={imageUrl}
              size={42}
              borderRadius={8}
              rounded={false}
              extraStyle={{marginRight: 12,}}
            />
          )
            :
            <View
              className="w-12 h-12 rounded-lg items-center justify-center mr-4"
              style={{ backgroundColor: color || "#000" }}
            >
              <Ionicons name="people" size={24} color="white" />
            </View>
        }
        <View className="flex-1">
          <Text className="text-lg font-semibold text-black">{name}</Text>
          <Text className="text-gray-600">
            {playerCount ?? 0} players
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold ml-4 text-black">Teams</Text>
      </View>

      {/* Search */}
      <View className="px-4 py-3">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-800"
            placeholder="Search teams..."
            placeholderTextColor="#808080"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* List */}
      <View style={{paddingBottom: 200}}>

        {isLoading && page === 1 ? (
          <View className="flex-1 items-center justify-center py-6">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : isError ? (
          <View className="flex-1 items-center justify-center py-6">
            <Text className="text-red-500">Failed to load matches.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredTeams}
            keyExtractor={(item) => item.documentId.toString()}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
            renderItem={renderTeam}
            // ListHeaderComponent={
            //   <Text className="text-lg font-semibold mb-4">My Teams</Text>
            // }
            ListEmptyComponent={
              !isLoading ? (
                <View className="items-center py-12">
                  <Ionicons name="search" size={48} color="#D1D5DB" />
                  <Text className="text-gray-500 mt-2">No teams found</Text>
                </View>
              ) : null
            }
            ListFooterComponent={
              isFetching && page > 1 ? (
                <View className="py-4">
                  <ActivityIndicator size="small" color="#000" />
                </View>
              ) : null
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>

      {/* Floating Create Team Button */}
      <FloatingActionButton
        label="Create Team"
        iconName="add"
        onPress={() => router.push("/create-team")}
      />
    </SafeAreaView>
  );
}
