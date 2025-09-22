import FloatingActionButton from "@/components/ui/FloatingActionButton"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "expo-router"
import { useLayoutEffect, useState } from "react"
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

const RegisterLiveStreamScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

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
        serviceDetails: "",
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                {/* <StatusBar backgroundColor="#C53030" barStyle="light-content" /> */}

                {/* Header */}
                <View className="flex-row items-center px-4 py-3">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-black text-lg font-semibold ml-4 flex-1">
                        Register Live Stream
                    </Text>
                </View>

                <ScrollView className="flex-1 bg-white"
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {/* Banner Upload */}
                    <View className="items-center py-6">
                        <View className="relative mb-2">
                            <View className="w-[200px] h-[100px] bg-gray-100 items-center justify-center border-2 border-gray-200 rounded-lg">
                                <Ionicons name="image-outline" size={40} color="#999" />
                            </View>
                            <View className="absolute -bottom-2 -right-2 bg-[#0e7ccb] w-6 h-6 rounded-full items-center justify-center">
                                <Ionicons name="camera" size={16} color="white" />
                            </View>
                        </View>
                        <Text className="text-gray-700 text-sm">Add Banner</Text>
                    </View>

                    {/* Logo Upload */}
                    <View className="items-center pb-6">
                        <View className="relative mb-2">
                            <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center border-2 border-gray-200">
                                <Ionicons name="business-outline" size={30} color="#999" />
                            </View>
                            <View className="absolute bottom-0 right-0 bg-[#0e7ccb] w-5 h-5 rounded-full items-center justify-center">
                                <Ionicons name="camera" size={12} color="white" />
                            </View>
                        </View>
                        <Text className="text-gray-700 text-sm">Add Logo</Text>
                    </View>

                    {/* Form Fields */}
                    <View className="px-4">
                        {/* Input Group Template */}
                        <View className="mb-6">
                            <Text className="text-base text-gray-500 mb-2">
                                Company Name<Text className="text-[#0e7ccb]">*</Text>
                            </Text>
                            <TextInput
                                className="border-b border-gray-300 py-3 text-base text-gray-800"
                                value={formData.companyName}
                                onChangeText={(value) => handleInputChange("companyName", value)}
                                placeholder="Enter company name"
                            />
                        </View>

                        <View className="mb-6">
                            <Text className="text-base text-gray-500 mb-2">
                                Address<Text className="text-red-700">*</Text>
                            </Text>
                            <TextInput
                                className="border-b border-gray-300 py-3 text-base text-gray-800"
                                value={formData.address}
                                onChangeText={(value) => handleInputChange("address", value)}
                                placeholder="Enter address"
                            />
                        </View>

                        <View className="mb-6">
                            <Text className="text-base text-gray-500 mb-2">
                                City<Text className="text-red-700">*</Text>
                            </Text>
                            <TextInput
                                className="border-b border-gray-300 py-3 text-base text-gray-800"
                                value={formData.city}
                                onChangeText={(value) => handleInputChange("city", value)}
                                placeholder="Enter city"
                            />
                        </View>

                        <View className="mb-6">
                            <Text className="text-base text-gray-500 mb-2">
                                Contact Person Name<Text className="text-red-700">*</Text>
                            </Text>
                            <TextInput
                                className="border-b border-gray-300 py-3 text-base text-gray-800"
                                value={formData.contactPersonName}
                                onChangeText={(value) => handleInputChange("contactPersonName", value)}
                                placeholder="Enter contact person name"
                            />
                        </View>

                        <View className="mb-6">
                            <Text className="text-base text-gray-500 mb-2">
                                Contact Number<Text className="text-red-700">*</Text>
                            </Text>
                            <TextInput
                                className="border-b border-gray-300 py-3 text-base text-gray-800"
                                value={formData.contactNumber}
                                onChangeText={(value) => handleInputChange("contactNumber", value)}
                                placeholder="Enter contact number"
                                keyboardType="phone-pad"
                            />
                        </View>

                        {/* Fees Section */}
                        <View className="flex-row justify-between mb-6">
                            <View className="w-[48%]">
                                <Text className="text-base text-gray-500 mb-2">
                                    Fees<Text className="text-red-700">*</Text>
                                </Text>
                                <TextInput
                                    className="border-b border-gray-300 py-3 text-base text-gray-800"
                                    value={formData.feesPerMatch}
                                    onChangeText={(value) => handleInputChange("feesPerMatch", value)}
                                    placeholder="Amount"
                                    keyboardType="numeric"
                                />
                                <Text className="text-xs text-gray-500 mt-1">per match (20 Ov.)</Text>
                            </View>
                            <View className="w-[48%]">
                                <Text className="text-base text-gray-500 mb-2">
                                    Fees<Text className="text-red-700">*</Text>
                                </Text>
                                <TextInput
                                    className="border-b border-gray-300 py-3 text-base text-gray-800"
                                    value={formData.feesPerDay}
                                    onChangeText={(value) => handleInputChange("feesPerDay", value)}
                                    placeholder="Amount"
                                    keyboardType="numeric"
                                />
                                <Text className="text-xs text-gray-500 mt-1">per day</Text>
                            </View>
                        </View>

                        <View className="mb-6">
                            <Text className="text-base text-gray-500 mb-2">YouTube Channel Link<Text className="text-red-700">*</Text></Text>
                            <TextInput
                                className="border-b border-gray-300 py-3 text-base text-gray-800"
                                value={formData.youtubeLink}
                                onChangeText={(value) => handleInputChange("youtubeLink", value)}
                                placeholder="Enter YouTube channel link"
                            />
                        </View>

                        <View className="mb-6">
                            <Text className="text-base text-gray-500 mb-2">Facebook Page Link</Text>
                            <TextInput
                                className="border-b border-gray-300 py-3 text-base text-gray-800"
                                value={formData.facebookLink}
                                onChangeText={(value) => handleInputChange("facebookLink", value)}
                                placeholder="Enter Facebook page link"
                            />
                        </View>

                        <View className="mb-6">
                            <TextInput
                                className="border border-gray-300 rounded-lg px-4 py-4 text-base text-gray-800 min-h-[120px]"
                                value={formData.serviceDetails}
                                onChangeText={(value) => handleInputChange("serviceDetails", value)}
                                placeholder="Add more details about your live stream, like Facilities, Timing, etc."
                                multiline
                                numberOfLines={6}
                                textAlignVertical="top"
                            />
                        </View>
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

export default RegisterLiveStreamScreen
