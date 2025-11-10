import { Text, View } from "react-native";
import AvatarImage from "../AvatarImage";

interface PlayerPerformance {
  id: string;
  name: string;
  runs: number;
  balls_faced: number;
  fours: number;
  sixes: number;
  strike_rate: number;
  avatar: string;
  player: any;
}

interface TopPerformersProps {
  performers: PlayerPerformance[];
}

export default function TopPerformers({ performers }: TopPerformersProps) {
  return (
    <View className="px-4 mb-6">
      <Text className="text-lg font-semibold mb-4 text-black">Top Performers</Text>
      <View className="gap-y-3">
        {performers?.map((item) => (
          <View key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <View className="flex-row items-center mb-3">
              {/* <Image source={{ uri: getFullStrapiUrl(item.player?.image?.formats?.thumbnail?.url) }} className="w-12 h-12 rounded-full mr-3" /> */}

              <AvatarImage
                uri={item.player?.image?.formats?.thumbnail?.url}
                size={42}
                borderRadius={80}
                rounded={true}
                backgroundColor='transparent'
                extraStyle={{ marginRight: 12, }}
              />
              <View className="flex-1">
                <Text className="font-semibold text-lg text-black">{item.player?.name || 'N/A'}</Text>
                <Text className="text-gray-600">Batsman</Text>
              </View>
              <Text className="text-2xl font-bold text-blue-600">{item.runs}</Text>
            </View>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-gray-600 text-xs">Balls</Text>
                <Text className="font-semibold text-black">{item.balls_faced}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600 text-xs">4s</Text>
                <Text className="font-semibold text-black">{item.fours}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600 text-xs">6s</Text>
                <Text className="font-semibold text-black">{item.sixes}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600 text-xs">S/R</Text>
                <Text className="font-semibold text-black">{item.strike_rate}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}