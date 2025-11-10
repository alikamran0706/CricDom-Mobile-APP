import { Text, View } from "react-native";
import AvatarImage from "../AvatarImage";

interface BowlerPerformance {
  id: string;
  name: string;
  overs_bowled: string;
  runs_conceded: number;
  wickets: any;
  economy: number;
  avatar: string;
  bowler: any;
  overs: any;
  over_balls?: any
}

interface TopBowlersProps {
  bowlers: BowlerPerformance[];
}

export default function TopBowlers({ bowlers }: TopBowlersProps) {

  return (
    <View className="px-4 mb-6">
      <Text className="text-lg font-semibold mb-4 text-black">Top Bowlers</Text>
      <View className="gap-y-3">
        {bowlers?.map((item) => (
          <View key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <View className="flex-row items-center mb-3">
              <AvatarImage
                uri={item.bowler?.image?.formats?.thumbnail?.url}
                size={42}
                borderRadius={80}
                rounded={true}
                backgroundColor='transparent'
                extraStyle={{ marginRight: 12, }}
              />
              <View className="flex-1">
                <Text className="font-semibold text-lg text-black">{item.bowler?.name}</Text>
                <Text className="text-gray-600">Bowler</Text>
              </View>
              <Text className="text-2xl font-bold text-red-600">{item.wickets?.length || '0'}/{item.runs_conceded}</Text>
            </View>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-gray-600 text-xs">Overs</Text>
                <Text className="font-semibold text-black">{item?.overs[item?.overs?.length - 1]?.over_balls?.length < 6 ? `${item.overs?.length - 1}.${item?.overs[item.overs?.length - 1]?.over_balls?.length}` : item.overs?.length }</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600 text-xs">Runs</Text>
                <Text className="font-semibold text-black">{item?.runs_conceded}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600 text-xs">Wickets</Text>
                <Text className="font-semibold text-black">{item?.wickets?.length || 0}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600 text-xs">Economy</Text>
                <Text className="font-semibold text-black">{item?.runs_conceded/item.overs?.length}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}