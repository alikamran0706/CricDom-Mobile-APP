import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


interface SidebarDrawerProps {
    isVisible: boolean
    onClose: () => void
}

const SidebarDrawer = ({ isVisible, onClose }: SidebarDrawerProps) => {
    const router = useRouter()

    const [expandedSections, setExpandedSections] = React.useState({
        match: true,
        players: true,
        scorer: true,
    })

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    const SettingsItem = ({ title, onPress }: { title: string; onPress?: () => void }) => (
        <TouchableOpacity className="py-4 px-6 border-b border-gray-100" onPress={onPress}>
            <Text className="text-gray-800 text-base">{title}</Text>
        </TouchableOpacity>
    )

    const SectionHeader = ({
        title,
        expanded,
        onToggle,
    }: {
        title: string
        expanded: boolean
        onToggle: () => void
    }) => (
        <TouchableOpacity className="flex-row items-center justify-between py-4 px-6 bg-gray-50" onPress={onToggle}>
            <Text className="text-gray-900 text-lg font-semibold">{title}</Text>
            <Ionicons name={expanded ? "chevron-down" : "chevron-forward"} size={20} color="#374151" />
        </TouchableOpacity>
    )



    if (!isVisible) return null

    return (
        <View className="absolute inset-0 z-50">
            {/* Overlay */}
            <TouchableOpacity className="absolute inset-0 bg-black/50" onPress={onClose} />

            {/* Sidebar */}
            <View className="absolute right-0 top-0 bottom-0 w-80 bg-white">
                <SafeAreaView className="flex-1">
                    {/* Main content */}
                    <View className="flex-1">
                        <ScrollView className="flex-1">
                            {/* Match Settings */}
                            <SectionHeader
                                title="Match Settings"
                                expanded={expandedSections.match}
                                onToggle={() => toggleSection("match")}
                            />
                            {expandedSections.match && (
                                <View>
                                    <SettingsItem title="Change Match Overs" />
                                    <SettingsItem title="Match Rules (WD, NB, WW)" />
                                    <SettingsItem title="Revise Target (DLS/VJD)" />
                                    <SettingsItem title="Add Bonus Runs" />
                                    <SettingsItem title="Give Penalty Runs" />
                                    <SettingsItem title="End / Declare Innings" />
                                    <SettingsItem title="End Match" />
                                </View>
                            )}

                            {/* Players Settings */}
                            <SectionHeader
                                title="Players Settings"
                                expanded={expandedSections.players}
                                onToggle={() => toggleSection("players")}
                            />
                            {expandedSections.players && (
                                <View>
                                    <SettingsItem title="Change Playing Squad" />
                                    <SettingsItem title="Change Bowler" />
                                    <SettingsItem title="Replace Batters" />
                                    <SettingsItem title="Retired Hurt (Batter)" />
                                </View>
                            )}

                            {/* Scorer Settings */}
                            <SectionHeader
                                title="Scorer Settings"
                                expanded={expandedSections.scorer}
                                onToggle={() => toggleSection("scorer")}
                            />
                            {expandedSections.scorer && (
                                <View>
                                    <SettingsItem title="Change Scorer" />
                                </View>
                            )}

                            {/* Help/FAQs Header */}
                            <View className="mt-6 px-6">
                                <View className="flex-row items-center justify-between py-4">
                                    <Text className="text-gray-900 text-lg font-semibold">Help / FAQs</Text>
                                    <Text className="text-teal-600 font-semibold">SHOW</Text>
                                </View>
                            </View>
                        </ScrollView>

                        {/* ✅ Fixed bottom helpline section */}
                        <View className="px-6 py-4 border-t border-gray-200 bg-white">
                            <Text className="text-gray-600 text-base mb-2">Cricdom Helpline</Text>
                            <View className="flex-row items-center">
                                <Ionicons name="call" size={20} color="#0e7ccb" />
                                <Text className="text-[#0e7ccb] text-lg font-semibold ml-2">+55 5555555</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </View>

    )
}

export default SidebarDrawer
