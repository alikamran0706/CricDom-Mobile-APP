import { extractDateTimePart, getFullStrapiUrl } from "@/lib/utils/common"
import { useGetCurrentUserQuery } from "@/store/features/user/userApi"
import { logout } from "@/store/features/user/userSlice"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"

const menuItems = [
  { id: "1", title: "Edit Profile", icon: "person-outline", route: "/edit-profile" },
  { id: "5", title: "Create/Update Player Info", icon: "person-outline", route: "/create-player" },
  { id: "2", title: "Notifications", icon: "notifications-outline", route: "/notifications" },
  { id: "3", title: "Settings", icon: "settings-outline", route: "/settings" },
  { id: "4", title: "Help & Support", icon: "help-circle-outline", route: "/support" },
]

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const { data: user, isLoading, refetch } = useGetCurrentUserQuery();

  const handleLogout = async() => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('profile');
    dispatch(logout())
    router.replace("/auth/login")
  }
  useEffect(() => {
    if (params?.refetch === 'true') {
      refetch();
      router.setParams({ refetch: undefined });
    }
  }, [params?.refetch]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold ml-4 text-black">Profile</Text>
        </View>
        {
          isLoading ?
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#000" />
            </View>
            : user &&
            <ScrollView className="flex-1">
              {/* Profile Info */}
              <View className="items-center py-8">
                <View className="relative w-24 h-24 rounded-full items-center justify-center overflow-hidden border border-gray-100 ">
                  {
                    user?.player?.image &&
                    <Image source={{ uri: getFullStrapiUrl(user?.player?.image?.url) }}
                      className="w-full h-full rounded-full mb-4"
                    />
                  }
                </View>
                <Text className="text-2xl font-bold text-black">{user?.player?.name || 'N/A'}</Text>
                <Text className="text-gray-600 mt-1">{user?.player?.position || 'N/A'}</Text>
                <Text className="text-gray-500 mt-1">{extractDateTimePart(user?.createdAt, 'year') || ''}</Text>
              </View>

              {/* Account Section */}
              <View className="px-4">
                <Text className="text-lg font-semibold mb-4" style={{ color: 'black' }}>Account</Text>

                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="flex-row items-center justify-between py-4 border-b border-gray-100"
                    onPress={() => {
                      if (item.title === "Create/Update Player Info") {
                        if (user?.player?.documentId) {
                          router.push({
                            pathname: "/create-player",
                            params: { id: user.player.documentId },
                          });
                        } else {
                          router.push(item.route as any);
                        }
                      } else {
                        router.push(item.route as any);
                      }
                    }}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={item.icon as any} size={24} color="#6B7280" />
                      <Text className="text-lg ml-4" style={{ color: '#5f6165' }}>{item.title}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                ))}

                {/* Logout */}
                <TouchableOpacity className="flex-row items-center justify-between py-4" onPress={handleLogout}>
                  <View className="flex-row items-center">
                    <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                    <Text className="text-lg ml-4 text-red-500">Logout</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </ScrollView>
        }
      </View>
    </SafeAreaView>
  )
}
