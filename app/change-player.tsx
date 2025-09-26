import Header from "@/components/ui/Header"
import { useRouter } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ChangePlayer() {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header heading="Batter to replace Ali Kamran" />

      <View className="flex-1 px-4 py-6">
        {/* Add New Button */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-800">Select from below or</Text>
            <TouchableOpacity
              className="bg-green-500 px-6 py-2 rounded-lg"
              onPress={() => {
                // Handle add new player
              }}
            >
              <Text className="text-white font-semibold">ADD NEW</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Playing Squad Section */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-6">Playing Squad</Text>

          {/* Empty squad area - would contain player list */}
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-center">No players available for replacement</Text>
          </View>
        </View>
      </View>

      {/* Continue Scoring Button */}
      <View className="absolute bottom-0 left-0 right-0">
        <TouchableOpacity
          className="py-4 items-center justify-center bg-green-500"
          onPress={() => {
            // Handle continue scoring
            router.back()
          }}
        >
          <Text className="text-white font-semibold text-lg">CONTINUE SCORING</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
