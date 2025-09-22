import FloatingActionButton from "@/components/ui/FloatingActionButton"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function AddCommentatorScreen() {
  const navigation = useNavigation()
  const router = useRouter()

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const [formData, setFormData] = useState({
    name: "Ali Kamran",
    contactNumber: "",
    city: "Lahore",
    feesPerMatch: "",
    feesPerDay: "",
    experience: "",
  })

  return (
    <SafeAreaView className="bg-white flex-1">
                <View className="flex-1">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-black text-lg font-semibold ml-4">Add Commentator</Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Photo Upload */}
        <View className="items-center py-8">
          <View className="w-30 h-30 rounded-full bg-gray-300 justify-center items-center relative mb-3">
            <View className="w-20 h-20 rounded-full bg-gray-200 justify-center items-center">
              <Ionicons name="baseball" size={40} color="#666" />
            </View>
            <View className="absolute -bottom-2 right-2 w-8 h-8 rounded-full bg-[#0e7ccb] justify-center items-center">
              <Ionicons name="camera" size={16} color="white" />
            </View>
          </View>
          <Text className="text-black text-base font-medium">Add Photo</Text>
        </View>

        {/* Form Fields */}
        <View className="pb-28">
          {/* Name */}
          <View className="mb-6">
            <Text className="text-base text-gray-600 mb-2">Scorer Name*</Text>
            <TextInput
              className="border-b border-gray-300 py-3 text-base text-gray-800"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter name"
            />
          </View>

          {/* Contact Number */}
          <View className="mb-6">
            <Text className="text-base text-gray-600 mb-2">
              Scorer Contact Number<Text className="text-[#c41e3a]">*</Text>
            </Text>
            <TextInput
              className="border-b border-gray-300 py-3 text-base text-gray-800"
              value={formData.contactNumber}
              onChangeText={(text) => setFormData({ ...formData, contactNumber: text })}
              placeholder="Enter contact number"
              keyboardType="phone-pad"
            />
          </View>

          {/* City */}
          <View className="mb-6">
            <Text className="text-base text-gray-600 mb-2">
              City<Text className="text-[#c41e3a]">*</Text>
            </Text>
            <TextInput
              className="border-b border-gray-300 py-3 text-base text-gray-800"
              value={formData.city}
              onChangeText={(text) => setFormData({ ...formData, city: text })}
              placeholder="Enter city"
            />
          </View>

          {/* Fees */}
          <View className="flex-row justify-between mb-6">
            <View className="w-[48%]">
              <Text className="text-base text-gray-600 mb-2">
                Fees<Text className="text-[#c41e3a]">*</Text>
              </Text>
              <TextInput
                className="border-b border-gray-300 py-3 text-base text-gray-800"
                value={formData.feesPerMatch}
                onChangeText={(text) => setFormData({ ...formData, feesPerMatch: text })}
                placeholder="Amount"
                keyboardType="numeric"
              />
              <Text className="text-sm text-gray-600 mt-1">per match (20 Ov.)</Text>
            </View>

            <View className="w-[48%]">
              <Text className="text-base text-gray-600 mb-2">
                Fees<Text className="text-[#c41e3a]">*</Text>
              </Text>
              <TextInput
                className="border-b border-gray-300 py-3 text-base text-gray-800"
                value={formData.feesPerDay}
                onChangeText={(text) => setFormData({ ...formData, feesPerDay: text })}
                placeholder="Amount"
                keyboardType="numeric"
              />
              <Text className="text-sm text-gray-600 mt-1">per day</Text>
            </View>
          </View>

          {/* Experience */}
          <View className="mb-6">
            <Text className="text-base text-gray-600 mb-2">Total experience (approx)</Text>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 border-b border-gray-300 py-3 text-base text-gray-800 mr-3"
                value={formData.experience}
                onChangeText={(text) => setFormData({ ...formData, experience: text })}
                placeholder="Enter years"
                keyboardType="numeric"
              />
              <Text className="text-base text-gray-600">yrs</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <FloatingActionButton
        label="PUBLISH"
        onPress={() => {}}
      />
    </View>
    </SafeAreaView>
  )
}
