import React from "react";
import { Image, Text, View } from "react-native";

const Summary = ({ match }: any) => {

  return (
    <View >
      {/* Team Scores */}
      <View className="px-4">
        {[{ team: match?.innings[0]?.batting_team?.name, score: match?.innings[0] ? `${match?.innings[0]?.runs}/${match?.innings[0]?.wickets} (${match?.innings[0]?.overs.length}.0)` : 'N/A' },
        {
          team: (match?.innings[1]?.batting_team)?.name, score: match?.innings[1] ?
            `${match?.innings[1]?.runs}/${match?.innings[1]?.wickets} (${match?.innings[1]?.overs.length}.0)` : 'N/A'
        }].map((team, index) => (
          <View key={index} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            {
              match?.innings[index] ?
              <>
                <View className="flex-row items-center mb-3">
                  <Image source={{ uri: "/placeholder.svg?height=24&width=24" }} className="w-6 h-6 mr-2" />
                  <Text className="text-base font-semibold text-black flex-1">{team.team}</Text>
                  <Text className="text-base font-semibold text-black">{team.score}</Text>
                </View>

                <View className="flex-row">
                  {/* Batting */}
                  <View className="flex-1">
                    {
                      match?.innings[index]?.player_scores?.map((item: any, i: number) =>
                        <PlayerStat name={item?.player?.name || 'N/A'} runs={item?.player?.runs} balls={item?.player?.balls_faced} isNotOut={item?.player?.is_out} key={i} />
                      )
                    }
                  </View>
                  {/* <PlayerStat name={"Meysam K"} runs="64" balls="66" isNotOut />
                  <BowlingStat name="Salaar K" figures="2-19" overs="5.0" /> */}
                  {/* Bowling */}
                  <View className="flex-1">
                    {
                      match?.innings[index]?.bowler_stats?.map((item: any, i: number) =>
                        <BowlingStat name={item?.bowler?.name || 'N/A'} figures={`${item?.wickets?.length || 0}-${item?.runs_conceded || 0}`} overs="5.0" />
                      )
                    }
                  </View>
                </View>
              </>
              :
              <View className="flex-row items-center mb-3">
                  <Text className="text-base font-semibold text-black flex-1 text-center">Yet To Bat</Text>
                </View>
            }
          </View>
        ))}
      </View>

      {/* Match Result */}
      <View className="bg-white mx-4 my-4 rounded-xl p-4 items-center shadow-sm">
        {
          match?.status_type === 'Live' ?
            <Text>Match is Live</Text>
            :
            match?.status_type === 'Complete' ?
              <Text className="text-base font-semibold text-black">WRR won by 25 Runs</Text>
              :
              <Text>Upcoming</Text>
        }
      </View>

    </View>
  );
};

export default Summary;

const PlayerStat = ({ name, runs, balls, isNotOut }: any) => (
  <View className="flex-row items-center py-1">
    <Text className="text-sm text-black flex-1">
      {name}
      {isNotOut && <Text className="text-blue-500">*</Text>}
    </Text>
    <Text className="text-sm font-semibold text-black w-[30px] text-right">{runs}</Text>
    <Text className="text-xs text-gray-600 w-[30px] text-right">{balls}</Text>
  </View>
);

const BowlingStat = ({ name, figures, overs }: any) => (
  <View className="flex-row items-center py-1">
    <Text className="text-sm text-black flex-1">{name}</Text>
    <Text className="text-sm font-semibold text-black w-[40px] text-right">{figures}</Text>
    <Text className="text-xs text-gray-600 w-[30px] text-right">{overs}</Text>
  </View>
);
