import Dropdown from '@/components/ui/Dropdown';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import Header from '@/components/ui/Header';
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

// Dummy Data
const dummyTeams = [
  { id: 't1', name: 'Mumbai Indians', color: '#004BA0' },
  { id: 't2', name: 'Chennai Super Kings', color: '#FFFF3C' },
  { id: 't3', name: 'Royal Challengers', color: '#EC1C24' },
];

const dummyMatches = [
  {
    id: 'm1',
    teamA: dummyTeams[0],
    teamB: dummyTeams[1],
    date: '10/07/2024',
    time: '19:00',
    venue: 'Wankhede Stadium',
    matchType: 'T20',
    oversLimit: 20,
    innings: [],
  },
  {
    id: 'm2',
    teamA: dummyTeams[1],
    teamB: dummyTeams[2],
    date: '12/07/2024',
    time: '14:00',
    venue: 'Eden Gardens',
    matchType: 'ODI',
    oversLimit: 50,
    innings: [],
  },
];

export default function CreateInningsScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [inningsNumber, setInningsNumber] = useState('');
  const [runs, setRuns] = useState('');
  const [wickets, setWickets] = useState('');
  const [overs, setOvers] = useState('');

  const [showMatchDropdown, setShowMatchDropdown] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleCreateInnings = () => {
    if (!selectedMatchId || !selectedTeamId || !inningsNumber || !runs || !wickets || !overs) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    const match = dummyMatches.find(m => m.id === selectedMatchId);
    const team = dummyTeams.find(t => t.id === selectedTeamId);

    if (!match || !team) {
      Alert.alert('Error', 'Selected match or team not found.');
      return;
    }

    const newInnings = {
      id: `i${Date.now()}`,
      matchId: match.id,
      teamId: team.id,
      inningsNumber: parseInt(inningsNumber),
      runs: parseInt(runs),
      wickets: parseInt(wickets),
      overs: parseFloat(overs),
      battingPerformances: [],
      bowlingPerformances: [],
      fallOfWickets: [],
    };

    Alert.alert('Success', 'Innings created successfully!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  const matchOptions = dummyMatches.map(m => ({
    label: `${m.teamA.name} vs ${m.teamB.name} (${m.date})`,
    value: m.id,
  }));

  const teamOptions = selectedMatchId
    ? dummyTeams
        .filter(t => {
          const match = dummyMatches.find(m => m.id === selectedMatchId);
          return match && (t.id === match.teamA.id || t.id === match.teamB.id);
        })
        .map(t => ({ label: t.name, value: t.id }))
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <Header heading={'Create Innings'} />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentPadding}>
        <View style={styles.iconContainer}>
          <Ionicons name="baseball" size={32} color="#3B82F6" />
        </View>
        <Text style={styles.screenTitle}>New Innings</Text>
        <Text style={styles.screenSubtitle}>Record details for a match innings</Text>

        <Dropdown
          label="Select Match *"
          value={selectedMatchId ? matchOptions.find(opt => opt.value === selectedMatchId)?.label : ''}
          options={matchOptions}
          onSelect={(item) => {
            setSelectedMatchId(item.value);
            setSelectedTeamId(null);
            setInningsNumber('');
          }}
          showDropdown={showMatchDropdown}
          onToggle={() => setShowMatchDropdown(!showMatchDropdown)}
        />

        <Dropdown
          label="Select Team *"
          value={selectedTeamId ? teamOptions.find(opt => opt.value === selectedTeamId)?.label : ''}
          options={teamOptions}
          onSelect={(item) => setSelectedTeamId(item.value)}
          showDropdown={showTeamDropdown}
          onToggle={() => setShowTeamDropdown(!showTeamDropdown)}
          disabled={!selectedMatchId}
        />

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Innings Number *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 1, 2"
            keyboardType="numeric"
            value={inningsNumber}
            onChangeText={setInningsNumber}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Runs Scored *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 150"
            keyboardType="numeric"
            value={runs}
            onChangeText={setRuns}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Wickets Lost *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 5"
            keyboardType="numeric"
            value={wickets}
            onChangeText={setWickets}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Overs Bowled *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 20.0, 19.3"
            keyboardType="numeric"
            value={overs}
            onChangeText={setOvers}
          />
        </View>

        <View style={styles.subSection}>
          <Text style={styles.subSectionTitle}>Add Details</Text>
          <TouchableOpacity style={styles.subSectionButton} onPress={() => router.push(`/batting-performance/1`)}>
            <Text style={styles.subSectionButtonText}>Add Batting Performance</Text>
            <Ionicons name="chevron-forward" size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.subSectionButton} onPress={() => router.push(`/bowling-performance/1`)}>
            <Text style={styles.subSectionButtonText}>Add Bowling Performance</Text>
            <Ionicons name="chevron-forward" size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.subSectionButton} onPress={() => router.push(`/fall-of-wickets/1`)}>
            <Text style={styles.subSectionButtonText}>Add Fall of Wicket</Text>
            <Ionicons name="chevron-forward" size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FloatingActionButton
        label="Create Innings"
        iconName="add-circle-outline"
        onPress={handleCreateInnings}
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
  subSection: {
    marginTop: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1F2937',
  },
  subSectionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  subSectionButtonText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
  },
});
