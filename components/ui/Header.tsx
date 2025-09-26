import { Entypo } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Header = ({heading}: any) => {
     const router = useRouter();
    return (
        <View className="px-4 py-3">
            <View className="flex-row items-center">
                <TouchableOpacity onPress={() => router.back()}>
                    <Entypo name="arrow-bold-left" size={29} color="#3b3b3b" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-black ml-4">{heading}</Text>
            </View>
        </View>
    )
}

export default Header