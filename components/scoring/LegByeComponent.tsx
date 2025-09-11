import { Text, TouchableOpacity, View } from "react-native"

interface LegByeComponentProps {
  onLegBye: (runs: number) => void
}

export default function LegByeComponent({ onLegBye }: LegByeComponentProps) {
  return (
    <View className="p-4">
      <Text className="text-xl font-semibold text-gray-800 mb-6 text-center">Leg Bye Runs</Text>

      {/* Run buttons */}
      <View className="flex-row justify-center gap-4">
        {[1, 2, 3, 4].map((runs) => (
          <TouchableOpacity
            key={runs}
            onPress={() => onLegBye(runs)}
            className="w-16 h-16 rounded-lg border border-gray-400 items-center justify-center"
          >
            <Text className="text-gray-500 text-lg font-semibold">{runs}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity className="w-16 h-16 rounded-lg border border-gray-400 items-center justify-center">
          <Text className="text-gray-500 text-xl font-bold">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
