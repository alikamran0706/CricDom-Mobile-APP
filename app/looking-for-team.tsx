import FloatingActionButton from "@/components/ui/FloatingActionButton";
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from "@/components/ui/Header";
import { ballTypes } from "@/constants/match";
import { showAlert } from "@/store/features/alerts/alertSlice";
import { useCreateLookingForMutation } from "@/store/features/lookingFor/lookingForApi";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const TournamentScreen = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        region: "Lahore",
        selectedRole: "",
        area: "",
        selectedBallType: "",
        selectedGroundType: "",
        details: "",
        notifyEnabled: true,
    });

    const [createLookingFor, { isLoading, isError, error, isSuccess }] = useCreateLookingForMutation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const roles = ["Batter", "Bowler", "All-rounder", "Wicket-keeper"];
    const groundTypes = [
        { type: "Open Ground", image: require("../assets/images/stadium.png") },
        { type: "Box Cricket", image: require("../assets/images/net.png") },
    ];

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const onSave = async () => {
        console.log('Clickedd')
        try {
            await createLookingFor({ data: formData }).unwrap();
            dispatch(showAlert({ type: 'success', message: 'Looking for team created successfully!' }));
            router.replace({
                pathname: '/personal-coaching',
                params: { refetch: 'true' }
            });
        } catch (error: any) {
            dispatch(
                showAlert({
                    type: "error",
                    message:
                        error?.response?.data ||
                        error.message ||
                        isError ||
                        "An unknown error occurred.",
                })
            );
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                <Header heading="Looking for an opponent to play" />

                <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
                    <Text className="text-base font-semibold text-gray-800 mb-3">What is your playing role?</Text>
                    <View className="flex-row flex-wrap gap-2 mb-5">
                        {roles.map((role) => (
                            <TouchableOpacity
                                key={role}
                                className={`px-4 py-2 rounded-full ${formData.selectedRole === role ? "bg-red-700" : "bg-gray-300"
                                    }`}
                                onPress={() => handleChange("selectedRole", role)}
                            >
                                <Text
                                    className={`${formData.selectedRole === role ? "text-white" : "text-gray-700"
                                        } text-sm`}
                                >
                                    {role}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <FloatingLabelInputBorderBottom
                        label="Which region?"
                        value={formData.region}
                        onChangeText={(text) => handleChange("region", text)}
                    />

                    <FloatingLabelInputBorderBottom
                        label="Area in this city?"
                        value={formData.area}
                        onChangeText={(text) => handleChange("area", text)}
                    />

                    <Text className="text-base font-semibold text-gray-800 mt-2 mb-3">Any preferences for ball type?</Text>
                    <View className="flex-row justify-around mb-6">
                        {ballTypes.map((ball) => (
                            <TouchableOpacity key={ball.type} className="items-center" onPress={() => handleChange("selectedBallType", ball.type)}>
                                <View
                                    className={`w-16 h-16 rounded-full items-center justify-center mb-2 
                    ${formData.selectedBallType === ball.type ? "border border-[#0e7ccb]" : "border border-gray-300"}`}
                                >
                                    <Ionicons name={ball.icon as any} size={24} color={ball.color} />
                                </View>
                                <Text className="text-gray-800 font-medium">{ball.type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text className="text-base font-semibold text-gray-800 mb-3">Ground Type?</Text>
                    <View className="flex-row justify-around mb-6">
                        {groundTypes.map((ground) => (
                            <TouchableOpacity
                                key={ground.type}
                                className={`items-center p-4 ${formData.selectedGroundType === ground.type ? "bg-gray-200 rounded-lg" : ""
                                    }`}
                                onPress={() => handleChange("selectedGroundType", ground.type)}
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

                    <Text className="text-base font-semibold text-gray-800 mb-3">How do teams contact you?</Text>
                    <TouchableOpacity className="bg-[#0e7ccb] px-5 py-2 rounded-full self-start mb-6">
                        <Text className="text-white text-sm font-semibold">Cricdom DM</Text>
                    </TouchableOpacity>

                    <TextInput
                        className="border border-gray-300 rounded-lg p-3 text-sm text-gray-700 h-32 text-top"
                        value={formData.details}
                        onChangeText={(text) => handleChange("details", text)}
                        placeholder="Write details like your role, playing for a tournament or Friendly match, match fees, etc."
                        multiline
                        maxLength={280}
                    />
                    <Text className="text-right text-xs text-gray-500 mt-1 mb-6">{formData.details.length}/280</Text>

                    <View className="flex-row justify-between items-center mb-6">
                        <View className="flex-1 mr-4">
                            <Text className="text-base font-semibold text-gray-800">Notify me for relevant post</Text>
                            <Text className="text-xs text-gray-600 mt-1">
                                We will send you a notification when something is posted related to what you are looking for.
                            </Text>
                        </View>
                        <TouchableOpacity
                            className={`w-12 h-7 rounded-full justify-center px-1 ${formData.notifyEnabled ? "bg-[#0e7ccb]" : "bg-gray-300"
                                }`}
                            onPress={() => handleChange("notifyEnabled", !formData.notifyEnabled)}
                        >
                            <View
                                className={`w-6 h-6 rounded-full bg-white ${formData.notifyEnabled ? "self-end" : "self-start"
                                    }`}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <FloatingActionButton label="Save" onPress={onSave} disabled={isLoading} loading={isLoading} />
            </View>
        </SafeAreaView>
    );
};

export default TournamentScreen;
