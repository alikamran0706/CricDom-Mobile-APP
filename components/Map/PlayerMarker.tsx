import { playerTypeConfig } from '@/constants/payer'
import { Player } from '@/lib/types/player'
import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { Marker } from 'react-native-maps'

const PlayerMarker = React.memo(({ player, onPress }: { player: Player, onPress: (player: Player) => void }) => {
    const config = playerTypeConfig[player.type]
    const [imageError, setImageError] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    // Render marker content with proper error handling
    const renderMarkerContent = () => {
        if (imageError) {
            // Fallback to colored circle with first letter
            return (
                <View className={`w-20 h-20 rounded-full items-center justify-center border-2 border-white bg-[${config.color}]`}>
                    <Text className="text-white font-bold text-[16px]">{player.name.charAt(0)}</Text>
                </View>
            )
        }

        return (
            <View className="relative justify-center items-center">
                <Image
                    source={config.markerImage}
                    className="w-[35px] h-[35px]"
                    resizeMode="contain"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true)
                    }}
                />
                {!imageLoaded && !imageError && (
                    <View className="absolute bg-black items-center justify-center">
                        <Text className="text-8 text-gray-400">...</Text>
                    </View>
                )}
            </View>
        )
    }

    return (
        <Marker
            coordinate={{
                latitude: player.latitude,
                longitude: player.longitude,
            }}
            tracksViewChanges={false}
            onPress={() => onPress(player)}
        >
            {renderMarkerContent()}
        </Marker>
    )
})

export default PlayerMarker