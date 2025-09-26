import FloatingActionButton from "@/components/ui/FloatingActionButton";
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from "@/components/ui/Header";
import { ballTypes } from "@/constants/match";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LookingTournamentScreen = () => {
    const router = useRouter();
    const [ground, setGround] = useState("");
    const [region, setRegion] = useState("Lahore");
    const [area, setArea] = useState("");
    const [team, setTeam] = useState("");
    const [selectedBallType, setSelectedBallType] = useState("");
    const [selectedGroundType, setSelectedGroundType] = useState("");
    const [details, setDetails] = useState("");
    const [notifyEnabled, setNotifyEnabled] = useState(true);
    const navigation = useNavigation();
    const [selectedMatcheOn, setSelectedMatcheOn] = useState('Weekdays');
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [selectedParticipateType, setSelectedParticipateType] = useState("Team");
    const [selectedMatcheTiming, setSelectedMatcheTiming] = useState("");
    const [selectedTournamentFormat, setSelectedTournamentFormat] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const groundTypes = [
        { type: "Open Ground", image: require('../assets/images/stadium.png') },
        { type: "Box Cricket", image: require('../assets/images/net.png') },
    ]
    const matchesOn = ["Weekdays", "Weekend", "All days"];
    const matcheTimings = ["Day", "Night", "Day & Night"];
    const tournamentFormats = ["League", "Knockout"];
    const participateTypes = ["Team", "Player"];

    const handleDateChange = (field: "start_date" | "end_date", event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        const formattedDate = currentDate.toISOString().split("T")[0];
        setStartDate(formattedDate);
        setShowEndDatePicker(false);
    };

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                {/* Header */}
                <Header heading='Looking for tournament to participate' />

                <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
                    {/* Name */}
                    <FloatingLabelInputBorderBottom
                        label="Tournament Name?"
                        value={ground}
                        onChangeText={(text) => setGround(text)}
                    />
                    <Text className="text-base font-semibold text-gray-800 mb-3">What is your playing role?</Text>
                    <View className="flex-row flex-wrap gap-2 mb-5">
                        {matchesOn.map((match) => (
                            <TouchableOpacity
                                key={match}
                                className={`px-4 py-2 rounded-full ${selectedMatcheOn === match ? "bg-[#0e7ccb]" : "bg-gray-300"}`}
                                onPress={() => setSelectedMatcheOn(match)}
                            >
                                <Text className={`${selectedMatcheOn === match ? "text-white" : "text-gray-700"} text-sm`}>
                                    {match}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {/* region */}
                    <FloatingLabelInputBorderBottom
                        label="Where?"
                        value={region}
                        onChangeText={(text) => setRegion(text)}
                    />

                    <FloatingLabelInputBorderBottom
                        label="Area in this city?"
                        value={area}
                        onChangeText={(text) => setArea(text)}
                    />

                    <Text className="text-base font-semibold text-gray-800 mb-3">Participate as a:</Text>
                    <View className="flex-row flex-wrap gap-2 mb-5">
                        {participateTypes.map((participate) => (
                            <TouchableOpacity
                                key={participate}
                                className={`px-4 py-2 rounded-full ${selectedParticipateType === participate ? "bg-[#0e7ccb]" : "bg-gray-300"}`}
                                onPress={() => setSelectedParticipateType(participate)}
                            >
                                <Text className={`${selectedParticipateType === participate ? "text-white" : "text-gray-700"} text-sm`}>
                                    {participate}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                     {/* Ground Type Selection */}
                    <Text className="text-base font-semibold text-gray-800 mb-3">Ground Type?</Text>
                    <View className="flex-row justify-around mb-6">
                        {groundTypes.map((ground) => (
                            <TouchableOpacity
                                key={ground.type}
                                className={`items-center p-4 ${selectedGroundType === ground.type ? "bg-gray-200 rounded-lg" : ""}`}
                                onPress={() => setSelectedGroundType(ground.type)}
                            >
                                <Image
                                    source={ground.image}
                                    style={{
                                        width: 35,
                                        height: 35,
                                        tintColor: '#6b7280',
                                        resizeMode: 'contain',
                                    }}
                                />
                                <Text className="text-xs font-semibold text-gray-700 mt-2">{ground.type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                     {/* Ball Type Selection */}
                    <Text className="text-base font-semibold text-gray-800 mb-3">Any preferences for ball type?</Text>
                    <View className="flex-row justify-around mb-6">
                        {ballTypes.map((ball) => (
                            <TouchableOpacity key={ball.type} className="items-center" onPress={() => setSelectedBallType(ball.type)}>
                                <View
                                    className={`w-16 h-16 rounded-full items-center justify-center mb-2 
                                                        ${selectedBallType === ball.type ? "border border-[#0e7ccb]" : "border border-gray-300"
                                        }`
                                    }
                                >
                                    <Ionicons name={ball.icon as any} size={24} color={ball.color} />
                                </View>
                                <Text className="text-gray-800 font-medium">{ball.type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text className="text-base font-semibold text-gray-800 mb-3">Matches Timing</Text>
                    <View className="flex-row flex-wrap gap-2 mb-5">
                        {matcheTimings.map((matcheTiming) => (
                            <TouchableOpacity
                                key={matcheTiming}
                                className={`px-4 py-2 rounded-full ${selectedMatcheTiming === matcheTiming ? "bg-[#0e7ccb]" : "bg-gray-300"}`}
                                onPress={() => setSelectedMatcheTiming(matcheTiming)}
                            >
                                <Text className={`${selectedMatcheTiming === matcheTiming ? "text-white" : "text-gray-700"} text-sm`}>
                                    {matcheTiming}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                     <Text className="text-base font-semibold text-gray-800 mb-3">Tournament Formats</Text>
                    <View className="flex-row flex-wrap gap-2 mb-5">
                        {tournamentFormats.map((tournamentFormat) => (
                            <TouchableOpacity
                                key={tournamentFormat}
                                className={`px-4 py-2 rounded-full ${selectedTournamentFormat === tournamentFormat ? "bg-[#0e7ccb]" : "bg-gray-300"}`}
                                onPress={() => setSelectedTournamentFormat(tournamentFormat)}
                            >
                                <Text className={`${selectedTournamentFormat === tournamentFormat ? "text-white" : "text-gray-700"} text-sm`}>
                                    {tournamentFormat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Team Input */}
                    <FloatingLabelInputBorderBottom
                        label="Select your team (Optional)"
                        value={team}
                        onChangeText={(text) => setTeam(text)}
                    />

                    {/* Contact Button */}
                    <Text className="text-base font-semibold text-gray-800 mb-3">How do teams contact you?</Text>
                    <TouchableOpacity className="bg-[#0e7ccb] px-5 py-2 rounded-full self-start mb-6">
                        <Text className="text-white text-sm font-semibold">Cricdom DM</Text>
                    </TouchableOpacity>

                    {/* Details Input */}
                    <TextInput
                        className="border border-gray-300 rounded-lg p-3 text-sm text-gray-700 h-32 text-top"
                        value={details}
                        onChangeText={setDetails}
                        placeholder="Write details like match overs and Ground cost - free, shared or losers to pay."
                        multiline
                        maxLength={280}
                    />
                    <Text className="text-right text-xs text-gray-500 mt-1 mb-6">{details.length}/280</Text>

                    {/* Notification Toggle */}
                    <View className="flex-row justify-between items-center mb-6">
                        <View className="flex-1 mr-4">
                            <Text className="text-base font-semibold text-gray-800">Notify me for relevant post</Text>
                            <Text className="text-xs text-gray-600 mt-1">
                                We will send you a notification when something is posted related to what you are looking for.
                            </Text>
                        </View>
                        <TouchableOpacity
                            className={`w-12 h-7 rounded-full justify-center px-1 ${notifyEnabled ? "bg-[#0e7ccb]" : "bg-gray-300"}`}
                            onPress={() => setNotifyEnabled(!notifyEnabled)}
                        >
                            <View
                                className={`w-6 h-6 rounded-full bg-white ${notifyEnabled ? "self-end" : "self-start"}`}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <FloatingActionButton
                    label="Save"
                    onPress={() => { }}
                />
                {showEndDatePicker && (
                    <DateTimePicker
                        value={startDate ? new Date(startDate) : new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, date) => handleDateChange("end_date", event, date)}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default LookingTournamentScreen
