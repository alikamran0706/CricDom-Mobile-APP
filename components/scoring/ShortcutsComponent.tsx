import { showAlert } from '@/store/features/alerts/alertSlice'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'


interface ShortcutItem {
    id: string
    title: string
    icon?: keyof typeof Ionicons.glyphMap
    image?: any
    onPress: () => void
}

interface ShortcutsComponentProps {
    shortcutHandler: (key: string) => void
    matchState: any
}

const ShortcutsComponent = ({ shortcutHandler, matchState }: ShortcutsComponentProps) => {

    const router = useRouter();
    const dispatch = useDispatch();

    const shortcuts: ShortcutItem[] = [
        {
            id: "1",
            title: "Need Help",
            icon: "help-circle-outline",
            onPress: () => router.push("/match-help"),
        },
        {
            id: "2",
            title: "Match Rules",
            icon: "settings-outline",
            onPress: () => router.push("/match-rules"),
        },
        {
            id: "3",
            title: "Change Scorer",
            image: require("../../assets/images/scoring/replace scorer.png"),
            onPress: () => shortcutHandler('Change Scorer'),
        },
        {
            id: "4",
            title: "Change Squad",
            image: require("../../assets/images/scoring/change player.png"),
            onPress: () => router.push("/change-playing-squad"),
        },
        {
            id: "5",
            title: "Full Scorecard",
            image: require("../../assets/images/score.png"),
            onPress: () => router.push("/match/1"),
        },
        {
            id: "6",
            title: "Match Overs",
            icon: "time-outline",
            onPress: () => {
                if (matchState?.innings?.length > 1) {
                    dispatch(showAlert({
                        type: 'error', message: "You can’t change overs — the first innings has already been completed."
                    }));
                } else {
                    shortcutHandler("Change Match Overs")
                }
            }
        },
        {
            id: "7",
            title: "Replace Batters",
            image: require("../../assets/images/scoring/change player.png"),
            onPress: () => {
                router.push({
                    pathname: "/replace",
                    params: {
                        heading: "Select Batter to replace",
                        title: "Playing Squad"
                    }
                });
            }
        },
        {
            id: "8",
            title: "Bonus Runs",
            icon: "add-circle-outline",
            onPress: () => router.push("/bonus-runs"),
        },
        {
            id: "11",
            title: "Change Keeper",
            image: require("../../assets/images/scoring/game.png"),
            onPress: () => {
                router.push({
                    pathname: "/replace",
                    params: {
                        heading: "Select Keeper to replace",
                        title: "Playing Squad"
                    }
                });
            }
        },
        {
            id: "12",
            title: "Match Breaks",
            image: require("../../assets/images/scoring/coffe-break.png"),
            onPress: () => shortcutHandler("Match Breaks"),
        },
        {
            id: "13",
            title: "Power Play",
            image: require("../../assets/images/scoring/power play.png"),
            onPress: () => router.push("/power-play"),
        },
        {
            id: "15",
            title: "Change Bowler",
            image: require("../../assets/images/scoring/replace bowler.png"),
            onPress: () => {
                router.push({
                    pathname: "/replace",
                    params: {
                        heading: "Change Bowler",
                        title: "Playing Squad"
                    }
                });
            }
        },
    ]

    const renderShortcutItem = (item: ShortcutItem) => (
        <TouchableOpacity
            key={item.id}
            className="flex-1 items-center justify-center m-1 gap-2"
            onPress={item.onPress}
            activeOpacity={0.7}
        >
            {
                item.icon ?
                    <Ionicons name={item.icon} size={24} color="#6B7280" />
                    :
                    <View className="w-16 h-16 items-center justify-center mb-2">
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
                    Select a Shortcut
                </Text>
                <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Shortcuts Grid */}
            <ScrollView showsVerticalScrollIndicator={false} className="max-h-96 px-4">
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