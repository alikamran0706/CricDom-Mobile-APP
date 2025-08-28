import { Text, View } from "react-native";

interface MatchStatsProps {
  totalRuns: number;
  totalWickets: number;
  totalOvers: string;
}

export default function MatchStats({ totalRuns, totalWickets, totalOvers }: MatchStatsProps) {
  return (
    <View className="px-4 mb-6">
      <Text className="text-lg font-semibold text-gray-800 pt-4 mb-4">Match Stats</Text>
      <View className="flex-row justify-around">
        <View className="items-center">
          <Text className="text-xs text-gray-500 mb-1">Total Runs</Text>
          <Text className="text-2xl font-bold text-gray-800">{totalRuns}</Text>
        </View>
        <View className="items-center">
          <Text className="text-xs text-gray-500 mb-1">Total Wickets</Text>
          <Text className="text-2xl font-bold text-gray-800">{totalWickets}</Text>
        </View>
        <View className="items-center">
          <Text className="text-xs text-gray-500 mb-1">Total Overs</Text>
          <Text className="text-2xl font-bold text-gray-800">{totalOvers}</Text>
        </View>
      </View>
    </View>
  );
}