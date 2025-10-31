import BottomSheetWrapper, { BottomSheetRef } from "@/components/BottomSheetWrapper";
import ByeComponent from "@/components/scoring/Byecomponent";
import ChangeScorer from "@/components/scoring/ChangeScorer";
import LegByeComponent from "@/components/scoring/LegByeComponent";
import MatchSettingsSidebar from "@/components/scoring/MatchSettingsSidebar";
import MatchStatusComponent from "@/components/scoring/MatchStatusComponent";
import ChangeModal from "@/components/scoring/modal/ChangeAndReplaceModal";
import ChangeMatchOvers from "@/components/scoring/modal/ChangeMatchOvers";
import EndInnings from "@/components/scoring/modal/EndInnings";
import MatchResult from "@/components/scoring/modal/MatchResult";
import NoBallComponent from "@/components/scoring/NoBallComponent";
import OutTypeComponent from "@/components/scoring/OutTypeComponent";
import PlayerBottomSheetComponent from "@/components/scoring/PlayerBottomSheetComponent";
import ShortcutsComponent from "@/components/scoring/ShortcutsComponent";
import ShotTypeComponent from "@/components/scoring/ShotTypeComponent";
import WideBallComponent from "@/components/scoring/WideBallComponent";
import SocialShare from "@/components/SocialShare";
import Modal from "@/components/ui/Modal";
import { RootState } from "@/store";
import { showAlert } from "@/store/features/alerts/alertSlice";
import { useCreateBowlerStatsMutation, useCreateOverMutation, useCreatePlayerScoreMutation, useUpdateBowlerStatsMutation, useUpdateInningMutation, useUpdatePlayerScoreMutation } from "@/store/features/inning/inningApi";
import { useCreateBallMutation, useCreateWicketMutation, useUpdateBallMutation } from "@/store/features/scoring/scoringApi";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
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
    sixes: number,
    documentId: string,
    isOnStrike: boolean
}

interface Bowler {
    id: string
    name: string
    overs: number
    maidens: number
    runs: number
    wickets: number,
    documentId: string,
    overs_bowled: any,
}

interface MatchState {
    totalRuns: number
    wickets: number
    overs: number
    balls: number
    target?: number,
    documentId: string,
    overs_limit?: any
    match_type?: any
}

export default function ScoringScreen() {
    const router = useRouter();
    const dispatch = useDispatch();

    const params: any = useLocalSearchParams();
    const match = params?.match ? JSON.parse(params.match) : null;
    const battingTeam = params?.battingTeam ? JSON.parse(params.battingTeam) : null;
    const initialBowlingTeam = params?.bowlingTeam ? JSON.parse(params.bowlingTeam) : null;
    const initialCurrentOver = params?.currentOver ? JSON.parse(params.currentOver) : null;


    const initialStrikerScore = params?.strikerScore ? JSON.parse(params.strikerScore) : null;
    const initialNonStrikerScore = params?.nonStrikerScore ? JSON.parse(params.nonStrikerScore) : null;
    const bowlerStats = params?.bowlerStats ? JSON.parse(params.bowlerStats) : null;

    const initialInning = params?.inning ? JSON.parse(params.inning) : null;
    const initialStiker = params?.striker ? JSON.parse(params.striker) : null;
    const initialNonStriker = params?.nonStriker ? JSON.parse(params.nonStriker) : null;
    const initialBowler = params?.bowler ? JSON.parse(params.bowler) : null;


    const [createBall] = useCreateBallMutation();
    const [updateBall] = useUpdateBallMutation();
    const [createOver] = useCreateOverMutation();
    const [createWicket] = useCreateWicketMutation();
    const [createPlayerScore] = useCreatePlayerScoreMutation();
    const [updatePlayerScore] = useUpdatePlayerScoreMutation();
    const [updateBowlerStats] = useUpdateBowlerStatsMutation();
    const [createBowlerStats] = useCreateBowlerStatsMutation();
    const [updateInning] = useUpdateInningMutation();

    const [striker, setStriker] = useState<Player>(initialStiker);
    const [bowlingTeam, setBowlingTeam] = useState<any>(initialBowlingTeam);

    const [inning, setInning] = useState<any>(initialInning);

    const [strikerScore, setStrikerScore] = useState<any>(initialStrikerScore);
    const [nonStrikerScore, setNonStrikerScore] = useState<any>(initialNonStrikerScore);

    const [nonStriker, setNonStriker] = useState<Player>(initialNonStriker);

    const [bowler, setBowler] = useState<Bowler>(initialBowler);
    const [ball, setBall] = useState<any>(null);
    const [matchState, setMatchState] = useState<MatchState>(match);
    const [bowlerState, setBowlerState] = useState<any>(bowlerStats);
    const [showSettings, setShowSettings] = useState(false);
    const [highlight, setHighlight] = useState<null | 'four' | 'six' | 'wicket'>(null);

    const [currentOver, setCurrentOver] = useState<string[]>([]);
    const [currentOverId, setCurrentOverId] = useState<string>(initialCurrentOver?.documentId);

    const [activeReplaceActions, setActiveReplaceActions] = useState<any>(null);

    const user = useSelector((state: RootState) => state.user.profile);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [formData, setFormData] = useState(null)
    const bottomSheetRef = useRef<BottomSheetRef>(null);

    const navigation = useNavigation();

    const isValidBall = (ball: string) => {
        // Add other non-legal deliveries if needed
        return !ball.startsWith("NB") && !ball.startsWith("WD");
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current?.close();
        setActiveTab(null);
    };

    const openBottomSheet = (tab: string) => {
        // setTimeout(() => {
        // }, 50);
        setActiveTab(tab)
        // bottomSheetRef.current?.open();
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

    const handleRunScored = async (runs: number) => {
        setHighlight(null);
        try {
            // ⚡ 1. Update match UI instantly
            setMatchState((prev) => ({
                ...prev,
                totalRuns: prev.totalRuns + runs,
                balls: prev.balls + 1,
            }));

            // ⚡ 2. Update striker local stats for instant feedback
            setStriker((prev) => ({
                ...prev,
                runs: prev.runs + runs,
                balls: prev.balls + 1,
                fours: runs === 4 ? prev.fours + 1 : prev.fours,
                sixes: runs === 6 ? prev.sixes + 1 : prev.sixes,
            }));

            // ⚡ 3. Add to current over tracking
            setCurrentOver((prev) => [...prev, runs.toString()]);
            const validBalls = [...currentOver, runs.toString()].filter(isValidBall);


            const isOverComplete = validBalls.length >= 6;

            const isOddRun = runs === 1 || runs === 3;

            // ⚡ 4. Save Ball in Strapi
            const ballRecord = await createBall({
                data: {
                    runs,
                    ball_number: validBalls.length,
                    over: matchState.overs + 1,
                    batsman: strikerScore?.isStriker ? striker.documentId : nonStriker.documentId,
                    bowler: bowler.documentId,
                    is_extra: false,
                },
            }).unwrap();
            if (ballRecord?.data)
                setBall(ballRecord?.data);

            if (runs !== 0)
                bottomSheetRef.current?.open();

            const updatedScore = (playerStrike: any, strikerStatus = true) => {
                const { id, updatedAt, documentId, createdAt, inning, player, ...restStrikerScore } =
                    playerStrike;

                return {
                    ...restStrikerScore,
                    runs: restStrikerScore?.isStriker ?
                        ((restStrikerScore.runs || 0) + runs)
                        : restStrikerScore.runs,
                    balls_faced: restStrikerScore?.isStriker ? ((restStrikerScore.balls_faced || 0) + 1) : restStrikerScore.balls_faced,
                    isStriker: strikerStatus,
                    strike_rate: (((restStrikerScore.runs / restStrikerScore.balls_faced) || 0) * 100).toFixed(2),
                    fours:
                        runs === 4
                            ? (restStrikerScore.fours || 0) + 1
                            : restStrikerScore.fours || 0,
                    sixes:
                        runs === 6
                            ? (restStrikerScore.sixes || 0) + 1
                            : restStrikerScore.sixes || 0,
                };
            }


            if (strikerScore?.isStriker) {
                // Update the backend
                //  if (currentOver?.length > 5) {
                await updatePlayerScore({
                    id: initialStrikerScore?.documentId,
                    data: updatedScore(strikerScore,
                        currentOver?.length < 5 ? (runs !== 1 && runs !== 3) : isOddRun
                    ),
                });
                setStrikerScore(updatedScore(strikerScore,
                    currentOver?.length < 5 ? (runs !== 1 && runs !== 3) : isOddRun)
                );
                if (currentOver?.length < 5 ? isOddRun : (runs !== 1 && runs !== 3)) {
                    await updatePlayerScore({
                        id: initialNonStrikerScore?.documentId,
                        data: updatedScore(nonStrikerScore, true),
                    });
                    setNonStrikerScore(updatedScore(nonStrikerScore, true));
                }
            }
            else {
                await updatePlayerScore({
                    id: initialNonStrikerScore?.documentId,
                    data: updatedScore(nonStrikerScore,
                        currentOver?.length < 5 ? (runs !== 1 && runs !== 3) : isOddRun
                    ),
                });
                setNonStrikerScore((prev: any) => ({
                    ...prev,
                    ...updatedScore(
                        nonStrikerScore,
                        currentOver?.length < 5 ? (runs !== 1 && runs !== 3) : isOddRun
                    ),
                }));

                if (currentOver?.length < 5 ? isOddRun : (runs !== 1 && runs !== 3)) {
                    await updatePlayerScore({
                        id: initialStrikerScore?.documentId,
                        data: updatedScore(strikerScore, true),
                    });
                    setStrikerScore((prev: any) => ({
                        ...prev,
                        ...updatedScore(strikerScore, true)
                    }));
                }
            }


            // ⚡ 7. Update bowler stats
            await updateBowlerStats({
                id: bowlerStats.documentId,
                data: {
                    runs_conceded: bowler.runs + runs,
                },
            });

            // ✅ If over complete — handle next over logic
            if (isOverComplete) {

                const runsInOver = validBalls.reduce(
                    (sum, ball) => sum + (parseInt(ball.replace(/\D/g, ""), 10) || 0),
                    0
                );

                const newOver = await createOver({
                    data: {
                        over_number: inning.over_number + 1,
                        inning: inning?.documentId,
                        bowler: bowler?.documentId,
                        runs_in_over: runsInOver,
                    },
                }).unwrap();

                const newOverId = newOver?.data?.documentId;

                const inningData = await updateInning({
                    id: inning?.documentId,
                    data: {
                        overs: [
                            ...(inning?.overs?.map((o: any) => o.documentId) || []),
                            newOverId,
                        ],
                        runs: (inning?.runs || 0) + runs,
                        current_over: (inning?.current_over || 0) + 1,
                        current_striker: (isOddRun ? !strikerScore?.isStriker : strikerScore?.isStriker)
                            ? nonStriker.documentId
                            : striker.documentId,
                        current_non_striker: (isOddRun ? !strikerScore?.isStriker : strikerScore?.isStriker)
                            ? striker.documentId
                            : nonStriker.documentId,
                    },
                }).unwrap();

                if (inningData?.data)
                    setInning(inningData?.data);

                // setActiveModal("Change Bowler");
                if (runs === 0) {
                    setCurrentOver([]);
                    setActiveReplaceActions('Next Bowler');
                    dispatch(showAlert({ type: 'success', message: 'Over completed! Please select the next bowler.' }));
                }

            } else {
                const inningData = await updateInning({
                    id: inning?.documentId,
                    data: {
                        runs: (inning?.runs || 0) + runs,
                        current_striker: (isOddRun ? strikerScore?.isStriker : !strikerScore?.isStriker)
                            ? nonStriker.documentId
                            : striker.documentId,
                        current_non_striker: (isOddRun ? strikerScore?.isStriker : !strikerScore?.isStriker)
                            ? striker.documentId
                            : nonStriker.documentId,
                    },
                }).unwrap();

                if (inningData?.data)
                    setInning(inningData?.data);
            }
        } catch (error) {
            console.error("Failed to save ball data:", error);
        }
    };

    const handleShotType = async (type: string) => {
        // Handle shot type selection
        closeBottomSheet();

        await updateBall({
            id: ball.documentId,
            data: {
                shot_type: type
            },
        }).unwrap();


        const validBalls = currentOver.filter(isValidBall);

        // ✅ Trigger animation
        if (ball?.runs === 4) {
            setHighlight('four');

            if (validBalls.length === 6) {
                setTimeout(() => {
                    setActiveReplaceActions('Next Bowler')
                }, 3200);
            }
        } else if (ball?.runs === 6) {
            setHighlight('six');
            if (validBalls.length === 6) {
                setTimeout(() => {
                    setActiveReplaceActions('Next Bowler')
                }, 3200);
            }
        } else {
            if (validBalls.length === 6) {
                setActiveReplaceActions('Next Bowler')
            }
        }

        if (validBalls.length === 6) {
            setCurrentOver([]);

            // const bowlerStatsRes = await createBowlerStats({
            //     data: {
            //         bowler: bowler.documentId,
            //         inning: inning.documentId,
            //         overs_bowled: 0,
            //         maidens: 0,
            //         runs_conceded: 0,
            //         wickets_taken: 0,
            //     },
            // }).unwrap();
            // const bowlerStats = bowlerStatsRes?.data || bowlerStatsRes;


            dispatch(showAlert({ type: 'success', message: 'Over completed! Please select the next bowler.' }));
        }

    }

    // const handleNoBall = (runs: number, type: "bat" | "bye" | "legbye") => {
    //     setMatchState((prev) => ({
    //         ...prev,
    //         totalRuns: prev.totalRuns + runs + 1, // +1 for no ball penalty
    //         balls: prev.balls, // No ball doesn't count as a ball
    //     }))

    //     setCurrentOver((prev) => [...prev, `NB+${runs}`])
    //     closeBottomSheet()
    //     setActiveTab(null)
    // }

    const handleNoBall = async (runs: number, type: "bat" | "bye" | "legbye") => {
        try {
            setMatchState((prev) => ({
                ...prev,
                totalRuns: prev.totalRuns + runs + 1,
            }));

            setCurrentOver((prev) => [...prev, `NB+${runs}`]);

            await createBall({
                data: {
                    runs: runs + 1,
                    ball_number: matchState.balls,
                    over: matchState.overs + 1,
                    batsman: striker.documentId,
                    bowler: bowler.documentId,
                    is_extra: true,
                    extra_type: "no-ball",
                    extra_subtype: type, // (bat, bye, or legbye)
                },
            });

            await updateBowlerStats({
                id: bowler.documentId,
                data: { runs_conceded: bowler.runs + runs + 1 },
            });
        } catch (err) {
            console.error("Error saving no-ball:", err);
        } finally {
            closeBottomSheet();
        }
    };


    const handleWide = async (runs: number) => {
        try {
            setMatchState((prev) => ({
                ...prev,
                totalRuns: prev.totalRuns + runs + 1,
            }));

            setCurrentOver((prev) => [...prev, `WD+${runs}`]);

            await createBall({
                data: {
                    runs: runs + 1,
                    ball_number: matchState.balls,
                    over: matchState.overs + 1,
                    batsman: striker.id,
                    bowler: bowler.id,
                    is_extra: true,
                    extra_type: "wide",
                },
            });

            await updateBowlerStats({
                id: bowler.id,
                data: { runs_conceded: bowler.runs + runs + 1 },
            });
        } catch (err) {
            console.error("Error saving wide:", err);
        } finally {
            closeBottomSheet();
        }
    };


    // const handleWide = (runs: number) => {
    //     setMatchState((prev) => ({
    //         ...prev,
    //         totalRuns: prev.totalRuns + runs + 1, // +1 for wide penalty
    //         balls: prev.balls, // Wide doesn't count as a ball
    //     }))

    //     setCurrentOver((prev) => [...prev, `WD+${runs}`])
    //     closeBottomSheet()
    //     setActiveTab(null)
    // }

    // const handleLegBye = (runs: number) => {
    //     setMatchState((prev) => ({
    //         ...prev,
    //         totalRuns: prev.totalRuns + runs,
    //         balls: prev.balls + 1,
    //     }))

    //     setCurrentOver((prev) => [...prev, `LB${runs}`])
    //     closeBottomSheet()
    //     setActiveTab(null)
    // }

    const handleLegBye = async (runs: number) => {
        try {
            setMatchState((prev) => ({
                ...prev,
                totalRuns: prev.totalRuns + runs,
                balls: prev.balls + 1,
            }));

            setCurrentOver((prev) => [...prev, `LB${runs}`]);

            await createBall({
                data: {
                    runs,
                    ball_number: matchState.balls + 1,
                    over: matchState.overs + 1,
                    batsman: striker.id,
                    bowler: bowler.id,
                    is_extra: true,
                    extra_type: "leg-bye",
                },
            });
        } catch (err) {
            console.error("Error saving leg-bye:", err);
        } finally {
            closeBottomSheet();
        }
    };

    // const handleBye = (runs: number) => {
    //     setMatchState((prev) => ({
    //         ...prev,
    //         totalRuns: prev.totalRuns + runs,
    //         balls: prev.balls + 1,
    //     }))

    //     setCurrentOver((prev) => [...prev, `B${runs}`])
    //     closeBottomSheet()
    // }

    const handleBye = async (runs: number) => {
        try {
            setMatchState((prev) => ({
                ...prev,
                totalRuns: prev.totalRuns + runs,
                balls: prev.balls + 1,
            }));

            setCurrentOver((prev) => [...prev, `B${runs}`]);

            await createBall({
                data: {
                    runs,
                    ball_number: matchState.balls + 1,
                    over: matchState.overs + 1,
                    batsman: striker.id,
                    bowler: bowler.id,
                    is_extra: true,
                    extra_type: "bye",
                },
            });
        } catch (err) {
            console.error("Error saving bye:", err);
        } finally {
            closeBottomSheet();
        }
    };

    const handleOutType = async (type: string) => {
        closeBottomSheet();
        setHighlight('wicket')

        try {
            // Update UI
            setMatchState((prev) => ({
                ...prev,
                wickets: prev.wickets + 1,
                balls: prev.balls + 1,
            }));

            setCurrentOver((prev) => [...prev, "W"]);

            // 🧠 Save to backend
            const wicketRes = await createWicket({
                data: {
                    batsman_out: striker.documentId,
                    out_type: type, // e.g. "bowled", "caught", "lbw"
                },
            });

            // Link the ball record with this wicket
            await createBall({
                data: {
                    runs: 0,
                    ball_number: matchState.balls + 1,
                    over: matchState.overs + 1,
                    batsman: striker.documentId,
                    bowler: bowler.documentId,
                    wicket: wicketRes.data?.documentId,
                },
            });

            // Update player stats
            await updatePlayerScore({
                id: strikerScore.documentId,
                data: {
                    is_out: true,
                },
            });

            await updateBowlerStats({
                id: bowlerStats.documentId,
                data: {
                    wickets_taken: bowlerStats.wickets + 1,
                },
            });

        } catch (error) {
            console.error("Error creating wicket:", error);
        } finally {
            // closeBottomSheet();
        }
    };


    const shortcutHandler = (type: string) => {
        if (type === 'Match Breaks' || type === 'wicket') {
            setActiveTab(type)
            setShowSettings(false)
        }
        else if (type === 'Change Scorer') {
            setActiveTab(type)
            setShowSettings(false)
        }
        else {
            closeBottomSheet();
            setActiveModal(type);
            setShowSettings(false)
        }
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
                                                {inning?.runs || 0}/{inning?.wickets || 0}
                                            </Text>
                                            <Text className="text-sm" style={{ color: '#cac9c9' }}>
                                                {inning.current_over || 0}.{currentOver.filter(isValidBall)?.length || 0}{" / "}
                                                {matchState?.overs_limit || 0} overs

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
                                    <Entypo name="arrow-bold-left" size={29} color="white" />
                                </TouchableOpacity>
                                <View>
                                    <Text className="text-white text-lg font-semibold">Pakistan vs India</Text>
                                    <Text className="text-gray-300 text-sm">{matchState.match_type} • Over {matchState.overs_limit}</Text>
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
                            {/* Note: Tesst after */}
                            {/* <View className="flex-row justify-between items-center w-full px-6">
                                <Text className="text-sm" style={{ color: '#cac9c9' }}>Target: {matchState.target}</Text>
                                <Text className="text-sm font-medium" style={{ color: '#b2adad' }}>
                                    Need {matchState.target! - matchState.totalRuns} runs
                                </Text>
                            </View> */}
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
                            {highlight && (
                                <HighlightAnimation
                                    highlight={highlight}
                                    onFinish={() => setHighlight(null)}
                                />
                            )}

                            {
                                !highlight &&
                                <View className="px-4 py-3">
                                    {/* Top row with batsmen and bowler info */}
                                    <View className="flex-row items-center justify-between mb-2">
                                        {/* Left: Batsmen */}
                                        <View className="flex-row items-center gap-x-4">
                                            <View className="flex-row items-center">
                                                {
                                                    strikerScore?.isStriker &&
                                                    <View className="w-1 h-4 bg-[#0e7ccb] mr-2" />
                                                }
                                                <Text className="text-white text-sm font-medium">{striker.name.split(" ")[0].toUpperCase()}</Text>
                                                <Text className="text-gray-300 text-sm ml-2">{strikerScore?.runs || 0}</Text>
                                                <Text className="text-gray-400 text-xs ml-1">{strikerScore.balls_faced || 0}</Text>
                                            </View>
                                            <View className="flex-row items-center">
                                                {
                                                    nonStrikerScore?.isStriker &&
                                                    <View className="w-1 h-4 bg-[#0e7ccb] mr-2" />
                                                }
                                                <Text className="text-white text-sm font-medium">{nonStriker.name.split(" ")[0].toUpperCase()}</Text>
                                                <Text className="text-gray-300 text-sm ml-2">{nonStrikerScore?.runs || 0}</Text>
                                                <Text className="text-gray-400 text-xs ml-1">{nonStrikerScore.balls_faced || 0}</Text>
                                            </View>
                                        </View>

                                        {/* Center: Match state */}
                                        <View className="items-center">
                                            <Text className="text-white text-lg font-bold">
                                                {inning?.runs || 0}-{inning?.wickets || 0}
                                            </Text>

                                            <Text className="text-gray-300 text-xs">
                                                OVERS {inning?.current_over || 0}.{currentOver.filter(isValidBall)?.length || 0}
                                                {" / "}
                                                {matchState?.overs_limit || 0}
                                            </Text>
                                        </View>

                                        {/* Right: Bowler */}
                                        <View className="items-end">
                                            <Text className="text-white text-sm font-medium">{bowler.name.split(" ")[0].toUpperCase()}</Text>
                                            <Text className="text-gray-300 text-xs">
                                                {bowler.wickets || 0}-{bowler?.runs || 0}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Bottom row with current over and controls */}
                                    <View className="flex-row items-center justify-between w-full">
                                        {/* Left side: THIS OVER with horizontal scroll */}
                                        <View className="flex-1 flex-row items-center overflow-hidden">
                                            <Text className="text-gray-400 text-xs mr-3 shrink-0">THIS OVER</Text>

                                            <ScrollView
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                contentContainerStyle={{ flexDirection: "row", gap: 4 }}
                                                style={{ flexGrow: 0 }}
                                            >
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
                                                {Array.from({ length: Math.max(0, 6 - currentOver.length) }).map(
                                                    (_, index) => (
                                                        <View
                                                            key={`empty-${index}`}
                                                            className="w-6 h-6 rounded border border-gray-600"
                                                        />
                                                    )
                                                )}
                                            </ScrollView>
                                        </View>

                                        {/* Right side: UNDO button (fixed position) */}
                                        <TouchableOpacity
                                            onPress={undoLastBall}
                                            className="bg-gray-700 px-3 py-1 rounded ml-3"
                                        >
                                            <Text className="text-white text-xs font-medium">UNDO</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            }
                        </View>
                    </View>

                    {
                        showSettings &&
                        <MatchSettingsSidebar isVisible={showSettings} onClose={() => setShowSettings(false)} onPress={shortcutHandler} />
                    }

                    {activeTab && (
                        <View style={StyleSheet.absoluteFill}>
                            <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
                        </View>
                    )}

                    {
                        (activeReplaceActions === 'Change Bowler' || activeReplaceActions === 'Next Bowler') &&
                        <ChangeModal
                            visible={activeReplaceActions !== null}
                            onClose={() => setActiveReplaceActions(null)}
                            selectedItem={bowler}
                            setSelectedItem={setBowler}
                            data={bowlingTeam?.players}
                            heading={activeReplaceActions}
                        />
                    }

                    <BottomSheetWrapper
                        ref={bottomSheetRef}
                        onClose={closeBottomSheet}
                    >
                        {activeTab === "noball" && <NoBallComponent onNoBall={handleNoBall} openSettingHandler={() => setShowSettings(true)} />}
                        {activeTab === "wide" && <WideBallComponent onWide={handleWide} openSettingHandler={() => setShowSettings(true)} />}
                        {activeTab === "legbye" && <LegByeComponent onLegBye={handleLegBye} />}
                        {activeTab === "bye" && <ByeComponent onBye={handleBye} currentBowler={bowler.name} />}
                        {activeTab === "wicket" && <OutTypeComponent onOutType={handleOutType} />}
                        {activeTab === "shottype" && <ShotTypeComponent onShotType={handleShotType} />}
                        {activeTab === "shortcuts" && <ShortcutsComponent shortcutHandler={shortcutHandler} />}
                        {activeTab === "Match Breaks" && <MatchStatusComponent />}
                        {activeTab === "caught" && <PlayerBottomSheetComponent onPress={() => {
                            setActiveTab(null);
                            closeBottomSheet()
                        }} />}

                        {
                            activeTab === "Change Scorer" &&
                            <ChangeScorer selectHours={formData} setSelectHours={setFormData} />
                        }
                    </BottomSheetWrapper>

                    <Modal visible={activeModal !== null} onClose={() => setActiveModal(null)} showCloseButton={false}
                        customClass={"z-50 bg-black/60 max-w-xl rounded-2xl w-[90%]"}
                    >
                        <View className="flex-row justify-between items-center px-6 pt-6">
                            <Text className="text-lg font-semibold mb-3 text-black">{activeModal}</Text>
                            <TouchableOpacity
                                onPress={() => setActiveModal(null)}
                            >
                                <Ionicons name="close" size={24} color="#374151" />
                            </TouchableOpacity>
                        </View>
                        {
                            activeModal === "Change Match Overs" &&
                            <ChangeMatchOvers selectHours={formData} setSelectHours={setFormData} />
                        }
                        {
                            activeModal === "End Innings" &&
                            <EndInnings selectHours={formData} setSelectHours={setFormData} />
                        }

                        {
                            activeModal === "End Match" &&
                            <MatchResult selectHours={formData} setSelectHours={setFormData} />
                        }
                    </Modal>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>

    )
}

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




const HighlightAnimation = ({ highlight, onFinish }: { highlight: string | null; onFinish: () => void }) => {
    const translateX = useRef(new Animated.Value(-500)).current;
    const scale = useRef(new Animated.Value(0.8)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (highlight) {
            // Entrance: slide from left + fade in + slight zoom in
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.spring(scale, {
                    toValue: 1,
                    friction: 5,
                    tension: 60,
                    useNativeDriver: true,
                }),
            ]).start();

            // Hold in center, then exit to right
            const timeout = setTimeout(() => {
                Animated.parallel([
                    Animated.timing(translateX, {
                        toValue: 500,
                        duration: 700,
                        easing: Easing.in(Easing.exp),
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]).start(() => onFinish());
            }, 2500); // stays visible for 2.5s before exit

            return () => clearTimeout(timeout);
        }
    }, [highlight]);

    if (!highlight) return null;

    // Select image based on highlight type
    const imageSource =
        highlight === 'four'
            ? require('../assets/images/four.png')
            : highlight === 'six'
                ? require('../assets/images/six.png')
                : require('../assets/images/out.png');

    return (
        <View className=" flex items-center justify-center">
            <Animated.Image
                source={imageSource}
                style={{
                    width: 99,
                    height: height * 0.115,
                    transform: [{ translateX }, { scale }],
                    opacity,
                    resizeMode: 'contain',
                }}
            />
        </View>
    );
};

