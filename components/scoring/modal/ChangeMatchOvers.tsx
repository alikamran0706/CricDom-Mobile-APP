import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import { showAlert } from "@/store/features/alerts/alertSlice";
import { useUpdateMatchMutation } from "@/store/features/match/matchApi";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

interface ChangeMatchOversProps {
  setActiveModal: any;
  setMatchState: any;
  matchState: any;
}

const ChangeMatchOvers = ({
  setMatchState,
  setActiveModal,
  matchState,
}: ChangeMatchOversProps) => {
  const [updateMatch, { isLoading }] = useUpdateMatchMutation();
  const [overLimit, setOverLimit] = useState(matchState?.overs_limit?.toString() || "");
  const dispatch = useDispatch();

  const updateMatchHandler = async () => {
    if (parseInt(overLimit) < 2 || !overLimit) {
      dispatch(showAlert({ type: "error", message: "Minimum 2 overs" }));
      return;
    }

    try {
      setActiveModal(null);

      const { data } = await updateMatch({
        id: matchState.documentId,
        data: { overs_limit: parseInt(overLimit) },
      }).unwrap();

      if (data) setMatchState(data);

      dispatch(showAlert({ type: "success", message: "Match updated successfully!" }));
    } catch (error: any) {
      dispatch(
        showAlert({
          type: "error",
          message:
            error?.response?.data ||
            error.message ||
            "An unknown error occurred",
        })
      );
    }
  };

  return (
    <View collapsable={false} className="px-6">
      {/* Input field */}
      <FloatingLabelInputBorderBottom
        label="Overs"
        value={overLimit}
        onChangeText={(text) => setOverLimit(text)}
        required
        placeholder="e.g., 20, 50"
        keyboardType="numeric"
      />

      <Text className="text-xs text-gray-600 mt-1">
        *You cannot change match overs in second innings.
      </Text>

      {/* Buttons */}
      <View className="flex-row gap-x-3 my-4">
        <TouchableOpacity
          className="flex-1 bg-gray-200 rounded-xl py-4 items-center"
          onPress={() => setActiveModal(null)}
        >
          <Text className="text-gray-700 font-bold">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 rounded-xl py-4 items-center bg-[#0e7ccb]"
          onPress={updateMatchHandler}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white font-bold">Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeMatchOvers;
