import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import { sanitizeObject } from '@/lib/utils/common';
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

export default function RegisterGroundScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const navigation = useNavigation();

    const { data, isLoading: loading, refetch } = useGetPlayerByIdQuery(id!, {
        skip: !id,
    });
    const dispatch = useDispatch();
    const [createPlayer, { isLoading, isError, error, isSuccess }] = useCreatePlayerMutation();
    const [updatePlayer, { isLoading: isUpdating }] = useUpdatePlayerMutation();
    const [uploadFile] = useUploadFileMutation();
    const profile = useSelector((state: RootState) => state.user.profile);

    const [formData, setFormData] = useState({
        image: '',
        groundName: "",
        address: "",
        city: "",
        email: "",
        phone_number: '',
        contactPersonName: "Ali Kamran",
        contactNumber: "",
        serviceDetails: "",
        shortestLength: "",
        longestLength: "",
        minFee: "",
        maxFee: "",
        pitchTypes: {
            turf: false,
            mud: false,
            cement: false,
            astroturf: false,
            matting: false,
        },
        facilities: {
            umpires: false,
            scorers: false,
            ['drinking water']: false,
            balls: false,
            washrooms: false,
            others: false,
        },
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
        if (!cleanedData?.groundName?.trim()) {
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

    const togglePitchType = (type: string) => {
        setFormData({
            ...formData,
            pitchTypes: {
                ...formData.pitchTypes,
                [type]: !formData.pitchTypes[type as keyof typeof formData.pitchTypes],
            },
        });
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
                        Register your Ground
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
                                {/* Address */}
                                <FloatingLabelInputBorderBottom
                                    label="Ground Name"
                                    value={formData.groundName}
                                    onChangeText={(text) => setFormData({ ...formData, groundName: text })}
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
                                    label="Email"
                                    value={formData.email}
                                    onChangeText={(text) => setFormData({ ...formData, email: text })}
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


                                {/* Boundary Length */}
                                <View className="mb-6">
                                    <Text className="text-base text-gray-600 mb-2">Boundary Length (meters)</Text>
                                    <View className="flex-row justify-between">
                                        <View className="w-[48%]">
                                            <FloatingLabelInputBorderBottom
                                                label="Shortest Length"
                                                value={formData.shortestLength}
                                                onChangeText={(text) => setFormData({ ...formData, shortestLength: text })}
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        <View className="w-[48%]">
                                            <FloatingLabelInputBorderBottom
                                                label="Longest Length"
                                                value={formData.longestLength}
                                                onChangeText={(text) => setFormData({ ...formData, longestLength: text })}
                                                keyboardType="numeric"
                                            />
                                        </View>
                                    </View>
                                </View>

                                {/* Pitch Types */}
                                <View className="mb-6">
                                    <Text className="text-base text-gray-600 mb-2">
                                        Available Pitch Type(s)<Text className="text-red-700">*</Text>
                                    </Text>
                                    <View className="flex-row flex-wrap justify-between gap-4">
                                        {Object.entries(formData.pitchTypes).map(([type, checked]) => (
                                            <TouchableOpacity
                                                key={type}
                                                className="flex-row items-center w-[45%] mb-3"
                                                onPress={() => togglePitchType(type)}
                                            >
                                                <View
                                                    className={`w-5 h-5 border-2 rounded justify-center items-center mr-2 ${checked ? "bg-teal-500 border-teal-500" : "border-gray-300"
                                                        }`}
                                                >
                                                    {checked && <Ionicons name="checkmark" size={16} color="white" />}
                                                </View>
                                                <Text className="text-base text-gray-800">
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {/* Facilities (Placeholder) */}
                                <View className="mb-6">
                                    <Text className="text-base text-gray-600 mb-2">
                                        Facilities<Text className="text-red-700">*</Text>
                                    </Text>
                                    <View className="flex-row flex-wrap justify-between gap-4">
                                        {Object.entries(formData.facilities).map(([type, checked]) => (
                                            <TouchableOpacity
                                                key={type}
                                                className="flex-row items-center w-[45%] mb-3"
                                                onPress={() => togglePitchType(type)}
                                            >
                                                <View
                                                    className={`w-5 h-5 border-2 rounded justify-center items-center mr-2 ${checked ? "bg-teal-500 border-teal-500" : "border-gray-300"
                                                        }`}
                                                >
                                                    {checked && <Ionicons name="checkmark" size={16} color="white" />}
                                                </View>
                                                <Text className="text-base text-gray-800">
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                <Text className="text-base text-gray-600 mb-2">Fees Range(PKR)*</Text>
                                <View className="flex flex-row justify-between mb-6 gap-x-4 w-full">
                                    <View className="w-[48%]">
                                        <FloatingLabelInputBorderBottom
                                            label="Min Fees"
                                            value={formData.minFee}
                                            onChangeText={(text) => setFormData({ ...formData, shortestLength: text })}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                     <View className="w-[48%]">
                                        <FloatingLabelInputBorderBottom
                                            label="Max Fees"
                                            value={formData.maxFee}
                                            onChangeText={(text) => setFormData({ ...formData, shortestLength: text })}
                                            keyboardType="numeric"
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