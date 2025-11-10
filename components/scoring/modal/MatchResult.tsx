import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MatchResultProps {
  match: any;
  setActiveModal: any
}

const MatchResult = ({ match, setActiveModal }: MatchResultProps) => {

     const router = useRouter();

  // 🧮 Compute match summary dynamically
  const resultSummary = useMemo(() => {
    if (!match?.innings || match.innings.length < 2) return null;

    const firstInnings = match.innings[0];
    const secondInnings = match.innings[1];

    const firstTeamName = firstInnings?.batting_team?.name || "Team A";
    const secondTeamName = secondInnings?.batting_team?.name || "Team B";

    const firstRuns = firstInnings?.runs || 0;
    const firstWkts = firstInnings?.wickets || 0;
    const firstOvers = firstInnings?.overs?.length || 0;

    console.log('currentRuns > target', )

    const secondRuns = secondInnings?.runs || 0;
    const secondWkts = secondInnings?.wickets || 0;
    const secondOvers = secondInnings?.overs?.length || 0;

    if (secondRuns > firstRuns) {
      // 🏆 Team 2 won
      const wicketsRemaining = 10 - secondWkts;
      const runsNeeded = secondRuns - firstRuns;
      return {
        winner: secondTeamName,
        message: `${secondTeamName} won by ${wicketsRemaining} wicket${wicketsRemaining !== 1 ? "s" : ""}`,
        details: `${firstTeamName}: ${firstRuns}/${firstWkts} (${firstOvers} overs)\n${secondTeamName}: ${secondRuns}/${secondWkts} (${secondOvers} overs)`,
      };
    } else if (secondRuns < firstRuns) {
      // 🏆 Team 1 won
      const runsDiff = firstRuns - secondRuns;
      return {
        winner: firstTeamName,
        message: `${firstTeamName} won by ${runsDiff} run${runsDiff !== 1 ? "s" : ""}`,
        details: `${firstTeamName}: ${firstRuns}/${firstWkts} (${firstOvers} overs)\n${secondTeamName}: ${secondRuns}/${secondWkts} (${secondOvers} overs)`,
      };
    } else {
      // 🤝 Draw or tie
      return {
        winner: null,
        message: "Match tied!",
        details: `${firstTeamName}: ${firstRuns}/${firstWkts} (${firstOvers} overs)\n${secondTeamName}: ${secondRuns}/${secondWkts} (${secondOvers} overs)`,
      };
    }
  }, [match]);

  return (
    <View className="px-6 py-4">
      {resultSummary ? (
        <View className="bg-gray-100 rounded-xl p-4 mb-6 shadow-sm">
          <Text className="text-lg font-semibold text-[#0e7ccb] mb-1">
            🏆 {resultSummary.message}
          </Text>
          <Text className="text-gray-700 text-sm whitespace-pre-line">
            {resultSummary.details}
          </Text>
        </View>
      ) : (
        <Text className="text-gray-500 mb-6">
          Waiting for both innings to complete...
        </Text>
      )}

      {/* Optional winner logo */}
      {resultSummary?.winner && (
        <View className="items-center mb-6">
          <Image
            source={require("../../../assets/images/award2.png")}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
          <Text className="text-lg font-bold text-[#0e7ccb] mt-2">
            {resultSummary.winner} 🏆
          </Text>
        </View>
      )}

      <View className="flex-row gap-x-3">
        <TouchableOpacity
          className="flex-1 bg-gray-200 rounded-xl py-4 items-center"
          onPress={() => setActiveModal(null)}
        >
          <Text className="text-gray-700 font-bold">Close</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 rounded-xl py-4 items-center bg-[#0e7ccb]"
          onPress={() => {
            router.push("/create-match")
            setActiveModal(null)
        }}
        >
          <Text className="text-white font-bold">Start New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatchResult;
