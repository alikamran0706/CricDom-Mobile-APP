import FloatingActionButton from "@/components/ui/FloatingActionButton";
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from "@/components/ui/Header";
import { ballTypes } from "@/constants/match";
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

const LookingForCommentatorScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [createLookingFor] = useCreateLookingForMutation();

    const [formData, setFormData] = useState({
        region: "Lahore",
        // area: "",
        ground: "",
        ground_type: "Open Ground",
        hire_type: "Whole day",
        total_days: "1",
        matches_per_day: "1",
        per_day_fees: 1000,
        per_match_fees: 500,
        contact_method: "Cricdom DM",
        description: "",
        date_time: "",
        ball_type: {
            ball: 'Leather',
            other: ''
        },
        notify: true,
        looking_for_type: "commentator",
    });

    const [showDatePicker, setShowDatePicker] = useState(false);

    const types = ["Whole day", "Match", "Tournament"];
    const days = ["1", "2", "3", "4", "5+"];
    const matchesPerDay = ["1", "2", "3", "4", "5+"];
    const dailyBudgets = [1000, 1500, 2000, 3000,];
    const matchBudgets = [500, 1000, 1500, 2500];
    const contactMethods = ["DM", "Call", "WhatsApp"];

    const groundTypes = [
        { type: "Open Ground", image: require("../assets/images/stadium.png") },
        { type: "Box Cricket", image: require("../assets/images/net.png") },
    ];

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleInputChange = (field: keyof typeof formData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleBallTypeChange = (key: "ball" | "other", value: string | number) => {
        setFormData(prev => ({
            ...prev,
            ball_type: {
                ...prev.ball_type,
                [key]: value,
            }
        }));
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        const formattedDate = currentDate.toISOString().split("T")[0];
        handleInputChange("date_time", formattedDate);
        setShowDatePicker(false);
    };

    const handleSave = async () => {
        const cleanedData = sanitizeObject(formData);
        try {
            await createLookingFor({ data: cleanedData }).unwrap();
            dispatch(showAlert({ type: 'success', message: 'Looking for commentator post created!' }));
            router.replace({ pathname: '/looking-for-list', params: { refetch: 'true' } });
        } catch (error: any) {

             console.log(error?.response?.data || error.message || error || 'An unknown error occurred. tttttttttttt')
            dispatch(showAlert({
                type: "error",
                message: error?.response?.data || error.message || "Something went wrong.",
            }));
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                <Header heading="Looking for a commentator to hire" />

                <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
                    {/* Type */}
                    <Text className="text-base font-medium text-gray-800 mb-3">Need a commentator for?</Text>
                    <View className="flex-row flex-wrap mb-6">
                        {types.map((type) => (
                            <TouchableOpacity
                                key={type}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.hire_type === type ? "bg-[#0e7ccb]" : "bg-gray-200"}`}
                                onPress={() => handleInputChange("hire_type", type)}
                            >
                                <Text className={formData.hire_type === type ? "text-white" : "text-gray-700"}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Date */}
                    <TouchableOpacity className="mb-6" onPress={() => setShowDatePicker(true)}>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-base font-medium text-gray-600">
                                {formData.date_time || "When do you need a commentator?"}
                            </Text>
                            <Ionicons name="calendar-outline" size={20} color="gray" />
                        </View>
                        <View className="border-b border-gray-300 mt-2" />
                    </TouchableOpacity>

                    {/* Region, Area, Ground */}
                    <FloatingLabelInputBorderBottom
                        label="Where?"
                        value={formData.region}
                        onChangeText={(text) => handleInputChange("region", text)}
                    />
                    {/* <FloatingLabelInputBorderBottom
            label="Area in this city?"
            value={formData.area}
            onChangeText={(text) => handleInputChange("area", text)}
          /> */}
                    <FloatingLabelInputBorderBottom
                        label="Ground? (Optional)"
                        value={formData.ground}
                        onChangeText={(text) => handleInputChange("ground", text)}
                    />

                    {/* Ground Type */}
                    <Text className="text-base font-semibold text-gray-800 mb-3 mt-6">Ground Type?</Text>
                    <View className="flex-row justify-around mb-6">
                        {groundTypes.map((ground) => (
                            <TouchableOpacity
                                key={ground.type}
                                className={`items-center p-4 ${formData.ground_type === ground.type ? "bg-gray-200 rounded-lg" : ""}`}
                                onPress={() => handleInputChange("ground_type", ground.type)}
                            >
                                <Image source={ground.image} style={{ width: 35, height: 35, tintColor: '#6b7280', resizeMode: 'contain' }} />
                                <Text className="text-xs font-semibold text-gray-700 mt-2">{ground.type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Ball Type */}
                    <Text className="text-base font-semibold text-gray-800 mb-3">Ball Type?</Text>
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

                    {/* Days */}
                    <Text className="text-base font-medium text-gray-800 mb-3">For how many days?</Text>
                    <View className="flex-row flex-wrap mb-6">
                        {days.map((day) => (
                            <TouchableOpacity
                                key={day}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.total_days === day ? "bg-[#0e7ccb]" : "bg-gray-200"}`}
                                onPress={() => handleInputChange("total_days", day)}
                            >
                                <Text className={formData.total_days === day ? 'text-white' : "text-gray-700"}>{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Matches Per Day */}
                    <Text className="text-base font-medium text-gray-800 mb-3">Matches per day?</Text>
                    <View className="flex-row flex-wrap mb-6">
                        {matchesPerDay.map((match) => (
                            <TouchableOpacity
                                key={match}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.matches_per_day === match ? "bg-[#0e7ccb]" : "bg-gray-200"}`}
                                onPress={() => handleInputChange("matches_per_day", match)}
                            >
                                <Text className={formData.matches_per_day === match ? "text-white" : "text-gray-700"}>{match}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Budget Per Day */}
                    <Text className="text-base font-medium text-gray-800 mb-3">Budget (Per day in PKR)?</Text>
                    <View className="flex-row flex-wrap mb-6">
                        {dailyBudgets.map((budget) => (
                            <TouchableOpacity
                                key={budget}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.per_day_fees === budget ? "bg-[#0e7ccb]" : "bg-gray-200"}`}
                                onPress={() => handleInputChange("per_day_fees", budget)}
                            >
                                <Text className={formData.per_day_fees === budget ? "text-white" : "text-gray-700"}>{budget}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Budget Per Match */}
                    <Text className="text-base font-medium text-gray-800 mb-3">Budget (Per match in PKR)?</Text>
                    <View className="flex-row flex-wrap mb-6">
                        {matchBudgets.map((budget) => (
                            <TouchableOpacity
                                key={budget}
                                className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.per_match_fees === budget ? "bg-[#0e7ccb]" : "bg-gray-200"}`}
                                onPress={() => handleInputChange("per_match_fees", budget)}
                            >
                                <Text className={formData.per_match_fees === budget ? "text-white" : "text-gray-700"}>{budget}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Contact Method */}
                    <Text className="text-base font-medium text-gray-800 mb-3">How can commentators contact you?</Text>
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

                    {/* Description */}
                    <View className="mb-8">
                        <TextInput
                            className="border border-gray-300 rounded-lg p-4 text-base text-gray-800 min-h-32"
                            value={formData.description}
                            onChangeText={(text) => handleInputChange("description", text)}
                            placeholder="Write details like how many matches or days you need a commentator for?"
                            multiline
                            textAlignVertical="top"
                            maxLength={280}
                        />
                        <Text className="text-right text-gray-400 text-sm mt-1">{formData.description.length}/280</Text>
                    </View>
                </ScrollView>

                {showDatePicker && (
                    <DateTimePicker
                        value={formData.date_time ? new Date(formData.date_time) : new Date()}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={handleDateChange}
                    />
                )}

                <FloatingActionButton label="Save" onPress={handleSave} />
            </View>
        </SafeAreaView>
    );
};

export default LookingForCommentatorScreen;
