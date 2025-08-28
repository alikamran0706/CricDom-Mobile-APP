import AvatarImage from "@/components/AvatarImage";
import { RootState } from "@/store";
import { useGetTeamsQuery } from "@/store/features/team/teamApi";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const logo = require('../../assets/images/logo.png');

const upcomingActivities = [
  { id: "1", title: "Leagues", icon: "calendar", color: "#DBEAFE" },
  { id: "3", title: "Matches", icon: "trophy", color: "#DBEAFE" },
  { id: "2", title: "Teams", icon: "checkmark-circle", color: "#DBEAFE" },
  { id: "4", title: "Innings", icon: "trending-up", color: "#DBEAFE" },
]

const recentMatches = [
  {
    id: "1",
    title: "County Championship: Day 3",
    subtitle: "Highlights",
    description: "Watch the key moments from yesterday's matches.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&auto=format&fit=crop&q=60",
    backgroundColor: "#F3F4F6"
  },
  {
    id: "2",
    title: "T20 Blast: Match",
    subtitle: "Get ready for tonight!",
    description: "Clash.",
    image: "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?w=500&auto=format&fit=crop&q=60",
    backgroundColor: "#F3F4F6"
  }
]

export default function HomeScreen() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.profile);
  const { data, isLoading, isFetching, isError, refetch } = useGetTeamsQuery({
    page: 1,
    pageSize: 5,
    ownerId: user?.documentId,
  });

  const teams = data?.data || [];
  const teamsPagination = data?.meta?.pagination;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1 px-4">
          {/* Header */}
          <View className="flex-row justify-between items-center py-4">
            <View>
              <Image
                source={logo}
                style={{ width: 40, height: 40, resizeMode: 'contain' }}
              />
            </View>
            <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JpY2tldGVyfGVufDB8fDB8fHwy" }} className="w-10 h-10 rounded-full" />
            </TouchableOpacity>
          </View>

          {/* Recent Match */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4 text-black">Recent Match</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
              {recentMatches.map((match) => (
                <TouchableOpacity
                  key={match.id}
                  className="w-64 rounded-xl p-4 mr-4"
                  style={{ backgroundColor: match.backgroundColor }}
                  onPress={() => router.push(`/match/${match.id}`)}
                >
                  <Image
                    source={{ uri: match.image }}
                    className="w-full h-32 rounded-lg mb-3"
                    resizeMode="cover"
                  />
                  <View>
                    <Text className="text-gray-800 font-bold text-base mb-1">
                      {match.title}
                    </Text>
                    <Text className="text-gray-800 font-semibold text-sm mb-1">
                      {match.subtitle}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {match.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Your Teams */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4 text-black">Your Teams</Text>
            {
              isLoading ?
                <View style={{ alignItems: 'flex-start' }}>
                  <ActivityIndicator size="large" color="#000" />
                </View>
                :
                <View className="flex-row gap-x-3">
                  {teams?.map((team: any) => (
                    <TouchableOpacity
                      key={team.id}
                      className="items-center justify-center"
                      onPress={() => (team.isAdd ? router.push("/create-team") : router.push(`/team/1`))}
                    >
                      {/* {team.isAdd ? (
                        <Ionicons name="add" size={24} color="#3B82F6" />
                      ) : team.count ? (
                        <Text className="text-white font-bold text-lg">{team.count}</Text>
                      ) : null} */}

                       {
                                team?.image?.formats?.thumbnail?.url ? (
                                  <AvatarImage
                                    uri={ team?.image?.formats?.thumbnail?.url}
                                    size={62}
                                    // borderRadius={8}
                                    // rounded={false}
                                    extraStyle={{marginRight: 12,}}
                                  />
                                )
                                  :
                                  <View
                                    className="w-16 h-16 rounded-full items-center justify-center mr-4"
                                    style={{ backgroundColor: "#000" }}
                                  >
                                    <Ionicons name="people" size={24} color="white" />
                                  </View>
                              }
                    </TouchableOpacity>
                  ))}

                  <TouchableOpacity
                    className="w-16 h-16 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#DBEAFE' }}
                    onPress={() => (router.push("/create-team"))}
                  >
                    <Ionicons name="add" size={24} color="#3B82F6" />
                  </TouchableOpacity>
                </View>
            }
          </View>

          {/* Manage Players Card */}
          <TouchableOpacity className="bg-blue-50 rounded-lg p-4 mb-6" onPress={() => router.push("/create-inning")}>
            <View className="flex-row items-center mb-2">
              <Ionicons name="people" size={20} color="#0e7ccb" />
              <Text className="text-[#0e7ccb] font-semibold ml-2">Create inning</Text>
            </View>
            <Text className="text-gray-600 text-sm mb-3">Track team performance easily!</Text>
          </TouchableOpacity>

          {/* Today's Matches */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4 text-black">Live Matches</Text>
            <View className="bg-blue-50 rounded-lg p-4">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="font-semibold text-gray-800">Team A vs Team B</Text>
                  <Text className="text-gray-600 text-sm">Score: 158/3</Text>
                </View>
                <TouchableOpacity className="bg-white rounded-lg px-4 py-2" onPress={() => router.push(`/match/1`)}>
                  <Text className="text-[#0e7ccb] font-medium">View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Upcoming Activities */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4 text-black">My Activities</Text>
            <View className="flex-row flex-wrap justify-between">
              {upcomingActivities.map((activity) => (
                <TouchableOpacity
                  key={activity.id}
                  className="w-[48%] rounded-lg p-4 mb-3 items-center"
                  style={{ backgroundColor: activity.color }}
                >
                  <Ionicons name={activity.icon as any} size={32} color="#0e7ccb" />
                  <Text className="text-[#0e7ccb] font-medium mt-2">{activity.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Stats */}
          <View className="bg-gray-50 rounded-lg mb-6 px-2">
            <Text className="text-lg font-semibold mb-3 text-black">Quick Stats</Text>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-2xl font-bold text-[#0e7ccb]">{teamsPagination?.total}</Text>
                <Text className="text-gray-600">Teams</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-green-600">38</Text>
                <Text className="text-gray-600">Leagues</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-orange-600">12</Text>
                <Text className="text-gray-600">Matches</Text>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-3 text-black">Recent Activity</Text>
            <View className="gap-y-3">
              <TouchableOpacity className="bg-white border border-gray-200 rounded-lg p-4" onPress={() => router.push(`/match/1`)}>
                <Text className="font-medium text-black">Team Titans vs Warriors</Text>
                <Text className="text-gray-600 text-sm">Match scheduled for tomorrow</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white border border-gray-200 rounded-lg p-4" onPress={() => router.push(`/match/1`)}>
                <Text className="font-medium text-black">New player added to Strikers</Text>
                <Text className="text-gray-600 text-sm">John Doe joined the team</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
