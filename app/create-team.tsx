import ImagePickerButton from '@/components/ImagePickerButton';
import AddPlayersModal from '@/components/Modal/AddPlayersModal';
import Dropdown from '@/components/ui/Dropdown';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import Input from '@/components/ui/Input';
import { gameTypeOptions } from '@/constants/team';
import { sanitizeObject } from '@/lib/utils/common';
import { RootState } from '@/store';
import { showAlert } from '@/store/features/alerts/alertSlice';
import { useCreateTeamMutation } from '@/store/features/team/teamApi';
import { useUploadFileMutation } from '@/store/features/upload/uploadApi';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

interface Player {
  id: string;
  name: string;
  position: 'Batsman' | 'Bowler' | 'All-Rounder';
  avatar: string;
  selected: boolean;
  batting_style: 'RightHanded' | 'LeftHanded';
  bowling_style: 'Fast' | 'OffSpin' | 'LegSpin' | 'Medium';
  phone_number: string;
  game_type: 'Leather ball' | 'Tape ball';
  documentId: string;
}

export default function CreateTeamScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const user = useSelector((state: RootState) => state.user.profile);

  const params = useLocalSearchParams();
  const teamParam = params?.team;

  // Ensure it's a string before trying to parse
  const team: any = typeof teamParam === 'string' ? JSON.parse(teamParam) : null;

  const dispatch = useDispatch();
  const [isPrivate, setIsPrivate] = useState(false);
  const [showAddPlayersModal, setShowAddPlayersModal] = useState(false);
  const [showGameTypeDropdown, setShowGameTypeDropdown] = useState(false);
  const [createTeam, { isLoading, error: isError }] = useCreateTeamMutation();
  const [uploadFile] = useUploadFileMutation();
  const [players, setPlayers] = useState<Player[]>(
    team?.players?.map((p: any) => ({
      id: p.id.toString(),
      documentId: p.documentId,
      name: p.name,
      position: p.position,
      bowling_style: p.bowling_style,
      batting_style: p.batting_style,
      avatar: p.image?.url || "",
      selected: true
    })) || []
  );

  const [formData, setFormData] = useState({
    name: team?.name || "",
    description: team?.description || "",
    country: team?.country || "",
    game_type: team?.game_type || "",
    // players: [],
    visibility: team?.visibility || true,
    owner: user?.documentId,
    image: "",
  });

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const updateFormData = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const togglePlayer = (playerId: string) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === playerId
          ? { ...player, selected: !player.selected }
          : player
      )
    );
  };

  const handleAddPlayers = (newPlayers: any[]) => {
    const formattedPlayers = newPlayers.map((player) => ({
      ...player,
      selected: true,
    }));
    setPlayers((prev: Player[]) => [...prev, ...formattedPlayers]);
  };

  const uploadImageAndGetId = async (): Promise<number | null> => {
    if (!formData.image) return null;

    try {
      const imageId = await uploadFile({ image: formData.image }).unwrap().then(res => res[0]?.id);
      return imageId;
    } catch (uploadError) {
      dispatch(
        showAlert({
          type: 'error',
          message: 'Could not upload the image.',
        })
      );
      return null;
    }
  };

  const handleCreateTeam = async () => {

    const cleanedData = sanitizeObject(formData);

    const playerDocumentIds = players.map((player: Player) => player.documentId);

    if (!cleanedData?.name?.trim()) {
      dispatch(
        showAlert({
          type: 'error',
          message: 'Please enter team name',
        })
      );
      return;
    }

    let imageId: number | null = null;
    if (cleanedData?.image) {
      imageId = await uploadImageAndGetId();
      if (!imageId) return; // Stop if upload failed
    }


    try {

      const payload = { ...cleanedData, ...(imageId && { image: imageId }), ...(playerDocumentIds?.length > 0 && { players: playerDocumentIds }) };

      await createTeam({ data: payload }).unwrap();
      dispatch(showAlert({ type: 'success', message: true ? 'Team updated successfully!' : 'Team created successfully!' }));

      router.replace({
        pathname: '/teams',
        params: { refetch: 'true' }
      });
    } catch (error: any) {

      // Directly access error fields assuming `error` is the response itself
      const errors = error?.data?.error?.details?.errors;

      let message = error?.data?.error?.message || error?.message || 'An unknown error occurred.';

      if (errors && errors.length > 0) {
        message = errors
          .map((err: any) => `${err.path?.[0]}: ${err.message}`)
          .join(' | ');
      }

      dispatch(
        showAlert({
          type: 'error',
          message: message,
        })
      );
    }



  };

  const selectedPlayersCount = players.filter((p: Player) => p.selected).length;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          {/* Header */}
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
            <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 16, color: '#000' }}>
              {team ? "Update Team" : 'Create Team'}
            </Text>
          </View>

          <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}
            contentContainerStyle={{ paddingBottom: 70 }}
          >
            <View style={{ paddingVertical: 24 }}>
              {/* Team Image Upload */}
              <View style={{ alignItems: 'center', marginBottom: 24 }}>
                <ImagePickerButton
                  title={team?.image ? 'Update Team Logo' :'Upload Team Logo'}
                  imageUri={formData.image || team?.image?.formats?.thumbnail?.url}
                  onChangeImage={(uri) => setFormData((prev) => ({ ...prev, image: uri }))}
                />
              </View>

              {/* Team Name */}
              <Input
                label="Team Name"
                value={formData.name}
                onChangeText={updateFormData("name")}
                placeholder="Enter team name"
              />

              {/* Team Description */}
              <Input
                label="Description"
                value={formData.description}
                onChangeText={updateFormData("description")}
                placeholder="Add team description or notes"
                multiline
                numberOfLines={4}
              />

              {/* Privacy Setting */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
                paddingVertical: 8
              }}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: '500', color: '#000' }}>
                    Private Team
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6B7280' }}>
                    Only invited players can join
                  </Text>
                </View>
                <Switch
                  value={formData.visibility}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, visibility: value }));
                  }}
                  trackColor={{ false: '#E5E7EB', true: '#0e7ccb' }}
                  thumbColor={isPrivate ? '#FFFFFF' : '#9CA3AF'}
                />
              </View>

              {/* Game Type */}


              <Dropdown
                label=" Game Type"
                value={formData.game_type}
                options={gameTypeOptions}
                onSelect={(data) => {
                  setFormData(prev => ({ ...prev, game_type: data.value }));
                  setShowGameTypeDropdown(!showGameTypeDropdown);
                }}
                showDropdown={showGameTypeDropdown}
                onToggle={() => {
                  setShowGameTypeDropdown(!showGameTypeDropdown);
                }}
              />

              {/* Players Section */}
              <View style={{ marginBottom: 24 }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16
                }}>
                  <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>
                    Team Players ({selectedPlayersCount}/15)
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#0e7ccb',
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                    onPress={() => setShowAddPlayersModal(true)}
                  >
                    <Ionicons name="person-add" size={16} color="white" />
                    <Text style={{ color: 'white', fontWeight: '500', marginLeft: 4 }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ gap: 12 }}>
                  {players.map((player: Player) => (
                    <Pressable
                      key={player.id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 12,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: player.selected ? '#0e7ccb' : '#E5E7EB',
                        backgroundColor: player.selected ? '#EFF6FF' : 'white'
                      }}
                      onPress={() => togglePlayer(player.id)}
                    >
                      <Image
                        source={{ uri: player.avatar }}
                        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={{
                          fontWeight: '500',
                          color: player.selected ? '#0e7ccb' : '#1F2937'
                        }}>
                          {player.name}
                        </Text>
                        <Text style={{
                          fontSize: 12,
                          color: player.selected ? '#0e7ccb' : '#6B7280'
                        }}>
                          {player.position} • {player.batting_style} • {player.bowling_style}
                        </Text>
                      </View>
                      <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: player.selected ? '#0e7ccb' : '#D1D5DB',
                        backgroundColor: player.selected ? '#0e7ccb' : 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {player.selected && (
                          <Ionicons name="checkmark" size={12} color="white" />
                        )}
                      </View>
                    </Pressable>
                  ))}
                </View>

                {players.length === 0 && (
                  <View style={{ alignItems: 'center', paddingVertical: 32 }}>
                    <Ionicons name="people-outline" size={48} color="#9CA3AF" />
                    <Text style={{ color: '#6B7280', marginTop: 8 }}>
                      No players added yet
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#0e7ccb',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 8,
                        marginTop: 12
                      }}
                      onPress={() => setShowAddPlayersModal(true)}
                    >
                      <Text style={{ color: 'white', fontWeight: '500' }}>
                        Add Players
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          {/* Floating Create Button */}
          <FloatingActionButton
            label={team ? "Update" : "Create"}
            iconName="checkmark"
            onPress={handleCreateTeam}
            loading={isLoading}
            disabled={isLoading}
          />

          {/* Add Players Modal */}
          <AddPlayersModal
            visible={showAddPlayersModal}
            onClose={() => setShowAddPlayersModal(false)}
            onAddPlayers={handleAddPlayers}
            existingPlayerIds={players.map((p: Player) => p.documentId)}
          // visible={true}
          />
        </View>
      </SafeAreaView>
    </>
  );
}