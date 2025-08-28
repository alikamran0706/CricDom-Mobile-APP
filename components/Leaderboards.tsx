import Dropdown from '@/components/ui/Dropdown'; // Reusing Dropdown component
import { BattingPerformance, BowlingPerformance, Player } from '@/lib/types/cricket-data';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy Data for demonstration
const dummyPlayers: Player[] = [
  { id: 'p1', name: 'Virat Kohli', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60', position: 'Batsman', battingStyle: 'RightHanded', bowlingStyle: 'Medium', phoneNumber: '', gameType: 'Leather ball' },
  { id: 'p2', name: 'Rohit Sharma', avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=100&auto=format&fit=crop&q=60', position: 'Batsman', battingStyle: 'RightHanded', bowlingStyle: 'OffSpin', phoneNumber: '', gameType: 'Leather ball' },
  { id: 'p3', name: 'Jasprit Bumrah', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60', position: 'Bowler', battingStyle: 'RightHanded', bowlingStyle: 'Fast', phoneNumber: '', gameType: 'Leather ball' },
  { id: 'p4', name: 'MS Dhoni', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&auto=format&fit=crop&q=60', position: 'Wicketkeeper', battingStyle: 'RightHanded', bowlingStyle: 'Medium', phoneNumber: '', gameType: 'Leather ball' },
  { id: 'p5', name: 'Hardik Pandya', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cfd2feae?w=100&auto=format&fit=crop&q=60', position: 'All-Rounder', battingStyle: 'RightHanded', bowlingStyle: 'Fast', phoneNumber: '', gameType: 'Leather ball' },
];

const dummyBattingPerformances: BattingPerformance[] = [
  { id: 'bp1', innings: {} as any, player: dummyPlayers[0], runs: 120, balls: 60, fours: 10, sixes: 8, dismissalType: 'Not Out', isNotOut: true, strikeRate: 200 },
  { id: 'bp2', innings: {} as any, player: dummyPlayers[1], runs: 95, balls: 50, fours: 8, sixes: 5, dismissalType: 'Caught', isNotOut: false, strikeRate: 190 },
  { id: 'bp3', innings: {} as any, player: dummyPlayers[4], runs: 70, balls: 30, fours: 5, sixes: 6, dismissalType: 'Bowled', isNotOut: false, strikeRate: 233.33 },
  { id: 'bp4', innings: {} as any, player: dummyPlayers[0], runs: 80, balls: 45, fours: 7, sixes: 3, dismissalType: 'Caught', isNotOut: false, strikeRate: 177.78 },
];

const dummyBowlingPerformances: BowlingPerformance[] = [
  { id: 'bwp1', innings: {} as any, player: dummyPlayers[2], overs: 4, runs: 25, wickets: 3, wides: 1, noBalls: 0, economy: 6.25 },
  { id: 'bwp2', innings: {} as any, player: dummyPlayers[4], overs: 3, runs: 20, wickets: 2, wides: 0, noBalls: 0, economy: 6.67 },
  { id: 'bwp3', innings: {} as any, player: dummyPlayers[2], overs: 4, runs: 30, wickets: 1, wides: 2, noBalls: 1, economy: 7.50 },
];

export default function LeaderboardScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [leaderboardType, setLeaderboardType] = useState<'Batting' | 'Bowling'>('Batting');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const getBattingLeaderboard = () => {
    // Aggregate runs for each player
    const playerStats: { [playerId: string]: { player: Player; totalRuns: number; totalBalls: number; totalFours: number; totalSixes: number; totalNotOuts: number; } } = {};

    dummyBattingPerformances.forEach(bp => {
      if (!playerStats[bp.player.id]) {
        playerStats[bp.player.id] = {
          player: bp.player,
          totalRuns: 0,
          totalBalls: 0,
          totalFours: 0,
          totalSixes: 0,
          totalNotOuts: 0,
        };
      }
      playerStats[bp.player.id].totalRuns += bp.runs;
      playerStats[bp.player.id].totalBalls += bp.balls;
      playerStats[bp.player.id].totalFours += bp.fours;
      playerStats[bp.player.id].totalSixes += bp.sixes;
      if (bp.isNotOut) {
        playerStats[bp.player.id].totalNotOuts += 1;
      }
    });

    return Object.values(playerStats)
      .sort((a, b) => b.totalRuns - a.totalRuns) // Sort by total runs
      .map((stats, index) => ({
        rank: index + 1,
        player: stats.player,
        runs: stats.totalRuns,
        balls: stats.totalBalls,
        fours: stats.totalFours,
        sixes: stats.totalSixes,
        strikeRate: stats.totalBalls > 0 ? ((stats.totalRuns / stats.totalBalls) * 100).toFixed(2) : '0.00',
        notOuts: stats.totalNotOuts,
      }));
  };

  const getBowlingLeaderboard = () => {
    // Aggregate wickets for each player
    const playerStats: { [playerId: string]: { player: Player; totalWickets: number; totalRuns: number; totalOvers: number; totalWides: number; totalNoBalls: number; } } = {};

    dummyBowlingPerformances.forEach(bwp => {
      if (!playerStats[bwp.player.id]) {
        playerStats[bwp.player.id] = {
          player: bwp.player,
          totalWickets: 0,
          totalRuns: 0,
          totalOvers: 0,
          totalWides: 0,
          totalNoBalls: 0,
        };
      }
      playerStats[bwp.player.id].totalWickets += bwp.wickets;
      playerStats[bwp.player.id].totalRuns += bwp.runs;
      playerStats[bwp.player.id].totalOvers += bwp.overs;
      playerStats[bwp.player.id].totalWides += bwp.wides;
      playerStats[bwp.player.id].totalNoBalls += bwp.noBalls;
    });

    return Object.values(playerStats)
      .sort((a, b) => b.totalWickets - a.totalWickets) // Sort by total wickets
      .map((stats, index) => ({
        rank: index + 1,
        player: stats.player,
        wickets: stats.totalWickets,
        runs: stats.totalRuns,
        overs: stats.totalOvers.toFixed(1),
        economy: stats.totalOvers > 0 ? (stats.totalRuns / stats.totalOvers).toFixed(2) : '0.00',
        wides: stats.totalWides,
        noBalls: stats.totalNoBalls,
      }));
  };

  const battingLeaderboard = getBattingLeaderboard();
  const bowlingLeaderboard = getBowlingLeaderboard();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboards</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentPadding}>
        <View style={styles.iconContainer}>
          <Ionicons name="trophy" size={32} color="#3B82F6" />
        </View>
        <Text style={styles.screenTitle}>Player Rankings</Text>
        <Text style={styles.screenSubtitle}>See top performers in batting and bowling</Text>

        <Dropdown
          label="Leaderboard Type"
          value={leaderboardType}
          options={[{ label: 'Batting', value: 'Batting' }, { label: 'Bowling', value: 'Bowling' }]}
          onSelect={(item) => setLeaderboardType(item.value as 'Batting' | 'Bowling')}
          showDropdown={showTypeDropdown}
          onToggle={() => setShowTypeDropdown(!showTypeDropdown)}
        />

        <View style={styles.leaderboardTable}>
          {leaderboardType === 'Batting' ? (
            <>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerText, styles.rankCol]}>Rank</Text>
                <Text style={[styles.headerText, styles.playerCol]}>Player</Text>
                <Text style={[styles.headerText, styles.statCol]}>Runs</Text>
                <Text style={[styles.headerText, styles.statCol]}>Balls</Text>
                <Text style={[styles.headerText, styles.statCol]}>SR</Text>
              </View>
              {battingLeaderboard.map((item) => (
                <View key={item.player.id} style={styles.tableRow}>
                  <Text style={[styles.rowText, styles.rankCol]}>{item.rank}</Text>
                  <View style={[styles.playerCol, styles.playerInfo]}>
                    <Image source={{ uri: item.player.avatar }} style={styles.playerAvatar} />
                    <Text style={styles.playerName}>{item.player.name}</Text>
                  </View>
                  <Text style={[styles.rowText, styles.statCol]}>{item.runs}</Text>
                  <Text style={[styles.rowText, styles.statCol]}>{item.balls}</Text>
                  <Text style={[styles.rowText, styles.statCol]}>{item.strikeRate}</Text>
                </View>
              ))}
            </>
          ) : (
            <>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerText, styles.rankCol]}>Rank</Text>
                <Text style={[styles.headerText, styles.playerCol]}>Player</Text>
                <Text style={[styles.headerText, styles.statCol]}>Wkts</Text>
                <Text style={[styles.headerText, styles.statCol]}>Runs</Text>
                <Text style={[styles.headerText, styles.statCol]}>Eco</Text>
              </View>
              {bowlingLeaderboard.map((item) => (
                <View key={item.player.id} style={styles.tableRow}>
                  <Text style={[styles.rowText, styles.rankCol]}>{item.rank}</Text>
                  <View style={[styles.playerCol, styles.playerInfo]}>
                    <Image source={{ uri: item.player.avatar }} style={styles.playerAvatar} />
                    <Text style={styles.playerName}>{item.player.name}</Text>
                  </View>
                  <Text style={[styles.rowText, styles.statCol]}>{item.wickets}</Text>
                  <Text style={[styles.rowText, styles.statCol]}>{item.runs}</Text>
                  <Text style={[styles.rowText, styles.statCol]}>{item.economy}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    paddingTop: 24,
  },
  iconContainer: {
    alignSelf: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 32,
    padding: 16,
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#1F2937',
  },
  screenSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  leaderboardTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F3F4F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerText: {
    fontWeight: '600',
    color: '#6B7280',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
  },
  rowText: {
    fontSize: 14,
    color: '#1F2937',
  },
  rankCol: {
    width: 40,
    textAlign: 'center',
  },
  playerCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  statCol: {
    width: 60,
    textAlign: 'right',
  },
});