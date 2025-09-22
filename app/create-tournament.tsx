import FloatingActionButton from "@/components/ui/FloatingActionButton"
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
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
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 py-3">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-black ml-3">Add A Tournament</Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Banner Upload */}
          <View className="items-center mb-8">
            <View className="w-full h-32 bg-gray-200 rounded-2xl items-center justify-center mb-4">
              <View className="w-16 h-16 bg-gray-300 rounded-lg items-center justify-center mb-2">
                <Ionicons name="image-outline" size={32} color="#666" />
              </View>
              <TouchableOpacity className="absolute bottom-2 right-2 w-8 h-8 bg-[#0284c7] rounded-full items-center justify-center">
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-gray-600">Add Banner</Text>
          </View>

          {/* Logo Upload */}
          <View className="items-start mb-8">
            <View className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center mb-2">
              <Ionicons name="leaf-outline" size={32} color="#666" />
              <TouchableOpacity className="absolute bottom-0 right-0 w-6 h-6 bg-[#0284c7] rounded-full items-center justify-center">
                <Ionicons name="camera" size={12} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-gray-600">Add Logo</Text>
          </View>

          {/* Tournament Name */}
          <FloatingLabelInputBorderBottom
            label="Tournament / Series Name"
            value={formData.tournamentName}
            required
            onChangeText={(text) => updateFormData("tournamentName", text)}
          />
          {/* City */}
          <FloatingLabelInputBorderBottom
            label="City"
            value={formData.city}
            required
            onChangeText={(text) => updateFormData("city", text)}
          />
          {/* Ground */}
          <FloatingLabelInputBorderBottom
            label="Ground"
            value={formData.ground}
            required
            onChangeText={(text) => updateFormData("ground", text)}
          />
          {/* Organiser Name */}
          <FloatingLabelInputBorderBottom
            label="Organiser Name"
            value={formData.organiserName}
            required
            onChangeText={(text) => updateFormData("organiserName", text)}
          />
          {/* Organiser Number */}
          <FloatingLabelInputBorderBottom
            label="Organiser Number"
            value={formData.organiserNumber}
            required
            onChangeText={(text) => updateFormData("organiserNumber", text)}
          />
          {/* Organiser Email */}
          <FloatingLabelInputBorderBottom
            label="Organiser Email"
            value={formData.organiserEmail}
            onChangeText={(text) => updateFormData("organiserEmail", text)}
            keyboardType="email-address"
          />

          {/* Footer Text */}
          <View className="mb-8">
            <Text className="text-sm text-gray-500 text-center">
              *Get updated with CricHeroes offers and help videos on mail.
            </Text>
          </View>
        </ScrollView>

        <FloatingActionButton
          label="Save"
          onPress={() => { }}
        />
      </View>
    </SafeAreaView>
  )
}

export default TournamentScreen
