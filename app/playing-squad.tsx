import Header from "@/components/ui/Header"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Player {
  id: string
  name: string
  avatar: string
  role?: string
}

const players: Player[] = [
  {
    id: "1",
    name: "Ali Kamran",
    avatar: "/cricket-player-portrait.jpg",
    role: "wicket-keeper",
  },
  {
    id: "2",
    name: "Rashid",
    avatar: "/cricket-player-with-helmet.jpg",
    role: "captain",
  },
]

export default function PlayingSquad() {
  const router = useRouter()
  const [activeTeam, setActiveTeam] = useState<"pakistan" | "fitness">("pakistan")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPlayers = players.filter((player) => player.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header heading="Change Playing Squad" />

      {/* Team Tabs */}
      <View className="flex-row bg-red-600">
        <TouchableOpacity
          className={`flex-1 py-3 items-center border-b-2 ${
            activeTeam === "pakistan" ? "border-yellow-400" : "border-transparent"
          }`}
          onPress={() => setActiveTeam("pakistan")}
        >
          <Text className={`font-semibold ${activeTeam === "pakistan" ? "text-white" : "text-red-200"}`}>PAKISTAN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 items-center border-b-2 ${
            activeTeam === "fitness" ? "border-yellow-400" : "border-transparent"
          }`}
          onPress={() => setActiveTeam("fitness")}
        >
          <Text className={`font-semibold ${activeTeam === "fitness" ? "text-white" : "text-red-200"}`}>
            FITNESS TEAM
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-4 py-4">
        {/* Search and Add Player */}
        <View className="flex-row items-center mb-6 space-x-3">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-2 text-gray-800"
              placeholder="Quick Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            className="bg-green-500 px-4 py-2 rounded-lg flex-row items-center"
            onPress={() => {
              // Handle add player
            }}
          >
            <Ionicons name="add" size={20} color="white" />
            <Text className="text-white font-semibold ml-1">ADD PLAYER</Text>
          </TouchableOpacity>
        </View>

        {/* Playing Squad */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Playing Squad</Text>

          <ScrollView className="space-y-3">
            {filteredPlayers.map((player) => (
              <TouchableOpacity
                key={player.id}
                className="flex-row items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                <View className="relative">
                  <Image source={{ uri: player.avatar }} className="w-12 h-12 rounded-full" />
                  {player.role === "wicket-keeper" && (
                    <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full items-center justify-center">
                      <Text className="text-white text-xs font-bold">WK</Text>
                    </View>
                  )}
                  {player.role === "captain" && (
                    <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                      <Text className="text-white text-xs font-bold">C</Text>
                    </View>
                  )}
                </View>
                <Text className="text-gray-800 font-medium ml-4 flex-1">{player.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}
