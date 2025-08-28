import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface MatchMoment {
  id: string;
  over: string;
  description: string;
  type: "wicket" | "boundary" | "milestone";
}

interface KeyMomentsProps {
  moments: MatchMoment[];
}

export default function KeyMoments({ moments }: KeyMomentsProps) {
  const getMomentIcon = (type: string) => {
    switch (type) {
      case "wicket":
        return "flash";
      case "boundary":
        return "baseball";
      case "milestone":
        return "trophy";
      default:
        return "information-circle";
    }
  };

  const getMomentColor = (type: string) => {
    switch (type) {
      case "wicket":
        return "#EF4444";
      case "boundary":
        return "#10B981";
      case "milestone":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  return (
    <View className="px-4 mb-6">
      <Text className="text-lg font-semibold mb-4">Key Moments</Text>
      <View className="gap-y-3">
        {moments.map((moment) => (
          <View key={moment.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <View className="flex-row items-center">
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: `${getMomentColor(moment.type)}20` }}
              >
                <Ionicons
                  name={getMomentIcon(moment.type) as any}
                  size={20}
                  color={getMomentColor(moment.type)}
                />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text className="font-semibold text-sm text-gray-600">Over {moment.over}</Text>
                </View>
                <Text className="text-gray-800">{moment.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}