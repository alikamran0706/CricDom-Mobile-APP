import { getFullStrapiUrl } from "@/lib/utils/common";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "../ui/Modal";

interface SelectTeamModal {
    visible: boolean;
    onClose: () => void;
    selectTeam: any;
    setSelectTeam: (team: string) => void;
    teamRecords: any;
    isFetchingTeams: boolean;
    loadMoreTeams: () => void;
}

const SelectTeamModal = ({
    visible,
    onClose,
    selectTeam,
    setSelectTeam,
    teamRecords,
    isFetchingTeams,
    loadMoreTeams
}: SelectTeamModal) => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleAddPlayers = () => {
        setSearchQuery("");
        onClose();
    };

    console.log(teamRecords, 'teamRecordsteamRecords')

    const filteredTeams = teamRecords?.filter(
        (team: any) =>
            (team.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderItem = ({ item: team }: { item: any }) => (
        <TouchableOpacity
            key={team.id}
            className={`flex-row items-center p-3 border rounded-xl mb-3 ${selectTeam?.documentId === team.documentId
                ? "border-blue-500 bg-blue-100"
                : "border-gray-200"
                }`}
            onPress={() => setSelectTeam(team.documentId)}
        >
            <View className="relative mr-3">
                <View className="relative w-12 h-12 rounded-full items-center justify-center overflow-hidden border border-gray-100">
                    {team.image ? (
                        <Image
                            source={{
                                uri: getFullStrapiUrl(team.image.formats?.thumbnail?.url),
                            }}
                            className="w-full h-full"
                        />
                    ) : (
                        <Ionicons name="people" size={22} color="gray" />
                    )}
                </View>
                {selectTeam?.documentId === team.documentId && (
                    <View className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                        <Ionicons name="checkmark" size={14} color="white" />
                    </View>
                )}
            </View>
            <Text className="text-base font-medium">{team.name}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal visible={visible} onClose={onClose} showCloseButton={false} customClass={"h-full w-full z-50 bg-black/60 flex-1"}>

            <View>
                <View className="flex-row justify-between items-center px-6 pt-6">
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                        onPress={onClose}
                    >
                        <Ionicons name="close" size={24} color="#374151" />
                    </TouchableOpacity>
                </View>

                <View
                    collapsable={false}
                    className="p-6"
                >
                    {/* Search Bar */}
                    <View className="pb-4">
                        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-3">
                            <Ionicons name="search" size={20} color="#9CA3AF" />
                            <TextInput
                                className="flex-1 ml-2 text-base"
                                placeholder="Search by name or position"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    </View>

                    {/* Players Section */}
                    <View className="px-4 mb-4">
                        <Text className="text-lg font-semibold mb-3">Available Teams</Text>
                    </View>

                    <FlatList
                        data={teamRecords}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={() => {
                            if (!isFetchingTeams) {
                                loadMoreTeams();
                            }
                        }}
                        onEndReachedThreshold={0.3}
                        ListFooterComponent={
                            isFetchingTeams ? (
                                <View className="py-6">
                                    <ActivityIndicator size="large" color="#3b82f6" />
                                </View>
                            ) : null
                        }
                    />

                </View>
            </View>
        </Modal>
    )
}

export default SelectTeamModal