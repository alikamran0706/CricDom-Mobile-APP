import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateLookingScreen = () => {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedDateType, setSelectedDateType] = useState("");
    const [selectedBallType, setSelectedBallType] = useState("");
    const [selectedGroundType, setSelectedGroundType] = useState("");
    const [selectedContact, setSelectedContact] = useState("CricHeroes DM");
    const [formData, setFormData] = useState({
        region: "Lahore",
        area: "",
        team: "",
    });
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const roles = ["Batter", "Bowler", "All-rounder", "Wicket-keeper"];
    const dateTypes = ["Long Term", "Specific Date"];
    const ballTypes = [
        { type: "TENNIS", color: "#84cc16", icon: "tennis" },
        { type: "LEATHER", color: "#dc2626", icon: "baseball" },
        { type: "OTHER", color: "#f59e0b", icon: "ellipse" },
    ];
    const groundTypes = [
        { type: "Open Ground", icon: "golf-outline" },
        { type: "Box Cricket", icon: "grid-outline" },
    ];
    const contactMethods = ["CricHeroes DM", "Call", "WhatsApp"];

    const updateFormData = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-red-600 px-4 py-3">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-white ml-4">Looking for a team</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 py-6">
                {/* Role Selection */}
                <View className="mb-6">
                    <Text className="text-base font-medium text-gray-800 mb-3">What role are you looking for?</Text>
                    <View className="flex-row flex-wrap">
                        {roles.map((role) => (
                            <TouchableOpacity
                                key={role}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${selectedRole === role ? "bg-gray-300" : "bg-gray-200"}`}
                                onPress={() => setSelectedRole(role)}
                            >
                                <Text className="text-gray-700">{role}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Region */}
                <View className="mb-6">
                    <Text className="text-base font-medium text-gray-600 mb-2">Which region?</Text>
                    <TextInput
                        className="border-b border-gray-300 pb-2 text-base text-gray-800"
                        value={formData.region}
                        onChangeText={(text) => updateFormData("region", text)}
                        placeholder="Enter region"
                    />
                </View>

                {/* Area */}
                <View className="mb-6">
                    <Text className="text-base font-medium text-gray-600 mb-2">Area in this city?</Text>
                    <TextInput
                        className="border-b border-gray-300 pb-2 text-base text-gray-800"
                        value={formData.area}
                        onChangeText={(text) => updateFormData("area", text)}
                        placeholder="Enter area"
                    />
                </View>

                {/* Team Selection */}
                <View className="mb-6">
                    <Text className="text-base font-medium text-gray-600 mb-2">Select your team (Optional)</Text>
                    <TextInput
                        className="border-b border-gray-300 pb-2 text-base text-gray-800"
                        value={formData.team}
                        onChangeText={(text) => updateFormData("team", text)}
                        placeholder="Enter team name"
                    />
                </View>

                {/* Date and Time */}
                <View className="mb-6">
                    <Text className="text-base font-medium text-gray-800 mb-3">Date and Time (Optional)</Text>
                    <View className="flex-row">
                        {dateTypes.map((type) => (
                            <TouchableOpacity
                                key={type}
                                className="flex-row items-center mr-6"
                                onPress={() => setSelectedDateType(type)}
                            >
                                <View
                                    className={`w-5 h-5 rounded-full border-2 mr-2 ${selectedDateType === type ? "border-green-500 bg-green-500" : "border-gray-400"
                                        }`}
                                >
                                    {selectedDateType === type && <View className="w-2 h-2 bg-white rounded-full m-auto" />}
                                </View>
                                <Text className="text-gray-700">{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Ball Type Preference */}
                <View className="mb-6">
                    <Text className="text-base font-medium text-gray-800 mb-3">Any preferences for ball type?</Text>
                    <View className="flex-row justify-around">
                        {ballTypes.map((ball) => (
                            <TouchableOpacity
                                key={ball.type}
                                className={`items-center p-4 rounded-xl ${selectedBallType === ball.type ? "bg-blue-100" : "bg-gray-100"}`}
                                onPress={() => setSelectedBallType(ball.type)}
                            >
                                <View
                                    className="w-12 h-12 rounded-full mb-2 items-center justify-center"
                                    style={{ backgroundColor: ball.color }}
                                >
                                    <Ionicons name={ball.icon as any} size={24} color="white" />
                                </View>
                                <Text className="text-gray-800 font-medium">{ball.type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Ground Type */}
                <View className="mb-6">
                    <Text className="text-base font-medium text-gray-800 mb-3">Ground Type?</Text>
                    <View className="flex-row">
                        {groundTypes.map((ground) => (
                            <TouchableOpacity
                                key={ground.type}
                                className={`flex-1 items-center p-4 rounded-xl mr-2 ${selectedGroundType === ground.type ? "bg-blue-100" : "bg-gray-100"
                                    }`}
                                onPress={() => setSelectedGroundType(ground.type)}
                            >
                                <View className="w-12 h-12 bg-gray-300 rounded-full mb-2 items-center justify-center">
                                    <Ionicons name={ground.icon as any} size={24} color="#666" />
                                </View>
                                <Text className="text-gray-800 font-medium">{ground.type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Contact Method */}
                <View className="mb-8">
                    <Text className="text-base font-medium text-gray-800 mb-3">How do players contact you?</Text>
                    <View className="flex-row flex-wrap">
                        {contactMethods.map((method) => (
                            <TouchableOpacity
                                key={method}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${selectedContact === method ? "bg-green-500" : "bg-gray-200"
                                    }`}
                                onPress={() => setSelectedContact(method)}
                            >
                                <Text className={selectedContact === method ? "text-white" : "text-gray-700"}>{method}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Post Button */}
            <View className="p-4 bg-white border-t border-gray-200">
                <TouchableOpacity className="bg-green-500 rounded-xl py-4">
                    <Text className="text-center text-white font-semibold text-lg">POST</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CreateLookingScreen
