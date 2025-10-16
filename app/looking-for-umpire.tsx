import FloatingActionButton from "@/components/ui/FloatingActionButton";
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from "@/components/ui/Header";
import {
    ballTypes,
    contactMethods,
    dailyBudgets,
    days,
    groundTypes,
    matchBudgets,
    matchesPerDay,
    types,
} from "@/constants/match";
import { sanitizeObject } from "@/lib/utils/common";
import { showAlert } from "@/store/features/alerts/alertSlice";
import { useCreateLookingForMutation } from "@/store/features/lookingFor/lookingForApi";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
    Image,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const LookingForUmpireScreen = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [createLookingFor, { isLoading }] = useCreateLookingForMutation();
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    // 🆕 Single state for all form data
    const [formData, setFormData] = useState({
        type: "Whole day",
        ground_type: "Open Ground",
        days: "1",
        matches_per_day: "1",
        budget_per_day: "",
        budget_per_match: "",
        contact_method: "Cricdom DM",
        location: "Lahore",
        address: "",
        description: "",
        date_time: "",
        ball_type: {
            ball: '',
            other: ''
        },
    });

    const updateFormField = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDateChange = (_field: "start_date" | "end_date", event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        const formattedDate = currentDate.toISOString().split("T")[0];
        updateFormField("date_time", formattedDate);
        setShowEndDatePicker(false);
    };

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleBallTypeChange = (key: "ball" | "other", value: string) => {
        setFormData(prev => ({
            ...prev,
            ball_type: {
                ...prev.ball_type,
                [key]: value,
            }
        }));
    };

    const onSave = async () => {
        const cleanedData = sanitizeObject(formData);

        try {
            await createLookingFor({ data: cleanedData }).unwrap();
            dispatch(showAlert({ type: "success", message: "Looking for umpire created successfully!" }));

            router.replace({
                pathname: "/looking-for-list",
                params: { refetch: "true" },
            });
        } catch (error: any) {
            dispatch(
                showAlert({
                    type: "error",
                    message:
                        error?.data?.error?.message || error?.message || "An unknown error occurred.",
                })
            );
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                <Header heading="Looking for an umpire to hire" />

                <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 80 }}>
                    {/* Type */}
                    <Text className="text-base font-medium text-gray-800 mb-3">Need an umpire for?</Text>
                    <View className="flex-row flex-wrap mb-6">
                        {types.map((type) => (
                            <TouchableOpacity
                                key={type}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.type === type ? "bg-gray-300" : "bg-gray-200"
                                    }`}
                                onPress={() => updateFormField("type", type)}
                            >
                                <Text className="text-gray-700">{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Hire date */}
                    <TouchableOpacity className="mb-6" onPress={() => setShowEndDatePicker(true)}>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-base font-medium text-gray-600">
                                {formData.date_time || "When do you need umpire?"}
                            </Text>
                            <Ionicons name="calendar-outline" size={20} color="gray" />
                        </View>
                        <View className="border-b border-gray-300 mt-2"></View>
                    </TouchableOpacity>

                    {/* Location / Area / Ground */}
                    <FloatingLabelInputBorderBottom label="Where?" value={formData.location} onChangeText={(val) => updateFormField("location", val)} />
                    <FloatingLabelInputBorderBottom label="Area in this city?" value={formData.address} onChangeText={(val) => updateFormField("address", val)} />

                    {/* Ball type */}
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

                    {/* Ground type */}
                    <Text className="text-base font-semibold text-gray-800 mb-3">Ground Type?</Text>
                    <View className="flex-row justify-around mb-6">
                        {groundTypes.map((ground) => (
                            <TouchableOpacity
                                key={ground.type}
                                className={`items-center p-4 ${formData.ground_type === ground.type ? "bg-gray-200 rounded-lg" : ""}`}
                                onPress={() => updateFormField("ground_type", ground.type)}
                            >
                                <Image source={ground.image} style={{ width: 35, height: 35, tintColor: "#6b7280", resizeMode: "contain" }} />
                                <Text className="text-xs font-semibold text-gray-700 mt-2">{ground.type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Days */}
                    <Text className="text-base font-medium text-gray-800 mb-3">For how many days?</Text>
                    <View className="flex-row flex-wrap mb-6">
                        {days.map((day) => (
                            <TouchableOpacity
                                key={day}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.days === day ? "bg-[#0e7ccb]" : "bg-gray-200"
                                    }`}
                                onPress={() => updateFormField("days", day)}
                            >
                                <Text className={formData.days === day ? "text-white" : "text-gray-700"}>{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Matches per day */}
                    <Text className="text-base font-medium text-gray-800 mb-3">Matches per day?</Text>
                    <View className="flex-row flex-wrap mb-6">
                        {matchesPerDay.map((match) => (
                            <TouchableOpacity
                                key={match}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.matches_per_day === match ? "bg-[#0e7ccb]" : "bg-gray-200"
                                    }`}
                                onPress={() => updateFormField("matches_per_day", match)}
                            >
                                <Text className={formData.matches_per_day === match ? "text-white" : "text-gray-700"}>{match}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Budget per day */}
                    <Text className="text-base font-medium text-gray-800 mb-3">Budget (Per day in PKR)?</Text>
                    <View className="flex-row flex-wrap mb-6">
                        {dailyBudgets.map((budget) => (
                            <TouchableOpacity
                                key={budget}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.budget_per_day === budget ? "bg-[#0e7ccb]" : "bg-gray-200"
                                    }`}
                                onPress={() => updateFormField("budget_per_day", budget)}
                            >
                                <Text className={formData.budget_per_day === budget ? "text-white" : "text-gray-700"}>{budget}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Budget per match */}
                    <Text className="text-base font-medium text-gray-800 mb-3">Budget (Per match in PKR)?</Text>
                    <View className="flex-row flex-wrap mb-6">
                        {matchBudgets.map((budget) => (
                            <TouchableOpacity
                                key={budget}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.budget_per_match === budget ? "bg-[#0e7ccb]" : "bg-gray-200"
                                    }`}
                                onPress={() => updateFormField("budget_per_match", budget)}
                            >
                                <Text className={formData.budget_per_match === budget ? "text-white" : "text-gray-700"}>{budget}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Contact method */}
                    <Text className="text-base font-medium text-gray-800 mb-3">How can umpire contact you?</Text>
                    <View className="flex-row flex-wrap mb-6">
                        {contactMethods.map((method) => (
                            <TouchableOpacity
                                key={method}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.contact_method === method ? "bg-[#0e7ccb]" : "bg-gray-200"
                                    }`}
                                onPress={() => updateFormField("contact_method", method)}
                            >
                                <Text className={formData.contact_method === method ? "text-white" : "text-gray-700"}>{method}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Details */}
                    <TextInput
                        className="border border-gray-300 rounded-lg p-4 text-base text-gray-800 min-h-32"
                        value={formData.description}
                        onChangeText={(val) => updateFormField("description", val)}
                        placeholder="Write details like for how many days or matches do You need umpire for?"
                        multiline
                        textAlignVertical="top"
                    />
                    <Text className="text-right text-gray-400 text-sm mt-1">{formData.description.length}/280</Text>
                </ScrollView>

                {/* Date Picker */}
                {
                    showEndDatePicker && (
                        <DateTimePicker
                            value={formData.date_time ? new Date(formData.date_time) : new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(event, date) => handleDateChange("end_date", event, date)}
                        />
                    )
                }

                <FloatingActionButton label="Save" onPress={onSave} disabled={isLoading} loading={isLoading} />
            </View >
        </SafeAreaView >
    );
};

export default LookingForUmpireScreen;
