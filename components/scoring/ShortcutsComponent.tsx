import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'


interface ShortcutItem {
    id: string
    title: string
    icon: keyof typeof Ionicons.glyphMap
    onPress: () => void
}

const ShortcutsComponent = ({ navigation }: any) => {
    const shortcuts: ShortcutItem[] = [
        {
            id: "1",
            title: "Need Help",
            icon: "help-circle-outline",
            onPress: () => navigation.navigate("Help"),
        },
        {
            id: "2",
            title: "Match Rules",
            icon: "settings-outline",
            onPress: () => navigation.navigate("MatchRules"),
        },
        {
            id: "3",
            title: "Change Scorer",
            icon: "people-outline",
            onPress: () => console.log("Change Scorer"),
        },
        {
            id: "4",
            title: "Change Squad",
            icon: "swap-horizontal-outline",
            onPress: () => console.log("Change Squad"),
        },
        {
            id: "5",
            title: "Full Scorecard",
            icon: "document-text-outline",
            onPress: () => console.log("Full Scorecard"),
        },
        {
            id: "6",
            title: "Match Overs",
            icon: "time-outline",
            onPress: () => console.log("Match Overs"),
        },
        {
            id: "7",
            title: "Replace Batters",
            icon: "refresh-outline",
            onPress: () => console.log("Replace Batters"),
        },
        {
            id: "8",
            title: "Bonus Runs",
            icon: "add-circle-outline",
            onPress: () => console.log("Bonus Runs"),
        },
        {
            id: "11",
            title: "Change Keeper",
            icon: "shield-outline",
            onPress: () => console.log("Change Keeper"),
        },
        {
            id: "12",
            title: "Match Breaks",
            icon: "pause-outline",
            onPress: () => console.log("Match Breaks"),
        },
        {
            id: "13",
            title: "Power Play",
            icon: "flash-outline",
            onPress: () => console.log("Power Play"),
        },
        {
            id: "15",
            title: "Change Bowler",
            icon: "refresh-outline",
            onPress: () => console.log("Change Bowler"),
        },
    ]

    const renderShortcutItem = (item: ShortcutItem) => (
        <TouchableOpacity
            key={item.id}
            className="flex-1 items-center justify-center m-1 gap-2"
            onPress={item.onPress}
            activeOpacity={0.7}
        >
            <Ionicons name={item.icon} size={24} color="#6B7280" />
            <Text className="text-sm text-gray-700 text-center font-medium leading-tight">{item.title}</Text>
        </TouchableOpacity>
    )

    return (
        <View className="flex-1">
            {/* Header */}
            <View className="px-4 py-4 bg-white flex-row items-center">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="px-4 text-xl font-semibold text-gray-800 text-center">
                    Select a Shortcut
                </Text>
                <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Shortcuts Grid */}
            <ScrollView className="flex-1 px-4">
                <View className="flex-row flex-wrap justify-between">
                    {shortcuts.map((item, index) => {
                        if (index % 2 === 0) {
                            return (
                                <View key={`row-${index}`} className="w-full flex-row mb-4">
                                    <View className="flex-1 mr-2">{renderShortcutItem(item)}</View>
                                    {shortcuts[index + 1] && (
                                        <View className="flex-1 ml-2">{renderShortcutItem(shortcuts[index + 1])}</View>
                                    )}
                                </View>
                            )
                        }
                        return null
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

export default ShortcutsComponent