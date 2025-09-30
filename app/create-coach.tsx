import ImagePickerButton from '@/components/ImagePickerButton';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from '@/components/ui/Header';
import { getFullStrapiUrl, sanitizeObject } from '@/lib/utils/common';
import { RootState } from '@/store';
import { showAlert } from '@/store/features/alerts/alertSlice';
import { useCreatePlayerMutation, useGetPlayerByIdQuery, useUpdatePlayerMutation } from '@/store/features/player/playerApi';
import { useUploadFileMutation } from '@/store/features/upload/uploadApi';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
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
        companyName: '',
        address: '',
        city: '',
        contactNumber: '',
        youtubeLink: '',
        facebookLink: '',
        serviceDetails: '',
    });

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id]);

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);


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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <Header heading='Register Personal Coaching' />
                
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
                                <View style={{ alignItems: 'center', }}>
                                    <ImagePickerButton
                                        imageUri={player?.image ? getFullStrapiUrl(player?.image.url) : formData.image}
                                        onChangeImage={(uri) => setFormData((prev) => ({ ...prev, image: uri }))}
                                        title='Upload Photo'
                                    />
                                </View>
                                {/* Ground Name */}
                                <FloatingLabelInputBorderBottom
                                    label="Company Name"
                                    value={formData.companyName}
                                    onChangeText={(text) => setFormData({ ...formData, companyName: text })}
                                    required={true}
                                />
                                {/* Address */}
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
                                {/* Contact Person Name */}
                                <FloatingLabelInputBorderBottom
                                    label="Contact Person Name"
                                    value={formData.contactNumber}
                                    onChangeText={(text) => setFormData({ ...formData, contactNumber: text })}
                                    required={true}
                                />
                                <FloatingLabelInputBorderBottom
                                    label="Contact Number"
                                    value={formData.contactNumber}
                                    onChangeText={(text) => setFormData({ ...formData, contactNumber: text })}
                                    multiline
                                    numberOfLines={6}
                                    textAlignVertical="top"
                                />
                                <FloatingLabelInputBorderBottom
                                    label="Add more details"
                                    value={formData.serviceDetails}
                                    onChangeText={(text) => setFormData({ ...formData, serviceDetails: text })}
                                    multiline
                                    numberOfLines={6}
                                    textAlignVertical="top"
                                />
                                <FloatingLabelInputBorderBottom
                                    label="YouTube Channel Link"
                                    value={formData.youtubeLink}
                                    onChangeText={(text) => setFormData({ ...formData, youtubeLink: text })}
                                />
                                <FloatingLabelInputBorderBottom
                                    label="Facebook Page Link"
                                    value={formData.facebookLink}
                                    onChangeText={(text) => setFormData({ ...formData, facebookLink: text })}
                                />
                            </View>
                        </ScrollView>
                }

                {/* Floating Create Button */}
                <FloatingActionButton
                    label={player ? "Update Coach" : "Create Coach"}
                    iconName="person-add"
                    onPress={handleCreatePlayer}
                    loading={isLoading || isUpdating}
                    disabled={isLoading || isUpdating}
                />
            </View>
        </SafeAreaView>
    );
}