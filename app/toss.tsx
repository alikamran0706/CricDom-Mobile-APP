import Header from "@/components/ui/Header"
import { showAlert } from "@/store/features/alerts/alertSlice"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Animated, Easing, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"

interface Team {
    id: string
    name: string
    initials: string
    color: string
}

const TossScreen = () => {
    const router = useRouter()
    const params = useLocalSearchParams()

    // Default teams in case params are not available
    const defaultTeams = [
        {
            id: "1",
            name: "FITNESS TEAM",
            initials: "FT",
            color: "#3b82f6",
        },
        {
            id: "2",
            name: "TESTING",
            initials: "TE",
            color: "#0891b2",
        },
    ]

    // Safely parse teams from params
    const [teamA, setTeamA] = useState<Team>(defaultTeams[0])
    const [teamB, setTeamB] = useState<Team>(defaultTeams[1])

    useEffect(() => {
        try {
            if (params.teamA && typeof params.teamA === "string") {
                const parsedTeamA = JSON.parse(params.teamA)
                setTeamA(parsedTeamA)
            }
            if (params.teamB && typeof params.teamB === "string") {
                const parsedTeamB = JSON.parse(params.teamB)
                setTeamB(parsedTeamB)
            }
        } catch (error) {
            // Keep default teams if parsing fails
        }
    }, [params]);

    const [selectedWinner, setSelectedWinner] = useState<Team | null>(null);
    const [selectedChoice, setSelectedChoice] = useState<"BAT" | "BOWL" | null>(null);
    const [coinResult, setCoinResult] = useState<"HEADS" | "TAILS" | null>(null);
    const [isFlipping, setIsFlipping] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const dispatch = useDispatch();

    // Animation values
    const coinRotation = useRef(new Animated.Value(0)).current
    const celebrationScale = useRef(new Animated.Value(0)).current
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const confettiAnimations = useRef(
        Array.from({ length: 20 }, () => ({
            translateY: new Animated.Value(0),
            translateX: new Animated.Value(0),
            rotate: new Animated.Value(0),
            opacity: new Animated.Value(1),
        })),
    ).current

    const flipCoin = () => {
        if (isFlipping) return

        setIsFlipping(true)
        setCoinResult(null)

        // Reset coin rotation
        coinRotation.setValue(0)

        // Start coin flip animation - only rotate, no vertical movement
        Animated.timing(coinRotation, {
            toValue: 1,
            duration: 2000,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start(() => {
            // Determine result
            const result = Math.random() > 0.5 ? "HEADS" : "TAILS"
            setCoinResult(result)
            setIsFlipping(false)
        })
    }

    const handleTeamSelect = (team: Team) => {
        setSelectedWinner(team)
    }

    const handleChoiceSelect = (choice: "BAT" | "BOWL") => {
        setSelectedChoice(choice)
    }

    const handleLetsPlay = () => {
        // if (!selectedWinner || !selectedChoice || !coinResult) {
        //     Alert.alert("Incomplete Selection", "Please complete the toss selection first.")
        //     return
        // }

        // Show celebration
        setShowCelebration(true);
        startCelebrationAnimation();

        dispatch(showAlert({ type: 'success', message: `🎉 ${selectedWinner?.name} Won the toss! 🎊` }));
        // Show success alert with party
        setTimeout(() => {
            setShowCelebration(false)
            router.push("/start-innings")
        }, 4000)
    }

    const startCelebrationAnimation = () => {
        // Reset confetti animations first
        confettiAnimations.forEach((animation) => {
            animation.translateY.setValue(0)
            animation.translateX.setValue(0)
            animation.rotate.setValue(0)
            animation.opacity.setValue(1)
        })

        // Scale up celebration
        Animated.spring(celebrationScale, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
        }).start()

        // Animate confetti
        confettiAnimations.forEach((animation, index) => {
            const delay = index * 38
            const randomX = (Math.random() - 0.5) * 1200
            const randomRotation = Math.random() * 520

            Animated.parallel([
                Animated.timing(animation.translateY, {
                    toValue: 800,
                    duration: 4000,
                    delay,
                    useNativeDriver: true,
                }),
                Animated.timing(animation.translateX, {
                    toValue: randomX,
                    duration: 3000,
                    delay,
                    useNativeDriver: true,
                }),
                Animated.timing(animation.rotate, {
                    toValue: randomRotation,
                    duration: 3000,
                    delay,
                    useNativeDriver: true,
                }),
                Animated.timing(animation.opacity, {
                    toValue: 0,
                    duration: 3000,
                    delay: delay + 1000,
                    useNativeDriver: true,
                }),
            ]).start()
        })
    }
    const flipAnimation = useRef(new Animated.Value(0)).current
    const rotation = coinRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "1440deg"],
    })

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <Header heading='Toss' />

            {/* Scrollable Content */}
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View className="px-4 py-6 bg-white min-h-full">
                    {/* Who won the toss? */}
                    <View className="mb-6">
                        <Text className="text-xl font-bold text-gray-800 mb-4">Who won the toss?</Text>

                        <View className="flex-row gap-x-4">
                            <TouchableOpacity
                                className={`flex-1 bg-white rounded-2xl p-6 items-center border-2 shadow-sm ${selectedWinner?.id === teamA.id ? "border-[#0e7ccb]" : "border-gray-200"
                                    }`}
                                onPress={() => handleTeamSelect(teamA)}
                            >
                                <View
                                    className="w-20 h-20 rounded-full items-center justify-center mb-4"
                                    style={{ backgroundColor: teamA.color }}
                                >
                                    <Text className="text-white text-2xl font-bold">{teamA.initials}</Text>
                                </View>
                                <Text className="text-gray-800 font-bold text-md text-center">{teamA.name}</Text>
                                {selectedWinner?.id === teamA.id && (
                                    <View className="absolute top-4 right-4">
                                        <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                className={`flex-1 bg-white rounded-2xl p-6 items-center border-2 shadow-sm ${selectedWinner?.id === teamB.id ? "border-[#0e7ccb]" : "border-gray-200"
                                    }`}
                                onPress={() => handleTeamSelect(teamB)}
                            >
                                <View
                                    className="w-20 h-20 rounded-full items-center justify-center mb-4"
                                    style={{ backgroundColor: teamB.color }}
                                >
                                    <Text className="text-white text-2xl font-bold">{teamB.initials}</Text>
                                </View>
                                <Text className="text-gray-800 font-bold text-md text-center">{teamB.name}</Text>
                                {selectedWinner?.id === teamB.id && (
                                    <View className="absolute top-4 right-4">
                                        <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Winner of the toss elected to? */}
                    <View className="mb-4">
                        <Text className="text-xl font-bold text-gray-800 mb-4">Winner of the toss elected to?</Text>

                        <View className="flex-row gap-x-4">
                            <TouchableOpacity
                                className={`flex-1 bg-white rounded-2xl p-6 items-center border-2 shadow-sm ${selectedChoice === "BAT" ? "border-[#0e7ccb]" : "border-gray-200"
                                    }`}
                                onPress={() => handleChoiceSelect("BAT")}
                            >
                                <View className="w-20 h-20 rounded-full bg-gray-300 items-center justify-center mb-4">
                                    <Text className="text-4xl font-bold">🏏</Text>
                                </View>
                                <Text className="text-gray-800 font-bold text-md">BAT</Text>
                                {selectedChoice === "BAT" && (
                                    <View className="absolute top-4 right-4">
                                        <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                className={`flex-1 bg-white rounded-2xl p-6 items-center border-2 shadow-sm ${selectedChoice === "BOWL" ? "border-[#0e7ccb]" : "border-gray-200"
                                    }`}
                                onPress={() => handleChoiceSelect("BOWL")}
                            >
                                <View className="w-20 h-20 rounded-full bg-gray-300 items-center justify-center mb-4">
                                    <Text className="text-4xl font-bold">🥎</Text>
                                </View>
                                <Text className="text-gray-800 font-bold text-md">BOWL</Text>
                                {selectedChoice === "BOWL" && (
                                    <View className="absolute top-4 right-4">
                                        <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Coin Flip Section - Fixed Position */}
                    <View className="flex-1 items-center justify-center pb-4">
                        <Text className="text-xl font-bold text-gray-800 mb-2">
                            {coinResult ? `It's ${coinResult}!` : "Flip the Coin"}
                        </Text>

                        {/* Fixed Container for Coin - Prevents Movement */}
                        <View className="items-center justify-center h-48 w-48 mb-6">
                            <TouchableOpacity
                                onPress={flipCoin}
                                disabled={isFlipping}
                                className="items-center justify-center"
                                activeOpacity={0.8}
                            >
                                <View style={{ width: 160, height: 160, perspective: '1000' }}>
                                    {/* Front Side (HEADS) */}
                                    <Animated.View
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute",
                                            backfaceVisibility: "hidden",
                                            transform: [
                                                {
                                                    rotateY: coinRotation.interpolate({
                                                        inputRange: [0, 0.7, 1],
                                                        outputRange: ["0deg", "90deg", "180deg"],
                                                    }),
                                                },
                                            ],
                                            opacity: coinRotation.interpolate({
                                                inputRange: [0, 0.7, 1],
                                                outputRange: [1, 0, 0],
                                            }),
                                        }}
                                    >
                                        <Image
                                            source={require("../assets/images/head.png")}
                                            style={{ width: "100%", height: "100%", borderRadius: 80 }}
                                        />
                                    </Animated.View>

                                    {/* Back Side (TAILS) */}
                                    <Animated.View
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute",
                                            backfaceVisibility: "hidden",
                                            transform: [
                                                {
                                                    rotateY: coinRotation.interpolate({
                                                        inputRange: [0, 0.5, 1],
                                                        outputRange: ["180deg", "270deg", "360deg"],
                                                    }),
                                                },
                                            ],
                                            opacity: coinRotation.interpolate({
                                                inputRange: [0, 0.5, 1],
                                                outputRange: [0, 1, 1],
                                            }),
                                        }}
                                    >
                                        <Image
                                            source={require("../assets/images/tail.png")}
                                            style={{ width: "100%", height: "100%", borderRadius: 80 }}
                                        />
                                    </Animated.View>
                                </View>

                            </TouchableOpacity>

                        </View>

                        {isFlipping && <Text className="text-gray-600 text-md font-medium">Flipping coin...</Text>}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Actions - Fixed at Bottom */}
            <View className="bg-white border-t border-gray-200 p-4">
                <View className="flex-row gap-x-3">
                    <TouchableOpacity className="flex-1 bg-gray-200 rounded-xl py-4 items-center" onPress={() => router.push("/match-help")}>
                        <Text className="text-gray-700 font-bold">NEED HELP?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: selectedWinner && selectedChoice && coinResult ? "#0e7ccb" : "#d1d5db",
                        }}
                        className="flex-1 rounded-xl py-4 items-center"
                        onPress={handleLetsPlay}
                        disabled={!selectedWinner || !selectedChoice || !coinResult}
                    >
                        <Text className="text-white font-bold">LET'S PLAY</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Celebration Overlay */}
            {showCelebration && (
                <View className="absolute inset-0 pointer-events-none">
                    {/* Confetti */}
                    {confettiAnimations.map((animation, index) => (
                        <Animated.View
                            key={index}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#f0932b", "#eb4d4b"][index % 6],
                                left: "50%",
                                top: 40,
                                transform: [
                                    { translateX: animation.translateX },
                                    { translateY: animation.translateY },
                                    {
                                        rotate: animation.rotate.interpolate({
                                            inputRange: [0, 360],
                                            outputRange: ["0deg", "580deg"],
                                        }),
                                    },
                                    { scale: celebrationScale },
                                ],
                                opacity: animation.opacity,
                            }}
                        />
                    ))}
                </View>
            )}
        </SafeAreaView>
    )
}

export default TossScreen
