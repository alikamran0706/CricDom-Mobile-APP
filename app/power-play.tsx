import FloatingActionButton from "@/components/ui/FloatingActionButton"
import Header from "@/components/ui/Header"
import { showAlert } from "@/store/features/alerts/alertSlice"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"

interface PowerPlaySelection {
    powerPlay1: number[]
    powerPlay2: number[]
    powerPlay3: number[]
}

const PowerPlayScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const navigation = useNavigation();
    const totalOvers = 20;

    const [selections, setSelections] = useState<PowerPlaySelection>({
        powerPlay1: [4],
        powerPlay2: [12, 13, 14, 15, 16],
        powerPlay3: [19],
    })

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const generateOversGrid = () => {
        return Array.from({ length: totalOvers }, (_, i) => i + 1)
    }

    const getRowForOver = (over: number): 1 | 2 | 3 => {
        if (over <= 8) return 1
        if (over <= 16) return 2
        return 3
    }

    const getColumnForOver = (over: number) => {
        return ((over - 1) % 8) + 1
    }

    const validatePowerPlaySelection = (
        powerPlay: "powerPlay1" | "powerPlay2" | "powerPlay3",
        over: number
    ): boolean => {
        const newSelections = { ...selections }
        const currentPP = newSelections[powerPlay]

        if (currentPP.includes(over)) return true

        const allSelected = [
            ...newSelections.powerPlay1,
            ...newSelections.powerPlay2,
            ...newSelections.powerPlay3,
        ]
        if (allSelected.includes(over)) {
            dispatch(
                showAlert({
                    type: 'error',
                    message: "This over is already selected in another power play",
                })
            );
            return false
        }

        const row = getRowForOver(over)
        const column = getColumnForOver(over)

        if (powerPlay === "powerPlay1") {
            if (row !== 1) {
                dispatch(
                    showAlert({
                        type: 'error',
                        message: "Power Play 1 can only select overs from the first row (1-8)",
                    })
                );
                return false
            }

            const p2SameColumn = newSelections.powerPlay2.some((o) => getColumnForOver(o) === column)
            const p3SameColumn = newSelections.powerPlay3.some((o) => getColumnForOver(o) === column)
            if (p2SameColumn || p3SameColumn) {
                dispatch(
                    showAlert({
                        type: 'error',
                        message: "Power Play 2 and 3 cannot select from the same column as Power Play 1",
                    })
                );
                return false
            }
        }

        if (powerPlay === "powerPlay2") {
            const p1SameColumn = newSelections.powerPlay1.some((o) => getColumnForOver(o) === column)
            if (p1SameColumn) {
                dispatch(
                    showAlert({
                        type: 'error',
                        message: "Power Play 2 cannot select from the same column as Power Play 1",
                    })
                );
                return false
            }

            if (row === 3) {
                const hasSecondRowSelection = currentPP.some((o) => getRowForOver(o) === 2)
                if (!hasSecondRowSelection) {
                    dispatch(
                        showAlert({
                            type: 'error',
                            message: "If Power Play 2 selects from 3rd row, it must also select from 2nd row",
                        })
                    );
                    return false
                }
            }
        }

        if (powerPlay === "powerPlay3") {
            const p1SameColumn = newSelections.powerPlay1.some((o) => getColumnForOver(o) === column)
            if (p1SameColumn) {
                dispatch(
                    showAlert({
                        type: 'error',
                        message: "Power Play 3 cannot select from the same column as Power Play 1",
                    })
                );
                return false
            }
        }

        return true
    }

    const toggleOverSelection = (
        powerPlay: "powerPlay1" | "powerPlay2" | "powerPlay3",
        over: number
    ) => {
        if (!validatePowerPlaySelection(powerPlay, over)) return

        setSelections((prev) => {
            const newSelections = { ...prev }
            const currentPP = newSelections[powerPlay]

            if (currentPP.includes(over)) {
                newSelections[powerPlay] = currentPP.filter((o) => o !== over)
            } else {
                newSelections[powerPlay] = [...currentPP, over].sort((a, b) => a - b)
            }

            return newSelections
        })
    }

    const isOverSelected = (powerPlay: keyof PowerPlaySelection, over: number) => {
        return selections[powerPlay].includes(over)
    }

    const isOverDisabled = (currentPowerPlay: keyof PowerPlaySelection, over: number) => {
        for (const key of ["powerPlay1", "powerPlay2", "powerPlay3"] as const) {
            if (key !== currentPowerPlay && selections[key].includes(over)) {
                return true
            }
        }
        return false
    }

    const renderOversGrid = (powerPlay: keyof PowerPlaySelection) => {
        const overs = generateOversGrid()
        return (
            <View className="flex-row flex-wrap gap-1">
                {overs.map((over) => {
                    const isSelected = isOverSelected(powerPlay, over)
                    const isDisabled = !isSelected && isOverDisabled(powerPlay, over)

                    return (
                        <TouchableOpacity
                            key={over}
                            className={`
                                w-[11%] aspect-square h-[11%]
                                items-center justify-center
                                border border-gray-200 rounded-md
                                ${isSelected ? "bg-[#0e7ccb]" : isDisabled ? "bg-gray-200" : "bg-white"}
                            `}
                            onPress={() => !isDisabled && toggleOverSelection(powerPlay, over)}
                            disabled={isDisabled}
                        >
                            <Text
                                className={`
                                    font-semibold text-base
                                    ${isSelected ? "text-white" : isDisabled ? "text-gray-400" : "text-gray-800"}
                                `}
                                style={{
                                    lineHeight: 24,
                                    includeFontPadding: false,
                                    textAlignVertical: 'center',
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {over}
                            </Text>
                        </TouchableOpacity>

                    )
                })}
            </View>
        )
    }

    const handleDone = () => {
        if (
            selections.powerPlay1.length === 0 ||
            selections.powerPlay2.length === 0 ||
            selections.powerPlay3.length === 0
        ) {
            dispatch(
                showAlert({
                    type: 'error',
                    message: "Please select overs for all power plays",
                })
            );
            return
        }

        dispatch(
            showAlert({
                type: 'success',
                message: "Power play overs have been configured successfully",
            })
        );
        router.push("/toss");
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1">
                {/* Header */}
                <Header heading='Select Power Play Overs' />

                <ScrollView className="flex-1 px-4"
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <View className="mb-8">
                        <Text className="text-md font-bold text-gray-800 mb-4">POWER PLAY 1</Text>
                        {renderOversGrid("powerPlay1")}
                    </View>

                    <View className="mb-8">
                        <Text className="text-md font-bold text-gray-800 mb-4">POWER PLAY 2</Text>
                        {renderOversGrid("powerPlay2")}
                    </View>

                    <View className="mb-8">
                        <Text className="text-md font-bold text-gray-800 mb-4">POWER PLAY 3</Text>
                        {renderOversGrid("powerPlay3")}
                    </View>

                    <View className="mb-8">
                        <Text className="text-sm text-gray-600 italic">
                            *Batting power play overs can be selected later during scoring from the settings.
                        </Text>
                    </View>
                </ScrollView>

                {/* Done Button */}
                <FloatingActionButton label="Done" onPress={handleDone} />
            </View>
        </SafeAreaView>
    )
}

export default PowerPlayScreen
