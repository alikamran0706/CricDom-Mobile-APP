import ImagePickerButton from '@/components/ImagePickerButton';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
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

export default function RegisterScorerScreen() {
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
        image: '',
        name: "",
        address: "",
        city: "",
        phone_number: '',
        contactPersonName: "Ali Kamran",
        contactNumber: "",
        serviceDetails: "",
        feesPerMatch: "",
        feesPerDay: "",
        experience: "",
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
                <View className="flex-row items-center px-4 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-xl font-semibold ml-4 text-black">
                        Register Scorer
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
                                {/* City */}
                                <FloatingLabelInputBorderBottom
                                    label="City"
                                    value={formData.city}
                                    onChangeText={(text) => setFormData({ ...formData, city: text })}
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


                                {/* Fees */}
                                <View className="flex-row justify-between mb-6">
                                    <View className="w-[48%]">

                                        <Text className="text-sm text-gray-600 mt-1">Per match (20 Ov.)</Text>
                                        <FloatingLabelInputBorderBottom
                                            label="Fees"
                                            value={formData.feesPerMatch}
                                            onChangeText={(text) => setFormData({ ...formData, feesPerMatch: text })}
                                            required={true}
                                        />
                                    </View>

                                    <View className="w-[48%]">
                                        <Text className="text-sm text-gray-600 mt-1">Per day</Text>
                                        <FloatingLabelInputBorderBottom
                                            label="Fees"
                                            value={formData.feesPerDay}
                                            onChangeText={(text) => setFormData({ ...formData, feesPerDay: text })}
                                            required={true}
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