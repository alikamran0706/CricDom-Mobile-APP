import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Header from "@/components/ui/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MatchRulesScreen() {
    const router = useRouter();
    const navigation = useNavigation();

    const [rules, setRules] = useState({
        showWagonWheelDotBall: false,
        showWagonWheel123s: true,
        shotSelection: true,
        countWideAsLegal: false,
        wideRuns: 1,
        countNoBallAsLegal: false,
        noBallRuns: 1,
        ignoreRulesA: false,
        ignoreRulesB: false,
        ignoreRulesC: false,
        ignoreRulesD: false,
        forOvers: "",
    });

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleSave = () => {
        // Save rules logic here
        router.back();
    };

    const handleReset = () => {
        setRules({
            showWagonWheelDotBall: false,
            showWagonWheel123s: true,
            shotSelection: true,
            countWideAsLegal: false,
            wideRuns: 1,
            countNoBallAsLegal: false,
            noBallRuns: 1,
            ignoreRulesA: false,
            ignoreRulesB: false,
            ignoreRulesC: false,
            ignoreRulesD: false,
            forOvers: "",
        });
    };

    const Counter = ({
        value,
        onIncrement,
        onDecrement,
    }: {
        value: number;
        onIncrement: () => void;
        onDecrement: () => void;
    }) => (
        <View className="flex-row items-center">
            <TouchableOpacity
                className="w-8 h-8 rounded-full bg-gray-100 justify-center items-center mr-3"
                onPress={onDecrement}
            >
                <Ionicons name="remove" size={16} color="#6B7280" />
            </TouchableOpacity>

            <Text className="text-lg font-semibold min-w-[24px] text-center">
                {value}
            </Text>

            <TouchableOpacity
                className="w-8 h-8 rounded-full bg-gray-100 justify-center items-center ml-3"
                onPress={onIncrement}
            >
                <Ionicons name="add" size={16} color="#6B7280" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <Header heading='Match Rules (WD, NB, WW)' />

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                {/* WAGON WHEEL */}
                <View className="p-4">
                    <Text className="text-lg font-semibold text-gray-800 mb-4">
                        WAGON WHEEL
                    </Text>

                    {/* Dot Ball */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-base text-gray-700 flex-1">
                            Show Wagon Wheel for Dot Ball
                        </Text>
                        <Switch
                            value={rules.showWagonWheelDotBall}
                            onValueChange={(value) =>
                                setRules((prev) => ({ ...prev, showWagonWheelDotBall: value }))
                            }
                            trackColor={{ false: "#D1D5DB", true: "#0e7ccb" }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    {/* 1s, 2s, 3s */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-base text-gray-700 flex-1">
                            Show Wagon Wheel for 1s, 2s, & 3s
                        </Text>
                        <Switch
                            value={rules.showWagonWheel123s}
                            onValueChange={(value) =>
                                setRules((prev) => ({ ...prev, showWagonWheel123s: value }))
                            }
                            trackColor={{ false: "#D1D5DB", true: "#0e7ccb" }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    {/* Shot Selection */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-base text-gray-700 flex-1">Shot Selection</Text>
                        <Switch
                            value={rules.shotSelection}
                            onValueChange={(value) =>
                                setRules((prev) => ({ ...prev, shotSelection: value }))
                            }
                            trackColor={{ false: "#D1D5DB", true: "#0e7ccb" }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <Text className="text-sm italic text-gray-500">
                        *WW and Shot Selection won't be disabled for boundaries and wickets.
                    </Text>
                </View>

                {/* WIDE / NO BALL RULES */}
                <View className="px-4">
                    <Text className="text-lg font-semibold text-gray-800 mb-4">
                        WIDE/NO BALL RULES
                    </Text>

                    {/* A - Count Wide as Legal */}
                    <View className="flex-row justify-between items-center mb-4">
                        <View className="flex-row items-center flex-1">
                            <View className="w-6 h-6 rounded-full bg-gray-100 justify-center items-center mr-3">
                                <Text className="text-xs font-semibold text-gray-500">A</Text>
                            </View>
                            <Text className="text-base text-gray-700">Count Wide as legal delivery</Text>
                        </View>
                        <Switch
                            value={rules.countWideAsLegal}
                            onValueChange={(value) =>
                                setRules((prev) => ({ ...prev, countWideAsLegal: value }))
                            }
                            trackColor={{ false: "#D1D5DB", true: "#0e7ccb" }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    {/* B - Wide Runs */}
                    <View className="flex-row justify-between items-center mb-4">
                        <View className="flex-row items-center flex-1">
                            <View className="w-6 h-6 rounded-full bg-gray-100 justify-center items-center mr-3">
                                <Text className="text-xs font-semibold text-gray-500">B</Text>
                            </View>
                            <Text className="text-base text-gray-700">Wide Runs</Text>
                        </View>
                        <Counter
                            value={rules.wideRuns}
                            onIncrement={() =>
                                setRules((prev) => ({ ...prev, wideRuns: prev.wideRuns + 1 }))
                            }
                            onDecrement={() =>
                                setRules((prev) => ({ ...prev, wideRuns: Math.max(0, prev.wideRuns - 1) }))
                            }
                        />
                    </View>

                    {/* C - Count No Ball as Legal */}
                    <View className="flex-row justify-between items-center mb-4">
                        <View className="flex-row items-center flex-1">
                            <View className="w-6 h-6 rounded-full bg-gray-100 justify-center items-center mr-3">
                                <Text className="text-xs font-semibold text-gray-500">C</Text>
                            </View>
                            <Text className="text-base text-gray-700">
                                Count No Ball as legal delivery
                            </Text>
                        </View>
                        <Switch
                            value={rules.countNoBallAsLegal}
                            onValueChange={(value) =>
                                setRules((prev) => ({ ...prev, countNoBallAsLegal: value }))
                            }
                            trackColor={{ false: "#D1D5DB", true: "#0e7ccb" }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    {/* D - No Ball Runs */}
                    <View className="flex-row justify-between items-center mb-5">
                        <View className="flex-row items-center flex-1">
                            <View className="w-6 h-6 rounded-full bg-gray-100 justify-center items-center mr-3">
                                <Text className="text-xs font-semibold text-gray-500">D</Text>
                            </View>
                            <Text className="text-base text-gray-700">No Ball Runs</Text>
                        </View>
                        <Counter
                            value={rules.noBallRuns}
                            onIncrement={() =>
                                setRules((prev) => ({ ...prev, noBallRuns: prev.noBallRuns + 1 }))
                            }
                            onDecrement={() =>
                                setRules((prev) => ({ ...prev, noBallRuns: Math.max(0, prev.noBallRuns - 1) }))
                            }
                        />
                    </View>

                    {/* Ignore Rules Buttons */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-base text-gray-700 flex-1">Ignore Rules</Text>
                        <View className="flex-row">
                            {["A", "B", "C", "D"].map((letter) => (
                                <TouchableOpacity
                                    key={letter}
                                    className="w-8 h-8 rounded-full bg-gray-100 justify-center items-center ml-2"
                                >
                                    <Text className="text-sm font-semibold text-gray-500">{letter}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* For Overs */}
                    <View className="mb-5">
                        <Text className="text-base text-gray-700 mb-2">For Overs</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
                            placeholder="-"
                            value={rules.forOvers}
                            onChangeText={(text) => setRules((prev) => ({ ...prev, forOvers: text }))}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Done Button */}
            <FloatingActionButton label="Done" onPress={()=> {}} />
        </SafeAreaView>
    );
}
