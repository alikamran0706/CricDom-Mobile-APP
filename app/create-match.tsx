import BottomSheetWrapper, { BottomSheetRef } from "@/components/BottomSheetWrapper";
import ImagePickerButton from "@/components/ImagePickerButton";
import Dropdown from "@/components/ui/Dropdown";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Input from "@/components/ui/Input";
import { matchTypes } from "@/constants/match";
import { sanitizeObject } from "@/lib/utils/common";
import { RootState } from "@/store";
import { showAlert } from "@/store/features/alerts/alertSlice";
import { useGetLeaguesQuery } from "@/store/features/league/leagueApi";
import { useCreateMatchMutation } from "@/store/features/match/matchApi";
import { useGetTeamsQuery } from "@/store/features/team/teamApi";
import { useUploadFileMutation } from "@/store/features/upload/uploadApi";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import * as Location from 'expo-location';
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function CreateMatch() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.profile);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showTeamADropdown, setShowTeamADropdown] = useState(false);
    const [showTeamBDropdown, setShowTeamBDropdown] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showMatchTypeDropdown, setShowMatchTypeDropdown] = useState(false);
    const [activeTab, setActiveTab] = useState<"league" | "location" | null>(null);
    const [createMatch, { isLoading, error }] = useCreateMatchMutation();
    const bottomSheetRef = useRef<BottomSheetRef>(null);
    const [uploadFile] = useUploadFileMutation();
    const [isLocationLoading, setIsLocationLoading] = useState(false);
    const { data: leaguesData } = useGetLeaguesQuery({ page: 1, pageSize: 20, creatorId: user?.documentId, });

    const [formData, setFormData] = useState<{
        overs_limit: string;
        description: string;
        start_date: string;
        end_date: string;
        team_a: string;
        team_b: string;
        match_type: string;
        match_creator: any;
        image: string;
        league: string | null;
        location: {
            address: string;
            latitude: number | null;
            longitude: number | null;
        };
    }>({
        overs_limit: "",
        description: "",
        start_date: "",
        end_date: "",
        team_a: "",
        team_b: "",
        match_type: "",
        match_creator: user?.documentId,
        image: "",
        league: null,
        location: {
            address: "",
            latitude: null,
            longitude: null,
        },
    });

    const openLocationSheet = () => {
        setActiveTab("location");
        bottomSheetRef.current?.open();
    };

    const openLeagueSheet = () => {
        bottomSheetRef.current?.open();
        setActiveTab('league');
    };

    const closeSheet = () => {
        bottomSheetRef.current?.close()
        setActiveTab(null);
    };

    const navigation = useNavigation();

    const loadMoreTeams = () => {
        if (!isFetchingTeams) setTeamPage((prev) => prev + 1);
    };
    const [teamPage, setTeamPage] = useState(1);
    const { data: teamsData, isFetching: isFetchingTeams } = useGetTeamsQuery({
        page: teamPage,
        pageSize: 12,
    });
    // Prepare dropdown options
    const teamOptions = teamsData?.data?.map((team: any) => ({
        label: team?.name,
        value: team?.documentId,
    })) || [];

    const closePerformanceForm = () => {
        bottomSheetRef.current?.close();
        setActiveTab(null);
    };

    const leagues = leaguesData?.data || [];

    const updateForm = (field: string) => (value: any) =>
        setFormData((prev: any) => ({ ...prev, [field]: value }));

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

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
                address: address?.[0]
                    ? `${address[0].name}, ${address[0].city}, ${address[0].region}`
                    : "Unknown Location",
            };

            setFormData(prev => ({
                ...prev,
                location: locationInfo
            }));

        } catch (err) {
            alert("Could not fetch your location. Try again.");
        } finally {
            setIsLocationLoading(false);
        }
    };


    const uploadImageAndGetId = async (): Promise<number | null> => {
        if (!formData.image) return null;

        try {
            const imageId = await uploadFile({ image: formData.image }).unwrap().then(res => res[0]?.id);
            return imageId;
        } catch (uploadError) {
            dispatch(
                showAlert({
                    type: 'error',
                    message: 'Could not upload the image.',
                })
            );
            return null;
        }
    };

    const handleSave = async () => {
        if (formData.team_a === formData.team_b) {
            alert("Team A and Team B must be different.");
            return;
        }

        // Remove empty or null fields
        const cleanedData = sanitizeObject(formData);

        let imageId: number | null = null;
        if (cleanedData?.image) {
            imageId = await uploadImageAndGetId();
            if (!imageId) return; // Stop if upload failed
        }

        try {

            const payload = { ...cleanedData, ...(imageId && { image: imageId }) };

            await createMatch({ data: payload }).unwrap();
            dispatch(showAlert({ type: 'success', message: false ? 'Match updated successfully!' : 'Match created successfully!' }));
            router.replace({
                pathname: '/matches',
                params: { refetch: 'true' }
            });
        } catch (err) {
            // Show error feedback if needed
        }
    };

    const updateFormData = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }
    const handleDateChange = (field: "start_date" | "end_date", event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        const formattedDate = currentDate.toISOString().split("T")[0];
        setFormData((prev) => ({ ...prev, [field]: formattedDate }));
        if (field === "start_date") setShowStartDatePicker(false);
        else setShowEndDatePicker(false);
    };

    return (
        <>
            <StatusBar
                barStyle={activeTab ? "light-content" : "dark-content"}
                backgroundColor={activeTab ? "black" : "white"}
            />
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView className="flex-1 bg-white">
                    <View className="flex-1">
                        {/* Header */}
                        <View className="flex-row items-center px-4 py-4">
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={24} color="#000" />
                            </TouchableOpacity>
                            <Text className="text-xl font-semibold ml-4 text-black">Create Match</Text>
                        </View>

                        <ScrollView className="flex-1"
                            contentContainerStyle={{ paddingBottom: 120 }}
                        >
                            {/* Profile Picture */}
                            <View className="items-center py-8">
                                {/* <TouchableOpacity
                                className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center border-2 border-dashed border-gray-300"
                                onPress={() => {
                                    // Handle image upload
                                }}
                            >

                                <Ionicons name="camera" size={32} color="#9CA3AF" />
                            </TouchableOpacity> */}

                                <ImagePickerButton
                                    title=''
                                    imageUri={formData.image}
                                    onChangeImage={(uri) => setFormData((prev) => ({ ...prev, image: uri }))}
                                />
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>New Match</Text>
                                <Text style={{ color: '#6B7280', marginTop: 4 }}>
                                    Create a new cricket match
                                </Text>
                            </View>

                            {/* Form Fields */}
                            <View className="px-4 space-y-4">
                                {/* <Input
                                label="Name"
                                value={formData.name}
                                onChangeText={updateFormData("name")}
                                placeholder="Enter your name"
                            /> */}

                                <Dropdown
                                    label="Select Team A"
                                    value={formData.team_a}
                                    options={teamOptions}
                                    onSelect={(item) => {
                                        updateFormData("team_a")(item.value);
                                        setShowTeamADropdown(false);
                                    }}
                                    showDropdown={showTeamADropdown}
                                    onToggle={() => {
                                        setShowTeamADropdown(!showTeamADropdown)
                                        if (showTeamBDropdown)
                                            setShowTeamBDropdown(false);
                                        if (showMatchTypeDropdown)
                                            setShowMatchTypeDropdown(false)
                                    }
                                    }
                                // onLoadMore={loadMoreTeams}
                                />

                                <View className="items-center my-4">
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#9CA3AF' }}>
                                        VS
                                    </Text>
                                </View>

                                <Dropdown
                                    label="Select Team B"
                                    value={formData.team_b}
                                    options={teamOptions}
                                    onSelect={(item) => {
                                        updateFormData("team_b")(item.value);
                                        setShowTeamBDropdown(false);
                                    }}
                                    showDropdown={showTeamBDropdown}
                                    onToggle={() => {
                                        setShowTeamBDropdown(!showTeamBDropdown)
                                        if (showTeamADropdown)
                                            setShowTeamADropdown(false)
                                        if (showMatchTypeDropdown)
                                            setShowMatchTypeDropdown(false)
                                    }}
                                // onLoadMore={loadMoreTeams}
                                />

                                {/* <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                                    <Input
                                        label="Start Date"
                                        value={formData.start_date}
                                        onChangeText={() => { }}
                                        placeholder="Select start date"
                                        editable={false}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                                    <Input
                                        label="End Date"
                                        value={formData.end_date}
                                        onChangeText={() => { }}
                                        placeholder="Select end date"
                                        editable={false}
                                    />
                                </TouchableOpacity> */}

                                <Input
                                    label="Overs Limit"
                                    value={formData.overs_limit}
                                    onChangeText={updateFormData("overs_limit")}
                                    placeholder="e.g., 20, 50"
                                    keyboardType="numeric"
                                />

                                <Dropdown
                                    label="Match Type"
                                    value={formData.match_type}
                                    options={matchTypes}
                                    onSelect={(e: any) => {
                                        setFormData(prev => ({ ...prev, match_type: e.value }))
                                        setShowMatchTypeDropdown(!showMatchTypeDropdown);
                                    }}
                                    showDropdown={showMatchTypeDropdown}
                                    onToggle={() => {
                                        setShowMatchTypeDropdown(!showMatchTypeDropdown);
                                        setShowTeamADropdown(false);
                                        setShowTeamBDropdown(false);
                                    }}
                                />

                                <Input
                                    label="Description"
                                    value={formData.description}
                                    onChangeText={updateFormData("description")}
                                    placeholder="Add match description or notes"
                                    multiline
                                    numberOfLines={4}
                                />

                            </View>

                            <View className="space-y-2 mt-2 px-4">
                                <Text className="text-base font-medium text-gray-800">Location</Text>

                                {/* Show current location if already set */}
                                {formData.location.address ? (
                                    <Text className="text-sm text-gray-600">📍 {formData.location.address}</Text>
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

                            <View style={{ alignItems: 'center', paddingVertical: 32 }}>
                                <MaterialIcons name="emoji-events" size={48} color={formData.league ? "#FFD700" : "#9CA3AF"} />
                                <Text style={{ color: formData.league ? '#0e7ccb' : '#6B7280', marginTop: 8 }}>
                                    {formData.league ? 'League selected' : 'No league selected yet'}
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#0e7ccb',
                                        paddingHorizontal: 16,
                                        paddingVertical: 8,
                                        borderRadius: 8,
                                        marginTop: 12
                                    }}
                                    onPress={openLeagueSheet}
                                >
                                    <Text style={{ color: 'white', fontWeight: '500' }}>
                                        {formData.league ? 'Change league' : 'Select League'}
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </ScrollView>

                        {activeTab && (
                            <View style={StyleSheet.absoluteFill}>
                                <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
                            </View>
                        )}

                        <BottomSheetWrapper
                            ref={bottomSheetRef}
                            snapPoints={["60%", "75%"]}
                            onClose={closePerformanceForm}
                        >
                            <View style={styles.sheetContent}>
                                {activeTab === "league" && (
                                    <>
                                        <Text style={styles.sheetTitle}>Select League</Text>
                                        <ScrollView>
                                            {leagues.map((l: any) => {
                                                const isSelected = l.documentId === formData.league;
                                                return (
                                                    <Pressable
                                                        key={l.documentId}
                                                        style={styles.leagueItem}
                                                        onPress={() => {
                                                            updateForm("league")(l.documentId);
                                                            closeSheet();
                                                        }}
                                                    >
                                                        <Text style={[
                                                            styles.leagueText,
                                                            isSelected && { color: '#0e7ccb', fontWeight: '600' }
                                                        ]}>
                                                            {l.name}
                                                        </Text>

                                                        {isSelected && (
                                                            <Ionicons name="checkmark" size={20} color="#0e7ccb" style={{ marginLeft: 'auto' }} />
                                                        )}
                                                    </Pressable>
                                                );
                                            })}
                                        </ScrollView>
                                    </>
                                )}

                                {activeTab === "location" && (
                                    <>
                                        <Text style={styles.sheetTitle}>Enter Location Manually</Text>
                                        <View className="space-y-4">
                                            <Input
                                                label="Address"
                                                value={formData.location.address}
                                                onChangeText={(val) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        location: { ...prev.location, address: val },
                                                    }))
                                                }
                                                placeholder="Enter address"
                                            />
                                            <Input
                                                label="Latitude"
                                                value={formData.location.latitude?.toString() || ""}
                                                onChangeText={(val) =>
                                                    setFormData((prev) => ({
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
                                                value={formData.location.longitude?.toString() || ""}
                                                onChangeText={(val) =>
                                                    setFormData((prev) => ({
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
                                    </>
                                )}
                            </View>
                        </BottomSheetWrapper>

                        {showStartDatePicker && (
                            <DateTimePicker
                                value={formData.start_date ? new Date(formData.start_date) : new Date()}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={(event, date) => handleDateChange("start_date", event, date)}
                            />
                        )}

                        {showEndDatePicker && (
                            <DateTimePicker
                                value={formData.end_date ? new Date(formData.end_date) : new Date()}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={(event, date) => handleDateChange("end_date", event, date)}
                            />
                        )}


                        {/* Floating Add Player Button */}
                        {
                            !activeTab &&
                            <FloatingActionButton
                                label="Create Match"
                                iconName="calendar-outline"
                                onPress={handleSave}
                                loading={isLoading}
                                disabled={isLoading}
                            />
                        }
                    </View>
                </SafeAreaView>
            </GestureHandlerRootView>
        </>
    )
}


const styles = StyleSheet.create({

    sheetContent: { flex: 1, padding: 16 },
    sheetTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
    leagueItem: { padding: 12, borderBottomWidth: 1, borderColor: '#E5E7EB' },
    leagueText: { fontSize: 16 }

});
