import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Scorer {
  id: string
  name: string
  image: string
  matchesScored: number
  totalPoints: number
  dailyRate: number
  matchRate: number
  ranking: number
  location: string
}

const ScorersScreen = () => {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState("The Hundred")
  const [selectedCountry, setSelectedCountry] = useState("Pakistan")

  const filters = ["Cricket", "Test Match", "The Hundred", "Pair Cricket"]

  const scorers: Scorer[] = [
    {
      id: "1",
      name: "Waqar Younus",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      matchesScored: 9,
      totalPoints: 2484,
      dailyRate: 1000,
      matchRate: 800,
      ranking: 1,
      location: "Karachi",
    },
    {
      id: "2",
      name: "Saleem Khan",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
      matchesScored: 8,
      totalPoints: 2081,
      dailyRate: 1600,
      matchRate: 800,
      ranking: 2,
      location: "Lahore",
    },
    {
      id: "3",
      name: "Muhammad Aamir",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
      matchesScored: 7,
      totalPoints: 1377,
      dailyRate: 2500,
      matchRate: 1000,
      ranking: 3,
      location: "Islamabad",
    },
  ]

  const getRankingColor = (ranking: number) => {
    switch (ranking) {
      case 1:
        return "#FFD700"
      case 2:
        return "#FFA500"
      case 3:
        return "#CD7F32"
      default:
        return "#666"
    }
  }

  const renderScorerCard = ({ item }: { item: Scorer }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 mb-4 mx-4 shadow-sm border border-gray-100"
    //   onPress={() => router.push(`/scorer/${item.id}`)}
    >
      <View className="flex-row items-center">
        <Image source={{ uri: item.image }} className="w-16 h-16 rounded-2xl mr-4" />

        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800 mb-1">{item.name}</Text>
          <Text className="text-sm text-gray-600 mb-2">Matches Scored: {item.matchesScored}</Text>
          <Text className="text-sm text-gray-800">
            Total Points = <Text className="text-green-600 font-semibold">{item.totalPoints}</Text>
          </Text>
        </View>

        <View className="items-center">
          <Text className="text-4xl font-bold mb-2" style={{ color: getRankingColor(item.ranking) }}>
            {item.ranking}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <Text className="text-gray-600">
          ₹{item.dailyRate}/day, {item.matchRate}/match
        </Text>
        <TouchableOpacity className="bg-green-500 rounded-full p-2">
          <Ionicons name="chatbubble" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-red-600 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Scorers</Text>
          <View className="flex-row">
            <TouchableOpacity className="mr-4">
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="mr-4">
              <Ionicons name="share" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="relative">
              <Ionicons name="funnel" size={24} color="white" />
              <View className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full items-center justify-center">
                <Text className="text-xs font-bold text-gray-800">1</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Country Selection */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-800">
            Top Scorers of <Text className="text-green-600">{selectedCountry}</Text> - All
          </Text>
          <TouchableOpacity className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
            <Ionicons name="information-circle-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white px-4 py-3 border-b border-gray-200"
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            className={`px-4 py-2 rounded-full mr-3 border ${
              activeFilter === filter ? "bg-green-500 border-green-500" : "bg-transparent border-green-500"
            }`}
            onPress={() => setActiveFilter(filter)}
          >
            <Text className={`font-medium ${activeFilter === filter ? "text-white" : "text-green-600"}`}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Scorers List */}
      <FlatList
        data={scorers}
        renderItem={renderScorerCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      {/* Bottom Buttons */}
      <View className="flex-row bg-white border-t border-gray-200 p-4">
        <TouchableOpacity className="flex-1 bg-gray-200 rounded-xl py-4 mr-2">
          <Text className="text-center text-gray-700 font-semibold">VIEW ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-green-500 rounded-xl py-4 ml-2">
          <Text className="text-center text-white font-semibold">REGISTER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ScorersScreen
