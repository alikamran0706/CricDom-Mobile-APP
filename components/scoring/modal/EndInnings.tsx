import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import { Text, TouchableOpacity, View } from "react-native";

interface EndInnings {
    selectHours: any;
    setSelectHours: any;
}

const EndInnings = ({
    selectHours,
    setSelectHours,
}: EndInnings) => {

    return (
        <View
            collapsable={false}
            className="px-6"
        >
            <FloatingLabelInputBorderBottom
                label="Reason"
                value={selectHours}
                onChangeText={(text) => setSelectHours(text)}
                required
            />
            <View className="flex-row gap-x-3 my-4">
                <TouchableOpacity className="flex-1 bg-gray-200 rounded-xl py-4 items-center" onPress={() => { }}>
                    <Text className="text-gray-700 font-bold">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 rounded-xl py-4 items-center bg-[#0e7ccb]"
                    onPress={() => { }}
                >
                    <Text className="text-white font-bold">Save</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default EndInnings