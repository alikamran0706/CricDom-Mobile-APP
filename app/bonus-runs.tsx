import Header from "@/components/ui/Header"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Pressable, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function BonusRuns() {
  const router = useRouter()
  const [selectedTeam, setSelectedTeam] = useState<"pakistan" | "fitness" | null>(null)

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header heading="Bonus Runs" />

      <View className="flex-1 px-4 py-6">
        {/* Team Selection */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-6">Select team which is awarded bonus</Text>

          <View className="space-y-4">
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
      </View>

      {/* Bottom Buttons */}
      <View className="absolute bottom-0 left-0 right-0 flex-row bg-white border-t border-gray-200">
        <TouchableOpacity className="flex-1 py-4 items-center justify-center bg-gray-100" onPress={() => router.back()}>
          <Text className="text-gray-600 font-semibold text-lg">CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 py-4 items-center justify-center bg-green-500"
          onPress={() => {
            // Handle bonus runs submission
            router.back()
          }}
        >
          <Text className="text-white font-semibold text-lg">OK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
