import Map from "@/components/Map"
import { players } from "@/constants/payer"
import { useNavigation } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { Platform, Text, TextInput, View } from "react-native"

const FindPlayerOnMapScreen = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    // Calculate statistics
    const batterCount = players.filter((p) => p.type === "batter").length
    const bowlerCount = players.filter((p) => p.type === "bowler").length
    const allrounderCount = players.filter((p) => p.type === "allrounder").length

    return (
        // <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                {/* <Header heading='Find Cricket Players Near You' /> */}
                <View className="px-4 py-1">
                    <View className="flex-row items-center">
                        <Text className="text-xl font-bold text-black ml-4">Find Cricket Players Near You</Text>
                    </View>
                </View>
                <View className="p-5">
                    {/* Statistics */}
                    <View className="flex-row justify-around mb-5">
                        <View className="items-center">
                            <Text className="text-xl font-bold text-green-600">{batterCount}</Text>
                            <Text className="text-[14px] text-gray-500">batters</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-xl font-bold text-red-500">{bowlerCount}</Text>
                            <Text className="text-[14px] text-gray-500">bowlers</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-xl font-bold text-orange-500">{allrounderCount}</Text>
                            <Text className="text-[14px] text-gray-500">all-rounders</Text>
                        </View>
                    </View>

                    {/* Search and Info */}
                    <TextInput
                        className="bg-white border border-gray-400 rounded-lg p-3 text-[16px] mb-2"
                        placeholder="Search players or player type..."
                        value={searchTerm}
                        placeholderTextColor="#A0A0A0"
                        onChangeText={setSearchTerm}
                    />

                </View>
                {
                    Platform.OS !== 'web' &&
                    <Map
                        data={players}
                        searchTerm={searchTerm}
                    />
                }
            </View>
        // </SafeAreaView>
    )
}

export default FindPlayerOnMapScreen
