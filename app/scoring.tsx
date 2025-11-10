import BottomSheetWrapper, { BottomSheetRef } from "@/components/BottomSheetWrapper";
import InningPlayerSelection from "@/components/Modal/InningPlayerSelection";
import ByeComponent from "@/components/scoring/Byecomponent";
import ChangeScorer from "@/components/scoring/ChangeScorer";
import LegByeComponent from "@/components/scoring/LegByeComponent";
import MatchSettingsSidebar from "@/components/scoring/MatchSettingsSidebar";
import MatchStatusComponent from "@/components/scoring/MatchStatusComponent";
import ChangeModal from "@/components/scoring/modal/ChangeAndReplaceModal";
import ChangeMatchOvers from "@/components/scoring/modal/ChangeMatchOvers";
import EndInnings from "@/components/scoring/modal/EndInnings";
import EndMatch from "@/components/scoring/modal/EndMatch";
import MatchResult from "@/components/scoring/modal/MatchResult";
import PlayerOut from "@/components/scoring/modal/PlayerOut";
import StartInningModal from "@/components/scoring/modal/StartInningModal";
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
import { useCreateBowlerStatsMutation, useCreateOverMutation, useCreatePlayerScoreMutation, useLazyGetBowlerStatByBowlerAndInningQuery, useUpdateBowlerStatsMutation, useUpdateInningMutation, useUpdateOverMutation, useUpdatePlayerScoreMutation } from "@/store/features/inning/inningApi";
import { useUpdateMatchMutation } from "@/store/features/match/matchApi";
import { useCreateBallMutation, useCreateWicketMutation, useUpdateBallMutation, useUpdateWicketMutation } from "@/store/features/scoring/scoringApi";
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
    innings?: any
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
    const initalBowlerStats = params?.bowlerStats ? JSON.parse(params.bowlerStats) : null;

    const initialInning = params?.inning ? JSON.parse(params.inning) : null;
    const initialStiker = params?.striker ? JSON.parse(params.striker) : null;
    const initialNonStriker = params?.nonStriker ? JSON.parse(params.nonStriker) : null;
    const initialBowler = params?.bowler ? JSON.parse(params.bowler) : null;


    const [createBall] = useCreateBallMutation();
    const [updateBall] = useUpdateBallMutation();
    const [createOver] = useCreateOverMutation();
    const [updateOver] = useUpdateOverMutation();
    const [createWicket] = useCreateWicketMutation();
    const [updateWicket] = useUpdateWicketMutation();
    const [createPlayerScore] = useCreatePlayerScoreMutation();
    const [updatePlayerScore] = useUpdatePlayerScoreMutation();
    const [updateBowlerStats] = useUpdateBowlerStatsMutation();
    const [createBowlerStats] = useCreateBowlerStatsMutation();
    const [updateInning] = useUpdateInningMutation();
    const [updateMatch, { isLoading }] = useUpdateMatchMutation();
    const [fetchBowlerStat, { data, error }] = useLazyGetBowlerStatByBowlerAndInningQuery();

    const [striker, setStriker] = useState<Player>(initialStiker);
    const [battingPlayers, setBattingPlayers] = useState<Player[]>(battingTeam?.players);
    const [nonStriker, setNonStriker] = useState<Player>(initialNonStriker);

    const [bowlingTeam, setBowlingTeam] = useState<any>(initialBowlingTeam);
    const [curentOverNumber, setCurentOverNumber] = useState<number>(1);

    const [inning, setInning] = useState<any>(initialInning);

    const [strikerScore, setStrikerScore] = useState<any>(initialStrikerScore);
    const [nonStrikerScore, setNonStrikerScore] = useState<any>(initialNonStrikerScore);

    const [showFielderModal, setShowFielderModal] = useState<any>(null);
    const [showNewPlayerModal, setShowNewPlayerModal] = useState<any>(null);

    const [bowler, setBowler] = useState<Bowler>(initialBowler);
    const [bowlerOver, setBowlerOver] = useState<any>(null);
    const [ball, setBall] = useState<any>(null);
    const [matchState, setMatchState] = useState<MatchState>(match);
    const [bowlerState, setBowlerState] = useState<any>(initalBowlerStats);
    const [showSettings, setShowSettings] = useState(false);
    const [wicket, setWicket] = useState<any>(null);
    const [highlight, setHighlight] = useState<null | 'four' | 'six' | 'wicket'>(null);

    const [currentOver, setCurrentOver] = useState<string[]>([]);
    const [currentOverId, setCurrentOverId] = useState<string>(initialCurrentOver?.documentId);

    const [activeReplaceActions, setActiveReplaceActions] = useState<any>(null);

    const user = useSelector((state: RootState) => state.user.profile);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [activeNewInningModal, setActiveNewInningModal] = useState<boolean>(false);
    const [formData, setFormData] = useState(null)
    const bottomSheetRef = useRef<BottomSheetRef>(null);

    const navigation = useNavigation();

    const target = matchState?.innings?.[0]?.runs || 0;
    const currentRuns = inning?.runs || 0;
    const teamName = battingTeam?.name || "Team";
    const runsDiff = target - currentRuns;

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
        if (activeTab && activeTab !== null) {
            setTimeout(() => {
                bottomSheetRef.current?.open();
            }, 100);
        }
    }, [activeTab]);

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    // ✅ If over complete — handle next over logic
    const updateMatchStateInnings = (updatedInning: any) => {
        setMatchState((prev: any) => ({
            ...prev,
            innings: prev?.innings?.map((inn: any) =>
                inn.documentId === updatedInning.documentId ? updatedInning : inn
            ),
        }));
    };

    const handleRunScored = async (runs: number) => {
        const validBalls = [...currentOver, runs.toString()].filter(isValidBall);

        if (inning?.overs?.length === match?.overs_limit && validBalls?.length > 6)
            setActiveNewInningModal(true);
        else {
            setHighlight(null);
            try {
                // ⚡ 1. Update match UI instantly ⚡
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


                const isOverComplete = validBalls.length >= 6;

                const isOddRun = runs === 1 || runs === 3;

                // ⚡ 4. Save Ball in Strapi
                const ballRecord = await createBall({
                    data: {
                        runs,
                        ball_number: validBalls.length,
                        over: currentOverId,
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
                const { data: bowlerStatsData } = await updateBowlerStats({
                    id: initalBowlerStats.documentId,
                    data: {
                        //      bowler: bowler.documentId,
                        // inning: inningData.documentId,
                        // overs_bowled: 0,
                        // maidens: 0,
                        // runs_conceded: 0,
                        // wickets_taken: 0,

                        maidens: runs === 0 ? bowlerState.maidens + 1 : bowlerState.maidens,
                        runs_conceded: (bowlerState.runs_conceded_conceded || 0) + runs,
                    },
                }).unwrap();

                if (bowlerStatsData)
                    setBowlerState(bowlerStatsData)


                if (isOverComplete) {

                    if (inning?.overs?.length === matchState?.overs_limit) {
                        const inningData = await updateInning({
                            id: inning?.documentId,
                            data: {
                                runs: (inning?.runs || 0) + runs,
                                current_striker: (isOddRun ? !strikerScore?.isStriker : strikerScore?.isStriker)
                                    ? nonStriker.documentId
                                    : striker.documentId,
                                current_non_striker: (isOddRun ? !strikerScore?.isStriker : strikerScore?.isStriker)
                                    ? striker.documentId
                                    : nonStriker.documentId,
                            },
                        }).unwrap();

                        if (inningData?.data) {
                            setInning(inningData?.data);
                            updateMatchStateInnings(inningData?.data)
                        }

                        if (matchState?.innings?.length < 2) {
                            setTimeout(() => {
                                setActiveNewInningModal(true);
                            }, 3000);
                            if (runs === 0)
                                setCurrentOver([]);
                        }
                        else {
                            const { data } = await updateMatch({
                                id: matchState.documentId,
                                data: { result: target < currentRuns ? target : currentRuns, status_type: 'Completed' },
                            }).unwrap();

                            if (data) setMatchState(data);

                            setActiveModal('Match Result')
                        }
                    }
                    else {
                        const runsInOver = validBalls.reduce(
                            (sum, ball) => sum + (parseInt(ball.replace(/\D/g, ""), 10) || 0),
                            0
                        );

                        const newOver = await createOver({
                            data: {
                                over_number: inning?.overs?.length < match?.overs_limit ? inning?.overs?.length + 1 : inning?.overs?.length,
                                inning: inning?.documentId,
                                bowler: bowler?.documentId,
                                runs_in_over: runsInOver,
                            },
                        }).unwrap();

                        const newOverId = newOver?.data?.documentId;

                        setCurrentOverId(newOverId);

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

                        if (inningData?.data) {
                            setInning(inningData?.data);
                            updateMatchStateInnings(inningData?.data)
                        }
                        // setActiveModal("Change Bowler");
                        if (runs === 0) {
                            setCurentOverNumber(curentOverNumber + 1)
                            setCurrentOver([]);
                            setActiveReplaceActions('Next Bowler');
                            dispatch(showAlert({ type: 'success', message: 'Over completed! Please select the next bowler.' }));
                        }
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

                    if (inningData?.data) {
                        setInning(inningData?.data);
                        updateMatchStateInnings(inningData?.data)
                    }
                }
            } catch (error) {
            }
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

            if (validBalls.length === 6 && curentOverNumber < match?.overs_limit) {
                setCurentOverNumber(curentOverNumber + 1)
                setTimeout(() => {
                    setActiveReplaceActions('Next Bowler')
                }, 3200);
            }
        } else if (ball?.runs === 6) {
            setHighlight('six');
            if (validBalls.length === 6 && curentOverNumber < match?.overs_limit) {
                setCurentOverNumber(curentOverNumber + 1)
                setTimeout(() => {
                    setActiveReplaceActions('Next Bowler')
                }, 3200);
            }
        } else {
            if (validBalls.length === 6 && curentOverNumber < match?.overs_limit) {
                setCurentOverNumber(curentOverNumber + 1)
                setActiveReplaceActions('Next Bowler')
            }
        }

        if (currentRuns > target) {

            const { data } = await updateMatch({
                id: matchState.documentId,
                data: { result: target < currentRuns ? target : currentRuns, status_type: 'Completed' },
            }).unwrap();

            if (data) setMatchState(data);

            setActiveModal('Match Result');
            return;
        }

        if (validBalls.length === 6) {
            setCurrentOver([]);

            dispatch(showAlert({ type: 'success', message: 'Over completed! Please select the next bowler.' }));
        }

    }

    const handleOutType = async (type: string) => {
        closeBottomSheet();
        setHighlight('wicket');

        if (type !== 'Run Out' && type !== 'Caught') {
            try {
                // Update UI
                setMatchState((prev) => ({
                    ...prev,
                    wickets: prev.wickets + 1,
                    balls: prev.balls + 1,
                }));
                let updatedbattingPlayers = [];
                setCurrentOver((prev) => [...prev, "W"]);

                const inningData = await updateInning({
                    id: inning?.documentId,
                    data: {

                        wickets: (inning?.wickets || 0) + 1,
                        current_bowler: bowler.documentId

                    },
                }).unwrap();

                if (inningData?.data) {
                    setInning(inningData?.data);
                    updateMatchStateInnings(inningData?.data)
                }

                // 🧠 Save to backend
                const { data: wicketRes } = await createWicket({
                    data: {
                        batsman_out: strikerScore?.isStriker ? striker.documentId : nonStriker.documentId,
                        out_type: type,
                        player_out_by: bowler.documentId,
                    },
                }).unwrap();

                if (wicketRes)
                    setWicket(wicketRes);

                const notOutPlayer = striker.documentId === wicketRes?.batsman_out?.documentId ? nonStriker.documentId : striker?.documentId

                const outPlayerId = strikerScore?.isStriker
                    ? striker.documentId
                    : nonStriker.documentId;

                updatedbattingPlayers = battingPlayers.map(player =>
                    player.documentId === outPlayerId
                        ? { ...player, isOut: true }
                        : player.documentId === notOutPlayer ? { ...player, isCurrent: true }
                            : player
                )

                setBattingPlayers(updatedbattingPlayers);

                // Link the ball record with this wicket
                const ballRecord = await createBall({
                    data: {
                        runs: 0,
                        ball_number: matchState.balls + 1,
                        over: currentOverId,
                        batsman: strikerScore?.isStriker ? striker.documentId : nonStriker.documentId,
                        bowler: bowler.documentId,
                        wicket: wicketRes?.documentId,
                    },
                }).unwrap();

                if (ballRecord?.data)
                    setBall(ballRecord?.data);

                // Update player stats
                const { data: updatedScore } = await updatePlayerScore({
                    id: strikerScore?.isStriker ? initialStrikerScore.documentId : initialNonStrikerScore.documentId,
                    data: {
                        is_out: true,
                    },
                }).unwrap();

                if (strikerScore?.isStriker && updatedScore)
                    setStrikerScore(updatedScore);
                else if (updatedScore)
                    setNonStrikerScore(updatedScore);

                const appendWickets = [
                    ...(bowlerState?.wickets?.map((w: any) => w.documentId) || []),
                    wicketRes?.documentId,
                ];

                const { data: bowlerStatsData } = await updateBowlerStats({
                    id: initalBowlerStats.documentId,
                    data: {
                        wickets: appendWickets,
                    },
                }).unwrap();

                if (bowlerStatsData)
                    setBowlerState(bowlerStatsData)

                const notOutCount = updatedbattingPlayers.filter((player: any) => !player.isOut).length;

                if (notOutCount > 1)
                    setShowNewPlayerModal(true);
                else if (matchState?.innings?.length < 2) {
                    setActiveNewInningModal(true)
                } else {

                    const { data } = await updateMatch({
                        id: matchState.documentId,
                        data: { result: target < currentRuns ? target : currentRuns, status_type: 'Completed' },
                    }).unwrap();

                    if (data) setMatchState(data);

                    setActiveModal('Match Result');
                }


                // if (matchState?.innings?.length < 2) {
                //             setTimeout(() => {
                //                 setActiveNewInningModal(true);
                //             }, 3000);
                //             if (runs === 0)
                //                 setCurrentOver([]);
                //         }
                //         else {
                //             setActiveModal(' Match Result')
                //         }

            } catch (error) {
            } finally {
                // closeBottomSheet();
            }
        }
        else {
            setActiveModal('Player Out');
            setShowFielderModal(type)
        }
    };

    const otherOutHandler = async (playerOut: any) => {
        setActiveModal(null);

        setMatchState((prev) => ({
            ...prev,
            wickets: prev.wickets + 1,
            balls: prev.balls + 1,
        }));

        setCurrentOver((prev) => [...prev, "W"]);

        const inningData = await updateInning({
            id: inning?.documentId,
            data: {

                wickets: (inning?.wickets || 0) + 1,
                current_bowler: bowler.documentId

            },
        }).unwrap();

        const outPlayerScore = strikerScore?.player?.documentId === playerOut.documentId ? initialStrikerScore : initialNonStrikerScore;

        if (inningData?.data) {
            setInning(inningData?.data);
            updateMatchStateInnings(inningData?.data)
        }

        const { data: wicketRes } = await createWicket({
            data: {
                batsman_out: playerOut.documentId,
                out_type: showFielderModal,
                player_score: outPlayerScore.documentId
            },
        }).unwrap();

        if (wicketRes) {
            setWicket(wicketRes)

            await createBall({
                data: {
                    runs: 0,
                    ball_number: matchState.balls + 1,
                    over: currentOverId,
                    batsman: striker.documentId,
                    bowler: bowler.documentId,
                    wicket: wicketRes?.documentId,
                },
            });

            const { data: updatedScore } = await updatePlayerScore({
                id: outPlayerScore.documentId,
                data: {
                    is_out: true,
                },
            }).unwrap();

            if (strikerScore?.isStriker && updatedScore)
                setStrikerScore(updatedScore);
            else if (updatedScore)
                setNonStrikerScore(updatedScore);

            const appendWickets = [
                ...(bowlerState?.wickets?.map((w: any) => w.documentId) || []),
                wicketRes?.documentId,
            ];

            const { data: bowlerStatsData } = await updateBowlerStats({
                id: initalBowlerStats.documentId,
                data: {
                    wickets: appendWickets,
                },
            }).unwrap();

            if (bowlerStatsData)
                setBowlerState(bowlerStatsData)

            // const updatedbattingPlayers = battingPlayers.map(player =>
            //     player.documentId === playerOut.documentId
            //         ? { ...player, isOut: true }
            //         : player
            // )

            const notOutPlayer = striker.documentId !== wicketRes?.batsman_out?.documentId ? nonStriker.documentId : striker?.documentId

            const updatedbattingPlayers = battingPlayers.map(player =>
                player.documentId === playerOut.documentId
                    ? { ...player, isOut: true }
                    : player.documentId === notOutPlayer ? { ...player, isCurrent: true }
                        : player
            )

            setBattingPlayers(updatedbattingPlayers);

        }

    }

    const handleFielderOutHandler = async (fielder: any) => {
        const { data: wicketRes } = await updateWicket({
            id: wicket.documentId,
            data: {
                player_out_by: fielder.documentId,
            },
        }).unwrap();

        if (wicketRes)
            setWicket(wicketRes);


        const notOutCount = battingPlayers.filter((player: any) => !player.isOut).length;

        if (notOutCount > 1)
            setShowNewPlayerModal(true);
        else if (matchState?.innings?.length < 2) {
            setActiveNewInningModal(true)
        } else {

            const { data } = await updateMatch({
                id: matchState.documentId,
                data: { result: target < currentRuns ? target : currentRuns, status_type: 'Completed' },
            }).unwrap();

            if (data) setMatchState(data);

            setActiveModal('Match Result');
        }
    }

    const chooseNextPlayerHandler = async (player: any) => {

        const validBalls = currentOver.filter(isValidBall);

        const outPlayerScore = striker.documentId === wicket?.batsman_out?.documentId ? strikerScore : nonStrikerScore

        const { data: strikerScoreRes } = await createPlayerScore({
            data: {
                player: player.documentId,
                inning: inning.documentId,
                isStriker: (outPlayerScore?.isStriker ? true : false),
                runs: 0,
                balls_faced: 0,
                fours: 0,
                sixes: 0,
            },
        }).unwrap();

        if (strikerScoreRes) {

            const updatedStrikerScoreRes = {
                ...strikerScoreRes,
                isStriker:
                    validBalls.length >= 6 && strikerScoreRes.isStriker
                        ? false
                        : strikerScoreRes.isStriker,
            };

            if (wicket?.batsman_out?.documentId === striker.documentId) {
                setStriker(player)
                setStrikerScore(updatedStrikerScoreRes);

                if (validBalls.length >= 6)
                    setNonStrikerScore({
                        ...nonStrikerScore,
                        isStriker: true,
                    });
            } else {
                setNonStriker(player)
                setNonStrikerScore(updatedStrikerScoreRes);

                if (validBalls.length >= 6)
                    setStrikerScore({
                        ...strikerScore,
                        isStriker: true,
                    });
            }
        }

        if (currentOver?.length >= 6) {
            setCurrentOver([]);
            setActiveReplaceActions('Next Bowler');
            dispatch(showAlert({ type: 'success', message: 'Over completed! Please select the next bowler.' }));
        }

    }

    const bowlerHandler = async (newBowler: any) => {
        setBowler(newBowler);
        setActiveReplaceActions(null);
        try {

            const { data } = await fetchBowlerStat({
                bowlerId: newBowler.documentId,
                inningId: inning.documentId,
            }).unwrap();

            if (data?.length > 0) {
                const appendOvers = [
                    ...(bowlerState?.overs?.map((w: any) => w.documentId) || []),
                    currentOverId,
                ];

                const { data: bowlerStatsData } = await updateBowlerStats({
                    id: data[0].documentId,
                    data: { overs: appendOvers },
                }).unwrap();

                if (bowlerStatsData)
                    setBowlerState(bowlerStatsData)
            }
            else {
                const { data: bowlerStatsData } = await createBowlerStats({
                    data: {
                        bowler: newBowler.documentId || bowler.documentId,
                        inning: inning.documentId,
                        overs: currentOverId,
                        maidens: 0,
                        runs_conceded: 0,
                    },
                }).unwrap();

                if (bowlerStatsData)
                    setBowlerState(bowlerStatsData)
            }


            console.log("✅ Bowler Stats:", data);

        } catch (err) {
            console.error("❌ Error:", err);
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
                    over: currentOverId,
                    batsman: striker.documentId,
                    bowler: bowler.documentId,
                    is_extra: true,
                    extra_type: "no-ball",
                    extra_subtype: type, // (bat, bye, or legbye)
                },
            });

            const { data: bowlerStatsData } = await updateBowlerStats({
                id: initalBowlerStats.documentId,
                data: { runs_conceded: bowlerState.runs_conceded + runs + 1 },
            }).unwrap();

            if (bowlerStatsData)
                setBowlerState(bowlerStatsData)

            const inningData = await updateInning({
                id: inning?.documentId,
                data: {
                    runs: (inning?.runs || 0) + runs + 1,
                    current_striker: strikerScore?.isStrike
                        ? striker.documentId
                        : nonStriker.documentId,
                    current_non_striker: !strikerScore?.isStriker
                        ? nonStriker.documentId
                        : striker.documentId,
                },
            }).unwrap();

            if (inningData?.data) {
                setInning(inningData?.data);
                updateMatchStateInnings(inningData?.data)
            }


            if (!strikerScore.isStriker) {
                const { id, updatedAt, documentId, createdAt, inning, player, ...updatedScore } =
                    nonStrikerScore;

                const { data } = await updatePlayerScore({
                    id: initialNonStrikerScore?.documentId,
                    data: { ...updatedScore, runs: updatedScore.runs + runs + 1 },
                }).unwrap();
                setNonStrikerScore(data);
            }
            else {
                const { id, updatedAt, documentId, createdAt, inning, player, ...updatedScore } =
                    strikerScore;

                const { data } = await updatePlayerScore({
                    id: initialNonStrikerScore?.documentId,
                    data: { ...updatedScore, runs: updatedScore.runs + runs + 1 },
                }).unwrap();
                setStrikerScore(data);
            }

        } catch (err) {
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
                    over: currentOverId,
                    batsman: striker.id,
                    bowler: bowler.id,
                    is_extra: true,
                    extra_type: "wide",
                },
            });

            const { data: bowlerStatsData } = await updateBowlerStats({
                id: bowlerState.documentId || initalBowlerStats.documentId,
                data: { runs_conceded: (bowlerState.runs_conceded ||0) + runs + 1 },
            }).unwrap();

            if (bowlerStatsData)
                setBowlerState(bowlerStatsData)

            const inningData = await updateInning({
                id: inning?.documentId,
                data: {
                    runs: (inning?.runs || 0) + runs + 1,
                    current_striker: strikerScore?.isStrike
                        ? striker.documentId
                        : nonStriker.documentId,
                    current_non_striker: !strikerScore?.isStriker
                        ? nonStriker.documentId
                        : striker.documentId,
                },
            }).unwrap();

            if (inningData?.data) {
                setInning(inningData?.data);
                updateMatchStateInnings(inningData?.data)
            }


            if (!strikerScore.isStriker) {
                const { id, updatedAt, documentId, createdAt, inning, player, ...updatedScore } =
                    nonStrikerScore;

                const { data } = await updatePlayerScore({
                    id: initialNonStrikerScore?.documentId,
                    data: { ...updatedScore, runs: updatedScore.runs + runs + 1 },
                }).unwrap();
                setNonStrikerScore(data);
            }
            else {
                const { id, updatedAt, documentId, createdAt, inning, player, ...updatedScore } =
                    strikerScore;

                const { data } = await updatePlayerScore({
                    id: initialNonStrikerScore?.documentId,
                    data: { ...updatedScore, runs: updatedScore.runs + runs + 1 },
                }).unwrap();
                setStrikerScore(data);
            }


        } catch (err) {
        } finally {
            closeBottomSheet();
        }
    };

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
                    over: currentOverId,
                    batsman: striker.id,
                    bowler: bowler.id,
                    is_extra: true,
                    extra_type: "leg-bye",
                },
            });

            const { data: bowlerStatsData } = await updateBowlerStats({
                id: initalBowlerStats.documentId,
                data: { runs_conceded: bowlerState.runs_conceded + runs },
            }).unwrap();

            if (bowlerStatsData)
                setBowlerState(bowlerStatsData)

            if (currentOver.filter(isValidBall)?.length < 5) {
                const inningData = await updateInning({
                    id: inning?.documentId,
                    data: {
                        runs: (inning?.runs || 0) + runs,
                        current_striker: strikerScore?.isStrike
                            ? striker.documentId
                            : nonStriker.documentId,
                        current_non_striker: !strikerScore?.isStriker
                            ? nonStriker.documentId
                            : striker.documentId,
                    },
                }).unwrap();

                if (inningData?.data) {
                    setInning(inningData?.data);
                    updateMatchStateInnings(inningData?.data)
                }
            }

            const isOdd = runs % 2 !== 0;

            if (!strikerScore.isStriker) {

                const { id, updatedAt, documentId, createdAt, inning, player, ...updatedScore } = nonStrikerScore;

                const { data } = await updatePlayerScore({
                    id: initialNonStrikerScore?.documentId,
                    data: {
                        ...updatedScore, runs: updatedScore.runs + runs, balls_faced: updatedScore.balls_faced + 1,
                        isStriker: currentOver.filter(isValidBall)?.length >= 5 && isOdd ? true : false
                    },
                }).unwrap();

                setNonStrikerScore(data);

                if (currentOver.filter(isValidBall)?.length >= 5 && !isOdd)
                    setStrikerScore((prev: any) => ({
                        ...prev,
                        isStriker: true,
                    }));
            }
            else {
                const { id, updatedAt, documentId, createdAt, inning, player, ...updatedScore } =
                    strikerScore;

                const { data } = await updatePlayerScore({
                    id: initialNonStrikerScore?.documentId,
                    data: {
                        ...updatedScore, runs: updatedScore.runs + runs, balls_faced: updatedScore.balls_faced + 1,
                        isStriker: currentOver.filter(isValidBall)?.length >= 5 && isOdd ? true : false
                    },
                }).unwrap();
                setStrikerScore(data);

                if ((currentOver.filter(isValidBall)?.length >= 5 && !isOdd) || (currentOver.filter(isValidBall)?.length < 5 && isOdd))
                    setNonStrikerScore((prev: any) => ({
                        ...prev,
                        isStriker: true,
                    }));
            }


            if (currentOver.filter(isValidBall)?.length >= 5) {

                const validBalls = [...currentOver, runs.toString()].filter(isValidBall);

                const runsInOver = validBalls.reduce(
                    (sum, ball) => sum + (parseInt(ball.replace(/\D/g, ""), 10) || 0),
                    0
                );
                const newOver = await createOver({
                    data: {
                        over_number: inning?.overs?.length < match?.overs_limit ? inning?.overs?.length + 1 : inning?.overs?.length,
                        inning: inning?.documentId,
                        bowler: bowler?.documentId,
                        runs_in_over: runsInOver,
                    },
                }).unwrap();

                const newOverId = newOver?.data?.documentId;

                setCurrentOverId(newOverId);

                const inningData = await updateInning({
                    id: inning?.documentId,
                    data: {
                        overs: [
                            ...(inning?.overs?.map((o: any) => o.documentId) || []),
                            newOverId,
                        ],
                        runs: (inning?.runs || 0) + runs,
                        current_striker: strikerScore?.isStrike
                            ? striker.documentId
                            : nonStriker.documentId,
                        current_non_striker: !strikerScore?.isStriker
                            ? nonStriker.documentId
                            : striker.documentId,
                    }
                }).unwrap();

                if (inningData?.data) {
                    setInning(inningData?.data);
                    updateMatchStateInnings(inningData?.data)
                }


                if (inning?.overs?.length === match?.overs_limit) {
                    setCurrentOver([]);
                    setActiveReplaceActions('Next Bowler')
                    dispatch(showAlert({ type: 'success', message: 'Over completed! Please select the next bowler.' }));
                }
                else if (matchState?.innings?.length < 2)
                    setActiveNewInningModal(true)
                else {
                    const { data } = await updateMatch({
                        id: matchState.documentId,
                        data: { result: target < currentRuns ? target : currentRuns, status_type: 'Completed' },
                    }).unwrap();

                    if (data) setMatchState(data);

                    setActiveModal('Match Result');
                }

            }

        } catch (err) {
        } finally {
            closeBottomSheet();
        }
    };

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
                    over: currentOverId,
                    batsman: striker.id,
                    bowler: bowler.id,
                    is_extra: true,
                    extra_type: "bye",
                },
            });

            const { data: bowlerStatsData } = await updateBowlerStats({
                id: initalBowlerStats.documentId,
                data: { runs_conceded: bowlerState.runs_conceded + runs },
            }).unwrap();

            if (bowlerStatsData)
                setBowlerState(bowlerStatsData)

            if (currentOver.filter(isValidBall)?.length < 5) {
                const inningData = await updateInning({
                    id: inning?.documentId,
                    data: {
                        runs: (inning?.runs || 0) + runs,
                        current_striker: strikerScore?.isStrike
                            ? striker.documentId
                            : nonStriker.documentId,
                        current_non_striker: !strikerScore?.isStriker
                            ? nonStriker.documentId
                            : striker.documentId,
                    },
                }).unwrap();

                if (inningData?.data) {
                    setInning(inningData?.data);
                    updateMatchStateInnings(inningData?.data)
                }
            }

            const isOdd = runs % 2 !== 0;

            if (!strikerScore.isStriker) {
                const { id, updatedAt, documentId, createdAt, inning, player, ...updatedScore } =
                    nonStrikerScore;

                const { data } = await updatePlayerScore({
                    id: initialNonStrikerScore?.documentId,
                    data: {
                        ...updatedScore, runs: updatedScore.runs + runs, balls_faced: updatedScore.balls_faced + 1,
                        isStriker: currentOver.filter(isValidBall)?.length >= 5 && isOdd ? true : false
                    },
                }).unwrap();
                setNonStrikerScore(data);

                if ((currentOver.filter(isValidBall)?.length >= 5 && !isOdd) || (currentOver.filter(isValidBall)?.length < 5 && isOdd))
                    setStrikerScore((prev: any) => ({
                        ...prev,
                        isStriker: true,
                    }));

            }
            else {
                const { id, updatedAt, documentId, createdAt, inning, player, ...updatedScore } =
                    strikerScore;

                const { data } = await updatePlayerScore({
                    id: initialNonStrikerScore?.documentId,
                    data: {
                        ...updatedScore, runs: updatedScore.runs + runs, balls_faced: updatedScore.balls_faced + 1,
                        isStriker: currentOver.filter(isValidBall)?.length >= 5 && isOdd ? true : false
                    },
                }).unwrap();
                setStrikerScore(data);

                if ((currentOver.filter(isValidBall)?.length >= 5 && !isOdd) || (currentOver.filter(isValidBall)?.length < 5 && isOdd))
                    setNonStrikerScore((prev: any) => ({
                        ...prev,
                        isStriker: true,
                    }));
            }

            if (currentOver.filter(isValidBall)?.length >= 5) {

                const validBalls = [...currentOver, runs.toString()].filter(isValidBall);

                const runsInOver = validBalls.reduce(
                    (sum, ball) => sum + (parseInt(ball.replace(/\D/g, ""), 10) || 0),
                    0
                );
                const newOver = await createOver({
                    data: {
                        over_number: inning?.overs?.length < match?.overs_limit ? inning?.overs?.length + 1 : inning?.overs?.length,
                        inning: inning?.documentId,
                        bowler: bowler?.documentId,
                        runs_in_over: runsInOver,
                    },
                }).unwrap();

                const newOverId = newOver?.data?.documentId;

                setCurrentOverId(newOverId);

                const inningData = await updateInning({
                    id: inning?.documentId,
                    data: {
                        overs: [
                            ...(inning?.overs?.map((o: any) => o.documentId) || []),
                            newOverId,
                        ],
                        runs: (inning?.runs || 0) + runs,
                        current_striker: strikerScore?.isStrike
                            ? striker.documentId
                            : nonStriker.documentId,
                        current_non_striker: !strikerScore?.isStriker
                            ? nonStriker.documentId
                            : striker.documentId,
                    }
                }).unwrap();

                if (inningData?.data) {
                    setInning(inningData?.data);
                    updateMatchStateInnings(inningData?.data)
                }

                setCurrentOver([]);
                setActiveReplaceActions('Next Bowler')
                dispatch(showAlert({ type: 'success', message: 'Over completed! Please select the next bowler.' }));

            }
        } catch (err) {
        } finally {
            closeBottomSheet();
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

    const undoLastBall = async () => {
        if (currentOver.length > 0) {
            const lastBall = currentOver[currentOver.length - 1]
            setCurrentOver((prev) => prev.slice(0, -1))

            // Reverse the scoring based on last ball
            if (!isNaN(Number(lastBall)) && Number(lastBall) > 0) {
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





                const { data: bowlerStatsData } = await updateBowlerStats({
                    id: initalBowlerStats.documentId,
                    data: { runs_conceded: bowlerState.runs_conceded - runs },
                }).unwrap();

                if (bowlerStatsData)
                    setBowlerState(bowlerStatsData)

                const inningData = await updateInning({
                    id: inning?.documentId,
                    data: {
                        runs: (inning?.runs || 0) - runs,
                        current_striker: strikerScore?.isStrike
                            ? striker.documentId
                            : nonStriker.documentId,
                        current_non_striker: !strikerScore?.isStriker
                            ? nonStriker.documentId
                            : striker.documentId,
                    },
                }).unwrap();

                if (inningData?.data) {
                    setInning(inningData?.data);
                    updateMatchStateInnings(inningData?.data)
                }


                // if (!strikerScore.isStriker) {
                //     const { id, updatedAt, documentId, createdAt, inning, player, ...updatedScore } =
                //         nonStrikerScore;

                //     const { data } = await updatePlayerScore({
                //         id: initialNonStrikerScore?.documentId,
                //         data: { ...updatedScore, runs: updatedScore.runs - runs, balls_faced: updatedScore.balls_faced - 1 },
                //     }).unwrap();
                //     setNonStrikerScore(data);
                // }
                // else {
                //     const { id, updatedAt, documentId, createdAt, inning, player, ...updatedScore } =
                //         strikerScore;

                //     const { data } = await updatePlayerScore({
                //         id: initialNonStrikerScore?.documentId,
                //         data: { ...updatedScore, runs: updatedScore.runs - runs, balls_faced: updatedScore.balls_faced - 1 },
                //     }).unwrap();
                //     setStrikerScore(data);
                // }


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
                                    <Text className="text-white text-lg font-semibold">{battingTeam?.name} vs {initialBowlingTeam?.name}</Text>
                                    <Text className="text-gray-300 text-sm">Inning {matchState.innings?.length} • {matchState.match_type} • Over {matchState.overs_limit}</Text>
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

                            {
                                matchState?.innings?.length > 1 && (
                                    <View className="flex-row justify-between items-center w-full px-6">
                                        <Text className="text-sm" style={{ color: '#cac9c9' }}>
                                            Target: {target} {" "}
                                        </Text>

                                        {currentRuns < target ? (
                                            <Text className="text-sm font-medium" style={{ color: '#b2adad' }}>
                                                Need {runsDiff} run{runsDiff !== 1 ? "s" : ""} to win
                                            </Text>
                                        ) : currentRuns === target ? (
                                            <Text className="text-sm font-medium text-gray-100" style={{ color: '#b2adad' }}>
                                                Match Draw
                                            </Text>
                                        ) : (
                                            <Text className="text-sm font-medium" style={{ color: '#b2adad' }}>
                                                {teamName} won by {currentRuns - target} run{currentRuns - target !== 1 ? "s" : ""}
                                            </Text>
                                        )}
                                    </View>
                                )
                            }
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
                                            if (inning?.runs > matchState?.innings[0]?.runs)
                                                setActiveModal('Match Result')
                                            else {
                                                handleRunScored(run)
                                                if (run > 0 && (inning?.overs?.length <= match?.overs_limit &&
                                                    currentOver.filter(isValidBall)?.length !== 6))
                                                    openBottomSheet("shottype")
                                            }
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
                                onPress={() => {

                                    openBottomSheet("wicket")
                                }}
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
                                            <Text className="text-white text-sm font-bold">
                                                {battingTeam?.name || "Team"}
                                            </Text>

                                            {/* <Text className="text-gray-300 text-xs">
                                                OVERS {inning?.current_over || 0}.{currentOver.filter(isValidBall)?.length || 0}
                                                {" / "}
                                                {matchState?.overs_limit || 0}
                                            </Text> */}
                                            <Text className="text-gray-300 text-xs">
                                                {battingTeam?.players?.length || 0}-{inning?.wickets || 0}
                                            </Text>
                                        </View>

                                        {/* Right: Bowler */}
                                        <View className="items-end">
                                            <Text className="text-white text-sm font-medium">{bowler.name.split(" ")[0].toUpperCase()}</Text>
                                            <Text className="text-gray-300 text-xs">
                                                {currentOver.filter(ball => ball.startsWith("W")).length || 0}-{currentOver.reduce(
                                                    (sum, ball) => sum + (parseInt(ball.replace(/\D/g, ""), 10) || 0),
                                                    0
                                                ) || 0}
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
                                                        className={`min-w-6 px-1 h-6 rounded items-center justify-center ${ball === "W"
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
                            onClose={() => {
                                // setActiveReplaceActions(null);
                                bowlerHandler(bowler);
                            }}
                            selectedItem={bowler}
                            setSelectedItem={(item) => bowlerHandler(item)}
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
                        {activeTab === "shortcuts" && <ShortcutsComponent shortcutHandler={shortcutHandler} matchState={matchState} />}
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
                            <Text className="text-lg font-semibold mb-3 text-black">{activeModal === 'Match Result' ? '🏏 Match Summary' : activeModal}</Text>
                            <TouchableOpacity
                                onPress={() => setActiveModal(null)}
                            >
                                <Ionicons name="close" size={24} color="#374151" />
                            </TouchableOpacity>
                        </View>
                        {
                            activeModal === "Change Match Overs" &&
                            <ChangeMatchOvers
                                setMatchState={setMatchState}
                                matchState={matchState}
                                setActiveModal={setActiveModal}
                            />
                        }
                        {
                            activeModal === "End Innings" &&
                            <EndInnings selectHours={formData} setSelectHours={setFormData} />
                        }

                        {
                            activeModal === "End Match" &&
                            <EndMatch selectHours={formData} setSelectHours={setFormData} />
                        }

                        {
                            activeModal === "Player Out" &&
                            <PlayerOut
                                striker={striker}
                                nonStriker={nonStriker}
                                otherOutHandler={otherOutHandler}
                                setActiveModal={setActiveModal}
                            />
                        }

                        {
                            activeModal === "Match Result" &&
                            <MatchResult match={matchState} setActiveModal={setActiveModal} />
                        }
                    </Modal>

                    {
                        activeNewInningModal &&
                        <StartInningModal
                            activeModal={activeNewInningModal}
                            setActiveModal={setActiveNewInningModal}
                            match={matchState}
                            battingTeam={bowlingTeam}
                            bowlingTeam={battingTeam}
                        // setInnings((prev) => [...prev, inning]); 
                        />
                    }

                    {
                        <InningPlayerSelection
                            visible={showFielderModal !== null && activeModal === null}
                            onClose={() => {
                                setShowFielderModal(null);
                                setShowNewPlayerModal(true);
                            }}
                            onAddPlayers={handleFielderOutHandler}
                            header={`${showFielderModal} By`}
                            allFetchedPlayers={bowlingTeam?.players}
                        />
                    }

                    {
                        <InningPlayerSelection
                            visible={showNewPlayerModal}
                            onClose={() => {
                                setShowNewPlayerModal(false);
                            }}
                            onAddPlayers={chooseNextPlayerHandler}
                            header={`Select Next Player`}
                            allFetchedPlayers={(battingPlayers || []).filter((player: any) => (!player.isOut && !player.isCurrent))}
                        />
                    }


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






