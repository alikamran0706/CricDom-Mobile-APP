import BottomSheetWrapper, { BottomSheetRef } from "@/components/BottomSheetWrapper";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
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
import { BlurView } from "expo-blur";
import * as Location from 'expo-location';
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import {
    ActivityIndicator, Image,
    Platform,
    ScrollView, StyleSheet, Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
        description: "",
        date_time: "",
        ball_type: {
            ball: '',
            other: ''
        },
        address: "",
        city: "",
        location: {
            latitude: null,
            longitude: null,
        },
    });
    const [activeTab, setActiveTab] = useState<"location" | null>(null);
    const bottomSheetRef = useRef<BottomSheetRef>(null);
    const [isLocationLoading, setIsLocationLoading] = useState(false);

    const openLocationSheet = () => {
        setActiveTab("location");
        bottomSheetRef.current?.open();
    };

    const closePerformanceForm = () => {
        bottomSheetRef.current?.close();
        setActiveTab(null);
    };

    const getCurrentLocation = async () => {

        // Ask for permission
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            alert('Permission to access location was denied. Please enable it in settings to use this feature.');
            return;
        }
        setIsLocationLoading(true);

        try {
            const location = await Location.getCurrentPositionAsync({});
            const address = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            const locationInfo = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };



            setFormData((prev: any) => ({
                ...prev,
                location: locationInfo,
                address: address?.[0]
                    ? `${address[0].name}, ${address[0].region}`
                    : "Unknown Location",
                city: address?.[0]
                    ? `${address[0].city}`
                    : "Unknown Location",
            }));

        } catch (err) {
            alert("Could not fetch your location. Try again.");
        } finally {
            setIsLocationLoading(false);
        }
    };

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

    const handleSave = async () => {
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
        <GestureHandlerRootView style={{ flex: 1 }}>
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

                        <View className="space-y-2 mb-4">
                            <Text className="text-base font-medium text-gray-800">Location</Text>

                            {/* Show current location if already set */}
                            {formData.address ? (
                                <Text className="text-sm text-gray-600">📍 {formData.address}</Text>
                            ) : (
                                <Text className="text-sm text-gray-400">No location selected</Text>
                            )}

                            <View className="flex-row gap-x-2 mt-2">
                                <TouchableOpacity
                                    onPress={getCurrentLocation}
                                    disabled={isLocationLoading}
                                    style={{
                                        backgroundColor: '#0e7ccb',
                                        paddingHorizontal: 16,
                                        paddingVertical: 12,
                                        borderRadius: 8,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        height: 48, // ✅ Keep height fixed
                                        opacity: isLocationLoading ? 0.7 : 1,
                                    }}
                                >
                                    <View style={{ minWidth: 160, alignItems: 'center' }}>
                                        {isLocationLoading ? (
                                            <ActivityIndicator color="white" />
                                        ) : (
                                            <Text style={{ color: 'white', fontWeight: '600' }}>Use Current Location</Text>
                                        )}
                                    </View>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={openLocationSheet}
                                    className="bg-gray-200 px-4 flex items-center justify-center rounded-lg"
                                >
                                    <Text className="text-gray-800 font-medium">Add Manually</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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

                    {!activeTab && (
                        <FloatingActionButton label="Save" loading={isLoading} onPress={handleSave} />
                    )}

                    {activeTab && (
                        <View style={StyleSheet.absoluteFill}>
                            <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
                        </View>
                    )}

                    <BottomSheetWrapper
                        ref={bottomSheetRef}
                        onClose={closePerformanceForm}
                    >
                        {activeTab === "location" && (
                            <View className="flex-1 px-4">
                                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>Enter Location Manually</Text>
                                <ScrollView showsVerticalScrollIndicator={false} className="max-h-[28rem] py-4">
                                    <View className="space-y-4">
                                        <Input
                                            label="Address"
                                            value={formData.address}
                                            onChangeText={(val) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    address: val,
                                                }))
                                            }
                                            placeholder="Enter address"
                                        />
                                        <Input
                                            label="City"
                                            value={formData.city}
                                            onChangeText={(val) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    city: val,
                                                }))
                                            }
                                            placeholder="Enter address"
                                        />
                                        <Input
                                            label="Latitude"
                                            value={(formData.location.latitude as number | null)?.toString() || ""}
                                            onChangeText={(val) =>
                                                setFormData((prev: any) => ({
                                                    ...prev,
                                                    location: {
                                                        ...prev.location,
                                                        latitude: val ? parseFloat(val) : null,
                                                    },
                                                }))
                                            }
                                            placeholder="Enter latitude"
                                            keyboardType="numeric"
                                        />
                                        <Input
                                            label="Longitude"
                                            value={(formData.location.longitude as number | null)?.toString() || ""}
                                            onChangeText={(val) =>
                                                setFormData((prev: any) => ({
                                                    ...prev,
                                                    location: {
                                                        ...prev.location,
                                                        longitude: val ? parseFloat(val) : null,
                                                    },
                                                }))
                                            }
                                            placeholder="Enter longitude"
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                        )}
                    </BottomSheetWrapper>

                </View >
            </SafeAreaView >
        </GestureHandlerRootView>
    );
};

export default LookingForUmpireScreen;
