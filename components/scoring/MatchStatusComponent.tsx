import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';



interface ShortcutItem {
    id: string
    title: string
    icon?: keyof typeof Ionicons.glyphMap
    image?: any
    onPress: () => void
}

const MatchStatusComponent = () => {

    const [selectedReason, setSelectedReason] = useState<string | null>(null);

    const [other, setOther] = useState('');

    const shortcuts: ShortcutItem[] = [
        {
            id: "1",
            title: "Drinks",
            image: require("../../assets/images/scoring/drink.png"),
            onPress: () => setSelectedReason('Drinks'),
        },
        {
            id: "2",
            title: "Time Out",
            image: require("../../assets/images/scoring/timeout.png"),
            onPress: () => setSelectedReason('Time Out'),
        },
        {
            id: "3",
            title: "Lunch",
            image: require("../../assets/images/scoring/lunch.png"),
            onPress: () => setSelectedReason('Lunch'),
        },
        {
            id: "4",
            title: "Stumps",
            image: require("../../assets/images/scoring/stumps.png"),
            onPress: () => setSelectedReason('Stumps'),
        },
        {
            id: "5",
            title: "Rain",
            image: require("../../assets/images/scoring/rain.png"),
            onPress: () => setSelectedReason('Rain'),
        },
        {
            id: "6",
            title: "Other",
            image: require("../../assets/images/scoring/more.png"),
            onPress: () => setSelectedReason('Other'),
        },
    ]

    const renderShortcutItem = (item: ShortcutItem) => (
        <TouchableOpacity
            key={item.id}
            className={`flex-1 items-center justify-center gap-x-2 py-1
                border rounded-md
                ${selectedReason === item.title ? 'border-[#0e7ccb] bg-blue-50' : 'border-gray-300 bg-white'}
            `}
            onPress={item.onPress}
            activeOpacity={0.7}
        >
            {
                item.icon ?
                    <Ionicons name={item.icon} size={24} color="#6B7280" />
                    :
                    <View className="w-16 h-16 items-center justify-center mb-2 py-2">
                        <Image
                            source={item.image}
                            style={{
                                width: '100%',
                                height: '100%',
                                tintColor: '#6b7280',
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
            }
            <Text className="text-sm text-gray-700 text-center font-medium leading-tight">{item.title}</Text>
        </TouchableOpacity>
    )

    return (
        <View className="flex-1">
            {/* Header */}
            <View className="px-4 py-4 bg-white flex-row items-center">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="px-4 text-xl font-semibold text-gray-800 text-center">
                    Set Match Status
                </Text>
                <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Shortcuts Grid */}
            <ScrollView showsVerticalScrollIndicator={false} className="max-h-96 px-4">
                <View className="flex-row flex-wrap justify-between">
                    {shortcuts.map((item, index) => {
                        // Render one row every 3 items
                        if (index % 3 === 0) {
                            return (
                                <View key={`row-${index}`} className="w-full flex-row mb-2 justify-between">
                                    {/* First item in the row */}
                                    <View className={`flex-1 mr-2`}
                                    >
                                        {renderShortcutItem(item)}
                                    </View>

                                    {/* Second item, if exists */}
                                    {shortcuts[index + 1] && (
                                        <View className={`flex-1 mx-1 `}
                                        >
                                            {renderShortcutItem(shortcuts[index + 1])}
                                        </View>
                                    )}

                                    {/* Third item, if exists */}
                                    {shortcuts[index + 2] && (
                                        <View className={`flex-1 ml-2`}
                                        >
                                            {renderShortcutItem(shortcuts[index + 2])}
                                        </View>
                                    )}
                                </View>
                            );
                        }
                        return null;
                    })}
                </View>

                <FloatingLabelInputBorderBottom
                    label="Other"
                    value={other}
                    onChangeText={(text) => setOther(text)}
                    required
                    customBoxClass={selectedReason === 'Other' ? 'opacity-100' : 'opacity-0'}
                />
            </ScrollView>
            <View className="flex-row gap-x-3 my-4">
                <TouchableOpacity className="flex-1 bg-gray-200 rounded-xl py-4 items-center" onPress={() => { }}>
                    <Text className="text-gray-700 font-bold">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 rounded-xl py-4 items-center bg-[#0e7ccb]"
                    onPress={() => { }}
                >
                    <Text className="text-white font-bold">Confirm</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default MatchStatusComponent