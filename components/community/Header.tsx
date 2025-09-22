import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Header = ({heading = ''}) => {
    const router = useRouter();
    return (
        <View className="px-4 py-3">
            <View className="flex-row items-center justify-between">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#3b3b3b" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-black">{heading}</Text>
                <View className="flex-row">
                    <TouchableOpacity className="mr-4" onPress={() => router.push('/search')}>
                        <Ionicons name="search" size={24} color="#3b3b3b" />
                    </TouchableOpacity>
                    <TouchableOpacity className="relative" onPress={() => router.push('/filters')}>
                        <Ionicons name="funnel" size={24} color="#3b3b3b" />
                        <View className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full items-center justify-center">
                            <Text className="text-xs font-bold text-gray-800">1</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header