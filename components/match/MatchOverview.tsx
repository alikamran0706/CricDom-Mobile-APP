import { Image, Text, View } from "react-native";

interface Team {
  name: string;
  logo: string;
  score: string;
  overs: string;
}

interface MatchOverviewProps {
  team1: Team;
  team2: Team;
  result: string;
  venue: string;
  date: string;
  time: string;
  status: string;
  onAddPerformance: () => void;
}

export default function MatchOverview({
  team1,
  team2,
  result,
  venue,
  date,
  time,
  status,
  onAddPerformance
}: MatchOverviewProps) {
  return (
    <View className="px-4 py-6 bg-gray-50">
      <View className="flex-row items-center justify-between mb-4">
        <View className="items-center flex-1">
          <Image source={{ uri: team1.logo }} className="w-16 h-16 rounded-full mb-2" />
          <Text className="font-bold text-lg">{team1.name}</Text>
          <Text className="text-2xl font-bold text-[#0e7ccb]">{team1.score}</Text>
          <Text className="text-gray-600 text-sm">({team1.overs} overs)</Text>
          {/* {status === "Live" && (
            <TouchableOpacity
              onPress={onAddPerformance}
              className="mt-2 bg-[#0e7ccb] px-3 py-1 rounded"
            >
              <Text className="text-white font-semibold text-sm">Add Performance</Text>
            </TouchableOpacity>
          )} */}
        </View>

        <View className="items-center px-4">
          <Text className="text-gray-600 text-sm">VS</Text>
        </View>

        <View className="items-center flex-1">
          <View className="w-16 h-16 rounded-full mb-2 overflow-hidden border border-gray-200">
            <Image source={{ uri: team2.logo }} className="w-[100%] h-[100%]" />
          </View>
          <Text className="font-bold text-lg">{team2.name}</Text>
          <Text className="text-2xl font-bold text-red-600">{team2.score}</Text>
          <Text className="text-gray-600 text-sm">({team2.overs} overs)</Text>
          {/* {status === "Live" && (
            <TouchableOpacity
              onPress={onAddPerformance}
              className="mt-2 bg-red-600 px-3 py-1 rounded"
            >
              <Text className="text-white font-semibold text-sm">Add Performance</Text>
            </TouchableOpacity>
          )} */}
        </View>
      </View>

      {
        status === "Completed" &&
        <View className="bg-white rounded-lg p-4">
          <Text className="text-center font-bold text-lg text-green-600 mb-2">{result}</Text>
          <View className="flex-row justify-between text-sm text-gray-600">
            <Text>{venue}</Text>
            <Text>{date} • {time}</Text>
          </View>
        </View>
      }
    </View>
  );
}