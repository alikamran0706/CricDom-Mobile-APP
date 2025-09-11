import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

interface OutTypeComponentProps {
  onOutType: (type: string) => void
}

const outTypes = [
  { key: "bowled", label: "Bowled", icon: "baseball-outline" },
  { key: "caught", label: "Caught", icon: "hand-left-outline" },
  { key: "caught_behind", label: "Caught\nBehind", icon: "hand-right-outline" },
  { key: "caught_bowled", label: "Caught &\nBowled", icon: "repeat-outline" },
  { key: "run_out", label: "Run Out", icon: "flash-outline" },
  { key: "lbw", label: "LBW", icon: "shield-outline" },
  { key: "stumped", label: "Stumped", icon: "remove-outline" },
  { key: "retired_hurt", label: "Retired\nHurt", icon: "medical-outline" },
  { key: "run_out_mankaded", label: "Run Out\n(Mankaded)", icon: "warning-outline" },
  { key: "hit_wicket", label: "Hit\nWicket", icon: "hammer-outline" },
  { key: "absent_hurt", label: "Absent\nHurt", icon: "close-outline" },
  { key: "retired_out", label: "Retired\nOut", icon: "exit-outline" },
  { key: "hit_ball_twice", label: "Hit the Ball\nTwice", icon: "repeat-outline" },
  { key: "obstr_field", label: "Obstr. the\nField", icon: "ban-outline" },
  { key: "timed_out", label: "Timed Out", icon: "time-outline" },
  { key: "retired", label: "Retired", icon: "person-outline" },
]

export default function OutTypeComponent({ onOutType }: OutTypeComponentProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedTypes = showAll ? outTypes : outTypes.slice(0, 12)

  return (
    <View className="p-4">
      <Text className="text-xl font-semibold text-gray-800 mb-6 text-center">Select Out Type</Text>

      {/* ✅ Use BottomSheetScrollView */}
      {/* <BottomSheetScrollView showsVerticalScrollIndicator={false}> */}
         <ScrollView showsVerticalScrollIndicator={false} className="max-h-96">

            <View className="flex-row flex-wrap justify-between">
            {displayedTypes.map((type) => (
                <TouchableOpacity
                key={type.key}
                onPress={() => onOutType(type.key)}
                className="w-[48%] p-4 mb-3 border border-gray-200 rounded-lg items-center"
                >
                <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mb-2">
                    <Ionicons name={type.icon as any} size={24} color="#6b7280" />
                </View>
                <Text className="text-sm font-medium text-gray-700 text-center">{type.label}</Text>
                </TouchableOpacity>
            ))}
            </View>

            <TouchableOpacity onPress={() => setShowAll(!showAll)} className="mt-4 py-3 items-center">
            <Text className="text-black font-semibold">
                {showAll ? "SHOW LESS" : "SHOW MORE"}
            </Text>
            </TouchableOpacity>
         </ScrollView>
      {/* </BottomSheetScrollView> */}
    </View>
  )
}
