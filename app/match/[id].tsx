import BottomSheetWrapper, { BottomSheetRef } from "@/components/BottomSheetWrapper";
import Innings from "@/components/match/Innings";
import MatchHeader from "@/components/match/MatchHeader";
import MatchInfo from "@/components/match/MatchInfo";
import MatchOverview from "@/components/match/MatchOverview";
import PerformanceForm from "@/components/match/PerformanceForm";
import Scoreboard from "@/components/match/Scoreboard";
import Summary from "@/components/match/Summary";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { matchData } from "@/constants/match";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Match() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'batting' | 'bowling' | null>(null);

  const [activeMatchTab, setActiveMatchTab] = useState("Info")

  const tabs = ["Info", "Summary", "Innings", "Scoreboard"]
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const openPerformanceForm = () => {
    setActiveTab('batting');
    bottomSheetRef.current?.open();
  };

  const closePerformanceForm = () => {
    bottomSheetRef.current?.close();
    setActiveTab(null);
  };

  const handleTabChange = (tab: 'batting' | 'bowling') => {
    setActiveTab(tab);
  };

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
        return <MatchInfo />
      case "Summary":
        return <Summary />
      case "Innings":
        return <Innings />
      case "Scoreboard":
        return <Scoreboard />
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1">
            <MatchHeader
              title={matchData.title}
              subtitle={matchData.subtitle}
              status={matchData.status}
            />

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
              <MatchOverview
                team1={matchData.team1}
                team2={matchData.team2}
                result={matchData.result}
                venue={matchData.venue}
                date={matchData.date}
                time={matchData.time}
                status={matchData.status}
                onAddPerformance={openPerformanceForm}
              />

              <View className="flex bg-white px-8 py-2 flex-row">{tabs.map(renderTabButton)}</View>
              {renderTabContent()}
            </ScrollView>

            {activeTab && (
              <View style={StyleSheet.absoluteFill}>
                <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
              </View>
            )}

            <BottomSheetWrapper
              ref={bottomSheetRef}
              onClose={closePerformanceForm}
            >
              <PerformanceForm
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onClose={closePerformanceForm}
              />
            </BottomSheetWrapper>

            {matchData.status === "Live" && !activeTab && (
              <FloatingActionButton
                label="Update Match"
                iconName="pencil"
                onPress={() => { }}
              />
            )}
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
}
