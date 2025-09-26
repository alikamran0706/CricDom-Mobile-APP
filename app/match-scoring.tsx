import AddPlayersModal from "@/components/Modal/AddPlayersModal"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function MatchScoring() {
  const router = useRouter()
  const [showChangePlayerModal, setShowChangePlayerModal] = useState(false)

  // Mock match data
  const matchData = {
    teamA: { name: "Pakistan", score: 3, wickets: 0, overs: "0.2/20" },
    teamB: { name: "Fitness Team", score: 0, wickets: 0, overs: "0/20" },
    currentBatsmen: ["Rashid", "Ali Kamran"],
    bowler: "Current Bowler",
    matchStatus: "Pakistan won the toss and elected to bat",
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Match Header */}
      <LinearGradient colors={["#1a1a1a", "#2a2a2a"]} className="px-4 py-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-white text-lg">←</Text>
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">Pakistan</Text>
          <View className="flex-row space-x-2">
            <TouchableOpacity>
              <Text className="text-white text-lg">↗</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-white text-lg">⚙</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Score Display */}
        <View className="items-center mb-4">
          <View className="bg-green-600 rounded-full w-16 h-16 items-center justify-center mb-2">
            <Text className="text-white font-bold">P1</Text>
          </View>
          <Text className="text-white text-4xl font-bold">3/0</Text>
          <Text className="text-gray-300 text-sm">(0.2/20)</Text>
        </View>

        <Text className="text-center text-gray-300 text-sm">{matchData.matchStatus}</Text>
      </LinearGradient>

      {/* Scoring Interface */}
      <View className="flex-1 bg-gray-900">
        {/* Current Players */}
        <View className="flex-row justify-between px-4 py-4 bg-gray-800">
          <TouchableOpacity className="flex-1 items-center" onPress={() => setShowChangePlayerModal(true)}>
            <Text className="text-white font-semibold">Rashid</Text>
            <Text className="text-gray-400 text-sm">0* (0)</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center" onPress={() => setShowChangePlayerModal(true)}>
            <Text className="text-white font-semibold">Ali Kamran</Text>
            <Text className="text-gray-400 text-sm">3* (2)</Text>
          </TouchableOpacity>
        </View>

        {/* Scoring Buttons */}
        <ScrollView className="flex-1 px-4 py-6">
          {/* Run Buttons */}
          <View className="flex-row justify-between mb-6">
            {[0, 1, 2, 3, 4, 6].map((runs) => (
              <TouchableOpacity
                key={runs}
                className={`w-12 h-12 rounded-full items-center justify-center ${
                  runs === 0 ? "bg-gray-600" : runs === 4 ? "bg-green-600" : runs === 6 ? "bg-red-600" : "bg-blue-600"
                }`}
              >
                <Text className="text-white font-bold text-lg">{runs}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Extras */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="bg-yellow-600 px-4 py-2 rounded">
              <Text className="text-white font-semibold">WD</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-yellow-600 px-4 py-2 rounded">
              <Text className="text-white font-semibold">NB</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-yellow-600 px-4 py-2 rounded">
              <Text className="text-white font-semibold">BYE</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-yellow-600 px-4 py-2 rounded">
              <Text className="text-white font-semibold">LB</Text>
            </TouchableOpacity>
          </View>

          {/* Wicket Button */}
          <TouchableOpacity className="bg-red-600 py-4 rounded-lg mb-4">
            <Text className="text-white font-bold text-center text-lg">OUT</Text>
          </TouchableOpacity>

          {/* Quick Actions */}
          <View className="space-y-2">
            <TouchableOpacity className="bg-gray-700 py-3 rounded-lg" onPress={() => router.push("/penalty-runs")}>
              <Text className="text-white text-center font-medium">Penalty Runs</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-700 py-3 rounded-lg" onPress={() => router.push("/bonus-runs")}>
              <Text className="text-white text-center font-medium">Bonus Runs</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Info */}
        <View className="bg-green-600 px-4 py-2">
          <Text className="text-white text-center font-medium">Scoring Shortcuts: Swipe left for Undo</Text>
        </View>
      </View>

      {/* Change Player Modal */}
      <AddPlayersModal
        visible={showChangePlayerModal}
        onClose={() => setShowChangePlayerModal(false)}
        onAddPlayers={(player: any) => {
          console.log("Selected player:", player)
        }}
      />
    </SafeAreaView>
  )
}
