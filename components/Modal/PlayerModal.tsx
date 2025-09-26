import { Ionicons } from '@expo/vector-icons'
import React, { useCallback } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'

const PlayerModal = ({ modalVisible, closeModal, selectedPlayer, playerTypeConfig, clusterPlayers }: any) => {

    const challengePlayer = useCallback(() => {
        if (selectedPlayer) {
            closeModal()
        }
    }, [selectedPlayer, closeModal])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <View className="flex-1 justify-center items-center p-5" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
                <View className="bg-white rounded-xl w-[90%] max-w-[400px] shadow-md">
                    {selectedPlayer && !clusterPlayers && (
                        <>
                            {/* Header */}
                            <View className="flex-row justify-between items-center px-5 py-2">
                                <Text className="text-[20px] font-bold text-neutral-800 flex-1">
                                    {selectedPlayer.name}
                                </Text>
                                <TouchableOpacity onPress={closeModal}>
                                    <Ionicons name="close" size={28} color="#6c757d" />
                                </TouchableOpacity>
                            </View>

                            {/* Player Info */}
                            <View className="px-5">
                                <View
                                    className="px-3 py-1.5 rounded-full self-start mb-4"
                                    style={{ backgroundColor: playerTypeConfig[selectedPlayer.type].color }}
                                >
                                    <Text className="text-white font-bold text-[14px]">
                                        {playerTypeConfig[selectedPlayer.type].label}
                                    </Text>
                                </View>

                                {/* Info Row - Rating */}
                                <View className="flex-row justify-between items-center pb-2 gap-x-2">
                                    <Text className="text-[16px] text-neutral-500 font-medium">Rating:</Text>
                                    <Text className="text-[16px] text-neutral-800">{selectedPlayer.rating}/5.0</Text>
                                </View>

                                {/* Info Row - Experience */}
                                <View className="flex-row justify-between items-center pb-2 gap-x-2">
                                    <Text className="text-[16px] text-neutral-500 font-medium">Experience:</Text>
                                    <Text className="text-[16px] text-neutral-800">{selectedPlayer.experience}</Text>
                                </View>

                                {/* Info Row - Location */}
                                <View className="flex-row justify-between items-center pb-2 gap-x-2">
                                    <Text className="text-[16px] text-neutral-500 font-medium">Location:</Text>
                                    <Text className="text-[16px] text-neutral-800">
                                        {selectedPlayer.latitude.toFixed(4)}, {selectedPlayer.longitude.toFixed(4)}
                                    </Text>
                                </View>
                            </View>

                            {/* Modal Actions */}
                            <View className="px-4 mb-4 mt-4">
                                <TouchableOpacity
                                    onPress={challengePlayer}
                                    className="bg-[#0e7ccb] py-4 rounded-lg items-center"
                                >
                                    <Text className="text-white font-bold text-[16px]">Challenge Player</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                    {clusterPlayers && (
                        <View className="p-5">
                            <Text className="text-[18px] font-bold mb-4 text-neutral-800">
                                {clusterPlayers.length} Players in Cluster
                            </Text>

                            {clusterPlayers.map((player: any, index: number) => (
                                <View key={index} className="mb-3 border-b border-gray-200 pb-2">
                                    <Text className="text-[16px] font-bold text-neutral-700">{player.name}</Text>
                                    <Text className="text-[14px] text-neutral-500">
                                        Rating: {player.rating}/5 — {player.experience}
                                    </Text>
                                    <Text className="text-[12px] text-neutral-400">
                                        Location: {player.latitude.toFixed(4)}, {player.longitude.toFixed(4)}
                                    </Text>
                                </View>
                            ))}

                            <TouchableOpacity
                                onPress={closeModal}
                                className="bg-red-500 py-3 rounded-lg items-center mt-4"
                            >
                                <Text className="text-white font-bold text-[16px]">Close</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    )
}

export default PlayerModal