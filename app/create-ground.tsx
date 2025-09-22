import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterGroundScreen() {
    const navigation = useNavigation();
    const router = useRouter();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const [formData, setFormData] = useState({
        groundName: "",
        address: "",
        city: "Lahore",
        contactPersonName: "Ali Kamran",
        primaryContact: "",
        secondaryContact: "",
        email: "alikamrantechdev@gmail.com",
        shortestLength: "",
        longestLength: "",
        pitchTypes: {
            turf: false,
            mud: false,
            cement: false,
            astroturf: false,
            matting: false,
        },
        facilities: {
            umpires: false,
            scorers: false,
            ['drinking water']: false,
            balls: false,
            washrooms: false,
            others: false,
        },
    });

    const togglePitchType = (type: string) => {
        setFormData({
            ...formData,
            pitchTypes: {
                ...formData.pitchTypes,
                [type]: !formData.pitchTypes[type as keyof typeof formData.pitchTypes],
            },
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center px-4 py-4">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-black text-lg font-semibold ml-4">Register your Ground</Text>
                </View>

                <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                    {/* Ground Name */}
                    <View className="mb-6">
                        <Text className="text-base text-gray-600 mb-2">
                            Ground Name<Text className="text-red-700">*</Text>
                        </Text>
                        <TextInput
                            className="border-b border-gray-300 py-3 text-base text-gray-800"
                            value={formData.groundName}
                            onChangeText={(text) => setFormData({ ...formData, groundName: text })}
                            placeholder="Enter ground name"
                        />
                    </View>

                    {/* Address */}
                    <View className="mb-6">
                        <Text className="text-base text-gray-600 mb-2">
                            Address<Text className="text-red-700">*</Text>
                        </Text>
                        <TextInput
                            className="border-b border-gray-300 py-3 text-base text-gray-800"
                            value={formData.address}
                            onChangeText={(text) => setFormData({ ...formData, address: text })}
                            placeholder="Enter address"
                        />
                    </View>

                    {/* City */}
                    <View className="mb-6">
                        <Text className="text-base text-gray-600 mb-2">
                            City<Text className="text-red-700">*</Text>
                        </Text>
                        <TextInput
                            className="border-b border-gray-300 py-3 text-base text-gray-800"
                            value={formData.city}
                            onChangeText={(text) => setFormData({ ...formData, city: text })}
                            placeholder="Enter city"
                        />
                    </View>

                    {/* Contact Person Name */}
                    <View className="mb-6">
                        <Text className="text-base text-gray-600 mb-2">
                            Contact Person Name<Text className="text-red-700">*</Text>
                        </Text>
                        <TextInput
                            className="border-b border-gray-300 py-3 text-base text-gray-800"
                            value={formData.contactPersonName}
                            onChangeText={(text) => setFormData({ ...formData, contactPersonName: text })}
                            placeholder="Enter contact person name"
                        />
                    </View>

                    {/* Primary Contact */}
                    <View className="mb-6">
                        <Text className="text-base text-gray-600 mb-2">
                            Primary Contact Number<Text className="text-red-700">*</Text>
                        </Text>
                        <TextInput
                            className="border-b border-gray-300 py-3 text-base text-gray-800"
                            value={formData.primaryContact}
                            onChangeText={(text) => setFormData({ ...formData, primaryContact: text })}
                            placeholder="Enter primary contact number"
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Secondary Contact */}
                    <View className="mb-6">
                        <Text className="text-base text-gray-600 mb-2">Secondary Contact Number</Text>
                        <TextInput
                            className="border-b border-gray-300 py-3 text-base text-gray-800"
                            value={formData.secondaryContact}
                            onChangeText={(text) => setFormData({ ...formData, secondaryContact: text })}
                            placeholder="Enter secondary contact number"
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Email Address */}
                    <View className="mb-6">
                        <Text className="text-base text-gray-600 mb-2">Email address</Text>
                        <TextInput
                            className="border-b border-gray-300 py-3 text-base text-gray-800"
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                            placeholder="Enter email address"
                            keyboardType="email-address"
                        />
                    </View>

                    {/* Boundary Length */}
                    <View className="mb-6">
                        <Text className="text-base text-gray-600 mb-2">Boundary Length (meters)</Text>
                        <View className="flex-row justify-between">
                            <View className="w-[48%]">
                                <TextInput
                                    className="border-b border-gray-300 py-3 text-base text-gray-800"
                                    value={formData.shortestLength}
                                    onChangeText={(text) => setFormData({ ...formData, shortestLength: text })}
                                    placeholder="Shortest Length"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View className="w-[48%]">
                                <TextInput
                                    className="border-b border-gray-300 py-3 text-base text-gray-800"
                                    value={formData.longestLength}
                                    onChangeText={(text) => setFormData({ ...formData, longestLength: text })}
                                    placeholder="Longest Length"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Pitch Types */}
                    <View className="mb-6">
                        <Text className="text-base text-gray-600 mb-2">
                            Available Pitch Type(s)<Text className="text-red-700">*</Text>
                        </Text>
                        <View className="flex-row flex-wrap justify-between gap-4">
                            {Object.entries(formData.pitchTypes).map(([type, checked]) => (
                                <TouchableOpacity
                                    key={type}
                                    className="flex-row items-center w-[45%] mb-3"
                                    onPress={() => togglePitchType(type)}
                                >
                                    <View
                                        className={`w-5 h-5 border-2 rounded justify-center items-center mr-2 ${checked ? "bg-teal-500 border-teal-500" : "border-gray-300"
                                            }`}
                                    >
                                        {checked && <Ionicons name="checkmark" size={16} color="white" />}
                                    </View>
                                    <Text className="text-base text-gray-800">
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Facilities (Placeholder) */}
                    <View className="mb-6">
                        <Text className="text-base text-gray-600 mb-2">
                            Facilities<Text className="text-red-700">*</Text>
                        </Text>
                        <View className="flex-row flex-wrap justify-between gap-4">
                            {Object.entries(formData.facilities).map(([type, checked]) => (
                                <TouchableOpacity
                                    key={type}
                                    className="flex-row items-center w-[45%] mb-3"
                                    onPress={() => togglePitchType(type)}
                                >
                                    <View
                                        className={`w-5 h-5 border-2 rounded justify-center items-center mr-2 ${checked ? "bg-teal-500 border-teal-500" : "border-gray-300"
                                            }`}
                                    >
                                        {checked && <Ionicons name="checkmark" size={16} color="white" />}
                                    </View>
                                    <Text className="text-base text-gray-800">
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <Text className="text-base text-gray-600 mb-2">Fees Range(PKR)*</Text>
                    <View className="flex flex-row justify-between mb-6 gap-x-4 w-full">
                        <TextInput
                            className="flex-1 border-b border-gray-300 py-3 text-base text-gray-800"
                            value={''}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                            placeholder="Min Fees"
                            keyboardType="numeric"
                        />
                        <TextInput
                            className="flex-1 border-b border-gray-300 py-3 text-base text-gray-800"
                            value={''}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                            placeholder="Max Fees"
                            keyboardType="numeric"
                        />
                    </View>
                    <View className="h-24" />
                </ScrollView>
                <FloatingActionButton
                    label="Save"
                    onPress={() => { }}
                />
            </View>
        </SafeAreaView>
    );
}
