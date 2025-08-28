import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Team {
  id: string;
  name: string;
  color: string;
}

const availableTeams: Team[] = [
  { id: '1', name: 'Mumbai Indians', color: '#004BA0' },
  { id: '2', name: 'Chennai Super Kings', color: '#FFFF3C' },
  { id: '3', name: 'Royal Challengers', color: '#EC1C24' },
  { id: '4', name: 'Kolkata Knight Riders', color: '#3A225D' },
  { id: '5', name: 'Delhi Capitals', color: '#004C93' },
];

const matchTypes = ['T20', 'ODI', 'Test Match', 'Practice Match'];
const venues = [
  'Wankhede Stadium',
  'Eden Gardens',
  'M. Chinnaswamy Stadium',
  'Feroz Shah Kotla',
  'Custom Location'
];

type TossDecision = 'bat' | 'bowl';

export default function CreateMatchScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    teamAId: '',
    teamBId: '',
    date: '',
    time: '',
    venue: '',
    matchType: '',
    oversLimit: '',
    description: '',
    result: '',
  });
  const [tossWinnerId, setTossWinnerId] = useState('');
  const [tossDecision, setTossDecision] = useState<TossDecision>('bat');

  const [showTeamADropdown, setShowTeamADropdown] = useState(false);
  const [showTeamBDropdown, setShowTeamBDropdown] = useState(false);
  const [showMatchTypeDropdown, setShowMatchTypeDropdown] = useState(false);
  const [showVenueDropdown, setShowVenueDropdown] = useState(false);
  const [showTossWinnerDropdown, setShowTossWinnerDropdown] = useState(false);
  const [showTossDecisionDropdown, setShowTossDecisionDropdown] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const selectTeam = (teamId: string, teamType: 'teamAId' | 'teamBId') => {
    setFormData(prev => ({
      ...prev,
      [teamType]: teamId
    }));
    setShowTeamADropdown(false);
    setShowTeamBDropdown(false);
  };

  const getTeamNameById = (id: string) =>
    availableTeams.find(t => t.id === id)?.name || '';

  const handleCreateMatch = () => {
    const {
      teamAId,
      teamBId,
      date,
      time,
      venue,
      matchType,
      oversLimit,
      description,
      result,
    } = formData;

    if (!teamAId || !teamBId) {
      Alert.alert('Error', 'Please select both teams');
      return;
    }
    if (teamAId === teamBId) {
      Alert.alert('Error', 'Please select different teams');
      return;
    }
    if (!date || !time || !venue || !matchType || !oversLimit) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const matchData = {
      teamAId,
      teamBId,
      tossWinnerId,
      tossDecision,
      date,
      time,
      venue,
      matchType,
      oversLimit: parseInt(oversLimit, 10),
      description,
      result,
    };

    console.log('Creating match:', matchData);
    Alert.alert('Success', 'Match created successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const TeamSelector = ({
    label,
    value,
    onPress,
    showDropdown,
    teamType
  }: {
    label: string;
    value: string;
    onPress: () => void;
    showDropdown: boolean;
    teamType: 'teamAId' | 'teamBId';
  }) => (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>
        {label} *
      </Text>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        onPress={onPress}
      >
        <Text style={{ fontSize: 16, color: value ? '#000' : '#9CA3AF' }}>
          {value ? getTeamNameById(value) : `Select ${label.toLowerCase()}`}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>
      {showDropdown && (
        <View style={{
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 8,
          marginTop: 4,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          {availableTeams
            .filter(t => t.id !== (teamType === 'teamAId' ? formData.teamBId : formData.teamAId))
            .map(team => (
              <TouchableOpacity
                key={team.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#F3F4F6'
                }}
                onPress={() => selectTeam(team.id, teamType)}
              >
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: team.color,
                    marginRight: 12
                  }}
                />
                <Text style={{ fontSize: 16 }}>{team.name}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      )}
    </View>
  );

  const Dropdown = ({
    label,
    value,
    options,
    onSelect,
    showDropdown,
    onToggle,
    required = false
  }: {
    label: string;
    value: string;
    options: { label: string; value: string }[];
    onSelect: (val: string) => void;
    showDropdown: boolean;
    onToggle: () => void;
    required?: boolean;
  }) => (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>
        {label} {required && '*'}
      </Text>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        onPress={onToggle}
      >
        <Text style={{ fontSize: 16, color: value ? '#000' : '#9CA3AF' }}>
          {value ? value : `Select ${label.toLowerCase()}`}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>
      {showDropdown && (
        <View style={{
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 8,
          marginTop: 4,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          {options.map(opt => (
            <TouchableOpacity
              key={opt.value}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#F3F4F6'
              }}
              onPress={() => {
                onSelect(opt.value);
                onToggle();
              }}
            >
              <Text style={{ fontSize: 16 }}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const tossOptions = [formData.teamAId, formData.teamBId]
    .filter(Boolean)
    .map(id => ({ label: getTeamNameById(id), value: id }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB'
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 16 }}>
            Create Match
          </Text>
        </View>
        <ScrollView
          style={{ flex: 1, paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={{ alignItems: 'center', paddingVertical: 24, marginBottom: 24 }}>
            <View style={{
              backgroundColor: '#EFF6FF',
              borderRadius: 32,
              padding: 16,
              marginBottom: 16
            }}>
              <Ionicons name="trophy" size={32} color="#3B82F6" />
            </View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>New Match</Text>
            <Text style={{ color: '#6B7280', marginTop: 4 }}>
              Create a new cricket match
            </Text>
          </View>

          <TeamSelector
            label="Team A"
            value={formData.teamAId}
            onPress={() => {
              setShowTeamADropdown(!showTeamADropdown);
              setShowTeamBDropdown(false);
            }}
            showDropdown={showTeamADropdown}
            teamType="teamAId"
          />

          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#9CA3AF' }}>
              VS
            </Text>
          </View>

          <TeamSelector
            label="Team B"
            value={formData.teamBId}
            onPress={() => {
              setShowTeamBDropdown(!showTeamBDropdown);
              setShowTeamADropdown(false);
            }}
            showDropdown={showTeamBDropdown}
            teamType="teamBId"
          />

          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Date *</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  fontSize: 16
                }}
                placeholder="DD/MM/YYYY"
                value={formData.date}
                onChangeText={date => setFormData(prev => ({ ...prev, date }))}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Time *</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  fontSize: 16
                }}
                placeholder="HH:MM AM/PM"
                value={formData.time}
                onChangeText={time => setFormData(prev => ({ ...prev, time }))}
              />
            </View>
          </View>

          <Dropdown
            label="Venue"
            value={formData.venue}
            options={venues.map(v => ({ label: v, value: v }))}
            onSelect={v => setFormData(prev => ({ ...prev, venue: v }))}
            showDropdown={showVenueDropdown}
            onToggle={() => {
              setShowVenueDropdown(!showVenueDropdown);
              setShowMatchTypeDropdown(false);
              setShowTossWinnerDropdown(false);
              setShowTossDecisionDropdown(false);
            }}
            required
          />

          <Dropdown
            label="Match Type"
            value={formData.matchType}
            options={matchTypes.map(v => ({ label: v, value: v }))}
            onSelect={v => setFormData(prev => ({ ...prev, matchType: v }))}
            showDropdown={showMatchTypeDropdown}
            onToggle={() => {
              setShowMatchTypeDropdown(!showMatchTypeDropdown);
              setShowVenueDropdown(false);
              setShowTossWinnerDropdown(false);
              setShowTossDecisionDropdown(false);
            }}
            required
          />

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Overs Limit *</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16
              }}
              placeholder="e.g., 20, 50"
              value={formData.oversLimit}
              onChangeText={oversLimit => setFormData(prev => ({ ...prev, oversLimit }))}
              keyboardType="numeric"
            />
          </View>

          {tossOptions.length === 2 && (
            <>
              <Dropdown
                label="Toss Winner"
                value={getTeamNameById(tossWinnerId)}
                options={tossOptions}
                onSelect={setTossWinnerId}
                showDropdown={showTossWinnerDropdown}
                onToggle={() => {
                  setShowTossWinnerDropdown(!showTossWinnerDropdown);
                  setShowTeamADropdown(false);
                  setShowTeamBDropdown(false);
                }}
              />
              <Dropdown
                label="Toss Decision"
                value={tossDecision}
                options={[
                  { label: 'Bat', value: 'bat' },
                  { label: 'Bowl', value: 'bowl' },
                ]}
                onSelect={v => setTossDecision(v as TossDecision)}
                showDropdown={showTossDecisionDropdown}
                onToggle={() => {
                  setShowTossDecisionDropdown(!showTossDecisionDropdown);
                  setShowTeamADropdown(false);
                  setShowTeamBDropdown(false);
                }}
              />
            </>
          )}

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Result (Optional)</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16
              }}
              placeholder="e.g., Team A won by 5 wickets"
              value={formData.result}
              onChangeText={result => setFormData(prev => ({ ...prev, result }))}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Description (Optional)</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
                height: 80,
                textAlignVertical: 'top'
              }}
              placeholder="Add match description or notes"
              value={formData.description}
              onChangeText={description => setFormData(prev => ({ ...prev, description }))}
              multiline
              numberOfLines={3}
            />
          </View>
        </ScrollView>
        <FloatingActionButton
          label="Create Match"
          iconName="calendar-outline"
          onPress={handleCreateMatch}
        />
      </View>
    </SafeAreaView>
  );
}
