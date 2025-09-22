import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useEffect, useRef, useState } from "react"
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface MatchSettingsSidebarProps {
  isVisible: boolean
  onClose: () => void
}

const SCREEN_WIDTH = Dimensions.get("window").width
const DRAWER_WIDTH = 320

const MatchSettingsSidebar = ({ isVisible, onClose }: MatchSettingsSidebarProps) => {
  const router = useRouter()
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current 

  const [expandedSections, setExpandedSections] = useState({
    match: true,
    players: true,
    scorer: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Animate when isVisible changes
  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH - DRAWER_WIDTH,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.in(Easing.ease),
      }).start()
    }
  }, [isVisible])

  const SettingsItem = ({ title, onPress }: { title: string; onPress?: () => void }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
  )

  const SectionHeader = ({
    title,
    expanded,
    onToggle,
  }: {
    title: string
    expanded: boolean
    onToggle: () => void
  }) => (
    <TouchableOpacity style={styles.sectionHeader} onPress={onToggle}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      <Ionicons name={expanded ? "chevron-down" : "chevron-forward"} size={20} color="#374151" />
    </TouchableOpacity>
  )

  return (
    <View style={StyleSheet.absoluteFillObject}>
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
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <SectionHeader
              title="Match Settings"
              expanded={expandedSections.match}
              onToggle={() => toggleSection("match")}
            />
            {expandedSections.match && (
              <View>
                <SettingsItem title="Change Match Overs" />
                <SettingsItem title="Match Rules (WD, NB, WW)" />
                <SettingsItem title="Revise Target (DLS/VJD)" />
                <SettingsItem title="Add Bonus Runs" />
                <SettingsItem title="Give Penalty Runs" />
                <SettingsItem title="End / Declare Innings" />
                <SettingsItem title="End Match" />
              </View>
            )}

            <SectionHeader
              title="Players Settings"
              expanded={expandedSections.players}
              onToggle={() => toggleSection("players")}
            />
            {expandedSections.players && (
              <View>
                <SettingsItem title="Change Playing Squad" />
                <SettingsItem title="Change Bowler" />
                <SettingsItem title="Replace Batters" />
                <SettingsItem title="Retired Hurt (Batter)" />
              </View>
            )}

            <SectionHeader
              title="Scorer Settings"
              expanded={expandedSections.scorer}
              onToggle={() => toggleSection("scorer")}
            />
            {expandedSections.scorer && (
              <View>
                <SettingsItem title="Change Scorer" />
              </View>
            )}

            {/* Help/FAQs */}
            <View style={{ marginVertical: 24, paddingHorizontal: 24 }}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Help / FAQs</Text>
                <Text style={{ color: "#0e7ccb", fontWeight: "600" }}>SHOW</Text>
              </View>
            </View>
          </ScrollView>

          {/* Helpline */}
          <View style={styles.helpline}>
            <Text style={styles.helplineLabel}>Cricdom Helpline</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="call" size={20} color="#0e7ccb" />
              <Text style={styles.helplinePhone}>+55 5555555</Text>
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  )
}

export default MatchSettingsSidebar

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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 6,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: "#f9fafb",
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
  },
  itemText: {
    color: "#1f2937",
    fontSize: 16,
  },
  helpline: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "white",
  },
  helplineLabel: {
    color: "#6b7280",
    fontSize: 16,
    marginBottom: 6,
  },
  helplinePhone: {
    color: "#0e7ccb",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
})
