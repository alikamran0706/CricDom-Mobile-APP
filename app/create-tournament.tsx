import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const TournamentScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tournamentName: "",
    city: "Lahore",
    ground: "",
    organiserName: "Ali Kamran",
    organiserNumber: "",
    organiserEmail: "alikamrantechdev@gmail.com",
  });
  const navigation = useNavigation();
  
      useLayoutEffect(() => {
          navigation.setOptions({ headerShown: false });
      }, [navigation]);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-red-600 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Add A Tournament</Text>
          <TouchableOpacity>
            <Ionicons name="play" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        {/* Banner Upload */}
        <View className="items-center mb-8">
          <View className="w-full h-32 bg-gray-200 rounded-2xl items-center justify-center mb-4">
            <View className="w-16 h-16 bg-gray-300 rounded-lg items-center justify-center mb-2">
              <Ionicons name="image-outline" size={32} color="#666" />
            </View>
            <TouchableOpacity className="absolute bottom-2 right-2 w-8 h-8 bg-red-600 rounded-full items-center justify-center">
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-600">Add Banner</Text>
        </View>

        {/* Logo Upload */}
        <View className="items-start mb-8">
          <View className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center mb-2">
            <Ionicons name="leaf-outline" size={32} color="#666" />
            <TouchableOpacity className="absolute bottom-0 right-0 w-6 h-6 bg-red-600 rounded-full items-center justify-center">
              <Ionicons name="camera" size={12} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-600">Add Logo</Text>
        </View>

        {/* Tournament Name */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Tournament / Series Name*</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.tournamentName}
            onChangeText={(text) => updateFormData("tournamentName", text)}
            placeholder="Enter tournament name"
          />
        </View>

        {/* City */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">City*</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.city}
            onChangeText={(text) => updateFormData("city", text)}
          />
        </View>

        {/* Ground */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Ground*</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.ground}
            onChangeText={(text) => updateFormData("ground", text)}
            placeholder="Enter ground name"
          />
        </View>

        {/* Organiser Name */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Organiser Name*</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.organiserName}
            onChangeText={(text) => updateFormData("organiserName", text)}
          />
        </View>

        {/* Organiser Number */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Organiser Number*</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.organiserNumber}
            onChangeText={(text) => updateFormData("organiserNumber", text)}
            placeholder="Enter contact number"
            keyboardType="phone-pad"
          />
        </View>

        {/* Organiser Email */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Organiser Email</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.organiserEmail}
            onChangeText={(text) => updateFormData("organiserEmail", text)}
            keyboardType="email-address"
          />
        </View>

        {/* Footer Text */}
        <View className="mb-8">
          <Text className="text-sm text-gray-500 text-center">
            *Get updated with CricHeroes offers and help videos on mail.
          </Text>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View className="p-4 bg-white border-t border-gray-200">
        <TouchableOpacity className="bg-green-500 rounded-xl py-4">
          <Text className="text-center text-white font-semibold text-lg">CREATE TOURNAMENT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default TournamentScreen
