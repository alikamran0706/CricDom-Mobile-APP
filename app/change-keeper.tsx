import Header from "@/components/ui/Header"
import { useRouter } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ChangeKeeper() {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header heading="Fitness Team" />

      <View className="flex-1 px-4 py-6">
        {/* Playing Squad Section */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-6">Playing Squad</Text>

          {/* Empty squad area - would contain player list */}
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-center">No players in squad yet</Text>
          </View>
        </View>

        {/* Change Keeper Option */}
        <View className="absolute bottom-20 left-4 right-4">
          <View className="bg-gray-50 p-4 rounded-xl">
            <Text className="text-center text-gray-700 font-medium">Change Keeper with Dummy 1</Text>
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
