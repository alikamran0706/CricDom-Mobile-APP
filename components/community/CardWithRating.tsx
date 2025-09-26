import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const CardWithRating = ({id, title, subTitle, image, rating, reviews}: any) => {
    return (
        <TouchableOpacity
            key={id}
            className="bg-white flex-row items-center p-4 m-2 rounded-xl"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            }}
        >
            <View className="w-16 h-16 rounded-full mr-4 border border-gray-300 overflow-hidden">
                <Image source={{ uri: image }} className="w-[100%] h-[100%]" />
            </View>
            <View className="flex-1">
                <Text className="text-gray-800 text-lg font-bold mb-1">{title}</Text>
                <Text className="text-gray-600 text-sm">{subTitle}</Text>
            </View>
            <View className="items-end">
                <View className="bg-[#0e7ccb] px-3 py-1 rounded-full mb-1">
                    <Text className="text-white text-xs font-bold">{rating}/5</Text>
                </View>
                <Text className="text-gray-600 text-xs">{reviews} Review(s)</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardWithRating