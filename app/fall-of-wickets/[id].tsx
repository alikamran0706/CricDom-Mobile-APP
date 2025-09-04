import Dropdown from '@/components/ui/Dropdown'; // Reusing Dropdown component
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { DismissalType } from '@/lib/types/cricket-data';
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
  { id: 'p4', name: 'MS Dhoni', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&auto=format&fit=crop&q=60', position: 'Wicketkeeper', battingStyle: 'RightHanded', bowlingStyle: 'Medium', phoneNumber: '', gameType: 'Leather ball' },
];

const dummyInnings = [
  { id: 'i1', match: { id: 'm1', teamA: { name: 'MI' }, teamB: { name: 'CSK' } } as any, team: { name: 'MI' } as any, inningsNumber: 1, runs: 150, wickets: 5, overs: 20, battingPerformances: [], bowlingPerformances: [], fallOfWickets: [] },
  { id: 'i2', match: { id: 'm1', teamA: { name: 'MI' }, teamB: { name: 'CSK' } } as any, team: { name: 'CSK' } as any, inningsNumber: 2, runs: 152, wickets: 4, overs: 19.3, battingPerformances: [], bowlingPerformances: [], fallOfWickets: [] },
];

const dismissalTypesForFOW: DismissalType[] = [
  'Caught', 'Bowled', 'LBW', 'Run Out', 'Stumped', 'Hit Wicket',
  'Retired Hurt', 'Obstructing the field', 'Timed Out', 'Retired Out', 'Hit the ball twice'
];

export default function AddFallOfWicketScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [selectedInningsId, setSelectedInningsId] = useState<string | null>(null);
  const [wicketNumber, setWicketNumber] = useState('');
  const [scoreAtFall, setScoreAtFall] = useState('');
  const [overNumber, setOverNumber] = useState('');
  const [batsmanOutId, setBatsmanOutId] = useState<string | null>(null);
  const [bowlerId, setBowlerId] = useState<string | null>(null);
  const [fielderId, setFielderId] = useState<string | null>(null);
  const [dismissalType, setDismissalType] = useState<DismissalType | null>(null);

  const [showInningsDropdown, setShowInningsDropdown] = useState(false);
  const [showBatsmanDropdown, setShowBatsmanDropdown] = useState(false);
  const [showBowlerDropdown, setShowBowlerDropdown] = useState(false);
  const [showFielderDropdown, setShowFielderDropdown] = useState(false);
  const [showDismissalDropdown, setShowDismissalDropdown] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleAddFallOfWicket = () => {
    if (!selectedInningsId || !wicketNumber || !scoreAtFall || !overNumber || !batsmanOutId || !dismissalType) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    const innings = dummyInnings.find(i => i.id === selectedInningsId);
    const batsman = dummyPlayers.find(p => p.id === batsmanOutId);
    const bowler = bowlerId ? dummyPlayers.find(p => p.id === bowlerId) : undefined;
    const fielder = fielderId ? dummyPlayers.find(p => p.id === fielderId) : undefined;

    if (!innings || !batsman || !dismissalType) {
      Alert.alert('Error', 'Selected innings, batsman, or dismissal type not found.');
      return;
    }

    const newFOW = {
      id: `fow${Date.now()}`,
      innings,
      wicketNumber: parseInt(wicketNumber),
      scoreAtFall: parseInt(scoreAtFall),
      overNumber: parseFloat(overNumber),
      batsman,
      bowler,
      fielder,
      dismissalType,
    };

    Alert.alert('Success', 'Fall of Wicket added successfully!', [
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

  const dismissalOptions = dismissalTypesForFOW.map(type => ({
    label: type,
    value: type,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Fall of Wicket</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentPadding}>
        <View style={styles.iconContainer}>
          <Ionicons name="exit" size={32} color="#3B82F6" />
        </View>
        <Text style={styles.screenTitle}>Wicket Details</Text>
        <Text style={styles.screenSubtitle}>Record details for a fallen wicket</Text>

        <Dropdown
          label="Select Innings *"
          value={selectedInningsId ? inningsOptions.find(opt => opt.value === selectedInningsId)?.label : ''}
          options={inningsOptions}
          onSelect={(item) => setSelectedInningsId(item.value)}
          showDropdown={showInningsDropdown}
          onToggle={() => setShowInningsDropdown(!showInningsDropdown)}
        />

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Wicket Number *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 1st, 2nd"
            keyboardType="numeric"
            value={wicketNumber}
            onChangeText={setWicketNumber}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Score at Fall *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 50"
            keyboardType="numeric"
            value={scoreAtFall}
            onChangeText={setScoreAtFall}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Over Number *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 5.3 (5 overs, 3 balls)"
            keyboardType="numeric"
            value={overNumber}
            onChangeText={setOverNumber}
          />
        </View>

        <Dropdown
          label="Batsman Out *"
          value={batsmanOutId ? playerOptions.find(opt => opt.value === batsmanOutId)?.label : ''}
          options={playerOptions}
          onSelect={(item) => setBatsmanOutId(item.value)}
          showDropdown={showBatsmanDropdown}
          onToggle={() => setShowBatsmanDropdown(!showBatsmanDropdown)}
        />

        <Dropdown
          label="Dismissal Type *"
          value={dismissalType || ''}
          options={dismissalOptions}
          onSelect={(item) => setDismissalType(item.value as DismissalType)}
          showDropdown={showDismissalDropdown}
          onToggle={() => setShowDismissalDropdown(!showDismissalDropdown)}
        />

        <Dropdown
          label="Bowler (Optional)"
          value={bowlerId ? playerOptions.find(opt => opt.value === bowlerId)?.label : ''}
          options={playerOptions}
          onSelect={(item) => setBowlerId(item.value)}
          showDropdown={showBowlerDropdown}
          onToggle={() => setShowBowlerDropdown(!showBowlerDropdown)}
        />

        <Dropdown
          label="Fielder (Optional)"
          value={fielderId ? playerOptions.find(opt => opt.value === fielderId)?.label : ''}
          options={playerOptions}
          onSelect={(item) => setFielderId(item.value)}
          showDropdown={showFielderDropdown}
          onToggle={() => setShowFielderDropdown(!showFielderDropdown)}
        />
      </ScrollView>

      <FloatingActionButton
        label="Add Fall of Wicket"
        iconName="add-circle-outline"
        onPress={handleAddFallOfWicket}
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