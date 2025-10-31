import Header from "@/components/community/Header";
import { extractDateTimePart } from "@/lib/utils/common";
import { useGetLookingForsQuery } from "@/store/features/lookingFor/lookingForApi";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LookingForPost {
    id: string;
    userName: string;
    userImage: string;
    lookingFor: string;
    role: string;
    details: string[];
    timeAgo: string;
    distance: string;
    ball_type: any;
    date_time: string;
    player: any;
    description: string;
    address: string;
    city: string;
}

const posts = [
    {
        id: "1",
        userName: "Talha Rajput",
        userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
        lookingFor: "Team to join as a Batter",
        role: "Batter",
        details: ["OPEN GROUND"],
        timeAgo: "3 days ago",
        distance: "-- KM",
        ballType: "leather",
    },
    {
        id: "2",
        userName: "Muhammad Hanzallah",
        userImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
        lookingFor: "Scorer for Tournament",
        role: "Scorer",
        details: ["Sun, Oct 05 2025", "Tournament"],
        timeAgo: "5 days ago",
        distance: "-- KM",
        ballType: "tennis",
    },
    {
        id: "3",
        userName: "Muhammad Hanzallah",
        userImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
        lookingFor: "Team for their Tournament",
        role: "Organizer",
        details: ["Sun, Oct 05 2025", "Open Ground", "Weekend"],
        timeAgo: "6 days ago",
        distance: "-- KM",
        ballType: "tennis",
    },
];

const tabs = [
    "ground",
    "umpire",
    "scorer",
    "commentator",
    "team",
    "player",
    "opponent",
];
const PAGE_SIZE = 10;

const LookingForListScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();

    const [activeFilter, setActiveFilter] = useState("ground");
    const [page, setPage] = useState(1);
    const [lookingFors, setLookingFors] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const {
        data: response,
        isLoading,
        isFetching,
        refetch,
    } = useGetLookingForsQuery({
        page,
        pageSize: PAGE_SIZE,
        filters: { "filters[looking_for_type][$eq]": activeFilter },
    });

    const total = response?.meta?.pagination?.total || 0;
    const hasMore = lookingFors.length < total;

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    // 🟢 Append new data when fetched

    useEffect(() => {
        if (response?.data) {
            setLookingFors((prev) => {
                const newItems = response.data.filter(
                    (item: any) => !prev.some((p) => p.id === item.id)
                );
                return page === 1 ? newItems : [...prev, ...newItems];
            });
        }
    }, [response]);

    // 🟢 Handle Filter Change
    useEffect(() => {
        setPage(1);
        setLookingFors([]);
        refetch();
    }, [activeFilter]);

    // 🟢 Infinite Scroll
    const handleLoadMore = () => {
        if (!isFetching && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    // 🟢 Pull-to-Refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        setPage(1);
        setLookingFors([]);
        await refetch();
        setRefreshing(false);
    };

    const getBorderColor = (index: number) => {
        const colors = ["border-l-yellow-400", "border-l-orange-400", "border-l-red-400"];
        return colors[index % colors.length];
    };

    const renderPostCard = ({
        item,
        index,
    }: {
        item: LookingForPost;
        index: number;
    }) => (
        <TouchableOpacity
            className={`bg-white rounded-2xl p-4 mb-4 mx-4 shadow-sm border-l-4 ${getBorderColor(
                index
            )}`}
        >
            <View className="flex-row items-start justify-between mb-3">
                <View className="flex-row items-center flex-1">
                    {/* <Image
            source={{ uri: item.userImage }}
            className="w-12 h-12 rounded-full mr-3"
          /> */}
                    <View className="flex-1">
                        <Text className="text-base font-semibold text-gray-800">
                            Ali is looking for a {activeFilter}.
                        </Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Ionicons name="share" size={20} color="#0e7ccb" />
                </TouchableOpacity>
            </View>

            <View className="ml-15 space-y-1 mb-4">
                <View className="flex-row items-center">
                    <View className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2" />
                    <Text className="text-gray-700 font-medium">{item.description}</Text>
                </View>
            </View>

            <View className="flex-row items-center justify-between">
                <View>
                    <View className="flex-row items-center">
                        <View
                            className={`w-4 h-4 rounded-full mr-2 ${item.ball_type?.ball === "tennis" ? "bg-[#0e7ccb]" : "bg-red-500"
                                }`}
                        />
                        <Ionicons name="location-outline" size={16} color="#10b981" />
                        <Text className="text-gray-500 text-sm ml-1">{item.address} {item.city}</Text>
                    </View>
                    <Text className="text-gray-500 text-sm mr-4">{extractDateTimePart(item.date_time)}</Text>
                </View>
                <TouchableOpacity
                    className="bg-[#0e7ccb] px-4 py-2 rounded-full"
                    onPress={() => router.push("/message")}
                >
                    <Text className="text-white font-semibold text-sm">CONTACT</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <Header heading="Looking For" />

            {/* Section Header */}
            <View className="bg-white px-4 py-4">
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-semibold text-gray-800 capitalize">
                        Looking for <Text className="text-[#0e7ccb]">{activeFilter}?</Text>
                    </Text>
                    <View className="flex-row">
                        <TouchableOpacity
                            className="bg-[#0e7ccb] px-4 py-2 rounded-full mr-2"
                            onPress={() => router.push(`/looking-for`)}
                        >
                            <View className="flex-row items-center">
                                <Ionicons name="add" size={16} color="white" />
                                <Text className="text-white font-semibold ml-1">Post</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#0e7ccb] px-4 py-2 rounded-full">
                            <View className="flex-row items-center">
                                <Ionicons name="person" size={16} color="white" />
                                <Text className="text-white font-semibold ml-1">You</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Filter Tabs */}
            <View className="mx-4 mt-6">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mb-4"
                >
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            className={`px-4 py-2 rounded-full mr-3 ${activeFilter === tab ? "bg-[#0e7ccb]" : "bg-gray-200"
                                }`}
                            onPress={() => setActiveFilter(tab)}
                        >
                            <Text
                                className={`font-medium capitalize ${activeFilter === tab
                                        ? "text-white"
                                        : "text-gray-700"
                                    }`}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Posts List */}
            <FlatList
                data={lookingFors.length > 0 ? lookingFors : []}
                renderItem={renderPostCard}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
                ListFooterComponent={
                    hasMore && !isLoading ? (
                        <ActivityIndicator size="small" className="mt-4 mb-6" />
                    ) : null
                }
                ListEmptyComponent={
                    !isLoading ? (
                        <Text className="text-center text-gray-500 mt-10">
                            No posts found.
                        </Text>
                    ) : null
                }
                contentContainerStyle={{ paddingVertical: 8 }}
            />
        </SafeAreaView>
    );
};

export default LookingForListScreen;
