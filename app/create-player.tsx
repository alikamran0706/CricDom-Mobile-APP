import ImagePickerButton from '@/components/ImagePickerButton';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import Input from '@/components/ui/Input';
import { battingStyles, bowlingStyles, gameTypes, positions } from '@/constants/player';
import { getFullStrapiUrl, sanitizeObject } from '@/lib/utils/common';
import { RootState } from '@/store';
import { showAlert } from '@/store/features/alerts/alertSlice';
import { useCreatePlayerMutation, useGetPlayerByIdQuery, useUpdatePlayerMutation } from '@/store/features/player/playerApi';
import { useUploadFileMutation } from '@/store/features/upload/uploadApi';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function CreatePlayerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const navigation = useNavigation();

  const { data, isLoading: loading, refetch } = useGetPlayerByIdQuery(id!, {
    skip: !id,
  });
  const player = data?.data
  const dispatch = useDispatch();
  const [createPlayer, { isLoading, isError, error, isSuccess }] = useCreatePlayerMutation();
  const [updatePlayer, { isLoading: isUpdating }] = useUpdatePlayerMutation();
  const [uploadFile] = useUploadFileMutation();
  const profile = useSelector((state: RootState) => state.user.profile);

  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    image: null as string | null,

    batting_style: '',
    bowling_style: '',
    position: '',
    game_type: '',
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  const [showBattingDropdown, setShowBattingDropdown] = useState(false);
  const [showBowlingDropdown, setShowBowlingDropdown] = useState(false);
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showGameTypeDropdown, setShowGameTypeDropdown] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (player) {
      setFormData({
        name: player.name || '',
        phone_number: player.phone_number || '',
        image: null, // Assuming you let user upload new image, or populate existing later
        batting_style: player.batting_style || '',
        bowling_style: player.bowling_style || '',
        position: player.position || '',
        game_type: player.game_type || '',
      });
    }
  }, [player]);

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

  const handleCreatePlayer = async () => {
    const cleanedData = sanitizeObject(formData);
    if (!cleanedData?.name?.trim()) {
      dispatch(
        showAlert({
          type: 'error',
          message: 'Please enter player name',
        })
      );
      return;
    }

    if (!cleanedData?.phone_number?.trim()) {
      dispatch(
        showAlert({
          type: 'error',
          message: 'Please enter phone number',
        })
      );
      return;
    }

    let imageId: number | null = null;
    if (cleanedData?.image) {
      imageId = await uploadImageAndGetId();
      if (!imageId) return; // Stop if upload failed
    }

    const playerData = {
      ...cleanedData,
      ...(imageId && { image: imageId }),
      ...(profile && { user: profile.documentId }),
    };

    try {
      if (id)
        await updatePlayer({ id, data: playerData }).unwrap();
      else
        await createPlayer({ data: playerData }).unwrap();

      dispatch(showAlert({ type: 'success', message: id ? 'Player updated successfully!' : 'Player created successfully!' }));
      router.replace({
        pathname: '/profile',
        params: { refetch: 'true' }
      });
    }
    catch (error: any) {

      dispatch(
        showAlert({
          type: 'error',
          message: error?.response?.data || error.message || isError || 'An unknown error occurred.',
        })
      );

    }
  };

  const Dropdown = ({
    label,
    value,
    options,
    onSelect,
    showDropdown,
    onToggle,
    required = false,
  }: {
    label: string;
    value: string;
    options: string[];
    onSelect: (value: any) => void;
    showDropdown: boolean;
    required?: boolean;
    onToggle: () => void;
  }) => (
    <View style={{ marginBottom: 16 }}>
      <Text className="text-base font-medium text-gray-800 mb-2">
        {label}
        {required && <Text className="text-red-600"> *</Text>}
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
          {value || `Select ${label.toLowerCase()}`}
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
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#F3F4F6'
              }}
              onPress={() => {
                onSelect(option);
                onToggle();
              }}
            >
              <Text style={{ fontSize: 16, color: '#000' }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
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
          <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 16 }}>
            Create Player
          </Text>
        </View>
        {
          loading ?
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#000" />
            </View>
            :
            <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}
              contentContainerStyle={{ paddingBottom: 70 }}>
              <View style={{ paddingVertical: 24 }}>
                {/* Player Image Upload */}
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                  <ImagePickerButton
                    imageUri={player?.image ? getFullStrapiUrl(player?.image.url) : formData.image}
                    onChangeImage={(uri) => setFormData((prev) => ({ ...prev, image: uri }))}
                  />
                </View>

                {/* Player Name */}
                <Input
                  label="Player Name"
                  value={formData.name}
                  onChangeText={(name) => setFormData(prev => ({ ...prev, name }))}
                  placeholder="Enter player name"
                  required={true}
                />

                {/* Phone Number */}
                <Input
                  label="Phone Number"
                  value={formData.phone_number}
                  onChangeText={(phone_number) => setFormData(prev => ({ ...prev, phone_number }))}
                  placeholder="Enter phone number"
                  required={true}
                  keyboardType="phone-pad"
                />

                {/* Position */}
                <Dropdown
                  label="Position"
                  value={formData.position}
                  options={positions}
                  onSelect={(value) => setFormData(prev => ({ ...prev, position: value }))}
                  showDropdown={showPositionDropdown}
                  onToggle={() => {
                    setShowPositionDropdown(!showPositionDropdown);
                    setShowBattingDropdown(false);
                    setShowBowlingDropdown(false);
                    setShowGameTypeDropdown(false);
                  }}
                />

                {/* Batting Style */}
                <Dropdown
                  label="Batting Style"
                  value={formData.batting_style}
                  options={battingStyles}
                  onSelect={(value) => setFormData(prev => ({ ...prev, batting_style: value }))}
                  showDropdown={showBattingDropdown}
                  onToggle={() => {
                    setShowBattingDropdown(!showBattingDropdown);
                    setShowPositionDropdown(false);
                    setShowBowlingDropdown(false);
                    setShowGameTypeDropdown(false);
                  }}
                />

                {/* Bowling Style */}
                <Dropdown
                  label="Bowling Style"
                  value={formData.bowling_style}
                  options={bowlingStyles}
                  onSelect={(value) => setFormData(prev => ({ ...prev, bowling_style: value }))}
                  showDropdown={showBowlingDropdown}
                  onToggle={() => {
                    setShowBowlingDropdown(!showBowlingDropdown);
                    setShowPositionDropdown(false);
                    setShowBattingDropdown(false);
                    setShowGameTypeDropdown(false);
                  }}
                />

                {/* Game Type */}
                <Dropdown
                  label="Game Type"
                  value={formData.game_type}
                  options={gameTypes}
                  onSelect={(value) => setFormData(prev => ({ ...prev, game_type: value }))}
                  showDropdown={showGameTypeDropdown}
                  onToggle={() => {
                    setShowGameTypeDropdown(!showGameTypeDropdown);
                    setShowPositionDropdown(false);
                    setShowBattingDropdown(false);
                    setShowBowlingDropdown(false);
                  }}
                />
              </View>
            </ScrollView>
        }

        {/* Floating Create Button */}
        <FloatingActionButton
          label={player ? "Update Player" : "Create Player"}
          iconName="person-add"
          onPress={handleCreatePlayer}
          loading={isLoading || isUpdating}
          disabled={isLoading || isUpdating}
        />
      </View>
    </SafeAreaView>
  );
}