import ImagePickerButton from "@/components/ImagePickerButton";
import Dropdown from "@/components/ui/Dropdown";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import { matchOptions } from "@/constants/league";
import { sanitizeObject } from "@/lib/utils/common";
import { RootState } from "@/store";
import { showAlert } from "@/store/features/alerts/alertSlice";
import { useCreateLeagueMutation } from "@/store/features/league/leagueApi";
import { useUploadFileMutation } from "@/store/features/upload/uploadApi";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function CreateLeague() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.profile);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showMatchDropdown, setShowMatchDropdown] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [createLeague, { isLoading, error: isError }] = useCreateLeagueMutation();
     const [uploadFile] = useUploadFileMutation();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        status_type: "",
        image: null,
        creator: user?.documentId,
    });

    const navigation = useNavigation();

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

    const handleSave = async () => {
        const cleanedData = sanitizeObject(formData);

        const { start_date, end_date } = cleanedData;

        // Validate date
        if (start_date && end_date && new Date(end_date) < new Date(start_date)) {
            dispatch(
                showAlert({
                    type: 'error',
                    message: 'End date must be greater than or equal to start date',
                })
            );
            return;
        }

        try {
            // Remove empty or null 

            let imageId: number | null = null;
            if (cleanedData?.image) {
                imageId = await uploadImageAndGetId();
                if (!imageId) return; // Stop if upload failed
            }

            const payload = { ...cleanedData, ...(imageId && { image: imageId }), };

            await createLeague({ data: payload }).unwrap();
            dispatch(showAlert({ type: 'success', message: true ? 'League updated successfully!' : 'League created successfully!' }));
            router.replace({
                pathname: '/leagues',
                params: { refetch: 'true' }
            });
        } catch (error: any) {
            dispatch(
                showAlert({
                    type: 'error',
                    message: error?.response?.data || error.message || isError || 'An unknown error occurred.',
                })
            );
        }
    };

    const updateFormData = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }
    const handleDateChange = (field: "start_date" | "end_date", event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        const formattedDate = currentDate.toISOString().split("T")[0]; // format: YYYY-MM-DD
        setFormData((prev) => ({ ...prev, [field]: formattedDate }));
        if (field === "start_date") setShowStartDatePicker(false);
        else setShowEndDatePicker(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                {/* Header */}
                <Header heading={'Create League'} />
                <ScrollView className="flex-1"
                    contentContainerStyle={{ paddingBottom: 70 }}
                >
                    {/* Profile Picture */}
                    <View className="items-center pt-4">
                        <ImagePickerButton
                            title='Upload League Logo'
                            imageUri={formData.image}
                            onChangeImage={(uri) => setFormData((prev: any) => ({ ...prev, image: uri }))}
                        />
                    </View>

                    {/* Form Fields */}
                    <View className="px-4 space-y-4">
                        <Input
                            label="Name"
                            value={formData.name}
                            onChangeText={updateFormData("name")}
                            placeholder="Enter your name"
                        />

                        <Input
                            label="Description"
                            value={formData.description}
                            onChangeText={updateFormData("description")}
                            placeholder="Enter your description"
                            multiline
                            numberOfLines={4}
                        />

                        <Dropdown
                            label="Select Match *"
                            value={formData.status_type}
                            options={matchOptions}
                            onSelect={(item) => {
                                updateFormData("status_type")(item.value);
                                setShowMatchDropdown(false);
                            }}
                            showDropdown={showMatchDropdown}
                            onToggle={() => setShowMatchDropdown(!showMatchDropdown)}
                        />

                        <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                            <Input
                                label="Start Date"
                                value={formData.start_date}
                                onChangeText={() => { }}
                                placeholder="Select start date"
                                editable={false}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                            <Input
                                label="End Date"
                                value={formData.end_date}
                                onChangeText={() => { }}
                                placeholder="Select end date"
                                editable={false}
                            />
                        </TouchableOpacity>

                    </View>
                </ScrollView>

                {showStartDatePicker && (
                    <DateTimePicker
                        value={formData.start_date ? new Date(formData.start_date) : new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, date) => handleDateChange("start_date", event, date)}
                    />
                )}

                {showEndDatePicker && (
                    <DateTimePicker
                        value={formData.end_date ? new Date(formData.end_date) : new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, date) => handleDateChange("end_date", event, date)}
                    />
                )}


                {/* Floating Add Player Button */}
                <FloatingActionButton
                    label={`Save`}
                    iconName="save"
                    onPress={handleSave}
                    loading={isLoading}
                    disabled={isLoading}
                />
            </View>
        </SafeAreaView>
    )
}
