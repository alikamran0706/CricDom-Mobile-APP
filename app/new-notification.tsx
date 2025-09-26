import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Notification {
  id: string
  type: "general" | "match"
  title: string
  message: string
  time: string
  avatar?: string
  isRead: boolean
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "general",
    title: "Ali Kamran",
    message: "Ali Kamran has transferred scoring of MatchId: 19275515 to you. Tap here to resume scoring.",
    time: "4 seconds ago",
    avatar: "/cricket-player-avatar.png",
    isRead: false,
  },
]

export default function Notifications() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"general" | "matches">("general")
  const [showSuccessMessage, setShowSuccessMessage] = useState(true)

  const filteredNotifications = notifications.filter((n) => n.type === activeTab)

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Settings */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-red-600">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-semibold">Notifications</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View className="flex-row bg-red-600">
        <TouchableOpacity
          className={`flex-1 py-3 items-center border-b-2 ${
            activeTab === "general" ? "border-yellow-400" : "border-transparent"
          }`}
          onPress={() => setActiveTab("general")}
        >
          <Text className={`font-semibold ${activeTab === "general" ? "text-white" : "text-red-200"}`}>GENERAL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 items-center border-b-2 ${
            activeTab === "matches" ? "border-yellow-400" : "border-transparent"
          }`}
          onPress={() => setActiveTab("matches")}
        >
          <Text className={`font-semibold ${activeTab === "matches" ? "text-white" : "text-red-200"}`}>MATCHES</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Today Section */}
        <View className="px-4 py-4">
          <Text className="text-xl font-bold text-gray-800 mb-4">Today</Text>

          {filteredNotifications.map((notification) => (
            <TouchableOpacity key={notification.id} className="flex-row items-start p-4 bg-gray-50 rounded-xl mb-3">
              <Image source={{ uri: notification.avatar }} className="w-12 h-12 rounded-full mr-3" />
              <View className="flex-1">
                <Text className="font-semibold text-gray-800 mb-1">{notification.title}</Text>
                <Text className="text-gray-600 text-sm leading-5 mb-2">{notification.message}</Text>
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                  <Text className="text-gray-400 text-xs ml-1">{notification.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Success Message */}
      {showSuccessMessage && (
        <View className="absolute bottom-6 left-4 right-4">
          <View className="bg-green-500 px-4 py-3 rounded-lg flex-row items-center">
            <Ionicons name="checkmark-circle" size={20} color="white" />
            <Text className="text-white font-medium ml-2">Match scoring token verified.</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}
