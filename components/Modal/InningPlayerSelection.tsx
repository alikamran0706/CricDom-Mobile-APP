import { getFullStrapiUrl } from "@/lib/utils/common";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import FloatingActionButton from "../ui/FloatingActionButton";

interface Player {
    id: string;
    documentId: string;
    name: string;
    position: string;
    avatar: string;
    isInvited?: boolean;
}

interface AddPlayersModalProps {
    visible: boolean;
    onClose: () => void;
    onAddPlayers: (players: Player) => void;
    existingPlayerIds?: any;
    header?: string;
    allFetchedPlayers: any
}

export default function InningPlayerSelection({
    visible,
    onClose,
    onAddPlayers,
    existingPlayerIds = [],
    header = "Select Striker",
    allFetchedPlayers = []
}: AddPlayersModalProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    // Filter players based on search and exclude already-added
    const filteredPlayers = allFetchedPlayers
        .filter(
            (player: any) =>
                !existingPlayerIds.includes(player.documentId) &&
                (player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    player.position.toLowerCase().includes(searchQuery.toLowerCase()))
        );

    const togglePlayerSelection = (player: Player) => {
        setSelectedPlayer(player);
    };

    const handleAddPlayers = () => {
        if (selectedPlayer) {
            onAddPlayers(selectedPlayer);
            setSelectedPlayer(null);
        }
        setSearchQuery("");
        onClose();
    };

    const handleInviteNewPlayer = () => {
        onClose();
        // router.push(`/invite-player/${teamId}`);
    };

    const isPlayerSelected = (playerId: string) =>
        selectedPlayer?.id === playerId;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-white">
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
                    <Text className="text-xl font-semibold text-black">{header}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View className="px-4 py-4">
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
                    <Text className="text-lg font-semibold mb-3 text-black">Available Players</Text>
                </View>

                {/* Players List */}
                <ScrollView
                    className="flex-1 px-4"
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {filteredPlayers.length > 0 ? (
                        filteredPlayers.map((player: any) => (
                            <TouchableOpacity
                                key={player.id}
                                className="flex-row items-center py-3"
                                onPress={() => togglePlayerSelection(player)}
                            >
                                <View className="relative mr-3">
                                    <View className="relative w-12 h-12 rounded-full items-center justify-center overflow-hidden border border-gray-200 ">
                                        {
                                            player.avatar &&
                                            <Image
                                                source={{ uri: getFullStrapiUrl(player.avatar) }}
                                                className="w-full h-full"
                                            />
                                        }
                                    </View>
                                    {isPlayerSelected(player.id) && (
                                        <View className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                                            <Ionicons name="checkmark" size={14} color="white" />
                                        </View>
                                    )}
                                </View>
                                <View className="flex-1">
                                    <Text className="text-base font-medium text-black">{player.name}</Text>
                                    <Text className="text-sm text-gray-600">{player.position}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text className="text-center text-gray-500 mt-6">No players found.</Text>
                    )}

                </ScrollView>

                {/* Add Button */}
                <FloatingActionButton
                    label={`Continue Scoring`}
                    onPress={handleAddPlayers}
                    disabled={!selectedPlayer}
                    backgroundColor={!selectedPlayer ? "white" : "#E5E7EB"}
                />
            </View>
        </Modal>
    );
}
