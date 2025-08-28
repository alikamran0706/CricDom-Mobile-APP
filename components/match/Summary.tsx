import React from "react";
import { Image, Text, View } from "react-native";

const Summary = () => {
  return (
    <View >
      {/* Team Scores */}
      <View className="px-4">
        {[{ team: "Warriors", score: "150/4 (30.0)" }, { team: "STARS", score: "125/9 (30.0)" }].map((team, index) => (
          <View key={index} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            <View className="flex-row items-center mb-3">
              <Image source={{ uri: "/placeholder.svg?height=24&width=24" }} className="w-6 h-6 mr-2" />
              <Text className="text-base font-semibold text-black flex-1">{team.team}</Text>
              <Text className="text-base font-semibold text-black">{team.score}</Text>
            </View>

            <View className="flex-row">
              {/* Batting */}
              <View className="flex-1">
                <PlayerStat name="Meysam K" runs="64" balls="66" isNotOut />
                <PlayerStat name="Om G" runs="29" balls="28" />
                <PlayerStat name="Aaryan V" runs="12" balls="5" isNotOut />
              </View>

              {/* Bowling */}
              <View className="flex-1">
                <BowlingStat name="Salaar K" figures="2-19" overs="5.0" />
                <BowlingStat name="Ashwanth S" figures="1-6" overs="2.0" />
                <BowlingStat name="Mourya A" figures="0-6" overs="2.0" />
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Match Result */}
      <View className="bg-white mx-4 my-4 rounded-xl p-4 items-center shadow-sm">
        <Text className="text-base font-semibold text-black">WRR won by 25 Runs</Text>
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
