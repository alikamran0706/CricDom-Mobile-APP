import Modal from "@/components/ui/Modal";
import { getFullStrapiUrl } from "@/lib/utils/common";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";


interface ChangeModalProps {
    visible: boolean;
    onClose: () => void;
    selectedItem: any;
    setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
    data: any;
    heading: string
}

const ChangeModal = ({
    visible,
    onClose,
    selectedItem,
    setSelectedItem,
    data,
    heading
}: ChangeModalProps) => {

    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = data?.filter(
        (item: any) =>
            (item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderItem = ({ item }: { item: any }) => {
        console.log(item,'itemitem')

        return (
            <TouchableOpacity
                key={item.id}
                className={`flex-row items-center p-3 border rounded-xl mb-3 border-gray-200`}
                onPress={() => {
                    setSelectedItem(item)
                    // onClose()
                }}
            >
                <View className="relative mr-3">
                    <View className="relative w-12 h-12 rounded-full items-center justify-center overflow-hidden border border-gray-100">
                        {item.image ? (
                            <Image
                                source={{
                                    uri: getFullStrapiUrl(item.image.formats?.thumbnail?.url),
                                }}
                                className="w-full h-full"
                            />
                        ) : (
                            <Ionicons name="people" size={22} color="gray" />
                        )}
                    </View>
                    {selectedItem?.documentId === item.documentId && (
                        <View className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                            <Ionicons name="checkmark" size={14} color="white" />
                        </View>
                    )}
                </View>
                <Text className="text-base font-medium text-black">{item.name}</Text>
            </TouchableOpacity>
        )
    };

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            showCloseButton={false}
            customClass="h-full w-full z-50 bg-black/60 flex-1"
        >
            <View className="flex-1 bg-white rounded-t-3xl overflow-hidden">
                {/* Header */}
                <View className="flex-row justify-between items-center px-6 pt-4">
                    <Text className="text-lg font-semibold text-black">{heading}</Text>
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                        onPress={onClose}
                    >
                        <Ionicons name="close" size={24} color="#374151" />
                    </TouchableOpacity>
                </View>

                {/* Content Area */}
                <View className="flex-1 p-6">
                    {/* Search Bar */}
                    <View className="pb-6">
                        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-3">
                            <Ionicons name="search" size={20} color="#9CA3AF" />
                            <TextInput
                                className="flex-1 ml-2 text-base"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    </View>

                    {/* ✅ FlatList must take full space */}
                    <FlatList
                        data={filteredItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReachedThreshold={0.3}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 40 }}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default ChangeModal