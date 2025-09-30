import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MatchSettingsSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  onPress?: any;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = 320;

const MatchSettingsSidebar = ({ isVisible, onClose, onPress }: MatchSettingsSidebarProps) => {
  const router = useRouter();
  const [faqVisible, setFaqVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  const [expandedSections, setExpandedSections] = useState({
    match: true,
    players: true,
    scorer: true,
  });

  const toggleFAQ = () => setFaqVisible(!faqVisible);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? SCREEN_WIDTH - DRAWER_WIDTH : SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: false,
      easing: isVisible ? Easing.out(Easing.ease) : Easing.in(Easing.ease),
    }).start();
  }, [isVisible]);

  const SettingsItem = ({ title, onPress }: { title: string; onPress?: () => void }) => (
    <TouchableOpacity className="py-3 px-6 border-b border-gray-100" onPress={onPress}>
      <Text className="text-gray-800 text-base">{title}</Text>
    </TouchableOpacity>
  );

  const SectionHeader = ({
    title,
    expanded,
    onToggle,
  }: {
    title: string;
    expanded: boolean;
    onToggle: () => void;
  }) => (
    <TouchableOpacity className="flex-row justify-between py-4 px-6 bg-gray-50" onPress={onToggle}>
      <Text className="text-lg font-semibold text-gray-900">{title}</Text>
      <Ionicons
        name={expanded ? "chevron-down" : "chevron-forward"}
        size={20}
        color="#374151"
      />
    </TouchableOpacity>
  );

  return (
    <View style={StyleSheet.absoluteFillObject} >
      {/* Overlay */}
      {isVisible && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
      )}

      {/* Sidebar */}
      <Animated.View style={[styles.drawer, { left: slideAnim }]}>
        <SafeAreaView className="flex-1">
          <ScrollView>
            {/* Match Settings */}
            <SectionHeader
              title="Match Settings"
              expanded={expandedSections.match}
              onToggle={() => toggleSection("match")}
            />
            {expandedSections.match && (
              <View>
                <SettingsItem title="Change Match Overs" onPress={() => onPress('Change Match Overs')} />
                <SettingsItem title="Match Rules (WD, NB, WW)" onPress={() => router.push('/match-rules')} />
                <SettingsItem title="Add Bonus Runs" onPress={() => router.push('/bonus-runs')} />
                <SettingsItem title="Give Penalty Runs" onPress={() => router.push('/penalty-runs')} />
                <SettingsItem title="End / Declare Innings" onPress={() => onPress('End Innings')} />
                <SettingsItem title="End Match" onPress={() => onPress('End Match')} />
              </View>
            )}

            {/* Player Settings */}
            <SectionHeader
              title="Players Settings"
              expanded={expandedSections.players}
              onToggle={() => toggleSection("players")}
            />
            {expandedSections.players && (
              <View>
                <SettingsItem
                  title="Change Playing Squad"
                  onPress={() =>
                    router.push({
                      pathname: "/replace",
                      params: {
                        heading: "Select Batter to replace",
                        title: "Playing Squad",
                      },
                    })
                  }
                />
                <SettingsItem
                  title="Change Bowler"
                  onPress={() =>
                    router.push({
                      pathname: "/replace",
                      params: {
                        heading: "Select Bowler to replace",
                        title: "Playing Squad",
                      },
                    })
                  }
                />
                <SettingsItem
                  title="Replace Batters"
                  onPress={() =>
                    router.push({
                      pathname: "/replace",
                      params: {
                        heading: "Select Batter to replace",
                        title: "Playing Squad",
                      },
                    })
                  }
                />
                <SettingsItem title="Retired Hurt (Batter)" onPress={() => onPress('wicket')} />
              </View>
            )}

            {/* Scorer Settings */}
            <SectionHeader
              title="Scorer Settings"
              expanded={expandedSections.scorer}
              onToggle={() => toggleSection("scorer")}
            />
            {expandedSections.scorer && (
              <View>
                <SettingsItem title="Change Scorer" onPress={() => onPress('Change Scorer')} />
              </View>
            )}

            {/* Help/FAQs */}
            <View className="my-6 px-6">
              <TouchableOpacity className="flex-row justify-between items-center" onPress={toggleFAQ}>
                <Text className="text-lg font-semibold text-gray-900">Help / FAQs</Text>
                <Text className="text-[#0e7ccb] font-semibold">
                  {faqVisible ? "HIDE" : "SHOW"}
                </Text>
              </TouchableOpacity>

              {faqVisible && (
                <View className="mt-3">
                  <Text className="text-sm text-gray-700 leading-relaxed">
                    • Q: How does this work?{"\n"}
                    • A: You can adjust match settings here.{"\n"}
                    • Q: Can I change squads during a match?{"\n"}
                    • A: Yes, through the Players Settings section.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Helpline */}
          <View className="py-3 px-6 border-t border-gray-200 bg-white">
            <Text className="text-gray-500 text-base mb-1">Cricdom Helpline</Text>
            <View className="flex-row items-center">
              <Ionicons name="call" size={20} color="#0e7ccb" />
              <Text className="text-[#0e7ccb] text-lg font-bold ml-2">+55 5555555</Text>
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

export default MatchSettingsSidebar;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "white",
    zIndex: 2,
  },

})