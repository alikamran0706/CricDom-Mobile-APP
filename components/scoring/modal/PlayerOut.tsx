import PlayerCard from "@/components/PlayerCard";
import { getFullStrapiUrl } from "@/lib/utils/common";
import { showAlert } from "@/store/features/alerts/alertSlice";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

interface PlayerOut {
    striker: any;
    nonStriker: any;
    otherOutHandler: any;
    setActiveModal: any;
}

const PlayerOut = ({
    striker,
    nonStriker,
    otherOutHandler,
    setActiveModal
}: PlayerOut) => {

    const dispatch = useDispatch();
    const [player, setPlayer] = useState<any | null>(null);

    return (
        <View
            collapsable={false}
            className="px-6 "
        >

            {/* Team Section */}
            <View>
                <Text className="text-lg font-semibold text-gray-800 mb-4">
                    Who is out?
                </Text>
                <View className="flex-row mb-8">
                    <PlayerCard
                        title={striker.name}
                        iconSource={getFullStrapiUrl(striker.image?.url) || require("../../../assets/images/striker-dark.png")}
                        onPress={() => setPlayer(striker)}
                        isSelected={player?.documentId === striker.documentId}
                    />
                    <PlayerCard
                        title={nonStriker.name}
                        iconSource={getFullStrapiUrl(nonStriker.image?.url) || require("../../../assets/images/non-striker.png")}
                        onPress={() => setPlayer(nonStriker)}
                        isSelected={player?.documentId === nonStriker.documentId}
                    />
                </View>
            </View>

            <View className="flex-row gap-x-3 my-4">
                <TouchableOpacity
                    className="flex-1 rounded-xl py-4 items-center bg-[#0e7ccb]"
                    onPress={() => {
                        if (player)
                            otherOutHandler(player)
                        else
                            dispatch(showAlert({ type: 'error', message: 'Please select player who is out.' }));
                    }}
                >
                    <Text className="text-white font-bold">Save</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default PlayerOut