import Innings from "@/components/match/Innings";
import MatchHeader from "@/components/match/MatchHeader";
import MatchInfo from "@/components/match/MatchInfo";
import MatchOverview from "@/components/match/MatchOverview";
import Scoreboard from "@/components/match/Scoreboard";
import Summary from "@/components/match/Summary";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { matchData } from "@/constants/match";
import { useGetMatchQuery } from "@/store/features/match/matchApi";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Match() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'batting' | 'bowling' | null>(null);
  const { data, isLoading, isError } = useGetMatchQuery(id as string);

  const match = data?.data;

  const [activeMatchTab, setActiveMatchTab] = useState("Info")

  const tabs = ["Info", "Summary", "Innings", "Scoreboard"]
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  const renderTabButton = (tab: any) => (
    <TouchableOpacity
      key={tab}
      className={`${activeMatchTab === tab ? 'bg-[#4A90E2]' : 'bg-transparent'} px-[10px] py-[5px] mr-[8px] rounded-full`}
      onPress={() => setActiveMatchTab(tab)}
    >
      <Text
        className={`${activeMatchTab === tab ? 'text-white' : 'text-[#666]'} font-lg font-bold`}
      >{tab}</Text>
    </TouchableOpacity>
  )

  const renderTabContent = () => {
    switch (activeMatchTab) {
      case "Info":
        return <MatchInfo match={match} />
      case "Summary":
        return <Summary match={match} />
      case "Innings":
        return <Innings match={match} />
      case "Scoreboard":
        return <Scoreboard match={match} />
      default:
        return <MatchInfo />
    }
  }

  return (
    <>
      <StatusBar
        barStyle={activeTab ? "light-content" : "dark-content"}
        backgroundColor={activeTab ? "black" : "white"}
      />
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1">
          <MatchHeader
            title={match?.description || matchData.title}
            subtitle={matchData.subtitle}
            status={matchData.status}
          />

          <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
            {
              match &&
              <MatchOverview
                inning1={match?.innings[0]}
                inning2={match?.innings[1]}
                result={matchData.result}
                venue={matchData.venue}
                date={matchData.date}
                time={matchData.time}
                status={match?.status_type}
                match={match}
              />
            }

            <View className="flex bg-white px-8 py-2 flex-row">{tabs.map(renderTabButton)}</View>
            {renderTabContent()}
          </ScrollView>

          {matchData.status === "Live" && !activeTab && (
            <FloatingActionButton
              label="Resume"
              onPress={() => { }}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
