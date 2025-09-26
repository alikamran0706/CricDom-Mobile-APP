import Header from "@/components/ui/Header"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const penaltyReasons = [
  "Deliberate short run",
  "Time wasting by batting side",
  "Damaging the pitch by batting side",
  "Practice on the field by batting side",
  "Batter unfair stealing a run",
  "Unfair Actions",
  "Striker in protected area",
]

export default function PenaltyRuns() {
  const router = useRouter()
  const [selectedTeam, setSelectedTeam] = useState<"pakistan" | "fitness" | null>("pakistan")
  const [penaltyRuns, setPenaltyRuns] = useState(0)
  const [selectedReasons, setSelectedReasons] = useState<string[]>(["Time wasting by batting side"])

  const handleRunsSelection = (runs: number) => {
    setPenaltyRuns(runs)
  }

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]))
  }

  const getRevisedScore = () => {
    const baseScore = selectedTeam === "fitness" ? 0 : 3
    return baseScore + penaltyRuns
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header heading="Penalty Runs" />

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Team Selection */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Select team which is facing penalty</Text>

          <View className="space-y-3">
            <Pressable
              className={`flex-row items-center p-4 rounded-xl ${
                selectedTeam === "pakistan" ? "bg-green-50 border-2 border-green-500" : "bg-gray-50"
              }`}
              onPress={() => setSelectedTeam("pakistan")}
            >
              <View
                className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                  selectedTeam === "pakistan" ? "border-green-500 bg-green-500" : "border-gray-300"
                }`}
              >
                {selectedTeam === "pakistan" && <View className="w-3 h-3 rounded-full bg-white" />}
              </View>
              <Text className="text-gray-800 font-medium">Pakistan(Batting)</Text>
            </Pressable>

            <Pressable
              className={`flex-row items-center p-4 rounded-xl ${
                selectedTeam === "fitness" ? "bg-green-50 border-2 border-green-500" : "bg-gray-50"
              }`}
              onPress={() => setSelectedTeam("fitness")}
            >
              <View
                className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                  selectedTeam === "fitness" ? "border-green-500 bg-green-500" : "border-gray-300"
                }`}
              >
                {selectedTeam === "fitness" && <View className="w-3 h-3 rounded-full bg-white" />}
              </View>
              <Text className="text-gray-800 font-medium">Fitness Team(Bowling)</Text>
            </Pressable>
          </View>
        </View>

        {/* Penalty Runs Selection */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">How many penalty runs?</Text>

          <View className="flex-row flex-wrap gap-3">
            {[1, 2, 3, 4, 5].map((runs) => (
              <TouchableOpacity
                key={runs}
                className={`w-16 h-16 rounded-xl items-center justify-center border-2 ${
                  penaltyRuns === runs ? "bg-green-500 border-green-500" : "bg-white border-green-200"
                }`}
                onPress={() => handleRunsSelection(runs)}
              >
                <Text className={`text-xl font-bold ${penaltyRuns === runs ? "text-white" : "text-green-600"}`}>
                  {runs}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity className="w-16 h-16 rounded-xl items-center justify-center border-2 border-green-200 bg-white">
              <Text className="text-xl font-bold text-green-600">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Revised Score */}
        <View className="mb-6 p-4 bg-gray-50 rounded-xl">
          <Text className="text-base text-gray-700">
            Revised score of{" "}
            <Text className="text-green-600 font-semibold">
              {selectedTeam === "pakistan" ? "Pakistan" : "Fitness Team"}
            </Text>{" "}
            will be <Text className="text-green-600 font-bold text-xl">{getRevisedScore()}</Text>
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            Calculation: ({selectedTeam === "fitness" ? "0" : "3"}+{penaltyRuns})
          </Text>
        </View>

        {/* Penalty Reasons */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Select reason for Penalty</Text>

          <View className="space-y-3">
            {penaltyReasons.map((reason) => (
              <TouchableOpacity
                key={reason}
                className={`flex-row items-center justify-between p-4 rounded-xl ${
                  selectedReasons.includes(reason)
                    ? "bg-green-50 border-2 border-green-500"
                    : "bg-gray-50 border border-gray-200"
                }`}
                onPress={() => toggleReason(reason)}
              >
                <Text className="text-gray-800 font-medium flex-1">{reason}</Text>
                <View
                  className={`w-6 h-6 rounded-full items-center justify-center ${
                    selectedReasons.includes(reason) ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  {selectedReasons.includes(reason) && <Ionicons name="checkmark" size={16} color="white" />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="absolute bottom-0 left-0 right-0 flex-row bg-white border-t border-gray-200">
        <TouchableOpacity className="flex-1 py-4 items-center justify-center bg-gray-100" onPress={() => router.back()}>
          <Text className="text-gray-600 font-semibold text-lg">CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 py-4 items-center justify-center bg-green-500"
          onPress={() => {
            // Handle penalty runs submission
            router.back()
          }}
        >
          <Text className="text-white font-semibold text-lg">OK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
