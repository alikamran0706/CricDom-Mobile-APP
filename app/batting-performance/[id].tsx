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
    Switch,
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

const dismissalTypes: DismissalType[] = [
    'Not Out', 'Caught', 'Bowled', 'LBW', 'Run Out', 'Stumped', 'Hit Wicket',
    'Retired Hurt', 'Obstructing the field', 'Timed Out', 'Retired Out', 'Hit the ball twice'
];

export default function AddBattingPerformanceScreen() {
    const router = useRouter();
    const navigation = useNavigation();

    const [selectedInningsId, setSelectedInningsId] = useState<string | null>(null);
    const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
    const [runs, setRuns] = useState('');
    const [balls, setBalls] = useState('');
    const [fours, setFours] = useState('');
    const [sixes, setSixes] = useState('');
    const [dismissalType, setDismissalType] = useState<DismissalType>('Not Out');
    const [isNotOut, setIsNotOut] = useState(true);

    const [showInningsDropdown, setShowInningsDropdown] = useState(false);
    const [showPlayerDropdown, setShowPlayerDropdown] = useState(false);
    const [showDismissalDropdown, setShowDismissalDropdown] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleAddPerformance = () => {
        if (!selectedInningsId || !selectedPlayerId || !runs || !balls || !fours || !sixes) {
            Alert.alert('Error', 'Please fill all required fields.');
            return;
        }

        const innings = dummyInnings.find(i => i.id === selectedInningsId);
        const player = dummyPlayers.find(p => p.id === selectedPlayerId);

        if (!innings || !player) {
            Alert.alert('Error', 'Selected innings or player not found.');
            return;
        }

        const totalRuns = parseInt(runs);
        const totalBalls = parseInt(balls);
        const strikeRate = totalBalls > 0 ? (totalRuns / totalBalls) * 100 : 0;

        const newPerformance = {
            id: `bp${Date.now()}`,
            innings,
            player,
            runs: totalRuns,
            balls: totalBalls,
            fours: parseInt(fours),
            sixes: parseInt(sixes),
            dismissalType: isNotOut ? 'Not Out' : dismissalType,
            isNotOut,
            strikeRate: parseFloat(strikeRate.toFixed(2)),
        };

        Alert.alert('Success', 'Batting performance added successfully!', [
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
                <Text style={styles.headerTitle}>Add Batting Performance</Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.contentPadding}>
                <View style={styles.iconContainer}>
                    {/* <Ionicons name="cricket" size={32} color="#3B82F6" /> */}cricketicon
                </View>
                <Text style={styles.screenTitle}>Batting Details</Text>
                <Text style={styles.screenSubtitle}>Record a player's batting statistics</Text>

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
                    <Text style={styles.inputLabel}>Runs Scored *</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="e.g., 50"
                        keyboardType="numeric"
                        value={runs}
                        onChangeText={setRuns}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Balls Faced *</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="e.g., 35"
                        keyboardType="numeric"
                        value={balls}
                        onChangeText={setBalls}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Fours *</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="e.g., 4"
                        keyboardType="numeric"
                        value={fours}
                        onChangeText={setFours}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Sixes *</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="e.g., 2"
                        keyboardType="numeric"
                        value={sixes}
                        onChangeText={setSixes}
                    />
                </View>

                <View style={styles.switchGroup}>
                    <Text style={styles.inputLabel}>Not Out</Text>
                    <Switch
                        value={isNotOut}
                        onValueChange={(value) => {
                            setIsNotOut(value);
                            if (value) setDismissalType('Not Out');
                        }}
                        trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                        thumbColor={isNotOut ? '#FFFFFF' : '#9CA3AF'}
                    />
                </View>

                {!isNotOut && (
                    <Dropdown
                        label="Dismissal Type *"
                        value={dismissalType}
                        options={dismissalTypes
                            .filter((type) => type !== 'Not Out')
                            .map((type) => ({ label: type, value: type }))}
                        onSelect={(item) => setDismissalType(item.value as DismissalType)}
                        showDropdown={showDismissalDropdown}
                        onToggle={() => setShowDismissalDropdown(!showDismissalDropdown)}
                    />
                )}
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
    switchGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingVertical: 8,
    },
});