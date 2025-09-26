import Card from "@/components/community/Card";
import Header from "@/components/community/Header";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Tabs from "@/components/ui/Tabs";
import { scorers } from "@/constants/scorer";
import { Scorer } from "@/lib/types/scorer";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScorersScreen = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const filters = ["Cricket", "Test Match", "The Hundred", "Pair Cricket"]

  const renderScorerCard = ({ item }: { item: Scorer }) => (
    <Pressable onPress={() => router.push(`/player/${item.id}?community=scorer`)}>
      <Card
        name={item.name}
        matches={item.matchesScored}
        points={item.totalPoints}
        rank={item.rank}
        dailyRate={item.dailyRate}
        matchRate={item.matchRate}
        image={item.image}
        link={'/'}
      />
    </Pressable>
  )

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
        <Tabs
          tabs={filters}
          activeTab='Cricket'
        />
      </View>
    )
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1">
        {/* Header */}
        <Header
          heading="Scorers"
        />
        {/* Scorers List */}
        <FlatList
          data={scorers}
          renderItem={renderScorerCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
          ListHeaderComponent={() => (
            <HeaderComponent />
          )}
        />
        {/* Bottom Buttons */}
        <FloatingActionButton
          label="REGISTER"
          onPress={() => router.push('/create-scorer')}
        />
      </View>
    </SafeAreaView>
  )
}

export default ScorersScreen
