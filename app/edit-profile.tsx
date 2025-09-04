import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Input from "@/components/ui/Input";
import { RootState } from "@/store";
import { useUpdateUserByIdMutation } from "@/store/features/user/userApi";
import { setProfile } from "@/store/features/user/userSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';

export default function EditProfileScreen() {
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserByIdMutation();
    const dispatch = useDispatch();
    const router = useRouter();
    const profile = useSelector((state: RootState) => state.user.profile);
    const [formData, setFormData] = useState({
        username: profile?.username || "",
        email: profile?.email || "",
    });

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleSave = async () => {
        if (!profile?.id) return;

        try {
            const updatedUser = await updateUser({
                id: profile.id,
                data: formData,
            }).unwrap();

            // ✅ Update Redux state and AsyncStorage
            dispatch(setProfile(updatedUser));
            router.back();
        } catch (error) {
        }
    };

    const updateFormData = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center px-4 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text className="text-xl font-semibold ml-4">Edit Profile</Text>
                </View>

                <ScrollView className="flex-1 pt-4"
                    contentContainerStyle={{ paddingBottom: 70 }}
                >
                    {/* Form Fields */}
                    <View className="px-4 space-y-4">
                        <Input
                            label="User name"
                            value={formData.username}
                            onChangeText={updateFormData("username")}
                            placeholder="Enter your username"
                        />

                        <Input
                            label="Email"
                            value={formData.email}
                            onChangeText={updateFormData("email")}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                </ScrollView>

                {/* Floating Add Player Button */}
                <FloatingActionButton
                    label={`Update Changes`}
                    iconName="save"
                    onPress={handleSave}
                    loading={isUpdating}
                    disabled={isUpdating}
                />
            </View>
        </SafeAreaView>
    )
}
