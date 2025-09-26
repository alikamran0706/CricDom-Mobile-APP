import FloatingActionButton from "@/components/ui/FloatingActionButton";
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from "@/components/ui/Header";
import { ballTypes } from "@/constants/match";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const TournamentScreen = () => {
    const router = useRouter();
    const [region, setRegion] = useState("Lahore");
    const [selectedRole, setSelectedRole] = useState("");
    const [area, setArea] = useState("");
    const [selectedBallType, setSelectedBallType] = useState("");
    const [selectedGroundType, setSelectedGroundType] = useState("");
    const [details, setDetails] = useState("");
    const [notifyEnabled, setNotifyEnabled] = useState(true);
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const roles = ["Batter", "Bowler", "All-rounder", "Wicket-keeper"]
    const groundTypes = [
        { type: "Open Ground", image: require('../assets/images/stadium.png') },
        { type: "Box Cricket", image: require('../assets/images/net.png') },
    ]


    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                {/* Header */}
                <Header heading='Looking for an opponent to play' />

                <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
                    <Text className="text-base font-semibold text-gray-800 mb-3">What is your playing role?</Text>
                    <View className="flex-row flex-wrap gap-2 mb-5">
                        {roles.map((role) => (
                            <TouchableOpacity
                                key={role}
                                className={`px-4 py-2 rounded-full ${selectedRole === role ? "bg-red-700" : "bg-gray-300"}`}
                                onPress={() => setSelectedRole(role)}
                            >
                                <Text className={`${selectedRole === role ? "text-white" : "text-gray-700"} text-sm`}>
                                    {role}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <FloatingLabelInputBorderBottom
                        label="Which region?"
                        value={region}
                        onChangeText={(text) => setRegion(text)}
                    />

                    <FloatingLabelInputBorderBottom
                        label="Area in this city?"
                        value={area}
                        onChangeText={(text) => setArea(text)}
                    />

                    <Text className="text-base font-semibold text-gray-800 mt-2 mb-3">Any preferences for ball type?</Text>
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

                    <Text className="text-base font-semibold text-gray-800 mb-3">How do teams contact you?</Text>
                    <TouchableOpacity className="bg-[#0e7ccb] px-5 py-2 rounded-full self-start mb-6">
                        <Text className="text-white text-sm font-semibold">Cricdom DM</Text>
                    </TouchableOpacity>

                    <TextInput
                        className="border border-gray-300 rounded-lg p-3 text-sm text-gray-700 h-32 text-top"
                        value={details}
                        onChangeText={setDetails}
                        placeholder="Write details like your role, playing for a tournament or Friendly match, match fees, etc."
                        multiline
                        maxLength={280}
                    />
                    <Text className="text-right text-xs text-gray-500 mt-1 mb-6">{details.length}/280</Text>

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
            </View>
        </SafeAreaView>
    )
}

export default TournamentScreen
