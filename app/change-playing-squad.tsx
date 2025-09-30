import AddPlayersModal from '@/components/Modal/AddPlayersModal';
import Header from '@/components/ui/Header';
import Tabs from '@/components/ui/Tabs';
import { Player } from '@/lib/types/match';
import { getFullStrapiUrl } from '@/lib/utils/common';
import { useLazyGetPlayersQuery } from '@/store/features/player/playerApi';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePlayingSquad = ({ heading = 'Change Playing Squad', title = 'Playing Squad' }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
    const [showAddPlayersModal, setShowAddPlayersModal] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const [fetchPlayers, { data: allPlayersData, isLoading }] =
        useLazyGetPlayersQuery();

    useEffect(() => {
        fetchPlayers({
            page: 1,
            pageSize: 100,
        });
    }, []);

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

    const filteredPlayers = allFetchedPlayers
        .filter(
            (player) =>
            (player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                player.position?.toLowerCase().includes(searchQuery.toLowerCase()))
        );

    const togglePlayerSelection = (player: Player) => {
        setSelectedPlayer(player);
    };

    const isPlayerSelected = (playerId: any) =>
        selectedPlayer?.id === playerId;


    const handleAddPlayers = (newPlayers: any[]) => {
        const formattedPlayers = newPlayers.map((player) => ({
            ...player,
            selected: true,
        }));
        setPlayers((prev: Player[]) => [...prev, ...formattedPlayers]);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                {/* Header */}
                <Header heading={heading} />

                <View className='flex-row justify-center'>
                    <Tabs tabs={['Team 1', 'Team 2']} activeTab='Team 1' />
                </View>

                <View className="px-4 pb-4 bg-white flex-row items-center justify-between">
                    <Text className="px-4 text-xl font-semibold text-gray-800 text-center">
                        {title}
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#0e7ccb',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 8,
                            marginTop: 12
                        }}
                        onPress={() => setShowAddPlayersModal(true)}
                    >
                        <Text style={{ color: 'white', fontWeight: '500' }}>
                            Add Players
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* DropCatch Grid */}
                <ScrollView showsVerticalScrollIndicator={false} className="max-h-96 px-4">
                    {isLoading ? (
                        <Text className="text-center text-gray-500 mt-6">Loading players...</Text>
                    ) : filteredPlayers.length > 0 ? (
                        <View className='flex flex-col gap-y-3'>
                            {
                                filteredPlayers.map((player) => (
                                    <TouchableOpacity
                                        key={player.id}
                                        className="flex-1"
                                        onPress={() => {
                                            togglePlayerSelection(player);
                                        }}
                                    >
                                        <View className={`flex flex-row justify-between items-center border ${isPlayerSelected(player.id) ? 'border-[#0e7ccb]' :
                                            'border-gray-300'} p-2 rounded-lg`}
                                        >
                                            <View className='flex flex-row items-center gap-x-3'>
                                                <View className="w-12 h-12 rounded-full items-center justify-center overflow-hidden border border-gray-100 ">
                                                    {
                                                        player.avatar &&
                                                        <Image
                                                            source={{ uri: getFullStrapiUrl(player.avatar) }}
                                                            className="w-full h-full"
                                                        />
                                                    }

                                                </View>
                                                <View className="">
                                                    <Text className="text-base font-medium text-black">{player.name}</Text>
                                                </View>
                                            </View>
                                            {isPlayerSelected(player.id) && (
                                                <View className="w-6 h-6 bg-[#0e7ccb] rounded-full items-center justify-center">
                                                    <Ionicons name="checkmark" size={14} color="white" />
                                                </View>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }

                            {/* Add Players Modal */}
                            <AddPlayersModal
                                visible={showAddPlayersModal}
                                onClose={() => setShowAddPlayersModal(false)}
                                onAddPlayers={handleAddPlayers}
                                existingPlayerIds={players?.map((p: Player) => p.documentId)}
                            // visible={true}
                            />
                        </View>
                    ) : (
                        <Text className="text-center text-gray-500 mt-6">No players found.</Text>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ChangePlayingSquad