import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from '@/components/ui/Header';
import { sanitizeObject } from '@/lib/utils/common';
import { RootState } from '@/store';
import { showAlert } from '@/store/features/alerts/alertSlice';
import { useCreatePlayerMutation, useUpdatePlayerMutation } from '@/store/features/player/playerApi';
import { useUploadFileMutation } from '@/store/features/upload/uploadApi';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateLiveStreamScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();

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
                                <View className="items-center py-6">
                                    <View className="relative mb-2">
                                        <View className="w-[200px] h-[100px] bg-gray-100 items-center justify-center border-2 border-gray-200 rounded-lg">
                                            <Ionicons name="image-outline" size={40} color="#999" />
                                        </View>
                                        <View className="absolute -bottom-2 -right-2 bg-[#0e7ccb] w-6 h-6 rounded-full items-center justify-center">
                                            <Ionicons name="camera" size={16} color="white" />
                                        </View>
                                    </View>
                                    <Text className="text-gray-700 text-sm">Add Banner</Text>
                                </View>

                                {/* Logo Upload */}
                                <View className="items-center pb-6">
                                    <View className="relative mb-2">
                                        <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center border-2 border-gray-200">
                                            <Ionicons name="business-outline" size={30} color="#999" />
                                        </View>
                                        <View className="absolute bottom-0 right-0 bg-[#0e7ccb] w-5 h-5 rounded-full items-center justify-center">
                                            <Ionicons name="camera" size={12} color="white" />
                                        </View>
                                    </View>
                                    <Text className="text-gray-700 text-sm">Add Logo</Text>
                                </View>


                                {/* Form Fields */}
                                <View className="px-4">
                                    {/* Input Group Template */}
                                    <FloatingLabelInputBorderBottom
                                        label="Company Name"
                                        value={formData.city}
                                        onChangeText={(text) => setFormData({ ...formData, city: text })}
                                        required={true}
                                    />

                                    <FloatingLabelInputBorderBottom
                                        label="Address"
                                        value={formData.city}
                                        onChangeText={(text) => setFormData({ ...formData, city: text })}
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

                                            <Text className="text-sm text-gray-600 mt-1 mb-2">Per match (20 Ov.)</Text>
                                            <FloatingLabelInputBorderBottom
                                                label="Fees"
                                                value={formData.feesPerMatch}
                                                onChangeText={(text) => setFormData({ ...formData, feesPerMatch: text })}
                                                required={true}
                                            />
                                        </View>

                                        <View className="w-[48%]">
                                            <Text className="text-sm text-gray-600 mt-1 mb-2">Per day</Text>
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