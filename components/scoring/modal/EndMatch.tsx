import PlayerCard from "@/components/PlayerCard";
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface EndMatch {
    selectHours: any;
    setSelectHours: any;
}

const EndMatch = ({
    selectHours,
    setSelectHours,
}: EndMatch) => {

    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const [allOverChecked, setAllOverChecked] = useState(false);

    const toggleAllOver = () => {
        setAllOverChecked(!allOverChecked);
    }

    return (
        <View
            collapsable={false}
            className="px-6 "
        >

            {/* Team Section */}
            <View>
                <Text className="text-lg font-semibold text-gray-800 mb-4">
                    Who won the match?
                </Text>
                <View className="flex-row mb-8">
                    <PlayerCard
                        title={"Team A"}
                        iconSource={require("../../../assets/images/striker-dark.png")}
                        onPress={() => setSelectedTeam('teamA')}
                        isSelected={selectedTeam === "teamA"}
                    />
                    <PlayerCard
                        title="Team B"
                        iconSource={require("../../../assets/images/non-striker.png")}
                        onPress={() => setSelectedTeam("teamB")}
                        isSelected={selectedTeam === "teamB"}
                    />
                </View>
            </View>

            <TouchableOpacity
                className="flex-row items-center mb-3"
                onPress={() => toggleAllOver()}
            >
                <View
                    className={`w-5 h-5 border-2 rounded justify-center items-center mr-2 ${allOverChecked ? "bg-[#0e7ccb] border-[#0e7ccb]" : "border-gray-300"
                        }`}
                >
                    {allOverChecked && <Ionicons name="checkmark" size={16} color="white" />}
                </View>
                <Text className="text-base text-gray-800">
                    Consider all overs for TEAM A calculation
                </Text>
            </TouchableOpacity>

            <View >
                <Text className="text-lg font-semibold text-gray-800 mb-4">
                    Match Drawn
                </Text>
                <TouchableOpacity
                    className="flex-row items-center w-[45%] mb-3"
                    onPress={() => toggleAllOver()}
                >
                    <View
                        className={`w-5 h-5 border-2 rounded justify-center items-center mr-2 ${allOverChecked ? "bg-[#0e7ccb] border-[#0e7ccb]" : "border-gray-300"
                            }`}
                    >
                        {allOverChecked && <Ionicons name="checkmark" size={16} color="white" />}
                    </View>
                    <Text className="text-base text-gray-800">
                        Match Abandoned
                    </Text>
                </TouchableOpacity>
            </View>

            <FloatingLabelInputBorderBottom
                label="Enter Reason"
                value={selectHours}
                onChangeText={(text) => setSelectHours(text)}
                required
            />

            <Text className="text-xs text-gray-600">*You cannot change match overs in second innings.</Text>

            <View className="flex-row gap-x-3 my-4">
                <TouchableOpacity className="flex-1 bg-gray-200 rounded-xl py-4 items-center" onPress={() => { }}>
                    <Text className="text-gray-700 font-bold">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 rounded-xl py-4 items-center bg-[#0e7ccb]"
                    onPress={() => { }}
                >
                    <Text className="text-white font-bold">Save</Text> 
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default EndMatch