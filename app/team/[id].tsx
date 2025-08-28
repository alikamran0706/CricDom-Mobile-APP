import { getFullStrapiUrl } from "@/lib/utils/common";
import { RootState } from "@/store";
import { useGetTeamQuery } from "@/store/features/team/teamApi";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

interface Player {
  id: string;
  documentId: string;
  name: string;
  position: string;
  avatar?: string;
  image?: any;
}

export default function TeamDetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const profile = useSelector((state: RootState) => state.user.profile);
  const { data, isLoading, isError } = useGetTeamQuery(id as string);

  const team = data?.data;
  const [players, setPlayers] = useState<Player[]>([]);
  // const [showAddPlayersModal, setShowAddPlayersModal] = useState(false);

  useEffect(() => {
    if (team?.players) {
      const list = team.players.map((p: any) => ({
        id: p.id.toString(),
        documentId: p.documentId,
        name: p.name,
        position: p.position,
        avatar: p.image?.url || "",
      }));
      setPlayers(list);
    }
  }, [team]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const backgroundImageUrl = team?.image?.formats?.thumbnail?.url
    ? getFullStrapiUrl(team.image.formats.thumbnail.url)
    : null

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 bg-white">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          {/* <Text className="text-xl font-bold ml-4 text-gray-900">{team?.name}</Text> */}
        </View>

        {/* Content */}
        {isLoading ? (
          <View className="flex-1 items-center py-6">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : isError ? (
          <View className="flex-1 items-center py-6">
            <Text className="text-red-500">Failed to load matches.</Text>
          </View>
        ) : (
          <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
            {/* Team Info */}
            <View className="h-60 rounded-2xl overflow-hidden bg-gray-100 mx-4">
              {backgroundImageUrl ? (
                <ImageBackground
                  source={{ uri: backgroundImageUrl }}
                  resizeMode="cover"
                  style={{ flex: 1 }}
                  imageStyle={{ borderRadius: 16 }} // Round the image itself
                >
                  {/* Black Overlay */}
                  <View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      zIndex: 1,
                    }}
                  />

                  {/* Centered Content */}
                  {/* <View
                    className="flex-1 items-center justify-center px-6"
                    style={{ zIndex: 2 }} // Ensure content is above overlay
                  >
                    <View
                      className="w-20 h-20 rounded-full items-center justify-center mb-4"
                      style={{ backgroundColor: team.color }}
                    >
                      <Ionicons name="people" size={32} color="white" />
                    </View>

                    <View className="flex-row items-center">
                      <Text className="text-xl font-bold mr-4 text-white">{team.name}</Text>
                      {team?.owner?.documentId === profile?.documentId && (
                        <TouchableOpacity
                          onPress={() =>
                            router.push({
                              pathname: "/create-team",
                              params: { team: JSON.stringify(team) },
                            })
                          }
                          className="w-10 h-10 rounded-full bg-white/80 items-center justify-center"
                        >
                          <Ionicons name="pencil" size={20} color="#374151" />
                        </TouchableOpacity>
                      )}
                    </View>

                    <Text className="text-white mt-1">{players.length} players</Text>
                  </View> */}

                  <View className="flex-1 py-6 items-center justify-center" style={{ zIndex: 2 }}>
                    <View className="flex-row items-center h-8">
                      <Text className="text-xl font-bold mr-4 text-white">{team.name}</Text>
                      {
                        team?.owner?.documentId === profile?.documentId &&
                        <TouchableOpacity onPress={() => router.push({
                          pathname: "/create-team",
                          params: { team: JSON.stringify(team) },
                        })}
                          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                        >
                          <Ionicons name="pencil" size={20} color="#374151" />
                        </TouchableOpacity>
                      }
                    </View>
                    <Text className="text-white text-lg">{players.length} players</Text>
                  </View>


                </ImageBackground>
              ) : (
                // Fallback if no image
                <View className="flex-1 items-center justify-center px-6">
                  {/* <View
                    className="w-20 h-20 rounded-full items-center justify-center mb-4"
                    style={{ backgroundColor: team.color }}
                  >
                    <Ionicons name="people" size={32} color="white" />
                  </View> */}
                  <View className="flex-row items-center h-20">
                    <Text className="text-xl font-bold mr-4 text-gray-900">{team.name}</Text>
                    {team?.owner?.documentId === profile?.documentId && (
                      <TouchableOpacity
                        onPress={() =>
                          router.push({
                            pathname: "/create-team",
                            params: { team: JSON.stringify(team) },
                          })
                        }
                        className="w-10 h-10 rounded-full bg-white items-center justify-center"
                      >
                        <Ionicons name="pencil" size={20} color="#374151" />
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text className="text-gray-600 pb-6">{players.length} players</Text>
                </View>
              )}
            </View>





            {/* Players Section */}
            <View className="mx-4 mt-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold text-gray-900">Team Players</Text>
                <View className="bg-blue-100 px-3 py-1 rounded-full">
                  <Text className="text-blue-800 font-medium text-sm">{players.length} members</Text>
                </View>
              </View>

              {players.length > 0 ? (
                players.map((player) => (
                  <TouchableOpacity key={player.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3" onPress={() => router.push(`/player/${player.id}`)}>
                    <View className="flex-row items-center">
                      <View className="relative">
                        <View className="relative w-16 h-16 rounded-full items-center justify-center overflow-hidden border border-gray-100 ">
                          {
                            player.avatar &&
                            <Image source={{ uri: getFullStrapiUrl(player.avatar) }} className="w-full h-full" />
                          }
                        </View>
                        <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white items-center justify-center">
                          <View className="w-2 h-2 bg-white rounded-full" />
                        </View>
                      </View>
                      <View className="flex-1 ml-4">
                        <Text className="text-lg font-bold text-gray-900">{player.name}</Text>
                        <Text className="text-gray-600 mt-1">{player.position}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={18} color="#6B7280" />
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View className="bg-white rounded-2xl p-8 items-center shadow-sm">
                  <Ionicons name="people-outline" size={64} color="#9CA3AF" />
                  <Text className="text-xl font-semibold text-gray-600 mt-4">No players yet</Text>
                  <Text className="text-gray-500 text-center mt-2">
                    Start building your team by adding players
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}

        {/* Add Players */}
        {/* {
          team?.user === profile?.documentId &&
          <FloatingActionButton label="Add New Player" iconName="person-add" onPress={() => setShowAddPlayersModal(true)} />
        }
        <AddPlayersModal visible={showAddPlayersModal} onClose={() => setShowAddPlayersModal(false)} onAddPlayers={handleAddPlayers} existingPlayerIds={existingPlayerIds} teamId={team?.documentId} /> */}
      </View >
    </SafeAreaView >
  );
}
