import BottomSheetWrapper, { BottomSheetRef } from "@/components/BottomSheetWrapper";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import { ballTypes, groundTypes, match_on, matcheTimings, participateTypes, tournament_formats } from "@/constants/match";
import { sanitizeObject } from "@/lib/utils/common";
import { showAlert } from "@/store/features/alerts/alertSlice";
import { useCreateLookingForMutation } from "@/store/features/lookingFor/lookingForApi";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import * as Location from 'expo-location';
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const LookingTournamentScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const [createLookingFor, { isLoading, isError, error, isSuccess }] = useCreateLookingForMutation();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        region: "Lahore",
        // address: "",
        // team: "",
        ball_type: {
            ball: 'Leather',
            other: ''
        },
        ground_type: "",
        description: "",
        notify: true,
        match_on: "Weekdays",
        match_timing: "",
        tournament_format: "",
        participate_type: "Team",
        looking_for_type: 'team',
        address: "",
        city: "",
        location: {
            latitude: null,
            longitude: null,
        },
    });
    const [isLocationLoading, setIsLocationLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"location" | null>(null);
    const bottomSheetRef = useRef<BottomSheetRef>(null);

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

    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleInputChange = (key: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        const formattedDate = currentDate.toISOString().split("T")[0];
        handleInputChange("startDate", formattedDate);
        setShowDatePicker(false);
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="bg-white flex-1">
                <View className="flex-1">
                    <Header heading="Looking for tournament to join" />

                    <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
                        {/* Tournament Name */}
                        {/* <FloatingLabelInputBorderBottom
                            label="Tournament Name?"
                            value={formData.name}
                            onChangeText={(text) => handleInputChange("name", text)}
                        /> */}

                        {/* Matches On */}
                        <Text className="text-base font-semibold text-gray-800 mb-3">What is your playing role?</Text>
                        <View className="flex-row flex-wrap gap-2 mb-5">
                            {match_on.map((match) => (
                                <TouchableOpacity
                                    key={match}
                                    className={`px-4 py-2 rounded-full ${formData.match_on === match ? "bg-[#0e7ccb]" : "bg-gray-300"}`}
                                    onPress={() => handleInputChange("match_on", match)}
                                >
                                    <Text className={`${formData.match_on === match ? "text-white" : "text-gray-700"} text-sm`}>
                                        {match}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Region and Area */}
                        <FloatingLabelInputBorderBottom
                            label="Where?"
                            value={formData.region}
                            onChangeText={(text) => handleInputChange("region", text)}
                        />
                        {/* <FloatingLabelInputBorderBottom
                            label="Area in this city?"
                            value={formData.address}
                            onChangeText={(text) => handleInputChange("address", text)}
                        /> */}

                        {/* Participate Type */}
                        <Text className="text-base font-semibold text-gray-800 mb-3">Participate as a:</Text>
                        <View className="flex-row flex-wrap gap-2 mb-5">
                            {participateTypes.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    className={`px-4 py-2 rounded-full ${formData.participate_type === type ? "bg-[#0e7ccb]" : "bg-gray-300"}`}
                                    onPress={() => handleInputChange("participate_type", type)}
                                >
                                    <Text className={`${formData.participate_type === type ? "text-white" : "text-gray-700"} text-sm`}>
                                        {type}
                                    </Text>
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

                        {/* Match Timing */}
                        <Text className="text-base font-semibold text-gray-800 mb-3">Matches Timing</Text>
                        <View className="flex-row flex-wrap gap-2 mb-5">
                            {matcheTimings.map((time) => (
                                <TouchableOpacity
                                    key={time}
                                    className={`px-4 py-2 rounded-full ${formData.match_timing === time ? "bg-[#0e7ccb]" : "bg-gray-300"}`}
                                    onPress={() => handleInputChange("match_timing", time)}
                                >
                                    <Text className={`${formData.match_timing === time ? "text-white" : "text-gray-700"} text-sm`}>
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Tournament Format */}
                        <Text className="text-base font-semibold text-gray-800 mb-3">Tournament Formats</Text>
                        <View className="flex-row flex-wrap gap-2 mb-5">
                            {tournament_formats.map((format) => (
                                <TouchableOpacity
                                    key={format}
                                    className={`px-4 py-2 rounded-full ${formData.tournament_format === format ? "bg-[#0e7ccb]" : "bg-gray-300"}`}
                                    onPress={() => handleInputChange("tournament_format", format)}
                                >
                                    <Text className={`${formData.tournament_format === format ? "text-white" : "text-gray-700"} text-sm`}>
                                        {format}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Team Selection */}
                        {/* <FloatingLabelInputBorderBottom
                            label="Select your team (Optional)"
                            value={formData.team}
                            onChangeText={(text) => handleInputChange("team", text)}
                        /> */}

                        {/* Contact Method */}
                        <Text className="text-base font-semibold text-gray-800 mb-3">How do teams contact you?</Text>
                        <TouchableOpacity className="bg-[#0e7ccb] px-5 py-2 rounded-full self-start mb-6">
                            <Text className="text-white text-sm font-semibold">Cricdom DM</Text>
                        </TouchableOpacity>

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

                        <View className="space-y-2 mb-6">
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

                    {
                        !activeTab &&
                        <FloatingActionButton label="Save" onPress={handleSave} />
                    }

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

                    {/* Date Picker */}
                    {showDatePicker && (
                        <DateTimePicker
                            value={formData.match_timing ? new Date(formData.match_timing) : new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={handleDateChange}
                        />
                    )}
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default LookingTournamentScreen;
