import BottomSheetWrapper, { BottomSheetRef } from "@/components/BottomSheetWrapper";
import MatchOfficialsModal from "@/components/match/modal/MatchOfficialsModal";
import OfficialModal from "@/components/match/modal/OfficialModal";
import SelectTeamModal from "@/components/Modal/SelectTeamModal";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import { ballTypes, matchTypes, pitchTypes } from "@/constants/match";
import { MatchOfficials } from "@/lib/types/match";
import { getFullStrapiUrl, sanitizeObject } from "@/lib/utils/common";
import { RootState } from "@/store";
import { showAlert } from "@/store/features/alerts/alertSlice";
import { useGetCommunitiesQuery } from "@/store/features/community/communityApi";
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
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function CreateMatch() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.profile);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [isTeamAModalA, setIsTeamAModalA] = useState(false);
    const [isTeamAModalB, setIsTeamAModalB] = useState(false);
    const [selectTeamA, setSelectTeamA] = useState<any>(null);
    const [selectTeamB, setSelectTeamB] = useState<any>(null);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [activeTab, setActiveTab] = useState<"league" | "location" | null>(null);
    const [createMatch, { isLoading, error }] = useCreateMatchMutation();
    const bottomSheetRef = useRef<BottomSheetRef>(null);
    const [uploadFile] = useUploadFileMutation();
    const [isLocationLoading, setIsLocationLoading] = useState(false);
    const { data: leaguesData } = useGetLeaguesQuery({ page: 1, pageSize: 20, creatorId: user?.documentId, });
    const [activeModal, setActiveModal] = useState<any>(null);
    const [matchOfficials, setMatchOfficials] = useState<MatchOfficials>({
        umpires: { first: null, second: null },
        scorers: { first: null, second: null },
        commentators: { first: null, second: null },
        referee: null,
        livestreamers: null,
    });

    const [currentSlot, setCurrentSlot] = useState<{ category: string; slot?: string | null }>({
        category: '',
        slot: null,
    });

    const [formData, setFormData] = useState<{
        overs_limit: string;
        description: string;
        start_date: string;
        match_date: string;
        team_a: string;
        team_b: string;
        match_type: string;
        match_creator: any;
        image: string;
        league: string | null;
        overs_per_bowler: string;
        ball_type: any,
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
        match_date: "",
        team_a: "",
        team_b: "",
        match_type: "",
        match_creator: user?.documentId,
        image: "",
        league: null,
        overs_per_bowler: "",
        ball_type: {
            ball: 'Leather',
            other: ''
        },
        wagon_wheel: false,
        pitch_type: "",
        location: {
            address: "",
            latitude: null,
            longitude: null,
        },
    });

    const {
        data: scorers,
    } = useGetCommunitiesQuery({ page: 1, pageSize: 100, filters: { 'filters[community_type][$eq]': 'scorer' } });

    const {
        data: livestreamers,
    } = useGetCommunitiesQuery({ page: 1, pageSize: 100, filters: { 'filters[community_type][$eq]': 'livestreamer' } });

    const {
        data: umpires,
    } = useGetCommunitiesQuery({ page: 1, pageSize: 100, filters: { 'filters[community_type][$eq]': 'umpire' } });

    const {
        data: commentators,
    } = useGetCommunitiesQuery({ page: 1, pageSize: 100, filters: { 'filters[community_type][$eq]': 'commentator' } });

    const {
        data: referees,
    } = useGetCommunitiesQuery({ page: 1, pageSize: 100, filters: { 'filters[community_type][$eq]': 'refree' } });

    const scorerList = scorers?.data;
    const umpireList = umpires?.data;
    const commentatorList = commentators?.data;
    const livestreamersList = livestreamers?.data;
    const refereeList = referees?.data;

    const officialHandler = (category: string, slot?: string | null) => {
        setCurrentSlot({ category, slot });

        // open correct modal based on category
        switch (category) {
            case 'umpires':
                setActiveModal('umpires');
                break;
            case 'scorers':
                setActiveModal('scorers');
                break;
            case 'commentators':
                setActiveModal('commentators');
                break;
            case 'referee':
                setActiveModal('referee');
                break;
            case 'livestreamers':
                setActiveModal('livestreamers');
                break;
        }
    };

    const selectedOfficialHandler = (selectedData: any) => {
        setMatchOfficials((prev: any) => {
            const updated = { ...prev };

            const { category, slot } = currentSlot;

            if (category === 'referee' || category === 'livestreamers') {
                updated[category] = selectedData;
            } else if (slot) {
                updated[category] = {
                    ...prev[category],
                    [slot]: selectedData,
                };
            }

            return updated;
        });

        setActiveModal(null);
    };


    const openLocationSheet = () => {
        setActiveTab("location");
    };

    useEffect(() => {
        if (activeTab)
            bottomSheetRef.current?.open();
    }, [activeTab])

    const openLeagueSheet = () => {
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

    useEffect(() => {
        if (activeTab) {
            setTimeout(() => {
                bottomSheetRef.current?.open();
            }, 100);
        }
    }, [activeTab]);

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

    const handleSave = async () => {
        const allOfficials: string[] = [
            matchOfficials?.umpires?.first?.documentId,
            matchOfficials?.umpires?.second?.documentId,
            matchOfficials?.scorers?.first?.documentId,
            matchOfficials?.scorers?.second?.documentId,
            matchOfficials?.commentators?.first?.documentId,
            matchOfficials?.commentators?.second?.documentId,
            matchOfficials?.referee?.documentId,
            matchOfficials?.livestreamers?.documentId,
        ].filter((id): id is string => Boolean(id));

        if (selectTeamA)
            formData.team_a = selectTeamA?.documentId
        if (selectTeamA)
            formData.team_b = selectTeamB?.documentId

        if (formData.team_a === formData.team_b) {
            alert("Team A and Team B must be different.");
            return;
        }

        if (selectTeamA?.players?.length < 2 && selectTeamB?.players?.length < 2) {
            alert("Each team must have at least 2 players.");
            return;
        }

        if (selectTeamA?.players?.length < 2 || selectTeamA?.players === undefined) {
            alert(`Team ${selectTeamA?.name || 'Team A'} must have at least 2 players.`);
            return;
        }

        if (selectTeamB?.players?.length < 2 || selectTeamB?.players === undefined) {
            alert(`Team ${selectTeamB?.name || 'Team B'} must have at least 2 players.`);
            return;
        }

        if (parseInt(formData?.overs_limit) < 2 || !formData?.overs_limit) {
            alert(`Minimum 2 overs`);
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

            const payload = {
                ...cleanedData,
                ...(imageId && { image: imageId }),
                ...(allOfficials?.length > 0 ? { communities: allOfficials } : {}),
            };

            const { data } = await createMatch({ data: payload }).unwrap();
            dispatch(showAlert({ type: 'success', message: false ? 'Match updated successfully!' : 'Match created successfully!' }));

            const match = {
                ...data, team_a: selectTeamA, team_b: selectTeamB
            }

            router.replace({
                pathname: '/toss',
                params: { match: JSON.stringify(match) }
            });

            // router.replace({
            //     pathname: '/matches',
            //     params: { refetch: 'true' }
            // });
            // router.push("/toss")
        } catch (error: any) {
            console.log(error?.response?.data || error.message || error || 'An unknown error occurred')
            // Show error feedback if needed
        }
    };

    const updateFormData = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleBallTypeChange = (key: "ball" | "other", value: string) => {
        setFormData(prev => ({
            ...prev,
            ball_type: {
                ...prev.ball_type,
                [key]: value,
            }
        }));
    };

    const handleDateChange = (field: "start_date" | "match_date", event: any, selectedDate?: Date) => {
        if (event.type === "dismissed") {
            setShowStartDatePicker(false);
            setShowEndDatePicker(false);
            return;
        }

        const date = selectedDate || new Date();
        setSelectedDate(date);

        // Hide date picker, show time picker next
        if (field === "start_date") setShowStartDatePicker(false);
        else setShowEndDatePicker(false);

        setShowTimePicker(true);
    };

    const onTimeChange = (event: any, selectedTime?: Date) => {
        if (event.type === "dismissed") {
            setShowTimePicker(false);
            return;
        }

        if (selectedDate && selectedTime) {
            // Combine date and time
            const combined = new Date(selectedDate);
            combined.setHours(selectedTime.getHours());
            combined.setMinutes(selectedTime.getMinutes());
            combined.setSeconds(0);
            combined.setMilliseconds(0);

            // Convert to ISO string (UTC format for Strapi)
            const isoString = combined.toISOString();

            // Save to formData
            setFormData((prev) => ({
                ...prev,
                match_date: isoString,
            }));

            // reset temporary states
            setSelectedDate(null);
            setShowTimePicker(false);
        }
    };

    return (
        <>
            {
                (!isTeamAModalA && !isTeamAModalB) ?
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <SafeAreaView className="flex-1 bg-white">
                            <View className="flex-1">
                                <LinearGradient colors={['#ffffff', '#a9d3f2', '#a9d3f2']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    className="px-4 pb-6"
                                >

                                    {/* Header */}
                                    <Header heading='Start Match' />
                                    <View className="flex-row items-center justify-center">
                                        {/* Team A */}
                                        <View className="items-center">
                                            <Pressable className="relative" onPress={() => {
                                                setIsTeamAModalA(true)
                                            }}>
                                                <View
                                                    className="w-24 h-24 rounded-2xl items-center justify-center mb-3 shadow-lg p-2"
                                                // style={{ backgroundColor: teams[0]?.color }}
                                                >
                                                    {!selectTeamA ?
                                                        <Feather name="plus" size={24} color="black" />
                                                        :
                                                        !selectTeamA?.image?.formats?.thumbnail?.url ?
                                                            <Ionicons name="people" size={24} color="gray" />
                                                            :
                                                            <Image
                                                                source={{
                                                                    uri: getFullStrapiUrl(selectTeamA?.image?.formats?.thumbnail?.url),
                                                                }}
                                                                className="w-full h-full rounded-2xl"
                                                            />
                                                    }
                                                </View>
                                            </Pressable>
                                            {
                                                <Text className="text-black font-bold text-sm mb-2">{selectTeamA?.name}</Text>
                                            }
                                            <TouchableOpacity className="bg-gray-100 backdrop-blur-sm px-4 py-2 rounded-full" onPress={() => setIsTeamAModalA(true)}>
                                                <Text className="text-black text-xs font-semibold">{!selectTeamA ? 'Select Team A' : `Squad (${selectTeamA.players?.length})`}</Text>
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
                                            <Pressable className="relative" onPress={() => setIsTeamAModalB(true)}>
                                                <View
                                                    className="w-24 h-24 rounded-2xl items-center justify-center mb-3 shadow-lg overflow-hidden p-2"
                                                // style={{ backgroundColor: teams[1]?.color }}
                                                >
                                                    {
                                                        !selectTeamB ?
                                                            <Feather name="plus" size={24} color="black" />
                                                            :
                                                            !selectTeamB?.image?.formats?.thumbnail?.url ?
                                                                <Ionicons name="people" size={24} color="gray" />
                                                                :
                                                                <Image
                                                                    source={{
                                                                        uri: getFullStrapiUrl(selectTeamB?.image?.formats?.thumbnail?.url),
                                                                    }}
                                                                    className="w-full h-full rounded-2xl"
                                                                />
                                                    }
                                                </View>
                                            </Pressable>
                                            <Text className="text-black font-bold text-sm mb-2">{selectTeamB?.name}</Text>
                                            <TouchableOpacity className="bg-gray-100 backdrop-blur-sm px-4 py-2 rounded-full" onPress={() => setIsTeamAModalB(true)}>
                                                <Text className="text-black text-xs font-semibold">{!selectTeamB ? 'Select Team B' : `Squad (${selectTeamB?.players?.length})`}</Text>
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
                                                value={
                                                    formData.match_date
                                                        ? new Date(formData.match_date).toLocaleString(undefined, {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })
                                                        : ''
                                                }
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

                                                {/* 🟦 Umpires */}
                                                <TouchableOpacity
                                                    className="items-center flex-1"
                                                    onPress={() => setActiveModal("matchofficials")}
                                                >
                                                    <View className="relative">
                                                        <View className="w-16 h-16 bg-blue-100 rounded-2xl items-center justify-center mb-2 shadow-sm">
                                                            <Image
                                                                source={require('../assets/images/umpire.png')}
                                                                style={{ width: 28, height: 28, resizeMode: 'contain' }}
                                                            />
                                                        </View>
                                                        {(() => {
                                                            const count =
                                                                (matchOfficials?.umpires?.first ? 1 : 0) +
                                                                (matchOfficials?.umpires?.second ? 1 : 0);
                                                            return count > 0 ? (
                                                                <View className="absolute -top-2 -right-2 w-7 h-7 bg-[#0e7ccb] rounded-full items-center justify-center border-2 border-white">
                                                                    <Text className="text-white text-xs font-bold">{count}</Text>
                                                                </View>
                                                            ) : null;
                                                        })()}
                                                    </View>
                                                    <Text className="text-gray-700 font-medium text-sm text-center">Umpires</Text>
                                                </TouchableOpacity>

                                                {/* 🟪 Scorers */}
                                                <TouchableOpacity
                                                    className="items-center flex-1"
                                                    onPress={() => setActiveModal("matchofficials")}
                                                >
                                                    <View className="relative">
                                                        <View className="w-16 h-16 bg-purple-100 rounded-2xl items-center justify-center mb-2 shadow-sm">
                                                            <Image
                                                                source={require('../assets/images/score.png')}
                                                                style={{ width: 28, height: 28, resizeMode: 'contain' }}
                                                            />
                                                        </View>
                                                        {(() => {
                                                            const count =
                                                                (matchOfficials?.scorers?.first ? 1 : 0) +
                                                                (matchOfficials?.scorers?.second ? 1 : 0);
                                                            return count > 0 ? (
                                                                <View className="absolute -top-2 -right-2 w-7 h-7 bg-[#0e7ccb] rounded-full items-center justify-center border-2 border-white">
                                                                    <Text className="text-white text-xs font-bold">{count}</Text>
                                                                </View>
                                                            ) : null;
                                                        })()}
                                                    </View>
                                                    <Text className="text-gray-700 font-medium text-sm text-center">Scorers</Text>
                                                </TouchableOpacity>

                                                {/* 🟥 Live Stream */}
                                                <TouchableOpacity
                                                    className="items-center flex-1"
                                                    onPress={() => setActiveModal("matchofficials")}
                                                >
                                                    <View className="relative">
                                                        <View className="w-16 h-16 bg-red-100 rounded-2xl items-center justify-center mb-2 shadow-sm">
                                                            <Ionicons name="videocam" size={28} color="#ef4444" />
                                                        </View>
                                                        {matchOfficials?.livestreamers ? (
                                                            <View className="absolute -top-2 -right-2 w-7 h-7 bg-[#0e7ccb] rounded-full items-center justify-center border-2 border-white">
                                                                <Ionicons name="checkmark" size={12} color="white" />
                                                            </View>
                                                        ) : null}
                                                    </View>
                                                    <Text className="text-gray-700 font-medium text-sm text-center">Live Stream</Text>
                                                </TouchableOpacity>

                                                {/* 🟧 Others (Commentators + Referee) */}
                                                <TouchableOpacity
                                                    className="items-center flex-1"
                                                    onPress={() => setActiveModal("matchofficials")}
                                                >
                                                    <View className="relative">
                                                        <View className="w-16 h-16 bg-orange-100 rounded-2xl items-center justify-center mb-2 shadow-sm">
                                                            <Image
                                                                source={require('../assets/images/cricket-commentator.png')}
                                                                style={{ width: 28, height: 28, resizeMode: 'contain' }}
                                                            />
                                                        </View>
                                                        {(() => {
                                                            const commentatorCount =
                                                                (matchOfficials?.commentators?.first ? 1 : 0) +
                                                                (matchOfficials?.commentators?.second ? 1 : 0);
                                                            const refereeCount = matchOfficials?.referee ? 1 : 0;
                                                            const total = commentatorCount + refereeCount;
                                                            return total > 0 ? (
                                                                <View className="absolute -top-2 -right-2 w-7 h-7 bg-[#0e7ccb] rounded-full items-center justify-center border-2 border-white">
                                                                    <Text className="text-white text-xs font-bold">{total}</Text>
                                                                </View>
                                                            ) : null;
                                                        })()}
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
                                        <View className="flex-1">
                                            <Text style={styles.sheetTitle}>Select League</Text>

                                            <ScrollView showsVerticalScrollIndicator={false} className="max-h-80 px-4">
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
                                                <Text className="text-gray-500">No League Found!</Text>
                                            </ScrollView>
                                        </View>
                                    )}

                                    {activeTab === "location" && (
                                        <View className="flex-1">
                                            <Text style={styles.sheetTitle}>Enter Location Manually</Text>
                                            <ScrollView showsVerticalScrollIndicator={false} className="max-h-96 px-4">
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
                                            </ScrollView>
                                        </View>
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
                                        value={formData.match_date ? new Date(formData.match_date) : new Date()}
                                        mode="date"
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        onChange={(event, date) => handleDateChange("match_date", event, date)}
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
                                        // emoji={'🪙'}
                                        onPress={handleSave}
                                        // onPress={() => router.push("/toss")}
                                        loading={isLoading}
                                        disabled={isLoading}
                                    />
                                }


                                <Modal visible={activeModal !== null} onRequestClose={() => setActiveModal(null)} animationType="slide"
                                    presentationStyle="pageSheet"
                                >
                                    <View className="flex-row justify-end items-center px-6 pt-6">
                                        <TouchableOpacity
                                            onPress={() => setActiveModal(null)}
                                        >
                                            <Ionicons name="close" size={24} color="#374151" />
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        activeModal === "matchofficials" &&
                                        <MatchOfficialsModal
                                            officialHandler={officialHandler}
                                            existingOfficials={matchOfficials} />
                                    }
                                    {
                                        activeModal === "scorers" &&
                                        <OfficialModal
                                            data={scorerList}
                                            selectedOfficialHandler={selectedOfficialHandler}
                                            matchOfficials={matchOfficials}
                                            currentSlot={currentSlot}
                                            heading={'Select Scorer'}
                                        />
                                    }
                                    {
                                        activeModal === "umpires" &&
                                        <OfficialModal
                                            data={umpireList}
                                            selectedOfficialHandler={selectedOfficialHandler}
                                            matchOfficials={matchOfficials}
                                            currentSlot={currentSlot}
                                            heading={'Select Umpire'}
                                        />
                                    }
                                    {
                                        activeModal === "commentators" &&
                                        <OfficialModal
                                            data={commentatorList}
                                            selectedOfficialHandler={selectedOfficialHandler}
                                            matchOfficials={matchOfficials}
                                            currentSlot={currentSlot}
                                            heading={'Select Commentator'}
                                        />
                                    }
                                    {
                                        activeModal === "livestreamers" &&
                                        <OfficialModal
                                            data={livestreamersList}
                                            selectedOfficialHandler={selectedOfficialHandler}
                                            matchOfficials={matchOfficials}
                                            currentSlot={currentSlot}
                                            heading={'Select Live Streamer'}
                                        />
                                    }
                                    {
                                        activeModal === "referee" &&
                                        <OfficialModal
                                            data={refereeList}
                                            selectedOfficialHandler={selectedOfficialHandler}
                                            matchOfficials={matchOfficials}
                                            currentSlot={currentSlot}
                                            heading={'Select Referee'}
                                        />
                                    }

                                </Modal>

                            </View>
                        </SafeAreaView>
                    </GestureHandlerRootView>
                    : (isTeamAModalA && teamRecord) ?
                        <SelectTeamModal
                            visible={isTeamAModalA}
                            onClose={() => setIsTeamAModalA(false)}
                            selectTeam={selectTeamA}
                            setSelectTeam={setSelectTeamA}
                            teamRecords={teamRecord?.filter((team: any) => team?.documentId !== selectTeamB?.documentId)}
                            isFetchingTeams={isFetchingTeams}
                            loadMoreTeams={loadMoreTeams}
                        />
                        : (isTeamAModalB && teamRecord) &&
                        <SelectTeamModal
                            visible={isTeamAModalB}
                            onClose={() => setIsTeamAModalB(false)}
                            selectTeam={selectTeamB}
                            setSelectTeam={setSelectTeamB}
                            teamRecords={teamRecord?.filter((team: any) => team?.documentId !== selectTeamA?.documentId)}
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
