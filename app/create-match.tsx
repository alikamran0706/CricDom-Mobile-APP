import BottomSheetWrapper, { BottomSheetRef } from "@/components/BottomSheetWrapper";
import SelectTeamModal from "@/components/Modal/SelectTeamModal";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Input from "@/components/ui/Input";
import { ballTypes, matchTypes, pitchTypes } from "@/constants/match";
import { sanitizeObject } from "@/lib/utils/common";
import { RootState } from "@/store";
import { showAlert } from "@/store/features/alerts/alertSlice";
import { useGetLeaguesQuery } from "@/store/features/league/leagueApi";
import { useCreateMatchMutation } from "@/store/features/match/matchApi";
import { useGetTeamsQuery } from "@/store/features/team/teamApi";
import { useUploadFileMutation } from "@/store/features/upload/uploadApi";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from 'expo-location';
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function CreateMatch() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.profile);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [isTeamAModal, setIsTeamAModal] = useState(false);
    const [selectTeam, setSelectTeam] = useState<any>(null);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
        overs_per_bowler: string;
        ball_Type: string;
        wagon_wheel: boolean;
        pitch_type: string;
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
        overs_per_bowler: "",
        ball_Type: "",
        wagon_wheel: false,
        pitch_type: "",
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

    const [teamPage, setTeamPage] = useState(1);
    const { data: teamsData, isFetching: isFetchingTeams } = useGetTeamsQuery({
        page: teamPage,
        pageSize: 12,
    });

    const loadMoreTeams = () => {
        if (!isFetchingTeams && teamPage < teamsData.meta?.pageCount)
            setTeamPage((prev) => prev + 1);
    };
    // Prepare dropdown options
    const teamRecord = teamsData?.data;

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

    const onTimeChange = (event: any, time?: Date) => {
        setShowTimePicker(Platform.OS === "ios") // iOS behavior

        if (time && selectedDate) {
            // Combine date + time into one Date object
            const combined = new Date(selectedDate)
            combined.setHours(time.getHours())
            combined.setMinutes(time.getMinutes())
            combined.setSeconds(0)
            combined.setMilliseconds(0)

            // Format combined date-time string
            // const formatted = dayjs(combined).format("YYYY-MM-DD HH:mm")

            // setFormData({ ...formData, end_date: formatted })
            setSelectedDate(null) // reset temp state
        }
    }

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
        setShowTimePicker(true)
    };

    const teams: any[] = [

    ]

    return (
        <>
            {
                !isTeamAModal ?
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <SafeAreaView className="flex-1 bg-white">
                            <View className="flex-1">


                                <LinearGradient colors={['#ffffff', '#a9d3f2', '#a9d3f2']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    className="px-4 pb-6"
                                >

                                    {/* Header */}
                                    <View className="flex-row items-center px-4 py-4">
                                        <TouchableOpacity onPress={() => router.back()}>
                                            <Ionicons name="arrow-back" size={24} color="black" />
                                        </TouchableOpacity>
                                        <Text className="text-xl font-semibold ml-4 text-black">Satart a Match</Text>
                                    </View>
                                    <View className="flex-row items-center justify-center">
                                        {/* Team A */}
                                        <View className="items-center">
                                            <Pressable className="relative" onPress={() => setIsTeamAModal(true)}>
                                                <View
                                                    className="w-24 h-24 rounded-2xl items-center justify-center mb-3 shadow-lg"
                                                    style={{ backgroundColor: teams[0]?.color }}
                                                >
                                                    <Text className="text-black text-2xl font-bold">
                                                        {!teams[0] ?
                                                            <Feather name="plus" size={24} color="black" />
                                                            : teams[0]?.initials}
                                                    </Text>
                                                </View>
                                                {
                                                    teams[0] &&
                                                    <View className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full items-center justify-center">
                                                        <Ionicons name="checkmark" size={16} color="green-500" />
                                                    </View>
                                                }
                                            </Pressable>
                                            {
                                                <Text className="text-black font-bold text-sm mb-2">{teams[0]?.name}</Text>
                                            }
                                            <TouchableOpacity className="bg-gray-100 backdrop-blur-sm px-4 py-2 rounded-full ">
                                                <Text className="text-black text-xs font-semibold">{!teams[0] ? 'Select Team A' : `Squad (${teams[0].squadCount})`}</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* Enhanced VS Design */}
                                        <View className="mx-8">
                                            <View className="w-16 h-16 bg-gray-100 backdrop-blur-sm rounded-2xl items-center justify-center border border-gray-200">
                                                <Text className="text-black font-bold text-lg">VS</Text>
                                            </View>
                                        </View>

                                        {/* Team B */}
                                        <View className="items-center">
                                            <View className="relative">
                                                <View
                                                    className="w-24 h-24 rounded-2xl items-center justify-center mb-3 shadow-lg"
                                                    style={{ backgroundColor: teams[1]?.color }}
                                                >
                                                    <Text className="text-black text-2xl font-bold">{!teams[1] ?
                                                        <Feather name="plus" size={24} color="black" />
                                                        : teams[1]?.initials}
                                                    </Text>
                                                </View>
                                                {
                                                    teams[1] &&
                                                    <View className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full items-center justify-center">
                                                        <Ionicons name="checkmark" size={16} color="green" />
                                                    </View>
                                                }
                                            </View>
                                            <Text className="text-black font-bold text-sm mb-2">{teams[1]?.name}</Text>
                                            <TouchableOpacity className="bg-gray-100 backdrop-blur-sm px-4 py-2 rounded-full">
                                                <Text className="text-black text-xs font-semibold">{!teams[1] ? 'Select Team B' : `Squad (${teams[1]?.squadCount})`}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </LinearGradient>



                                <ScrollView className="flex-1 mt-4"
                                    contentContainerStyle={{ paddingBottom: 120 }}
                                >
                                    {/* Profile Picture */}
                                    {/* <View className="items-center py-8">

                                <ImagePickerButton
                                    title=''
                                    imageUri={formData.image}
                                    onChangeImage={(uri) => setFormData((prev) => ({ ...prev, image: uri }))}
                                />
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>New Match</Text>
                                <Text style={{ color: '#6B7280', marginTop: 4 }}>
                                    Create a new cricket match
                                </Text>
                            </View> */}

                                    {/* Form Fields */}
                                    <View className="px-4 space-y-4">

                                        {/* Match Type */}
                                        <View className="mb-6">
                                            <Text className="text-lg font-semibold text-gray-800 mb-3">
                                                Match Type<Text className="text-red-500">*</Text>
                                            </Text>
                                            <View className="flex-row flex-wrap">
                                                {matchTypes.map((item) => (
                                                    <TouchableOpacity
                                                        key={item.value}
                                                        className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.match_type === item.value ? "bg-[#0e7ccb]" : "bg-gray-200"
                                                            }`}
                                                        onPress={() => setFormData(prev => ({ ...prev, match_type: item.value }))}
                                                    >
                                                        <Text className={formData.match_type === item.value ? "text-white font-semibold" : "text-gray-700"}>
                                                            {item.label}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>

                                        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                                            <Input
                                                label="Schedule match"
                                                value={formData.end_date}
                                                onChangeText={() => { }}
                                                placeholder="Select date and time"
                                                editable={false}
                                            />
                                        </TouchableOpacity>


                                        <View className="flex-row flex-wrap">
                                            <View className="w-1/2 pr-1">
                                                <Input
                                                    label="Overs Limit"
                                                    value={formData.overs_limit}
                                                    onChangeText={updateFormData("overs_limit")}
                                                    placeholder="e.g., 20, 50"
                                                    keyboardType="numeric"
                                                />
                                            </View>

                                            <View className="w-1/2 pl-1">
                                                <Input
                                                    label="Overs per Bowler"
                                                    value={formData.overs_per_bowler}
                                                    onChangeText={updateFormData("overs_per_bowler")}
                                                    placeholder="e.g., 4, 10"
                                                    keyboardType="numeric"
                                                />
                                            </View>
                                        </View>

                                        <TouchableOpacity className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6"
                                            onPress={() => router.push('/power-play')}
                                        >
                                            <View className="flex-row items-center justify-center">
                                                <Ionicons name="flash" size={20} color="#0e7ccb" />
                                                <Text className="text-[#0e7ccb] font-semibold ml-2">CONFIGURE POWER PLAY</Text>
                                            </View>
                                        </TouchableOpacity>

                                        {/* Ball Type */}
                                        <View className="mb-6">
                                            <Text className="text-lg font-semibold text-gray-800 mb-3">
                                                Ball Type<Text className="text-red-500">*</Text>
                                            </Text>
                                            <View className="flex-row justify-around">
                                                {ballTypes.map((ball) => (
                                                    <TouchableOpacity key={ball.type} className="items-center" onPress={() => setFormData(prev => ({ ...prev, ball_Type: ball.type }))}>
                                                        <View
                                                            className={`w-16 h-16 rounded-full items-center justify-center mb-2 
                                                        ${formData.ball_Type === ball.type ? "border border-[#0e7ccb]" : "border border-gray-300"
                                                                }`
                                                            }
                                                        >
                                                            <Ionicons name={ball.icon as any} size={24} color={ball.color} />
                                                        </View>
                                                        <Text className="text-gray-800 font-medium">{ball.type}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>

                                        {/* Wagon Wheel */}
                                        <View className="mb-6">
                                            <Text className="text-lg font-semibold text-gray-800 mb-3">Wagon Wheel</Text>
                                            <View className="flex-row items-center justify-between">
                                                <Text className="text-gray-700">Show Wagon Wheel for 1s, 2s, & 3s</Text>
                                                <Switch
                                                    value={formData.wagon_wheel}
                                                    onValueChange={(value) => {
                                                        setFormData((prev) => ({ ...prev, wagon_wheel: value }));
                                                    }}
                                                    trackColor={{ false: '#E5E7EB', true: '#0e7ccb' }}
                                                    thumbColor={formData.wagon_wheel ? '#FFFFFF' : '#9CA3AF'}
                                                />
                                            </View>
                                        </View>

                                        {/* Pitch Type */}
                                        <View className="mb-8">
                                            <Text className="text-lg font-semibold text-gray-800 mb-3">Pitch Type</Text>
                                            <View className="flex-row flex-wrap">
                                                {pitchTypes.map((type) => (
                                                    <TouchableOpacity
                                                        key={type}
                                                        className={`px-4 py-2 rounded-full mr-3 mb-2 ${formData.pitch_type === type ? "bg-[#0e7ccb]" : "bg-gray-200"
                                                            }`}
                                                        onPress={() => setFormData((prev) => ({ ...prev, pitch_type: type }))}
                                                    >
                                                        <Text className={formData.pitch_type === type ? "text-white font-semibold" : "text-gray-700"}>
                                                            {type}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>

                                        <Input
                                            label="Ground"
                                            value={formData.overs_limit}
                                            onChangeText={updateFormData("overs_limit")}
                                            placeholder="Select ground"
                                            required={true}
                                        />

                                        <Input
                                            label="Description"
                                            value={formData.description}
                                            onChangeText={updateFormData("description")}
                                            placeholder="Add match description or notes"
                                            multiline
                                            numberOfLines={4}
                                        />

                                        <View>
                                            <Text className="text-black py-3">Assign Match Officials</Text>
                                            <View className="flex-row flex-wrap mb-4">
                                                <TouchableOpacity className="items-center flex-1" onPress={() => {
                                                    setFormData((prev) => ({ ...prev, officials: "umpires" }))
                                                    router.push('/match-officials')
                                                }}>
                                                    <View className="relative">
                                                        <View className="w-16 h-16 bg-blue-100 rounded-2xl items-center justify-center mb-2 shadow-sm">
                                                            <Image
                                                                source={require('../assets/images/umpire.png')}
                                                                style={{ width: 28, height: 28, resizeMode: 'contain' }}
                                                            />
                                                        </View>
                                                        {/* {matchOfficials.umpires > 0 && (
                                                        <View className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full items-center justify-center border-2 border-white">
                                                            <Text className="text-white text-xs font-bold">{matchOfficials.umpires}</Text>
                                                        </View>
                                                    )} */}
                                                    </View>
                                                    <Text className="text-gray-700 font-medium text-sm text-center">Umpires</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity className="items-center flex-1" onPress={() => {
                                                    setFormData((prev) => ({ ...prev, officials: "scorers" }))
                                                    router.push('/match-officials')
                                                }}
                                                >
                                                    <View className="relative">
                                                        <View className="w-16 h-16 bg-purple-100 rounded-2xl items-center justify-center mb-2 shadow-sm">
                                                            <Image
                                                                source={require('../assets/images/score.png')}
                                                                style={{ width: 28, height: 28, resizeMode: 'contain' }}
                                                            />
                                                        </View>
                                                        <View className="absolute -top-2 -right-2 w-8 h-8 bg-[#0e7ccb] rounded-full items-center justify-center border-2 border-white">
                                                            <Text className="text-white text-xs font-bold">3</Text>
                                                        </View>

                                                    </View>
                                                    <Text className="text-gray-700 font-medium text-sm text-center">Scorers</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity className="items-center flex-1" onPress={() => setFormData((prev) => ({ ...prev, officials: "streamers" }))}>
                                                    <View className="relative">
                                                        <View className="w-16 h-16 bg-red-100 rounded-2xl items-center justify-center mb-2 shadow-sm">
                                                            <Ionicons name="videocam" size={28} color="#ef4444" />
                                                        </View>
                                                        {/* {matchOfficials.streamers > 0 && (
                                                        <View className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full items-center justify-center border-2 border-white">
                                                            <Text className="text-white text-xs font-bold">{matchOfficials.streamers}</Text>
                                                        </View>
                                                    )} */}
                                                    </View>
                                                    <Text className="text-gray-700 font-medium text-sm text-center">Live Stream</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity className="items-center flex-1" onPress={() => setFormData((prev) => ({ ...prev, officials: "others" }))}>
                                                    <View className="relative">
                                                        <View className="w-16 h-16 bg-orange-100 rounded-2xl items-center justify-center mb-2 shadow-sm">
                                                            <Image
                                                                source={require('../assets/images/cricket-commentator.png')}
                                                                style={{ width: 28, height: 28, resizeMode: 'contain' }}
                                                            />
                                                        </View>
                                                        {/* {matchOfficials.others > 0 && (
                                                        <View className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full items-center justify-center border-2 border-white">
                                                            <Text className="text-white text-xs font-bold">{matchOfficials.others}</Text>
                                                        </View>
                                                    )} */}
                                                    </View>
                                                    <Text className="text-gray-700 font-medium text-sm text-center">Others</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

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
                                    onClose={closePerformanceForm}
                                >
                                    {activeTab === "league" && (
                                        <>
                                            <Text style={styles.sheetTitle}>Select League</Text>
                                            <ScrollView className="max-h-80">
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

                                {showTimePicker && (
                                    <DateTimePicker
                                        value={selectedDate || new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={onTimeChange}
                                        is24Hour={false}
                                    />
                                )}


                                {/* Floating Add Player Button */}
                                {
                                    !activeTab &&
                                    <FloatingActionButton
                                        label="Next (TOSS)"
                                        // iconName="calendar-outline"
                                        emoji={'🪙'}
                                        // onPress={handleSave}
                                        onPress={() => router.push("/toss")}
                                        loading={isLoading}
                                        disabled={isLoading}
                                    />
                                }

                            </View>
                        </SafeAreaView>
                    </GestureHandlerRootView>
                    :
                    <SelectTeamModal
                        visible={isTeamAModal}
                        onClose={() => setIsTeamAModal(false)}
                        selectTeam={selectTeam}
                        setSelectTeam={setSelectTeam}
                        teamRecords={teamRecord}
                        isFetchingTeams={isFetchingTeams}
                        loadMoreTeams={loadMoreTeams}
                    />
            }
        </>
    )
}


const styles = StyleSheet.create({

    sheetContent: { flex: 1, padding: 16 },
    sheetTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
    leagueItem: { padding: 12, borderBottomWidth: 1, borderColor: '#E5E7EB' },
    leagueText: { fontSize: 16 }

});
