import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

interface NoBallComponentProps {
  onNoBall: (runs: number, type: "bat" | "bye" | "legbye") => void
}

export default function NoBallComponent({ onNoBall }: NoBallComponentProps) {
  const [selectedType, setSelectedType] = useState<"bat" | "bye" | "legbye">("bat")

  const handleNoBall = (runs: number) => {
    onNoBall(runs, selectedType)
  }

  return (
    <View className="p-4">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-xl font-semibold text-gray-800">No Ball (NB=1)</Text> 
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Run buttons */}
      <View className="flex-row flex-wrap gap-3 mb-6">
        {[0, 1, 2, 3, 4, 5, 6].map((runs) => (
          <TouchableOpacity
            key={runs}
            onPress={() => handleNoBall(runs)}
            className={`flex-1 min-w-[80px] py-4 rounded-lg border items-center ${
              runs === 1 ? "bg-[#0e7ccb] border-[#0e7ccb]" : "border-gray-400"
            }`}
          >
            <Text className={`text-base font-semibold ${runs === 1 ? "text-white" : "text-gray-500"}`}>
              NB + {runs}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity className="flex-1 min-w-[80px] py-4 rounded-lg border border-gray-400 items-center">
          <Text className="text-gray-500 text-xl font-bold">+</Text>
        </TouchableOpacity>
      </View>

      {/* Type selection */}
      <View className="flex-row justify-around">
        {[
          { key: "bat", label: "From Bat" },
          { key: "bye", label: "Bye" },
          { key: "legbye", label: "Leg Bye" },
        ].map((type) => (
          <TouchableOpacity
            key={type.key}
            onPress={() => setSelectedType(type.key as any)}
            className="flex-row items-center"
          >
            <View
              className={`w-5 h-5 rounded-full border-2 mr-2 ${
                selectedType === type.key ? "bg-[#0e7ccb] border-[#0e7ccb]" : "border-gray-400"
              }`}
            />
            <Text className="text-gray-700">{type.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
