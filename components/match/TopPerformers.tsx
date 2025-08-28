import { Image, Text, View } from "react-native";

interface PlayerPerformance {
  id: string;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  avatar: string;
}

interface TopPerformersProps {
  performers: PlayerPerformance[];
}

export default function TopPerformers({ performers }: TopPerformersProps) {
  return (
    <View className="px-4 mb-6">
      <Text className="text-lg font-semibold mb-4">Top Performers</Text>
      <View className="gap-y-3">
        {performers.map((player) => (
          <View key={player.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <View className="flex-row items-center mb-3">
              <Image source={{ uri: player.avatar }} className="w-12 h-12 rounded-full mr-3" />
              <View className="flex-1">
                <Text className="font-semibold text-lg">{player.name}</Text>
                <Text className="text-gray-600">Batsman</Text>
              </View>
              <Text className="text-2xl font-bold text-blue-600">{player.runs}</Text>
            </View>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-gray-600 text-xs">Balls</Text>
                <Text className="font-semibold">{player.balls}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600 text-xs">4s</Text>
                <Text className="font-semibold">{player.fours}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600 text-xs">6s</Text>
                <Text className="font-semibold">{player.sixes}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600 text-xs">S/R</Text>
                <Text className="font-semibold">{player.strikeRate}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}