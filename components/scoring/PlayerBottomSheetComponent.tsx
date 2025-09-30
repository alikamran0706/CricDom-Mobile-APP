import { Player } from '@/lib/types/match'
import { getFullStrapiUrl } from '@/lib/utils/common'
import { useLazyGetPlayersQuery } from '@/store/features/player/playerApi'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const PlayerBottomSheetComponent = ({ onPress, heading = 'Who Droped the catch?' }: any) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

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

    return (
        <View className="flex-1">
            {/* Header */}
            <View className="px-4 py-4 bg-white flex-row items-center">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="px-4 text-xl font-semibold text-gray-800 text-center">
                    {heading}
                </Text>
                <View className="flex-1 h-px bg-gray-300" />
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
                                        onPress();
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
                    </View>
                ) : (
                    <Text className="text-center text-gray-500 mt-6">No players found.</Text>
                )}
            </ScrollView>
        </View>
    )
}

export default PlayerBottomSheetComponent