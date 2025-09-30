import { Ionicons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"

interface WideBallComponentProps {
  onWide: (runs: number) => void
    openSettingHandler: () => void
}

export default function WideBallComponent({ onWide, openSettingHandler }: WideBallComponentProps) {
  return (
    <View className="p-4">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-xl font-semibold text-gray-800">Wide Ball (WD=1)</Text>
        <TouchableOpacity onPress={openSettingHandler}>
          <Ionicons name="settings-outline" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Run buttons */}
      <View className="flex-row flex-wrap gap-3">
        {[0, 1, 2, 3, 4, 5, 6].map((runs) => (
          <TouchableOpacity
            key={runs}
            onPress={() => onWide(runs)}
            className="flex-1 min-w-[80px] py-4 rounded-lg border border-gray-400 items-center"
          >
            <Text className="text-gray-500 text-base font-semibold">WD + {runs}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity className="flex-1 min-w-[80px] py-4 rounded-lg border border-gray-400 items-center">
          <Text className="text-gray-500 text-xl font-bold">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
