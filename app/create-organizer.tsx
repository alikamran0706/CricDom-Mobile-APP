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
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function RegisterOrganizerScreen() {
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
        community_type: "organizer",
        youtubeLink: "",
        facebookLink: "",
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

    const handleCreateOrganizer = async () => {
        const cleanedData = sanitizeObject(formData);
        if (!cleanedData?.name?.trim()) {
            dispatch(
                showAlert({
                    type: 'error',
                    message: 'Please enter name',
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

        const organizerData = {
            ...cleanedData,
            ...(imageId && { photo: imageId }),
        };

        try {
            if (id)
                await updateCommunity({ id, data: organizerData }).unwrap();
            else
                await createCommunity({ data: organizerData }).unwrap();

            dispatch(showAlert({ type: 'success', message: id ? 'Organizers updated successfully!' : 'Organizers created successfully!' }));
            router.replace({
                pathname: '/organizers',
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
                <Header heading='Register Organizer' />
                {
                    loading ?
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color="#000" />
                        </View>
                        :
                        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}
                            contentContainerStyle={{ paddingBottom: 70 }}>
                            <View style={{ paddingBottom: 24 }}>
                                {/* Player Image Upload */}
                                <View style={{ alignItems: 'center' }}>
                                    <ImagePickerButton
                                        imageUri={player?.image ? getFullStrapiUrl(player?.image.url) : formData.photo}
                                        onChangeImage={(uri) => setFormData((prev) => ({ ...prev, photo: uri }))}
                                        title='Upload Photo'
                                    />
                                </View>
                                 {/* name */}
                                <FloatingLabelInputBorderBottom
                                    label="Organizer Name"
                                    value={formData.name}
                                    onChangeText={(text) => setFormData({ ...formData, name: text })}
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
                                <FloatingLabelInputBorderBottom
                                    label="Contact Number"
                                    value={formData.phone_number}
                                    onChangeText={(text) => setFormData({ ...formData, phone_number: text })}
                                    multiline
                                    numberOfLines={6}
                                    textAlignVertical="top"
                                />
                                <FloatingLabelInputBorderBottom
                                    label="Add more details"
                                    value={formData.description}
                                    onChangeText={(text) => setFormData({ ...formData, description: text })}
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
                    label={player ? "Update Organizer" : "Create Organizer"}
                    iconName="person-add"
                    onPress={handleCreateOrganizer}
                    loading={isLoading || isUpdating}
                    disabled={isLoading || isUpdating}
                />
            </View>
        </SafeAreaView>
    );
}