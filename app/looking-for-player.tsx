import FloatingActionButton from "@/components/ui/FloatingActionButton";
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from "@/components/ui/Header";
import { ballTypes } from "@/constants/match";
import { sanitizeObject } from "@/lib/utils/common";
import { showAlert } from "@/store/features/alerts/alertSlice";
import { useCreateLookingForMutation } from "@/store/features/lookingFor/lookingForApi";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const LookingForPlayerScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const [createLookingFor, { isLoading, isError, error, isSuccess }] = useCreateLookingForMutation();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        participate_type: "",
        region: "Lahore",
        // area: "",
        team: "",
        ball_type: {
            ball: 'Leather',
            other: ''
        },
        ground_type: "",
        contact_method: "Cricdom DM",
        description: "",
        notify: true,
        looking_for_type: "player", // this could be helpful for backend identification
    });

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const groundTypes = [
        { type: "Open Ground", image: require("../assets/images/stadium.png") },
        { type: "Box Cricket", image: require("../assets/images/net.png") },
    ];

    const roles = ["Batter", "Bowler", "All-rounder", "Wicket-keeper"];
    const contactMethods = ["DM", "Call", "WhatsApp"];

    const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleBallTypeChange = (key: "ball" | "other", value: string) => {
        setFormData(prev => ({
            ...prev,
            ball_type: {
                ...prev.ball_type,
                [key]: value,
            }
        }));
    };

    const handleSave = async () => {
        const cleanedData = sanitizeObject(formData);
        try {
            await createLookingFor({ data: cleanedData }).unwrap();
            dispatch(showAlert({ type: 'success', message: 'Looking for tournament created successfully!' }));
            router.replace({
                pathname: '/looking-for-list',
                params: { refetch: 'true' }
            });
        } catch (error: any) {
            dispatch(
                showAlert({
                    type: "error",
                    message:
                        error?.response?.data ||
                        error.message ||
                        "An unknown error occurred.",
                })
            );
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                <Header heading="Looking for a player to join team" />

                <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
                    {/* Role */}
                    <Text className="text-base font-semibold text-gray-800 mb-3">What is your playing role?</Text>
                    <View className="flex-row flex-wrap gap-2 mb-5">
                        {roles.map((role) => (
                            <TouchableOpacity
                                key={role}
                                className={`px-4 py-2 rounded-full ${formData.participate_type === role ? "bg-red-700" : "bg-gray-300"}`}
                                onPress={() => handleInputChange("participate_type", role)}
                            >
                                <Text className={`${formData.participate_type === role ? "text-white" : "text-gray-700"} text-sm`}>
                                    {role}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Region */}
                    <FloatingLabelInputBorderBottom
                        label="Where is your match?"
                        value={formData.region}
                        onChangeText={(text) => handleInputChange("region", text)}
                    />

                    {/* Area */}
                    {/* <FloatingLabelInputBorderBottom
                        label="Area in this city?"
                        value={formData.area}
                        onChangeText={(text) => handleInputChange("area", text)}
                    /> */}

                    {/* Team */}
                    {/* <FloatingLabelInputBorderBottom
                        label="Select your team (Optional)"
                        value={formData.team}
                        onChangeText={(text) => handleInputChange("team", text)}
                    /> */}

                    {/* Ball Type */}
                    <Text className="text-base font-semibold text-gray-800 mb-3">Any preferences for ball type?</Text>
                    <View className="flex-row justify-around mb-6">
                        {ballTypes.map((ball) => (
                            <TouchableOpacity key={ball.type} className="items-center" onPress={() => handleBallTypeChange(ball.field as "ball" | "other", ball.type)}>
                                <View
                                    className={`w-16 h-16 rounded-full items-center justify-center mb-2 
                                    ${formData.ball_type[ball.field as "ball" | "other"] === ball.type ? "border border-[#0e7ccb]" : "border border-gray-300"}`}
                                >
                                    <Ionicons name={ball.icon as any} size={24} color={ball.color} />
                                </View>
                                <Text className="text-gray-800 font-medium">{ball.type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Ground Type */}
                    <Text className="text-base font-semibold text-gray-800 mb-3">Ground Type?</Text>
                    <View className="flex-row justify-around mb-6">
                        {groundTypes.map((ground) => (
                            <TouchableOpacity
                                key={ground.type}
                                className={`items-center p-4 ${formData.ground_type === ground.type ? "bg-gray-200 rounded-lg" : ""}`}
                                onPress={() => handleInputChange("ground_type", ground.type)}
                            >
                                <Image
                                    source={ground.image}
                                    style={{
                                        width: 35,
                                        height: 35,
                                        tintColor: "#6b7280",
                                        resizeMode: "contain",
                                    }}
                                />
                                <Text className="text-xs font-semibold text-gray-700 mt-2">{ground.type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Contact Method */}
                    <Text className="text-base font-medium text-gray-800 mb-3">How do players contact you?</Text>
                    <View className="flex-row flex-wrap mb-6">
                        {contactMethods.map((method) => (
                            <TouchableOpacity
                                key={method}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.contact_method === method ? "bg-[#0e7ccb]" : "bg-gray-200"}`}
                                onPress={() => handleInputChange("contact_method", method)}
                            >
                                <Text className={formData.contact_method === method ? "text-white" : "text-gray-700"}>{method}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Details */}
                    <TextInput
                        className="border border-gray-300 rounded-lg p-3 text-sm text-gray-700 h-32 text-top"
                        value={formData.description}
                        onChangeText={(text) => handleInputChange("description", text)}
                        placeholder="Write details like match overs and Ground cost - free, shared or losers to pay."
                        multiline
                        maxLength={280}
                    />
                    <Text className="text-right text-xs text-gray-500 mt-1 mb-6">{formData.description.length}/280</Text>

                    {/* Notification Toggle */}
                    <View className="flex-row justify-between items-center mb-6">
                        <View className="flex-1 mr-4">
                            <Text className="text-base font-semibold text-gray-800">Notify me for relevant post</Text>
                            <Text className="text-xs text-gray-600 mt-1">
                                We will send you a notification when something is posted related to what you are looking for.
                            </Text>
                        </View>
                        <TouchableOpacity
                            className={`w-12 h-7 rounded-full justify-center px-1 ${formData.notify ? "bg-[#0e7ccb]" : "bg-gray-300"}`}
                            onPress={() => handleInputChange("notify", !formData.notify)}
                        >
                            <View
                                className={`w-6 h-6 rounded-full bg-white ${formData.notify ? "self-end" : "self-start"}`}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <FloatingActionButton label="Save" onPress={handleSave} />
            </View>
        </SafeAreaView>
    );
};

export default LookingForPlayerScreen;
