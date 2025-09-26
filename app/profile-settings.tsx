import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ProfileSettings() {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header with email */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <Text className="text-gray-800 text-lg">hdev@gmail</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Completion */}
        <View className="bg-white mx-4 mt-4 p-4 rounded-lg">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
              <View className="bg-gradient-to-r from-blue-400 to-green-500 h-2 rounded-full" style={{ width: "68%" }} />
            </View>
            <Text className="text-gray-500 text-sm">68%</Text>
          </View>
          <TouchableOpacity className="mt-2">
            <Text className="text-green-600 font-semibold text-center">Complete Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Connections Section */}
        <View className="bg-white mx-4 mt-4 p-4 rounded-lg">
          <Text className="text-xl font-bold text-gray-900 mb-4">Connections</Text>
          <View className="flex-row space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <View key={i} className="w-12 h-12 bg-gray-300 rounded-full" />
            ))}
          </View>
          <Text className="text-gray-600 text-center mb-4">
            Connect with cricketers to challenge, motivate & inspire each other.
          </Text>
          <TouchableOpacity className="bg-green-500 py-3 rounded-lg">
            <Text className="text-white font-semibold text-center">FIND CRICKETERS</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Options */}
        <View className="bg-white mx-4 mt-4 rounded-lg">
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <Text className="text-gray-800 text-base">Edit Notification Preferences</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
            <Text className="text-gray-800 text-base">Change Language</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4">
            <Text className="text-gray-800 text-base">Purchase History</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View className="mx-4 mt-6 space-y-4">
          <View className="flex-row space-x-4">
            <TouchableOpacity className="flex-1 border border-gray-400 py-3 rounded-lg">
              <Text className="text-gray-700 font-semibold text-center">LOGOUT</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 border border-gray-400 py-3 rounded-lg">
              <Text className="text-gray-700 font-semibold text-center">CLEAR DATA</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="py-3">
            <Text className="text-gray-500 font-semibold text-center">DELETE ACCOUNT</Text>
          </TouchableOpacity>
        </View>

        {/* Version */}
        <View className="items-center mt-8 mb-6">
          <Text className="text-gray-400 text-sm">Version 12.7 (448)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
