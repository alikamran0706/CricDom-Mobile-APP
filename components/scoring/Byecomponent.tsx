import { Ionicons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"

interface ByeComponentProps {
  onBye: (runs: number) => void
  currentBowler?: string
}

export default function ByeComponent({ onBye, currentBowler = "dummy 2" }: ByeComponentProps) {
  return (
    <View className="p-4">
      <Text className="text-xl font-semibold text-gray-800 mb-6 text-center">Bye Runs</Text>

      {/* Run buttons */}
      <View className="flex-row justify-center gap-4 mb-6">
        {[1, 2, 3, 4].map((runs) => (
          <TouchableOpacity
            key={runs}
            onPress={() => onBye(runs)}
            className="w-16 h-16 rounded-lg border border-gray-400 items-center justify-center"
          >
            <Text className="text-gray-500 text-lg font-semibold">{runs}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity className="w-16 h-16 rounded-lg border border-gray-400 items-center justify-center">
          <Text className="text-gray-500 text-xl font-bold">+</Text>
        </TouchableOpacity>
      </View>

      {/* Bowler info */}
      <View className="flex-row items-center justify-center">
        <View className="w-8 h-8 bg-gray-600 rounded-full items-center justify-center mr-2">
          <Ionicons name="person" size={16} color="white" />
        </View>
        <Text className="text-gray-700 font-medium">{currentBowler}</Text>
        <TouchableOpacity className="ml-2">
          <Text className="text-[#0e7ccb] font-medium">(Change)</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
