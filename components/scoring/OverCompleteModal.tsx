import { Ionicons } from "@expo/vector-icons"
import { Modal, Text, TouchableOpacity, View } from "react-native"

interface Ball {
  type: "run" | "wide" | "noball" | "wicket"
  value: number | string
  color: string
}

interface OverCompleteModalProps {
  visible: boolean
  onClose: () => void
  overNumber: number
  bowlerName: string
  runs: number
  overs: number
  wickets: number
  extras: number
  balls: Ball[]
  onStartNextOver: () => void
  onContinueThisOver: () => void
}

export default function OverCompleteModal({
  visible,
  onClose,
  overNumber,
  bowlerName,
  runs,
  overs,
  wickets,
  extras,
  balls,
  onStartNextOver,
  onContinueThisOver,
}: OverCompleteModalProps) {
  const totalRuns = balls.reduce((sum, ball) => {
    if (typeof ball.value === "number") return sum + ball.value
    return sum
  }, 0)

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="bg-white rounded-lg p-6 w-full max-w-md">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-red-600">Over Complete</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="settings-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Stats Grid */}
          <View className="flex-row mb-6">
            <View className="flex-1 bg-gray-400 p-3 items-center">
              <Text className="text-white text-2xl font-bold">{runs}</Text>
              <Text className="text-white text-sm">Runs</Text>
            </View>
            <View className="flex-1 bg-gray-400 p-3 items-center">
              <Text className="text-white text-2xl font-bold">{overs}</Text>
              <Text className="text-white text-sm">Overs</Text>
            </View>
            <View className="flex-1 bg-gray-400 p-3 items-center">
              <Text className="text-white text-2xl font-bold">{wickets}</Text>
              <Text className="text-white text-sm">Wickets</Text>
            </View>
            <View className="flex-1 bg-gray-400 p-3 items-center">
              <Text className="text-white text-2xl font-bold">{extras}</Text>
              <Text className="text-white text-sm">Extras</Text>
            </View>
          </View>

          {/* Over Summary */}
          <Text className="text-gray-700 text-center mb-4">
            End of over {overNumber} by {bowlerName}
          </Text>

          {/* Ball by Ball */}
          <View className="flex-row items-center justify-center mb-6">
            {balls.map((ball, index) => (
              <View key={index} className="flex-row items-center">
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mx-1`}
                  style={{ backgroundColor: ball.color }}
                >
                  <Text className="text-white font-bold">{ball.type === "wide" ? "WD" : ball.value}</Text>
                </View>
                {index < balls.length - 1 && <Text className="text-gray-400 mx-1">•</Text>}
              </View>
            ))}
            <Text className="ml-3 text-lg font-bold">= {totalRuns}</Text>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity className="bg-green-500 py-3 rounded-lg mb-4" onPress={onStartNextOver}>
            <Text className="text-center text-white font-bold text-lg">START NEXT OVER</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onContinueThisOver}>
            <Text className="text-center text-red-600 font-bold text-lg">CONTINUE THIS OVER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
