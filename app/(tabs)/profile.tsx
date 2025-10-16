import QRCodeModal from "@/components/Modal/QRCodeModal"
import { useGetCurrentUserQuery } from "@/store/features/user/userApi"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ProfileDetails() {
  const router = useRouter();
  const navigation = useNavigation();
  const [showQRModal, setShowQRModal] = useState(false);
  const { data: profile, isLoading, refetch } = useGetCurrentUserQuery();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-black text-lg font-semibold">Profile</Text>
          <TouchableOpacity onPress={() => router.push("/edit-profile")}>
            <Ionicons name="create-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#EFF6FF" /> */}
      <ScrollView className="flex-1">
        <View className="flex-row items-start gap-x-8 px-6 py-4 bg-blue-50 mx-4 mb-4 mt-1 rounded-2xl">
          <View className="flex">
            {/* Profile Photo with Edit Overlay */}
            <View className="relative mb-4 overflow-hidden w-24 h-24 rounded-full">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
                }}
                className="w-[100%] h-[100%]"
              />
              <View className="absolute bottom-0 left-0 right-0 rounded-b-full py-2" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
                <Text className="text-white text-center text-sm font-semibold">EDIT</Text>
              </View>
            </View>
          </View>

          <View className="px-4">
            {/* Player Info */}
            <Text className="text-3xl font-normal text-gray-700 mb-2 max-w-[200px]"
              numberOfLines={1}
              ellipsizeMode="tail">
              {profile?.player?.name || profile?.user_name}
            </Text>
            <View className="flex-row items-center mb-2">
              <Ionicons name="location" size={16} color="gray" />
              <Text className="text-gray-600 ml-1">Lahore</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="calendar" size={16} color="gray" />
              <Text className="text-gray-600 ml-1">Since 28-Aug-2025</Text>
            </View>
          </View>
        </View>

        <View className="bg-white mx-0 border-t border-gray-200">
          <View className="flex-row">
            {/* My QR Code */}
            <TouchableOpacity className="flex-1 items-center py-6 border-gray-200" style={{ borderRightWidth: 1 }} onPress={() => setShowQRModal(true)}>
              <Ionicons name="qr-code" size={32} color="#4B5563" className="mb-2" />
              <Text className="text-gray-600 text-center text-sm">My QR Code</Text>
            </TouchableOpacity>

            {/* Followers */}
            <View className="flex-1 items-center py-6 border-gray-200" style={{ borderRightWidth: 1 }}>
              <Text className="text-4xl font-normal text-gray-600 mb-1">0</Text>
              <Text className="text-gray-600 text-center text-sm">Followers</Text>
            </View>

            {/* Profile Views */}
            <View className="flex-1 items-center py-6">
              <Text className="text-4xl font-normal text-gray-600 mb-1">{profile?.player?.views || 0}</Text>
              <Text className="text-gray-600 text-center text-sm">Profile Views</Text>
            </View>
          </View>
        </View>

        <View className="bg-blue-100 mx-4 mt-4 p-4 rounded-lg flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="bar-chart" size={24} color="#0e7ccb" />
            <Text className="text-gray-800 ml-2">Want to win your next match?</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/create-match")}>
            <Text className="text-[#0e7ccb] font-semibold">TAP HERE</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white mx-4 mt-4 p-4 rounded-lg">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">My Profile</Text>
            <TouchableOpacity onPress={() => router.push("/register-player")}>
              <Text className="text-[#0e7ccb] font-semibold">EDIT</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            <View className="flex-row">
              <View className="flex-1">
                <Text className="text-gray-500 text-sm mb-1">MOBILE NUMBER</Text>
                <Text className="text-gray-800">-</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm mb-1">GENDER</Text>
                <Text className="text-gray-800">Male</Text>
              </View>
            </View>

            <View className="flex-row">
              <View className="flex-1">
                <Text className="text-gray-500 text-sm mb-1">PLAYING ROLE</Text>
                <Text className="text-gray-800">None</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm mb-1">BATTING STYLE</Text>
                <Text className="text-gray-800">RHB</Text>
              </View>
            </View>

            <View className="flex-row">
              <View className="flex-1">
                <Text className="text-gray-500 text-sm mb-1">BOWLING STYLE</Text>
                <Text className="text-gray-800">Right-arm fast</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm mb-1">DATE OF BIRTH</Text>
                <Text className="text-gray-800">2005-02-20</Text>
              </View>
            </View>

            <View className="flex-row">
              <View className="flex-1">
                <Text className="text-gray-500 text-sm mb-1">EMAIL</Text>
                <Text className="text-gray-800" numberOfLines={1}>{profile?.email}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm mb-1">PIN</Text>
                <Text className="text-gray-800">-</Text>
              </View>
            </View>
          </View>

          <View className="mt-6">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                <View
                  className="bg-gradient-to-r from-blue-400 to-gray-600 h-2 rounded-full"
                  style={{ width: "68%" }}
                />
              </View>
              <Text className="text-gray-500 text-sm">68%</Text>
            </View>
            <TouchableOpacity className="mt-2" onPress={() => router.push(`/player/${1}`)}>
              <Text className="text-[#0e7ccb] font-semibold text-center">Complete Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Connections Section */}
        <View className="bg-white mx-4 p-4 rounded-lg">
          <Text className="text-xl font-bold text-gray-900 mb-4">Connections</Text>
          {/* Connection avatars would go here */}
          <View className="flex-row gap-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <View key={i} className="w-12 h-12 bg-gray-300 rounded-full" />
            ))}
          </View>
          <Text className="text-gray-600 text-center mb-4">
            Connect with cricketers to challenge, motivate & inspire each other.
          </Text>
          <TouchableOpacity className="bg-blue-100 py-3 rounded-lg" onPress={() => router.push("/search")}>
            <Text className="text-[#0e7ccb] font-semibold text-center">FIND CRICKETERS</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Options */}
        <View className="bg-white mx-4 rounded-lg">
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100" onPress={() => router.push("/create-team")}>
            <Text className="text-gray-800 text-base">Create Team</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100" onPress={() => router.push("/create-league")}>
            <Text className="text-gray-800 text-base">Create League</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4">
            <Text className="text-gray-800 text-base">Start Match</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View className="mx-4 mt-4 gap-y-4">
          <View className="flex-row gap-x-4">
            <TouchableOpacity className="flex-1 border border-gray-400 py-3 rounded-lg">
              <Text className="text-gray-700 font-semibold text-center">LOGOUT</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 border border-gray-400 py-3 rounded-lg">
              <Text className="text-gray-700 font-semibold text-center">CLEAR DATA</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="py-3">
            <Text className="text-red-500 font-semibold text-center">DELETE ACCOUNT</Text>
          </TouchableOpacity>
        </View>

        {/* Version */}
        <View className="items-center mt-8 mb-6">
          <Text className="text-gray-400 text-sm">Version 12.7 (448)</Text>
        </View>
      </ScrollView>

      <QRCodeModal
        visible={showQRModal}
        onClose={() => setShowQRModal(false)}
        teamName={"Ali Kamran"}
        teamLocation="Lahore"
        teamId="10818998"
        teamInitials={"FT"}
        teamColor="#3B82F6"
      />
    </SafeAreaView>
  )
}
