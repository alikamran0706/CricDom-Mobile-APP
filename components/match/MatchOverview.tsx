import { getFullStrapiUrl } from "@/lib/utils/common";
import { Image, Text, View } from "react-native";

interface Team {
  name: string;
  score: string;
  overs: string;
  image: any
}

interface MatchOverviewProps {
  inning1: any;
  inning2: any;
  result: string;
  venue: string;
  date: string;
  time: string;
  status: string;
  match?: any
}

export default function MatchOverview({
  inning1,
  inning2,
  result,
  venue,
  date,
  time,
  status,
  match
}: MatchOverviewProps) {

  const findTeamB = match?.team_a?.documentId === inning1?.batting_team?.documentId ? match?.team_b : match?.team_a;

  const team1 = inning1?.batting_team || match?.team_a;
  const team2 = inning2?.batting_team || findTeamB;
    console.log(inning1)
  return (
    <View className="px-4 py-6 bg-gray-50">
      <View className="flex-row items-center justify-between mb-4">
        {(team1 && team1 !== undefined) &&
          <View className="items-center flex-1">
            <View className="w-16 h-16 rounded-full mb-2 overflow-hidden border border-gray-200">
              <Image source={{ uri: getFullStrapiUrl(team1?.image?.formats?.thumbnail?.url) }} className="w-[100%] h-[100%]" />
            </View>
            <Text className="font-bold text-lg text-black">{team1?.name}</Text>
            <Text className="text-2xl font-bold text-[#0e7ccb]">{inning1?.runs}</Text>
            <Text className="text-gray-600 text-sm">({inning1?.overs?.length} overs)</Text>
            {/* {status === "Live" && (
            <TouchableOpacity
              onPress={onAddPerformance}
              className="mt-2 bg-[#0e7ccb] px-3 py-1 rounded"
            >
              <Text className="text-white font-semibold text-sm">Add Performance</Text>
            </TouchableOpacity>
          )} */}
          </View>
        }
        {(team2 && team2 !== undefined) &&
          <View className="items-center px-4">
            <Text className="text-gray-600 text-sm">VS</Text>
          </View>
        }
        <View className="items-center flex-1">
          <View className="w-16 h-16 rounded-full mb-2 overflow-hidden border border-gray-200">
            <Image source={{ uri: getFullStrapiUrl(team2?.image?.formats?.thumbnail?.url) }} className="w-[100%] h-[100%]" />
          </View>
          <Text className="font-bold text-lg text-black">{team2?.name}</Text>
          <Text className="text-2xl font-bold text-red-600">{inning2?.runs}</Text>
          <Text className="text-gray-600 text-sm">({inning2?.batting_team ? inning1?.overs?.length : 0} overs)</Text>
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