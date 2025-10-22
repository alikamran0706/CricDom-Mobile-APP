import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from '@/components/ui/Header';
import { sanitizeObject } from '@/lib/utils/common';
import { RootState } from '@/store';
import { showAlert } from '@/store/features/alerts/alertSlice';
import { useCreateCommunityMutation, useUpdateCommunityMutation } from '@/store/features/community/communityApi';
import { useUploadFileMutation } from '@/store/features/upload/uploadApi';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateLiveStreamScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const [createCommunity, { isLoading, isError, error, isSuccess }] = useCreateCommunityMutation();
       const [updateCommunity, { isLoading: isUpdating }] = useUpdateCommunityMutation();
    const [uploadFile] = useUploadFileMutation();
    const profile = useSelector((state: RootState) => state.user.profile);

    const [formData, setFormData] = useState({
        photo: '',
        media: '',
        name: "",
        address: "",
        country: "",
        city: "",
        phone_number: '',
        description: "",
        per_match_fees: "",
        per_day_fees: "",
        experience: "",
        community_type: "livestreamer"
    })

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);


    const uploadImageAndGetId = async (image: string): Promise<number | null> => {
        if (!formData.photo) return null;

        try {
            const imageId = await uploadFile({ image: image }).unwrap().then(res => res[0]?.id);
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
        if (cleanedData?.photo) {
            imageId = await uploadImageAndGetId(formData.photo);
            if (!imageId) return; 
        }

        let mediaId: number | null = null;
        if (cleanedData?.media) {
            mediaId = await uploadImageAndGetId(formData.media);
            if (!mediaId) return; 
        }

        const playerData = {
            ...cleanedData,
            ...(mediaId && { media: mediaId }),
            ...(imageId && { photo: imageId }),
        };

        try {
             if (id)
                await updateCommunity({ id, data: playerData }).unwrap();
            else
                await createCommunity({ data: playerData }).unwrap();

            dispatch(showAlert({ type: 'success', message: id ? 'Streamer updated successfully!' : 'Streamer created successfully!' }));
            router.replace({
                pathname: '/live-streamers',
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

    const pickImage = async (type: 'media' | 'photo') => {
        // Ask for permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            dispatch(showAlert({ type: 'error', message: 'Permission to access media library is required!' }));
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: type === 'media' ? [2, 1] : [1, 1],
            quality: 0.7,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            const uri = result.assets[0].uri;
            if (type === 'media') {
                setFormData({ ...formData, media: uri });
            } else {
                setFormData({ ...formData, photo: uri });
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <Header heading='Register Live Stream' />
                {
                    loading ?
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color="#000" />
                        </View>
                        :
                        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}
                            contentContainerStyle={{ paddingBottom: 100 }}>
                            <View>

                                <View className="relative w-full items-start mb-16">
                                    <TouchableOpacity onPress={() => pickImage('media')} className="w-full">
                                        <View className="w-full h-[180px] bg-gray-100 border-2 border-gray-200 rounded-lg overflow-hidden">
                                            {formData.media ? (
                                                <Image
                                                    source={{ uri: formData.media }}
                                                    style={{ width: '100%', height: '100%' }}
                                                    resizeMode="cover"
                                                />
                                            ) : (
                                                <View className="flex-1 items-center justify-center h-full">
                                                    <Ionicons name="image-outline" size={50} color="#999" />
                                                </View>
                                            )}
                                        </View>
                                        <View className="absolute -bottom-2 -right-2 bg-[#0e7ccb] w-6 h-6 rounded-full items-center justify-center">
                                            <Ionicons name="camera" size={16} color="white" />
                                        </View>
                                    </TouchableOpacity>
                                </View>


                                {/* Logo Upload */}
                                <View className="items-center pt-4">
                                    <TouchableOpacity onPress={() => pickImage('photo')}>
                                        <View className="relative mb-2">
                                            <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center border-2 border-gray-200 overflow-hidden">
                                                {formData.photo ? (
                                                    <Image source={{ uri: formData.photo }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                                                ) : (
                                                    <Ionicons name="business-outline" size={30} color="#999" />
                                                )}
                                            </View>
                                            <View className="absolute bottom-0 right-0 bg-[#0e7ccb] w-5 h-5 rounded-full items-center justify-center">
                                                <Ionicons name="camera" size={12} color="white" />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>


                                {/* Form Fields */}
                                <View className="px-4">
                                    {/* Input Group Template */}
                                    <FloatingLabelInputBorderBottom
                                        label="Streamer Name"
                                        value={formData.name}
                                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                                        required={true}
                                    />

                                    <FloatingLabelInputBorderBottom
                                        label="Address"
                                        value={formData.address}
                                        onChangeText={(text) => setFormData({ ...formData, address: text })}
                                        required={true}
                                    />

                                    {/* City */}
                                    <FloatingLabelInputBorderBottom
                                        label="City"
                                        value={formData.city}
                                        onChangeText={(text) => setFormData({ ...formData, city: text })}
                                        required={true}
                                    />
                                    <FloatingLabelInputBorderBottom
                                        label="Contact Number"
                                        value={formData.phone_number}
                                        onChangeText={(text) => setFormData({ ...formData, phone_number: text })}
                                        multiline
                                        numberOfLines={6}
                                        textAlignVertical="top"
                                    />
                                    {/* Fees */}
                                    <View className="flex-row justify-between mb-6">
                                        <View className="w-[48%]">

                                            <Text className="text-sm text-gray-600 mt-1 mb-2">Per match (20 Ov.)</Text>
                                            <FloatingLabelInputBorderBottom
                                                label="Fees"
                                                value={formData.per_match_fees}
                                                onChangeText={(text) => setFormData({ ...formData, per_match_fees: text })}
                                                 keyboardType='numeric'
                                            />
                                        </View>

                                        <View className="w-[48%]">
                                            <Text className="text-sm text-gray-600 mt-1 mb-2">Per day</Text>
                                            <FloatingLabelInputBorderBottom
                                                label="Fees"
                                                value={formData.per_day_fees}
                                                onChangeText={(text) => setFormData({ ...formData, per_day_fees: text })}
                                                keyboardType='numeric'
                                            />
                                        </View>
                                    </View>

                                    {/* Experience */}
                                    <View>
                                        <FloatingLabelInputBorderBottom
                                            label="Total experience (approx)"
                                            value={formData.experience}
                                            onChangeText={(text) => setFormData({ ...formData, experience: text })}
                                        />
                                    </View>

                                     <FloatingLabelInputBorderBottom
                                        label="Add more details"
                                        value={formData.description}
                                        onChangeText={(text) => setFormData({ ...formData, description: text })}
                                        multiline
                                        numberOfLines={6}
                                        textAlignVertical="top"
                                    />
                                </View>

                            </View>
                        </ScrollView>
                }

                {/* Floating Create Button */}
                <FloatingActionButton
                    label={'Save'}
                    iconName="person-add"
                    onPress={handleCreatePlayer}
                    loading={isLoading || isUpdating}
                    disabled={isLoading || isUpdating}
                />
            </View>
        </SafeAreaView>
    );
}