import BottomSheetWrapper, { BottomSheetRef } from "@/components/BottomSheetWrapper";
import ByeComponent from "@/components/scoring/Byecomponent";
import LegByeComponent from "@/components/scoring/LegByeComponent";
import MatchSettingsSidebar from "@/components/scoring/MatchSettingsSidebar";
import NoBallComponent from "@/components/scoring/NoBallComponent";
import OutTypeComponent from "@/components/scoring/OutTypeComponent";
import ShortcutsComponent from "@/components/scoring/ShortcutsComponent";
import ShotTypeComponent from "@/components/scoring/ShotTypeComponent";
import WideBallComponent from "@/components/scoring/WideBallComponent";
import SocialShare from "@/components/SocialShare";
import { RootState } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

const { height } = Dimensions.get('window');

interface Player {
    id: string
    name: string
    runs: number
    balls: number
    fours: number
    sixes: number
    isOnStrike: boolean
}

interface Bowler {
    id: string
    name: string
    overs: number
    maidens: number
    runs: number
    wickets: number
}

interface MatchState {
    totalRuns: number
    wickets: number
    overs: number
    balls: number
    target?: number
}

export default function CreateMatch() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [striker, setStriker] = useState<Player>({
        id: "1",
        name: "Babar Azam",
        runs: 45,
        balls: 32,
        fours: 4,
        sixes: 1,
        isOnStrike: true,
    });

    const [nonStriker, setNonStriker] = useState<Player>({
        id: "2",
        name: "Mohammad Rizwan",
        runs: 28,
        balls: 24,
        fours: 2,
        sixes: 0,
        isOnStrike: false,
    });

    const [bowler, setBowler] = useState<Bowler>({
        id: "1",
        name: "Jasprit Bumrah",
        overs: 3,
        maidens: 0,
        runs: 18,
        wickets: 1,
    });
    const [matchState, setMatchState] = useState<MatchState>({
        totalRuns: 125,
        wickets: 3,
        overs: 15,
        balls: 4,
        target: 180,
    });
    const [showSettings, setShowSettings] = useState(false);
    const [currentOver, setCurrentOver] = useState<string[]>(["1", "4", "W", "2"]);
    const user = useSelector((state: RootState) => state.user.profile);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const bottomSheetRef = useRef<BottomSheetRef>(null);

    const navigation = useNavigation();

    const isValidBall = (ball: string) => {
        // Add other non-legal deliveries if needed
        return !ball.startsWith("NB") && !ball.startsWith("WD");
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current?.close();
        setActiveTab(null);

        const validBalls = currentOver.filter(isValidBall);

        if (validBalls.length === 6) {
            alert("Over completed ts!");

            // Update match state: increment over count and reset balls
            setMatchState((prev) => ({
                ...prev,
                overs: prev.overs + 1,
                balls: 0,
            }));

            // Reset current over display
            setCurrentOver([]);
        }
    };

    const openBottomSheet = (tab: string) => {
        // setTimeout(() => {
        //     bottomSheetRef.current?.open();
        // }, 50);
        console.log("openBottomSheet", tab)
        setActiveTab(tab)
    }

    useEffect(() => {
        if (activeTab) {
            setTimeout(() => {
                bottomSheetRef.current?.open();
            }, 100);
        }
    }, [activeTab]);

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleRunScored = (runs: number) => {
        setMatchState((prev) => ({
            ...prev,
            totalRuns: prev.totalRuns + runs,
            balls: prev.balls + 1,
        }))

        setStriker((prev) => ({
            ...prev,
            runs: prev.runs + runs,
            balls: prev.balls + 1,
            fours: runs === 4 ? prev.fours + 1 : prev.fours,
            sixes: runs === 6 ? prev.sixes + 1 : prev.sixes,
        }))

        // Add to current over
        setCurrentOver((prev) => [...prev, runs.toString()])

        // Switch strike on odd runs
        if (runs % 2 === 1) {
            switchStrike()
        }
    }

    const handleNoBall = (runs: number, type: "bat" | "bye" | "legbye") => {
        setMatchState((prev) => ({
            ...prev,
            totalRuns: prev.totalRuns + runs + 1, // +1 for no ball penalty
            balls: prev.balls, // No ball doesn't count as a ball
        }))

        setCurrentOver((prev) => [...prev, `NB+${runs}`])
        // closeBottomSheet()
        setActiveTab(null)
    }

    const handleWide = (runs: number) => {
        setMatchState((prev) => ({
            ...prev,
            totalRuns: prev.totalRuns + runs + 1, // +1 for wide penalty
            balls: prev.balls, // Wide doesn't count as a ball
        }))

        setCurrentOver((prev) => [...prev, `WD+${runs}`])
        // closeBottomSheet()
        setActiveTab(null)
    }

    const handleLegBye = (runs: number) => {
        setMatchState((prev) => ({
            ...prev,
            totalRuns: prev.totalRuns + runs,
            balls: prev.balls + 1,
        }))

        setCurrentOver((prev) => [...prev, `LB${runs}`])
        // closeBottomSheet()
        setActiveTab(null)
    }

    const handleBye = (runs: number) => {
        setMatchState((prev) => ({
            ...prev,
            totalRuns: prev.totalRuns + runs,
            balls: prev.balls + 1,
        }))

        setCurrentOver((prev) => [...prev, `B${runs}`])
        closeBottomSheet()
    }

    const handleOutType = (type: string) => {
        setMatchState((prev) => ({
            ...prev,
            wickets: prev.wickets + 1,
            balls: prev.balls + 1,
        }))

        setCurrentOver((prev) => [...prev, "W"])
        closeBottomSheet()
    }

    const handleShotType = (type: string) => {
        // Handle shot type selection
        closeBottomSheet()
    }

    const switchStrike = () => {
        setStriker((prev) => ({ ...prev, isOnStrike: false }))
        setNonStriker((prev) => ({ ...prev, isOnStrike: true }))

        // Swap striker and non-striker
        const temp = striker
        setStriker(nonStriker)
        setNonStriker(temp)
    }

    const undoLastBall = () => {
        if (currentOver.length > 0) {
            const lastBall = currentOver[currentOver.length - 1]
            setCurrentOver((prev) => prev.slice(0, -1))

            // Reverse the scoring based on last ball
            if (!isNaN(Number(lastBall))) {
                const runs = Number(lastBall)
                setMatchState((prev) => ({
                    ...prev,
                    totalRuns: prev.totalRuns - runs,
                    balls: prev.balls - 1,
                }))

                setStriker((prev) => ({
                    ...prev,
                    runs: prev.runs - runs,
                    balls: prev.balls - 1,
                    fours: runs === 4 ? prev.fours - 1 : prev.fours,
                    sixes: runs === 6 ? prev.sixes - 1 : prev.sixes,
                }))
            }
        }
    }


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1">

                    <View className="relative overflow-hidden" style={{ width: '100%' }}>
                        <Image
                            source={require("../assets/images/cricket-equipment.jpg")}
                            style={{ width: '100%', height: height * 0.35 }}
                            resizeMode="cover"
                        />

                        <View
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            }}
                        />

                        <View
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: 16,
                            }}
                        >
                            <View className="mx-4 mt-3 rounded-lg shadow-sm">
                                <View className="p-4">
                                    <View className="flex-col justify-between items-center">
                                        <View>
                                            <Text className="text-2xl font-bold text-white">
                                                {matchState.totalRuns}/{matchState.wickets}
                                            </Text>
                                            <Text className="text-sm" style={{ color: '#cac9c9' }}>
                                                {matchState.overs}.{matchState.balls} overs
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Back button */}
                        <View className="flex-row items-center"
                            style={{
                                position: 'absolute',
                                top: 16,
                                zIndex: 10,
                            }}
                        >

                            <View className="flex-row items-center justify-between w-full px-4">
                                <TouchableOpacity className="mr-4" onPress={() => router.back()}>
                                    <Ionicons name="arrow-back" size={24} color="white" />
                                </TouchableOpacity>
                                <View>
                                    <Text className="text-white text-lg font-semibold">Pakistan vs India</Text>
                                    <Text className="text-gray-300 text-sm">T20 Match • Over {matchState.overs + 1}</Text>
                                </View>
                                <View className="flex-row items-center justify-center gap-x-3 ">
                                    {/* <TouchableOpacity onPress={() => console.log('Share pressed')}>
                                        <Ionicons name="share-social-outline" size={24} color="white" />
                                    </TouchableOpacity> */}

                                    <SocialShare
                                        title="Custom Share Title"
                                        message="Check out this exciting cricket match on Cricdom! Watch live scores, make your picks, and play along!"
                                        url="https://expo.dev/@alikamran07/cricdom"
                                        color='white'
                                        className=''
                                    />

                                    <TouchableOpacity onPress={() => setShowSettings(true)}>
                                        <Ionicons name="settings-outline" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                position: 'absolute',
                                bottom: 16,
                                zIndex: 10,
                            }}
                        >
                            <View className="flex-row justify-between items-center w-full px-6">
                                <Text className="text-sm" style={{ color: '#cac9c9' }}>Target: {matchState.target}</Text>
                                <Text className="text-sm font-medium" style={{ color: '#b2adad' }}>
                                    Need {matchState.target! - matchState.totalRuns} runs
                                </Text>
                            </View>
                        </View>

                    </View>

                    <ScrollView className="flex-1 mt-4"
                        contentContainerStyle={{ paddingBottom: 120 }}
                    >

                        <View className="px-5 py-2">
                            <Text className="text-lg font-semibold text-gray-800 mb-4">Scoring Panel</Text>

                            {/* Run Buttons */}
                            <View className="flex-row flex-wrap justify-between mb-2">
                                {[0, 1, 2, 3, 4, 6].map((run) => (
                                    <TouchableOpacity
                                        key={run}
                                        onPress={() => {
                                            handleRunScored(run)
                                            console.log('dddddd')
                                            if (run > 0)
                                                openBottomSheet("shottype")
                                        }}
                                        className="w-[48%] py-3 mb-2 border border-gray-300 rounded-lg items-center"
                                    >
                                        <Text className="text-base font-medium text-gray-800">
                                            {run} Run{run !== 1 ? "s" : ""}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Wicket Button */}
                            <TouchableOpacity
                                onPress={() => openBottomSheet("wicket")}
                                className="w-full py-3 mb-2 border border-gray-300 rounded-lg items-center"
                            >
                                <Text className="text-base font-semibold text-red-600">WICKET</Text>
                            </TouchableOpacity>

                            {/* Extras Section */}
                            {/* <Text className="text-sm font-medium text-gray-500 mb-2">Extras</Text> */}
                            <View className="flex-row flex-wrap justify-between mb-4 mt-2">
                                <TouchableOpacity
                                    onPress={() => openBottomSheet("wide")}
                                    className="w-[48%] py-3 mb-2 border border-gray-300 rounded-lg items-center"
                                >
                                    <Text className="text-base font-medium text-gray-600">Wide</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => openBottomSheet("noball")}
                                    className="w-[48%] py-3 mb-2 border border-gray-300 rounded-lg items-center"
                                >
                                    <Text className="text-base font-medium text-gray-600">No Ball</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => openBottomSheet("bye")}
                                    className="w-[48%] py-3 mb-2 border border-gray-300 rounded-lg items-center"
                                >
                                    <Text className="text-base font-medium text-gray-600">Bye</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        // setSnapPoints(["20%", "25%"])
                                        openBottomSheet("legbye")
                                    }}
                                    className="w-[48%] py-3 mb-2 border border-gray-300 rounded-lg items-center"
                                >
                                    <Text className="text-base font-medium text-gray-600">Leg Bye</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </ScrollView>

                    <View>
                        <ScoringShortcutsHeader openBottomSheet={openBottomSheet} />
                        <View className="bg-gray-800 border-t border-gray-700">
                            <View className="px-4 py-3">
                                {/* Top row with batsmen and bowler info */}
                                <View className="flex-row items-center justify-between mb-2">
                                    {/* Left: Batsmen */}
                                    <View className="flex-row items-center gap-x-4">
                                        <View className="flex-row items-center">
                                            <View className="w-1 h-4 bg-[#0e7ccb] mr-2" />
                                            <Text className="text-white text-sm font-medium">{striker.name.split(" ")[0].toUpperCase()}</Text>
                                            <Text className="text-gray-300 text-sm ml-2">{striker.runs}</Text>
                                            <Text className="text-gray-400 text-xs ml-1">{striker.balls}</Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            <Text className="text-white text-sm font-medium">{nonStriker.name.split(" ")[0].toUpperCase()}</Text>
                                            <Text className="text-gray-300 text-sm ml-2">{nonStriker.runs}</Text>
                                            <Text className="text-gray-400 text-xs ml-1">{nonStriker.balls}</Text>
                                        </View>
                                    </View>

                                    {/* Center: Match state */}
                                    <View className="items-center">
                                        <Text className="text-white text-lg font-bold">
                                            {matchState.totalRuns}-{matchState.wickets}
                                        </Text>
                                        <Text className="text-gray-300 text-xs">
                                            OVERS {matchState.overs}.{matchState.balls}
                                        </Text>
                                    </View>

                                    {/* Right: Bowler */}
                                    <View className="items-end">
                                        <Text className="text-white text-sm font-medium">{bowler.name.split(" ")[0].toUpperCase()}</Text>
                                        <Text className="text-gray-300 text-xs">
                                            {bowler.wickets}-{bowler.runs}
                                        </Text>
                                    </View>
                                </View>

                                {/* Bottom row with current over and controls */}
                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row items-center">
                                        <Text className="text-gray-400 text-xs mr-3">THIS OVER</Text>
                                        <View className="flex-row gap-x-1">
                                            {currentOver.map((ball, index) => (
                                                <View
                                                    key={index}
                                                    className={`w-6 h-6 rounded items-center justify-center ${ball === "W"
                                                        ? "bg-red-500"
                                                        : ball === "4"
                                                            ? "bg-blue-500"
                                                            : ball === "6"
                                                                ? "bg-purple-500"
                                                                : ball === "WD" || ball === "NB"
                                                                    ? "bg-orange-500"
                                                                    : "bg-gray-600"
                                                        }`}
                                                >
                                                    <Text
                                                        className="text-white text-xs font-medium"
                                                        numberOfLines={1}
                                                        ellipsizeMode="tail"
                                                    >
                                                        {ball}
                                                    </Text>
                                                </View>
                                            ))}
                                            {/* Empty balls */}
                                            {Array.from({ length: 6 - currentOver.length }).map((_, index) => (
                                                <View key={`empty-${index}`} className="w-6 h-6 rounded border border-gray-600" />
                                            ))}
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={undoLastBall} className="bg-gray-700 px-3 py-1 rounded">
                                        <Text className="text-white text-xs font-medium">UNDO</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {
                        showSettings &&
                        <MatchSettingsSidebar isVisible={showSettings} onClose={() => setShowSettings(false)} />
                    }

                    {activeTab && (
                        <View style={StyleSheet.absoluteFill}>
                            <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
                        </View>
                    )}

                    <BottomSheetWrapper
                        ref={bottomSheetRef}
                        onClose={closeBottomSheet}
                    >
                        {activeTab === "noball" && <NoBallComponent onNoBall={handleNoBall} />}
                        {activeTab === "wide" && <WideBallComponent onWide={handleWide} />}
                        {activeTab === "legbye" && <LegByeComponent onLegBye={handleLegBye} />}
                        {activeTab === "bye" && <ByeComponent onBye={handleBye} currentBowler={bowler.name} />}
                        {activeTab === "wicket" && <OutTypeComponent onOutType={handleOutType} />}
                        {activeTab === "shottype" && <ShotTypeComponent onShotType={handleShotType} />}
                        {activeTab === "shortcuts" && <ShortcutsComponent />}
                    </BottomSheetWrapper>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>

    )
}


const styles = StyleSheet.create({

    sheetContent: { flex: 1, padding: 16 },
    sheetTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
    leagueItem: { padding: 12, borderBottomWidth: 1, borderColor: '#E5E7EB' },
    leagueText: { fontSize: 16 }

});

interface ScoringShortcutsHeaderProps {
    openBottomSheet: (tab: string) => void;
}

export function ScoringShortcutsHeader({ openBottomSheet }: ScoringShortcutsHeaderProps) {
    const bounceAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: -4,
                    duration: 400,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Pressable
            onPress={() => {
                openBottomSheet('shortcuts')
            }}
        >
            <View className="flex-row items-center justify-center bg-gray-200 py-1">
                <Text className="mr-2 font-medium text-base text-gray-600">Scoring Shortcuts</Text>
                <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
                    <Ionicons name="chevron-up" size={20} color="gray" />
                </Animated.View>
            </View>
        </Pressable>
    );
}

