import ImagePickerButton from '@/components/ImagePickerButton';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from '@/components/ui/Header';
import { getFullStrapiUrl, sanitizeObject } from '@/lib/utils/common';
import { RootState } from '@/store';
import { showAlert } from '@/store/features/alerts/alertSlice';
import { useCreateCommunityMutation, useUpdateCommunityMutation } from '@/store/features/community/communityApi';
import { useGetPlayerByIdQuery } from '@/store/features/player/playerApi';
import { useUploadFileMutation } from '@/store/features/upload/uploadApi';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function RegisterCommentatorScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const navigation = useNavigation();

    const { data, isLoading: loading, refetch } = useGetPlayerByIdQuery(id!, {
        skip: !id,
    });
    const player = data?.data
    const dispatch = useDispatch();
    const [createCommunity, { isLoading, isError, error, isSuccess }] = useCreateCommunityMutation();
    const [updateCommunity, { isLoading: isUpdating }] = useUpdateCommunityMutation();
    const [uploadFile] = useUploadFileMutation();
    const profile = useSelector((state: RootState) => state.user.profile);

    const [formData, setFormData] = useState({
        photo: '',
        name: "",
        address: "",
        country: "",
        city: "",
        phone_number: '',
        player: player?.id,
        description: "",
        per_match_fees: "",
        per_day_fees: "",
        experience: "",
        community_type: "commentator"
    })

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id]);

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);


    const uploadImageAndGetId = async (): Promise<number | null> => {
        if (!formData.photo) return null;

        try {
            const imageId = await uploadFile({ image: formData.photo }).unwrap().then(res => res[0]?.id);
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
            imageId = await uploadImageAndGetId();
            if (!imageId) return;
        }

        const commentatorData = {
            ...cleanedData,
            ...(imageId && { photo: imageId }),
        };

        try {
            if (id)
                await updateCommunity({ id, data: commentatorData }).unwrap();
            else
                await createCommunity({ data: commentatorData }).unwrap();

            dispatch(showAlert({ type: 'success', message: id ? 'commentator updated successfully!' : 'commentator created successfully!' }));
            router.replace({
                pathname: '/commentators',
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <Header heading='Register Commentator' />
                {
                    loading ?
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color="#000" />
                        </View>
                        :
                        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}
                            contentContainerStyle={{ paddingBottom: 100 }}>
                            <View>
                                {/* Player Image Upload */}
                                <View style={{ alignItems: 'center' }}>
                                    <ImagePickerButton
                                        imageUri={player?.image ? getFullStrapiUrl(player?.image.url) : formData.photo}
                                        onChangeImage={(uri) => setFormData((prev) => ({ ...prev, photo: uri }))}
                                        title='Upload Photo'
                                    />
                                </View>
                                {/* Address */}
                                <FloatingLabelInputBorderBottom
                                    label="Scorer Name"
                                    value={formData.name}
                                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                                    required={true}
                                />
                                {/* Country */}
                                <FloatingLabelInputBorderBottom
                                    label="Country"
                                    value={formData.country}
                                    onChangeText={(text) => setFormData({ ...formData, country: text })}
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
                                        required={true}
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