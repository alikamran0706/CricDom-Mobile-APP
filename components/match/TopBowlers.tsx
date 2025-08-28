import { Image, Text, View } from "react-native";

interface BowlerPerformance {
  id: string;
  name: string;
  overs: string;
  runs: number;
  wickets: number;
  economy: number;
  avatar: string;
}

interface TopBowlersProps {
  bowlers: BowlerPerformance[];
}

export default function TopBowlers({ bowlers }: TopBowlersProps) {
  return (
    <View className="px-4 mb-6">
      <Text className="text-lg font-semibold mb-4">Top Bowlers</Text>
      <View className="gap-y-3">
        {bowlers.map((bowler) => (
          <View key={bowler.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <View className="flex-row items-center mb-3">
              <Image source={{ uri: bowler.avatar }} className="w-12 h-12 rounded-full mr-3" />
              <View className="flex-1">
                <Text className="font-semibold text-lg">{bowler.name}</Text>
                <Text className="text-gray-600">Bowler</Text>
              </View>
              <Text className="text-2xl font-bold text-red-600">{bowler.wickets}/{bowler.runs}</Text>
            </View>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-gray-600 text-xs">Overs</Text>
                <Text className="font-semibold">{bowler.overs}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600 text-xs">Runs</Text>
                <Text className="font-semibold">{bowler.runs}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600 text-xs">Wickets</Text>
                <Text className="font-semibold">{bowler.wickets}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600 text-xs">Economy</Text>
                <Text className="font-semibold">{bowler.economy}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}