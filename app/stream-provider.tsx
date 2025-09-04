import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const StreamProviderScreen = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    city: "",
    contactPersonName: "Ali Kamran",
    contactNumber: "",
    feesPerMatch: "",
    feesPerDay: "",
    youtubeLink: "",
    facebookLink: "",
    additionalDetails: "",
  })

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
          <Text className="text-xl font-bold text-white">Stream Provider</Text>
          <Text className="text-white font-medium">Re</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        {/* Company Name */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Company Name*</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.companyName}
            onChangeText={(text) => updateFormData("companyName", text)}
            placeholder="Enter company name"
          />
        </View>

        {/* Address */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Address*</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.address}
            onChangeText={(text) => updateFormData("address", text)}
            placeholder="Enter address"
          />
        </View>

        {/* City */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">City*</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.city}
            onChangeText={(text) => updateFormData("city", text)}
            placeholder="Enter city"
          />
        </View>

        {/* Contact Person Name */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Contact Person Name*</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.contactPersonName}
            onChangeText={(text) => updateFormData("contactPersonName", text)}
          />
        </View>

        {/* Contact Number */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Contact Number*</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.contactNumber}
            onChangeText={(text) => updateFormData("contactNumber", text)}
            placeholder="Enter contact number"
            keyboardType="phone-pad"
          />
        </View>

        {/* Fees Section */}
        <View className="flex-row mb-6">
          <View className="flex-1 mr-4">
            <Text className="text-gray-600 mb-2">Fees* per match (20 Ov.)</Text>
            <TextInput
              className="border-b border-gray-300 pb-2 text-base text-gray-800"
              value={formData.feesPerMatch}
              onChangeText={(text) => updateFormData("feesPerMatch", text)}
              placeholder="Amount"
              keyboardType="numeric"
            />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-gray-600 mb-2">Fees* per day</Text>
            <TextInput
              className="border-b border-gray-300 pb-2 text-base text-gray-800"
              value={formData.feesPerDay}
              onChangeText={(text) => updateFormData("feesPerDay", text)}
              placeholder="Amount"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* YouTube Channel Link */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">YouTube Channel Link*</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.youtubeLink}
            onChangeText={(text) => updateFormData("youtubeLink", text)}
            placeholder="Enter YouTube channel link"
          />
        </View>

        {/* Facebook Page Link */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Facebook Page Link</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={formData.facebookLink}
            onChangeText={(text) => updateFormData("facebookLink", text)}
            placeholder="Enter Facebook page link"
          />
        </View>

        {/* Additional Details */}
        <View className="mb-8">
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base text-gray-800 min-h-32"
            value={formData.additionalDetails}
            onChangeText={(text) => updateFormData("additionalDetails", text)}
            placeholder="Add more details about your live stream, like Facilities, Timing, etc."
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View className="p-4 bg-white border-t border-gray-200">
        <TouchableOpacity className="bg-green-500 rounded-xl py-4">
          <Text className="text-center text-white font-semibold text-lg">REGISTER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default StreamProviderScreen
