import Dropdown from '@/components/ui/Dropdown'; // Reusing Dropdown component
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy Data for demonstration
const dummyPlayers = [
  { id: 'p1', name: 'Virat Kohli', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60', position: 'Batsman', battingStyle: 'RightHanded', bowlingStyle: 'Medium', phoneNumber: '', gameType: 'Leather ball' },
  { id: 'p2', name: 'Rohit Sharma', avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=100&auto=format&fit=crop&q=60', position: 'Batsman', battingStyle: 'RightHanded', bowlingStyle: 'OffSpin', phoneNumber: '', gameType: 'Leather ball' },
  { id: 'p3', name: 'Jasprit Bumrah', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60', position: 'Bowler', battingStyle: 'RightHanded', bowlingStyle: 'Fast', phoneNumber: '', gameType: 'Leather ball' },
];

const dummyInnings = [
  { id: 'i1', match: { id: 'm1', teamA: { name: 'MI' }, teamB: { name: 'CSK' } } as any, team: { name: 'MI' } as any, inningsNumber: 1, runs: 150, wickets: 5, overs: 20, battingPerformances: [], bowlingPerformances: [], fallOfWickets: [] },
  { id: 'i2', match: { id: 'm1', teamA: { name: 'MI' }, teamB: { name: 'CSK' } } as any, team: { name: 'CSK' } as any, inningsNumber: 2, runs: 152, wickets: 4, overs: 19.3, battingPerformances: [], bowlingPerformances: [], fallOfWickets: [] },
];

export default function AddBowlingPerformanceScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [selectedInningsId, setSelectedInningsId] = useState<string | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [overs, setOvers] = useState('');
  const [runs, setRuns] = useState('');
  const [wickets, setWickets] = useState('');
  const [wides, setWides] = useState('');
  const [noBalls, setNoBalls] = useState('');

  const [showInningsDropdown, setShowInningsDropdown] = useState(false);
  const [showPlayerDropdown, setShowPlayerDropdown] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleAddPerformance = () => {
    if (!selectedInningsId || !selectedPlayerId || !overs || !runs || !wickets) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    const innings = dummyInnings.find(i => i.id === selectedInningsId);
    const player = dummyPlayers.find(p => p.id === selectedPlayerId);

    if (!innings || !player) {
      Alert.alert('Error', 'Selected innings or player not found.');
      return;
    }

    const totalOvers = parseFloat(overs);
    const totalRuns = parseInt(runs);
    const economy = totalOvers > 0 ? totalRuns / totalOvers : 0;

    const newPerformance = {
      id: `bp${Date.now()}`,
      innings,
      player,
      overs: totalOvers,
      runs: totalRuns,
      wickets: parseInt(wickets),
      wides: parseInt(wides || '0'),
      noBalls: parseInt(noBalls || '0'),
      economy: parseFloat(economy.toFixed(2)),
    };

    console.log('Adding bowling performance:', newPerformance);
    Alert.alert('Success', 'Bowling performance added successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const inningsOptions = dummyInnings.map(i => ({
    label: `Innings ${i.inningsNumber} - ${i.team.name} (${i.match.teamA.name} vs ${i.match.teamB.name})`,
    value: i.id,
  }));

  const playerOptions = dummyPlayers.map(p => ({
    label: `${p.name} (${p.position})`,
    value: p.id,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Bowling Performance</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentPadding}>
        <View style={styles.iconContainer}>
          <Ionicons name="bowling-ball" size={32} color="#3B82F6" />
        </View>
        <Text style={styles.screenTitle}>Bowling Details</Text>
        <Text style={styles.screenSubtitle}>Record a player's bowling statistics</Text>

        <Dropdown
          label="Select Innings *"
          value={selectedInningsId ? inningsOptions.find(opt => opt.value === selectedInningsId)?.label : ''}
          options={inningsOptions}
          onSelect={(item) => setSelectedInningsId(item.value)}
          showDropdown={showInningsDropdown}
          onToggle={() => setShowInningsDropdown(!showInningsDropdown)}
        />

        <Dropdown
          label="Select Player *"
          value={selectedPlayerId ? playerOptions.find(opt => opt.value === selectedPlayerId)?.label : ''}
          options={playerOptions}
          onSelect={(item) => setSelectedPlayerId(item.value)}
          showDropdown={showPlayerDropdown}
          onToggle={() => setShowPlayerDropdown(!showPlayerDropdown)}
        />

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Overs Bowled *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 4.0, 3.2"
            keyboardType="numeric"
            value={overs}
            onChangeText={setOvers}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Runs Conceded *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 25"
            keyboardType="numeric"
            value={runs}
            onChangeText={setRuns}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Wickets Taken *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 3"
            keyboardType="numeric"
            value={wickets}
            onChangeText={setWickets}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Wides (Optional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 1"
            keyboardType="numeric"
            value={wides}
            onChangeText={setWides}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>No Balls (Optional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 0"
            keyboardType="numeric"
            value={noBalls}
            onChangeText={setNoBalls}
          />
        </View>
      </ScrollView>

      <FloatingActionButton
        label="Add Performance"
        iconName="add-circle-outline"
        onPress={handleAddPerformance}
      />
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
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#1F2937',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
});