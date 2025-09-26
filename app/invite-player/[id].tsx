import FloatingActionButton from "@/components/ui/FloatingActionButton"
import Header from "@/components/ui/Header"
import { showAlert } from "@/store/features/alerts/alertSlice"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"

interface TeamInfo {
    id: string
    name: string
    logo: string
    playerCount: number
    description: string
}

const teamData: { [key: string]: TeamInfo } = {
    "1": {
        id: "1",
        name: "Titans",
        logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&auto=format&fit=crop&q=60",
        playerCount: 12,
        description: "Professional cricket team competing in local tournaments"
    },
    "2": {
        id: "2",
        name: "Warriors",
        logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&auto=format&fit=crop&q=60",
        playerCount: 15,
        description: "Competitive cricket team focused on youth development"
    }
}

export default function InvitePlayerScreen() {
    const router = useRouter();
    const { teamId } = useLocalSearchParams();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [playerPosition, setPlayerPosition] = useState("");
    const [inviteMessage, setInviteMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const team = teamData[teamId as string] || teamData["1"];

    const positions = [
        "Batsman",
        "Bowler",
        "All-rounder",
        "Wicket Keeper",
        "Fast Bowler",
        "Spinner"
    ]

    const formatPhoneNumber = (text: string) => {
        // Remove all non-numeric characters
        const cleaned = text.replace(/\D/g, '')

        // Format as (XXX) XXX-XXXX
        if (cleaned.length >= 10) {
            const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
            return formatted
        }
        return cleaned
    }

    const handlePhoneChange = (text: string) => {
        const formatted = formatPhoneNumber(text)
        setPhoneNumber(formatted)
    }

    const validateForm = () => {
        if (!phoneNumber || phoneNumber.length < 14) {
            dispatch(
                showAlert({
                    type: 'error',
                    message: 'Please enter a valid phone number',
                })
            );
            return false
        }
        if (!playerName.trim()) {
            dispatch(
                showAlert({
                    type: 'error',
                    message: 'Please enter player name',
                })
            );
            return false
        }
        if (!playerPosition) {
            // Alert.alert("Error", "Please select a position")
            dispatch(
                showAlert({
                    type: 'error',
                    message: 'Please select a position',
                })
            );
            return false
        }
        return true
    }

    const handleSendInvite = async () => {
        if (!validateForm()) return

        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            //   Alert.alert(
            //     "Invite Sent!",
            //     `Invitation has been sent to ${playerName} at ${phoneNumber}`,
            //     [
            //       {
            //         text: "Send Another",
            //         onPress: () => {
            //           setPhoneNumber("")
            //           setPlayerName("")
            //           setPlayerPosition("")
            //           setInviteMessage("")
            //         }
            //       },
            //       {
            //         text: "Done",
            //         onPress: () => router.back()
            //       }
            //     ]
            //   )

            dispatch(showAlert({ type: 'success', message: 'Invite Sent!' }));
        } catch (error) {
            Alert.alert("Error", "Failed to send invite. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const defaultMessage = `Hi ${playerName || '[Player Name]'}! You've been invited to join ${team.name}. We're looking for a talented ${playerPosition || '[Position]'} to join our team. Would you like to be part of our cricket family?`

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                {/* Header */}
                <Header heading={'Invite Player'} />

                <ScrollView
                    className="flex-1 px-4"
                    contentContainerStyle={{ paddingBottom: 70 }}
                >
                    {/* Team Info Card */}
                    <View className="bg-blue-50 rounded-lg p-4 my-6">
                        <View className="flex-row items-center mb-3">
                            <Image source={{ uri: team.logo }} className="w-16 h-16 rounded-full mr-4" />
                            <View className="flex-1">
                                <Text className="text-xl font-bold text-[#0e7ccb]">{team.name}</Text>
                                <Text className="text-[#0e7ccb]">{team.playerCount} players</Text>
                            </View>
                        </View>
                        <Text className="text-[#0e7ccb] text-sm">{team.description}</Text>
                    </View>

                    {/* Player Information */}
                    <View className="mb-6">
                        <Text className="text-lg font-semibold mb-4 text-black">Player Information</Text>

                        {/* Player Name */}
                        <View className="mb-4">
                            <Text className="text-base font-medium mb-2 text-black">Player Name *</Text>
                            <TextInput
                                className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                                placeholder="Enter player's full name"
                                value={playerName}
                                placeholderTextColor="#A0A0A0"
                                onChangeText={setPlayerName}
                            />
                        </View>

                        {/* Phone Number */}
                        <View className="mb-4">
                            <Text className="text-base font-medium mb-2 text-black">Phone Number *</Text>
                            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                                <Ionicons name="call" size={20} color="#6B7280" />
                                <TextInput
                                    className="flex-1 ml-3 text-base"
                                    placeholder="(123) 456-7890"
                                    value={phoneNumber}
                                    placeholderTextColor="#A0A0A0"
                                    onChangeText={handlePhoneChange}
                                    keyboardType="phone-pad"
                                    maxLength={14}
                                />
                            </View>
                        </View>

                        {/* Position Selection */}
                        <View className="mb-4">
                            <Text className="text-base font-medium mb-2 text-black">Position *</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
                                <View className="flex-row gap-x-2">
                                    {positions.map((position) => (
                                        <TouchableOpacity
                                            key={position}
                                            className={`px-4 py-2 rounded-full border ${playerPosition === position
                                                ? "bg-blue-500 border-blue-500"
                                                : "bg-white border-gray-300"
                                                }`}
                                            onPress={() => setPlayerPosition(position)}
                                        >
                                            <Text
                                                className={
                                                    playerPosition === position ? "text-white" : "text-gray-700"
                                                }
                                            >
                                                {position}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </View>

                    {/* Invitation Message */}
                    <View className="mb-6">
                        <Text className="text-lg font-semibold mb-4 text-black">Invitation Message</Text>
                        <View className="mb-4">
                            <Text className="text-sm text-gray-600 mb-2">Preview:</Text>
                            <View className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <Text className="text-gray-800">{defaultMessage}</Text>
                            </View>
                        </View>

                        <View>
                            <Text className="text-base font-medium mb-2 text-black">Custom Message (Optional)</Text>
                            <TextInput
                                className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                                placeholder="Add a personal message..."
                                value={inviteMessage}
                                onChangeText={setInviteMessage}
                                placeholderTextColor="#A0A0A0"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        </View>
                    </View>

                    {/* Invite Details */}
                    <View className="bg-yellow-50 rounded-lg p-4 mb-6">
                        <View className="flex-row items-start">
                            <Ionicons name="information-circle" size={20} color="#F59E0B" />
                            <View className="flex-1 ml-3">
                                <Text className="text-yellow-800 font-medium mb-1">How it works</Text>
                                <Text className="text-yellow-700 text-sm">
                                    • Player will receive an SMS invitation{'\n'}
                                    • They can download the app using the link{'\n'}
                                    • Once registered, they'll be added to your team{'\n'}
                                    • You'll get notified when they join
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Floating Add Player Button */}
                <FloatingActionButton
                    label={`Send Invitation`}
                    iconName="send"
                    onPress={handleSendInvite}
                    disabled={isLoading}
                    loading={isLoading}
                />
            </View>
        </SafeAreaView>
    )
}