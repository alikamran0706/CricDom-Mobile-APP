import { getFullStrapiUrl } from "@/lib/utils/common";
import { useLazyGetPlayersQuery } from "@/store/features/player/playerApi";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
  onAddPlayers: (players: Player[]) => void;
  existingPlayerIds?: string[];
  teamId?: string;
}

export default function AddPlayersModal({
  visible,
  onClose,
  onAddPlayers,
  existingPlayerIds = [],
  teamId,
}: AddPlayersModalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const [fetchPlayers, { data: allPlayersData, isLoading }] =
    useLazyGetPlayersQuery();

  useEffect(() => {
    if (visible) { 
      fetchPlayers({
        page: 1,
        pageSize: 100,

        // filters: {
        //   // teams: {
        //   //   documentId: {
        //   //     $ne: teamId,
        //   //   },
        //   // },
        // },
      });
    }
  }, [ visible]);

  const allFetchedPlayers: Player[] =
    allPlayersData?.data?.map((p: any) => ({
      id: p.id.toString(),
      documentId: p.documentId,
      name: p.name,
      position: p.position,
      bowling_style: p.bowling_style,
      batting_style: p.batting_style,
      avatar: p.image?.url || "",
    })) ?? [];

  // Filter players based on search and exclude already-added
  const filteredPlayers = allFetchedPlayers
  .filter(
    (player) =>
      !existingPlayerIds.includes(player.documentId) &&
      (player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.position.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const togglePlayerSelection = (player: Player) => {
    setSelectedPlayers((prev) => {
      const isSelected = prev.find((p) => p.documentId === player.documentId);
      if (isSelected) {
        return prev.filter((p) => p.documentId !== player.documentId);
      } else {
        return [...prev, player];
      }
    });
  };

  const handleAddPlayers = () => {
    onAddPlayers(selectedPlayers);
    setSelectedPlayers([]);
    setSearchQuery("");
    onClose();
  };

  const handleInviteNewPlayer = () => {
    onClose();
    router.push(`/invite-player/${teamId}`);
  };

  const isPlayerSelected = (playerId: string) =>
    selectedPlayers.some((p) => p.id === playerId);

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
          <Text className="text-xl font-semibold">Add Players</Text>
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
          <Text className="text-lg font-semibold mb-3">Available Players</Text>
        </View>

        {/* Players List */}
        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {isLoading ? (
            <Text className="text-center text-gray-500 mt-6">Loading players...</Text>
          ) : filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <TouchableOpacity
                key={player.id}
                className="flex-row items-center py-3"
                onPress={() => togglePlayerSelection(player)}
              >
                <View className="relative mr-3">
                  <View className="relative w-12 h-12 rounded-full items-center justify-center overflow-hidden border border-gray-100 ">
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
                  <Text className="text-base font-medium">{player.name}</Text>
                  <Text className="text-sm text-gray-600">{player.position}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-center text-gray-500 mt-6">No players found.</Text>
          )}

          {/* Invite New Player */}
          <TouchableOpacity
            className="flex-row items-center py-4 border-t border-gray-200 mt-4"
            onPress={handleInviteNewPlayer}
          >
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="person-add" size={24} color="#3B82F6" />
            </View>
            <Text className="text-base font-medium text-blue-600">
              Invite New Player
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Add Button */}
        <FloatingActionButton
          label={`Add Players ${selectedPlayers.length > 0 ? `(${selectedPlayers.length})` : ""
            }`}
          iconName="person-add"
          onPress={handleAddPlayers}
          disabled={selectedPlayers.length === 0}
          backgroundColor={selectedPlayers.length > 0 ? "white" : "#E5E7EB"}
        />
      </View>
    </Modal>
  );
}
