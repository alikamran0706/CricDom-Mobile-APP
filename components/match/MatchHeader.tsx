import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface MatchHeaderProps {
  title: string;
  subtitle: string;
  status: string;
}

export default function MatchHeader({ title, subtitle, status }: MatchHeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View className="ml-4 flex-1">
        <Text className="text-xl font-semibold text-black">{title}</Text>
        <Text className="text-sm text-gray-600">{subtitle}</Text>
      </View>
      <View className="items-end">
        <View className="bg-green-100 px-2 py-1 rounded-full">
          <Text className="text-green-800 text-xs font-medium">{status}</Text>
        </View>
      </View>
    </View>
  );
}