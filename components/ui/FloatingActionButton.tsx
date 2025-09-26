import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { ActivityIndicator, Pressable, Text, View, ViewStyle } from "react-native"

interface Props {
    label: string
    iconName?: keyof typeof Ionicons.glyphMap
    onPress: () => void
    containerStyle?: ViewStyle
    iconColor?: string
    textColor?: string
    backgroundColor?: string
    shadowColor?: string
    loading?: boolean
    disabled?: boolean
    emoji?: string
    iconPosition?: string
}

const FloatingActionButton: React.FC<Props> = ({
    label,
    iconName,
    onPress,
    containerStyle = { position: "absolute", bottom: 24, left: 16, right: 16 },
    iconColor = "black",
    textColor = "black",
    backgroundColor = "white",
    shadowColor = "#007ACC",
    loading = false,
    disabled = false,
    emoji,
    iconPosition = 'left'
}) => {
    // Reduce opacity if disabled
    const opacity = disabled ? 0.999 : 1

    return (
        <View style={[containerStyle]} className="z-10">
            <Pressable
                onPress={onPress}
                disabled={disabled || loading}
                className="rounded-full py-4"
                style={{
                    backgroundColor,
                    shadowColor,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 8,
                    opacity,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {loading ? (
                    <ActivityIndicator size="small" color={iconColor} />
                ) : (
                    <>
                        {
                            (iconPosition === 'left' && iconName) &&
                            <View className="w-8 h-8 bg-gray-200/20 rounded-2xl items-center justify-center mr-3">
                                <Ionicons name={iconName} size={18} color={iconColor} />
                            </View>
                        }
                        {
                            emoji &&
                            <Text className="text-2xl mr-2">{emoji}</Text>
                        }
                        <Text className="text-lg font-bold" style={{ color: textColor }}>
                            {label}
                        </Text>
                        {
                            (iconPosition === 'right' && iconName) &&
                            <View className="w-8 h-8 rounded-2xl items-center justify-center ml-3">
                                <Ionicons name={iconName} size={18} color={iconColor} />
                            </View>
                        }
                    </>
                )}
            </Pressable>
        </View>
    )
}

export default FloatingActionButton
