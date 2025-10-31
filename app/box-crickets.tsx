import CardWithRating from "@/components/community/CardWithRating";
import Header from "@/components/community/Header";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Tabs from "@/components/ui/Tabs";
import { useGetCommunitiesQuery } from "@/store/features/community/communityApi";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = ["Limited Overs", "Box/Turf Cricket", "Test Match", "T20"];
const PAGE_SIZE = 10;

const BoxCricketScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    "filters[community_type][$eq]": "boxcricket",
  });

  const [page, setPage] = useState(1);
  const [communityList, setCommunityList] = useState<any[]>([]); 
  const [refreshing, setRefreshing] = useState(false); 

  const {
    data: communities,
    isLoading,
    isFetching,
    refetch,
  } = useGetCommunitiesQuery({ page, pageSize: PAGE_SIZE, filters });

  const total = communities?.meta?.pagination?.total || 0;
  const hasMore = communityList.length < total;

  // 🟢 Merge pages cumulatively while avoiding duplicates
  useEffect(() => {
    if (communities?.data) {
      setCommunityList((prev) => {
        const newItems = communities.data.filter(
          (item: any) => !prev.some((p) => p.id === item.id)
        );
        return [...prev, ...newItems];
      });
    }
  }, [communities]);

  // 🟢 Handle re-fetch triggered externally (via params)
  useEffect(() => {
    if (params?.refetch === "true") {
      setPage(1);
      setCommunityList([]);
      refetch();
      router.setParams({ refetch: undefined });
    }
  }, [params?.refetch]);

  // 🟢 Load more when reaching end of list
  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  // 🟢 Pull-to-refresh functionality
  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setCommunityList([]);
    await refetch();
    setRefreshing(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // 🟢 Card Renderer
  const renderCard = ({ item }: any) => (
    <CardWithRating
      key={item.id}
      id={item.id}
      title={item.name}
      subTitle={item.description}
      image={item.photo?.formats?.thumbnail?.url}
      rating={(item.ratings?.length || 0) / 5}
      reviews={item.ratings?.length || 0}
    />
  );

  // 🟢 Header Section (country + tabs)
  const HeaderComponent = () => (
    <View>
      {/* Country Selection */}
      <View className="bg-white px-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-800">
            Nearby <Text className="text-[#0e7ccb]">{selectedCountry}</Text> - All
          </Text>
          <TouchableOpacity className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
            <Ionicons name="swap-vertical" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab="Limited Overs" />
    </View>
  );

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1">
        {/* Header */}
        <Header heading={`Box Cricket & Nets (${communityList.length})`} />

        {/* Community List */}
        <FlatList
          data={communityList}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={
            hasMore && !isLoading ? (
              <ActivityIndicator size="small" className="mt-4 mb-6" />
            ) : null
          }
          ListEmptyComponent={
            !isLoading ? (
              <Text className="text-center text-gray-500 mt-10">
                No box cricket listings found.
              </Text>
            ) : null
          }
        />

        {/* Floating Button */}
        <FloatingActionButton
          label="REGISTER"
          onPress={() => router.push("/create-box-cricket")}
        />
      </View>
    </SafeAreaView>
  );
};

export default BoxCricketScreen;
