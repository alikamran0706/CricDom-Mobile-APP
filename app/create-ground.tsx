import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from '@/components/ui/Header';
import { sanitizeObject } from '@/lib/utils/common';
import { RootState } from '@/store';
import { showAlert } from '@/store/features/alerts/alertSlice';
import { useCreateCommunityMutation, useUpdateCommunityMutation } from '@/store/features/community/communityApi';
import { useGetPlayerByIdQuery } from '@/store/features/player/playerApi';
import { useUploadFileMutation } from '@/store/features/upload/uploadApi';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
    const [createCommunity, { isLoading, isError, error, isSuccess }] = useCreateCommunityMutation();
    const [updateCommunity, { isLoading: isUpdating }] = useUpdateCommunityMutation();
    const [uploadFile] = useUploadFileMutation();
    const profile = useSelector((state: RootState) => state.user.profile);

    const [formData, setFormData] = useState({
        image: '',
        name: "",
        address: "",
        city: "",
        email: "",
        phone_number: '',
        description: "",
        shortest_length: "",
        longest_length: "",
        per_match_fees: "",
        per_day_fees: "",
        community_type: "ground",
        photo: "",
        pitch_types: {
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
            setFormData({ ...formData, photo: uri });
        }
    };

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
            if (!imageId) return; // Stop if upload failed 
        }

        const groundData = {
            ...cleanedData,
            ...(imageId && { photo: imageId }),
        };

        try {
            if (id)
                await updateCommunity({ id, data: groundData }).unwrap();
            else
                await createCommunity({ data: groundData }).unwrap();

            dispatch(showAlert({ type: 'success', message: id ? 'Ground updated successfully!' : 'Ground created successfully!' }));
            router.replace({
                pathname: '/grounds',
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
            pitch_types: {
                ...formData.pitch_types,
                [type]: !formData.pitch_types[type as keyof typeof formData.pitch_types],
            },
        });
    };

    const toggleFacilities = (type: string) => {
        setFormData({
            ...formData,
            facilities: {
                ...formData.facilities,
                [type]: !formData.facilities[type as keyof typeof formData.facilities],
            },
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <Header heading='Register your Ground' />
                {
                    loading ?
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color="#000" />
                        </View>
                        :
                        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}
                            contentContainerStyle={{ paddingBottom: 70 }}>
                            <View style={{ paddingVertical: 24 }}>

                                <View className="relative w-full items-start mb-8">
                                    <TouchableOpacity onPress={() => pickImage('photo')} className="w-full">
                                        <View className="w-full h-[180px] bg-gray-100 border-2 border-gray-200 rounded-lg overflow-hidden">
                                            {formData.photo ? (
                                                <Image
                                                    source={{ uri: formData.photo }}
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

                                {/* Address */}
                                <FloatingLabelInputBorderBottom
                                    label="Ground Name"
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
                                    keyboardType='numeric'
                                />
                                <FloatingLabelInputBorderBottom
                                    label="Email"
                                    value={formData.email}
                                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                                    multiline
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


                                {/* Boundary Length */}
                                <View className="mb-6">
                                    <Text className="text-base text-gray-600 mb-2">Boundary Length (meters)</Text>
                                    <View className="flex-row justify-between">
                                        <View className="w-[48%]">
                                            <FloatingLabelInputBorderBottom
                                                label="Shortest Length"
                                                value={formData.shortest_length}
                                                onChangeText={(text) => setFormData({ ...formData, shortest_length: text })}
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        <View className="w-[48%]">
                                            <FloatingLabelInputBorderBottom
                                                label="Longest Length"
                                                value={formData.longest_length}
                                                onChangeText={(text) => setFormData({ ...formData, longest_length: text })}
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
                                        {Object.entries(formData.pitch_types).map(([type, checked]) => (
                                            <TouchableOpacity
                                                key={type}
                                                className="flex-row items-center w-[45%] mb-3"
                                                onPress={() => togglePitchType(type)}
                                            >
                                                <View
                                                    className={`w-5 h-5 border-2 rounded justify-center items-center mr-2 ${checked ? "bg-[#0e7ccb] border-[#0e7ccb]" : "border-gray-300"
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
                                                onPress={() => toggleFacilities(type)}
                                            >
                                                <View
                                                    className={`w-5 h-5 border-2 rounded justify-center items-center mr-2 ${checked ? "bg-[#0e7ccb] border-[#0e7ccb]" : "border-gray-300"
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
                                            value={formData.per_match_fees}
                                            onChangeText={(text) => setFormData({ ...formData, per_match_fees: text })}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <View className="w-[48%]">
                                        <FloatingLabelInputBorderBottom
                                            label="Max Fees"
                                            value={formData.per_day_fees}
                                            onChangeText={(text) => setFormData({ ...formData, per_day_fees: text })}
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