import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function EllipsisDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View className="relative">
      {/* Trigger button */}
      <TouchableOpacity
        className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Ionicons name="ellipsis-horizontal" size={20} color="#374151" />
      </TouchableOpacity>

      {/* Dropdown menu */}
      {showDropdown && (
        <View className="absolute top-14 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-2 space-y-2">
          <TouchableOpacity>
            <Text className="text-sm text-gray-800">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-sm text-gray-800">Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
