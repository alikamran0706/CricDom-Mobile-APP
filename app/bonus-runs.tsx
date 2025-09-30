import Header from "@/components/ui/Header"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { Pressable, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function BonusRuns() {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<"pakistan" | "fitness" | null>(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1">
        <Header heading="Bonus Runs" />

        <View className="flex-1 px-4 py-6">
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 mb-6">Select team which is awarded bonus</Text>

            <View className="space-y-4">
              <Pressable
                className={`flex-row items-center p-4 rounded-xl ${selectedTeam === "pakistan" ? "bg-blue-50 border-2 border-[#0e7ccb]" : "bg-gray-50"
                  }`}
                onPress={() => setSelectedTeam("pakistan")}
              >
                <View
                  className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${selectedTeam === "pakistan" ? "border-[#0e7ccb] bg-[#0e7ccb]" : "border-gray-300"
                    }`}
                >
                  {selectedTeam === "pakistan" && <View className="w-3 h-3 rounded-full bg-white" />}
                </View>
                <Text className="text-gray-800 font-medium">Pakistan(Batting)</Text>
              </Pressable>

              <Pressable
                className={`flex-row items-center p-4 rounded-xl ${selectedTeam === "fitness" ? "bg-blue-50 border-2 border-[#0e7ccb]" : "bg-gray-50"
                  }`}
                onPress={() => setSelectedTeam("fitness")}
              >
                <View
                  className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${selectedTeam === "fitness" ? "border-[#0e7ccb] bg-[#0e7ccb]" : "border-gray-300"
                    }`}
                >
                  {selectedTeam === "fitness" && <View className="w-3 h-3 rounded-full bg-white" />}
                </View>
                <Text className="text-gray-800 font-medium">Fitness Team(Bowling)</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View className="bg-white border-t border-gray-200 p-4">
          <View className="flex-row gap-x-3">
            <TouchableOpacity className="flex-1 bg-gray-200 rounded-xl py-4 items-center" onPress={() => router.push("/match-help")}>
              <Text className="text-gray-700 font-bold">NEED HELP?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 rounded-xl py-4 items-center bg-[#0e7ccb]"
            // onPress={handleLetsPlay}
            >
              <Text className="text-white font-bold">LET'S PLAY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </SafeAreaView>
  )
}
