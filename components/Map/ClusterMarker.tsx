import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { Marker } from 'react-native-maps'

const ClusterMarker = React.memo(({ cluster, onPress }: any) => {
  const { point_count, cluster_id } = cluster.properties
  const [longitude, latitude] = cluster.geometry.coordinates
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const FIXED_SIZE = 28 // 👈 fixed marker size in pixels

  useEffect(() => {
    setImageError(false)
    setImageLoaded(false)
  }, [cluster_id])

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const renderMarkerContent = () => {
    return (
      <View className="relative items-center justify-center">
        {/* Marker Image */}
        {!imageError && (
          <Image
            source={require('../../assets/images/red-marker.png')}
            style={{ width: FIXED_SIZE, height: FIXED_SIZE }}
            resizeMode="contain"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Fallback background if image fails */}
        {imageError && (
          <View
            className="bg-red-500 rounded-full"
            style={{
              width: 12,
              height: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text className="text-white font-bold text-xs">X</Text>
          </View>
        )}

        {/* Badge with count */}
        <View
          className="absolute top-1 right-[8px] bg-white items-center justify-center shadow-md z-10"
          style={{
            width: 12,
            height: 12,
            borderRadius: 10,
          }}
        >
          <Text className="text-black font-bold text-[10px]">
            {point_count}
          </Text>
        </View>

        {/* Optional: Loading state */}
        {!imageLoaded && !imageError && (
          <View className="absolute">
            <Text className="text-[10px] text-gray-400">...</Text>
          </View>
        )}
      </View>
    )
  }

  return (
    <Marker
      coordinate={{ latitude, longitude }}
      onPress={onPress}
      tracksViewChanges={false}
    >
      {renderMarkerContent()}
    </Marker>
  )
})

export default ClusterMarker
