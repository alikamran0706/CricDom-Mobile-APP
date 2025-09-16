import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"

interface OutTypeComponentProps {
  onOutType: (type: string) => void
}

const outTypes = [
  { key: "bowled", label: "Bowled", icon: "baseball-outline", image: require("../../assets/images/scoring/battsman-miss.png") },
  { key: "caught", label: "Caught", icon: "hand-left-outline", image: require("../../assets/images/scoring/8.png") },
  { key: "caught_behind", label: "Caught\nBehind", icon: "hand-right-outline", image: require("../../assets/images/scoring/20.png") },
  { key: "run_out", label: "Run Out", icon: "flash-outline", image: require("../../assets/images/scoring/42.png") },
  { key: "lbw", label: "LBW", icon: "shield-outline", image: require("../../assets/images/scoring/left-shot.png") },
  { key: "stumped", label: "Stumped", icon: "remove-outline", image: require("../../assets/images/scoring/23.png") },
  { key: "retired_hurt", label: "Retired\nHurt", icon: "medical-outline", image: require("../../assets/images/scoring/4.png") },
  { key: "hit_wicket", label: "Hit\nWicket", icon: "hammer-outline", image: require("../../assets/images/scoring/4.png") },
  { key: "absent_hurt", label: "Absent\nHurt", icon: "close-outline", image: require("../../assets/images/scoring/4.png") },
  { key: "retired_out", label: "Retired\nOut", icon: "exit-outline", image: require("../../assets/images/scoring/4.png") },
  { key: "hit_ball_twice", label: "Hit the Ball\nTwice", icon: "repeat-outline", image: require("../../assets/images/scoring/4.png") },
  { key: "timed_out", label: "Timed Out", icon: "time-outline", image: require("../../assets/images/scoring/4.png") },
  { key: "retired", label: "Retired", icon: "person-outline", image: require("../../assets/images/scoring/4.png") },
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
              <View className="w-12 h-12 rounded-full items-center justify-center mb-2">
                {
                  !type.image ?
                    <Ionicons name={type.icon as any} size={24} color="#6b7280" />
                    :
                    <Image
                      source={type.image}
                      style={{
                        width: '100%',
                        height: '100%',
                        tintColor: '#6b7280',
                        resizeMode: 'contain',
                      }}
                    />
                }

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
