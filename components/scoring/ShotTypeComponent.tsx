import { useState } from "react"
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native"

interface ShotTypeComponentProps {
    onShotType: (type: string) => void
}

const shotTypes = [
    { key: "Defence", label: "DEFENCE", image: require("../../assets/images/scoring/4.png") },
    { key: "Punch", label: "PUNCH", image: require("../../assets/images/scoring/2.png") },
    { key: "Pull", label: "STRAIGHT\nDRIVE", image: require("../../assets/images/scoring/6.png") },
    { key: "Drive", label: "ON\nDRIVE", image: require("../../assets/images/scoring/44.png") },
    { key: "Lofted", label: "LOFTED\nSHOT", image: require("../../assets/images/scoring/45.png") },
    { key: "Cut", label: "HELICOPTER", image: require("../../assets/images/scoring/5.png") },
]

export default function ShotTypeComponent({ onShotType }: ShotTypeComponentProps) {
    const [selectedShot, setSelectedShot] = useState("straight_drive")
    const [shotSelectionEnabled, setShotSelectionEnabled] = useState(true)

    return (
        <View className="p-4">
            <View className="px-4 pb-4 bg-white flex-row items-center">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="px-4 text-xl font-semibold text-gray-800 text-center">
                    Short Type
                </Text>
                <View className="flex-1 h-px bg-gray-300" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="max-h-80">
                <Text className="text-2xl font-bold text-gray-800 text-center mb-4">Long On</Text>
                <View className="flex-row flex-wrap justify-between mb-6">
                    {shotTypes.map((shot) => (
                        <TouchableOpacity
                            key={shot.key}
                            onPress={() => {
                                setSelectedShot(shot.key)
                                onShotType(shot.key)
                            }}
                            className={`w-[48%] p-4 mb-3 border rounded-lg items-center ${selectedShot === shot.key ? "border-[#0e7ccb] bg-sky-100" : "border-gray-200"
                                }`}
                        >
                            <View className="w-16 h-16 items-center justify-center mb-2">
                                <Image
                                    source={shot.image}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        tintColor: '#6b7280',
                                        resizeMode: 'contain',
                                    }}
                                />
                            </View>

                            <Text className="text-xs font-semibold text-gray-700 text-center">{shot.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    onPress={() => onShotType("none")}
                    className="w-full p-4 border border-gray-200 rounded-lg items-center mb-6"
                >
                    <Text className="text-base font-semibold text-gray-700">NONE OF THE ABOVE</Text>
                </TouchableOpacity>

                <View className="flex-row items-center justify-between">
                    <Text className="text-gray-600">Turn off shot selection for this match</Text>
                    <Switch
                        value={shotSelectionEnabled}
                        onValueChange={setShotSelectionEnabled}
                        trackColor={{ false: "#d1d5db", true: "#0e7ccb" }}
                        thumbColor={shotSelectionEnabled ? "#ffffff" : "#f3f4f6"}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
