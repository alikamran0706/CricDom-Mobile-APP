import { Entypo } from "@expo/vector-icons";
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
    <View className="flex-row items-center px-4 py-2">
      <TouchableOpacity onPress={() => router.back()}>
        <Entypo name="arrow-bold-left" size={29} color="#3b3b3b" />
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