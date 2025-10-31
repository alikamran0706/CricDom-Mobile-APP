import Card from "@/components/community/Card";
import Header from "@/components/community/Header";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Tabs from "@/components/ui/Tabs";
import { useGetCommunitiesQuery } from "@/store/features/community/communityApi";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PAGE_SIZE = 10;

const ScorersScreen = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState("Pakistan"); 
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    'filters[community_type][$eq]': 'scorer',
  });

  const [page, setPage] = useState(1);
  const [communityList, setCommunityList] = useState<any[]>([]); // 🟢 Local state for cumulative data

  const {
    data: communities,
    isLoading,
    isFetching,
    refetch,
  } = useGetCommunitiesQuery({ page, pageSize: PAGE_SIZE, filters });

  const total = communities?.meta?.pagination?.total || 0;
  const hasMore = communityList.length < total;

  // 🟢 Merge fetched data when `communities` changes
  useEffect(() => {
    if (communities?.data) {
      setCommunityList((prev) => {
        // Avoid duplicates if the same page is fetched again
        const newItems = communities.data.filter(
          (item: any) => !prev.some((p) => p.id === item.id)
        );
        return [...prev, ...newItems];
      });
    }
  }, [communities]);

  // 🟢 Reset list when refreshing
  useEffect(() => {
    if (params?.refetch === "true") {
      setPage(1);
      setCommunityList([]);
      refetch();
      router.setParams({ refetch: undefined });
    }
  }, [params?.refetch]);

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const tabs = ["Cricket", "Test Match", "The Hundred", "Pair Cricket"];

  const renderScorerCard = ({ item }: { item: any }) => {
    const points =
      (item.matches?.length || 0) * 10 +
      (item.error_free_matches || 0) * 5 +
      (item.live_matches || 0) * 2 +
      (item.fullyScoredMatches || 0) * 3;

    return (
      <Pressable onPress={() => router.push(`/player/${item.id}?community=scorer`)}>
        <Card
          name={item.name}
          matches={item.matches?.length}
          points={points}
          rank={item.rank}
          dailyRate={item.per_day_fees}
          matchRate={item.per_match_fees}
          image={item.photo?.formats?.thumbnail?.url}
          link={"/"}
        />
      </Pressable>
    );
  };

  const HeaderComponent = () => {
    return (
      <View>
        {/* Country Selection */}
        <View className="bg-white px-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-800">
              Top Scorers of <Text className="text-[#0e7ccb]">{selectedCountry}</Text> - All
            </Text>
            <TouchableOpacity className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name="information-circle-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Tabs */}
        <Tabs tabs={tabs} activeTab="Cricket" />
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1">
        <Header heading="Scorers" />
        <FlatList
          data={communityList}
          renderItem={renderScorerCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={
            hasMore && !isLoading ? (
              <ActivityIndicator size="small" className="mt-4 mb-6" />
            ) : null
          }
        />
        <FloatingActionButton
          label="REGISTER"
          onPress={() => router.push("/create-scorer")}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScorersScreen;
