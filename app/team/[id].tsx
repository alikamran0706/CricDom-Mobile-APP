"use client"

import QRCodeModal from "@/components/Modal/QRCodeModal"
import SocialShare from "@/components/SocialShare"
import { getFullStrapiUrl } from "@/lib/utils/common"
import type { RootState } from "@/store"
import { useGetTeamQuery } from "@/store/features/team/teamApi"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router"
import { useEffect, useLayoutEffect, useState } from "react"
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSelector } from "react-redux"

interface Player {
  id: string
  documentId: string
  name: string
  position: string
  avatar?: string
  image?: any
}

interface Match {
  id: string
  opponent: string
  date: string
  result: "Won" | "Lost" | "Draw"
  score: string
  venue: string
}

interface TeamStats {
  matchesPlayed: number
  matchesWon: number
  matchesLost: number
  matchesDrawn: number
  totalRuns: number
  totalWickets: number
  winPercentage: number
}

export default function TeamDetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const profile = useSelector((state: RootState) => state.user.profile);
  const { data, isLoading, isError } = useGetTeamQuery(id as string);

  const team = data?.data;
  const [players, setPlayers] = useState<Player[]>([]);
  const [activeTab, setActiveTab] = useState("Members");
  const [showQRModal, setShowQRModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const tabs = ["Members", "Stats", "Leaderboards", "Matches", "Awards", "Photos"]

  // Sample data for demonstration
  const teamStats: TeamStats = {
    matchesPlayed: 25,
    matchesWon: 18,
    matchesLost: 5,
    matchesDrawn: 2,
    totalRuns: 4250,
    totalWickets: 180,
    winPercentage: 72,
  }

  const recentMatches: Match[] = [
    {
      id: "1",
      opponent: "Thunder Bolts",
      date: "2024-01-15",
      result: "Won",
      score: "185/6 vs 182/8",
      venue: "Central Ground",
    },
    {
      id: "2",
      opponent: "Lightning Strikers",
      date: "2024-01-10",
      result: "Lost",
      score: "165/9 vs 168/4",
      venue: "Sports Complex",
    },
    {
      id: "3",
      opponent: "Fire Eagles",
      date: "2024-01-05",
      result: "Won",
      score: "201/5 vs 195/7",
      venue: "Stadium Ground",
    },
  ]

  const leaderboardData = [
    { id: "1", name: "Ali Kamran", runs: 450, wickets: 12, matches: 8 },
    { id: "2", name: "Ahmed Hassan", runs: 380, wickets: 8, matches: 7 },
    { id: "3", name: "Babar Shah", runs: 320, wickets: 15, matches: 6 },
  ]

  const awards = [
    { id: "1", title: "Best Team 2024", date: "2024-01-20", icon: "trophy" },
    { id: "2", title: "Fair Play Award", date: "2024-01-15", icon: "medal" },
    { id: "3", title: "Tournament Winners", date: "2024-01-10", icon: "star" },
  ]

  useEffect(() => {
    if (team?.players) {
      const list = team.players.map((p: any) => ({
        id: p.id.toString(),
        documentId: p.documentId,
        name: p.name,
        position: p.position,
        avatar: p.image?.url || "",
      }))
      setPlayers(list)
    }
  }, [team])

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const backgroundImageUrl = team?.image?.formats?.thumbnail?.url
    ? getFullStrapiUrl(team.image.formats.thumbnail.url)
    : null

  const renderMembersTab = () => (
    <View>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">Team Players</Text>
        <View className="bg-blue-100 px-3 py-1 rounded-full">
          <Text className="text-[#0e7ccb] font-medium text-sm">{players.length} members</Text>
        </View>
      </View>

      {players.length > 0 ? (
        players.map((player) => (
          <TouchableOpacity
            key={player.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3"
            onPress={() => router.push(`/player/${player.id}`)}
          >
            <View className="flex-row items-center">
              <View className="relative">
                <View className="relative w-16 h-16 rounded-full items-center justify-center overflow-hidden border border-gray-100 bg-gray-200">
                  {player.avatar ? (
                    <Image source={{ uri: getFullStrapiUrl(player.avatar) }} className="w-full h-full" />
                  ) : (
                    <Ionicons name="person" size={32} color="#9CA3AF" />
                  )}
                </View>
                <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0e7ccb] rounded-full border-2 border-white items-center justify-center">
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
          <Text className="text-gray-500 text-center mt-2">Start building your team by adding players</Text>
        </View>
      )}
    </View>
  )

  const renderStatsTab = () => (
    <View>
      <Text className="text-xl font-bold text-gray-900 mb-4">Team Statistics</Text>

      <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Overall Performance</Text>

        <View className="flex-row justify-between mb-4">
          <View className="items-center flex-1">
            <Text className="text-2xl font-bold text-[#0e7ccb]">{teamStats.matchesPlayed}</Text>
            <Text className="text-gray-600 text-sm">Matches</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-2xl font-bold text-green-600">{teamStats.matchesWon}</Text>
            <Text className="text-gray-600 text-sm">Won</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-2xl font-bold text-red-600">{teamStats.matchesLost}</Text>
            <Text className="text-gray-600 text-sm">Lost</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-2xl font-bold text-yellow-600">{teamStats.matchesDrawn}</Text>
            <Text className="text-gray-600 text-sm">Draw</Text>
          </View>
        </View>

        <View className="border-t border-gray-200 pt-4">
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-xl font-bold text-gray-800">{teamStats.winPercentage}%</Text>
              <Text className="text-gray-600 text-sm">Win Rate</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-xl font-bold text-gray-800">{teamStats.totalRuns}</Text>
              <Text className="text-gray-600 text-sm">Total Runs</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-xl font-bold text-gray-800">{teamStats.totalWickets}</Text>
              <Text className="text-gray-600 text-sm">Wickets</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )

  const renderLeaderboardsTab = () => (
    <View>
      <Text className="text-xl font-bold text-gray-900 mb-4">Team Leaderboard</Text>

      {leaderboardData.map((player, index) => (
        <View key={player.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-[#0e7ccb] items-center justify-center mr-4">
              <Text className="text-white font-bold">{index + 1}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">{player.name}</Text>
              <View className="flex-row mt-1">
                <Text className="text-gray-600 text-sm mr-4">Runs: {player.runs}</Text>
                <Text className="text-gray-600 text-sm mr-4">Wickets: {player.wickets}</Text>
                <Text className="text-gray-600 text-sm">Matches: {player.matches}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  )

  const renderMatchesTab = () => (
    <View>
      <Text className="text-xl font-bold text-gray-900 mb-4">Recent Matches</Text>

      {recentMatches.map((match) => (
        <View key={match.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-lg font-bold text-gray-900">vs {match.opponent}</Text>
            <View
              className={`px-3 py-1 rounded-full ${match.result === "Won" ? "bg-green-100" : match.result === "Lost" ? "bg-red-100" : "bg-yellow-100"
                }`}
            >
              <Text
                className={`font-semibold text-sm ${match.result === "Won"
                  ? "text-green-800"
                  : match.result === "Lost"
                    ? "text-red-800"
                    : "text-yellow-800"
                  }`}
              >
                {match.result}
              </Text>
            </View>
          </View>
          <Text className="text-gray-700 mb-1">{match.score}</Text>
          <View className="flex-row justify-between">
            <Text className="text-gray-600 text-sm">{match.venue}</Text>
            <Text className="text-gray-600 text-sm">{match.date}</Text>
          </View>
        </View>
      ))}
    </View>
  )

  const renderAwardsTab = () => (
    <View>
      <Text className="text-xl font-bold text-gray-900 mb-4">Team Awards</Text>

      {awards.map((award) => (
        <View key={award.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-yellow-100 items-center justify-center mr-4">
              <Ionicons name={award.icon as any} size={24} color="#F59E0B" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">{award.title}</Text>
              <Text className="text-gray-600 text-sm mt-1">{award.date}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  )

  const renderPhotosTab = () => (
    <View>
      <Text className="text-xl font-bold text-gray-900 mb-4">Team Photos</Text>

      <View className="flex-row flex-wrap justify-between">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <TouchableOpacity
            key={index}
            className="w-[48%] aspect-square bg-gray-200 rounded-2xl mb-4 items-center justify-center"
          >
            <Ionicons name="image-outline" size={32} color="#9CA3AF" />
            <Text className="text-gray-500 text-sm mt-2">Photo {index}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity className="bg-[#0e7ccb] rounded-2xl p-4 items-center">
        <View className="flex-row items-center">
          <Ionicons name="camera" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Add Photos</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "Members":
        return renderMembersTab()
      case "Stats":
        return renderStatsTab()
      case "Leaderboards":
        return renderLeaderboardsTab()
      case "Matches":
        return renderMatchesTab()
      case "Awards":
        return renderAwardsTab()
      case "Photos":
        return renderPhotosTab()
      default:
        return renderMembersTab()
    }
  }

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev)
    // Optional: Trigger backend follow/unfollow API here
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 bg-white">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
          >
            <Entypo name="arrow-bold-left" size={29} color="#3b3b3b" />
          </TouchableOpacity>

          {/* Right-side Icons */}
          <View className="flex-row items-center gap-x-2">
            <SocialShare
              title="Custom Share Title"
              message="This is a custom share message for this screen!"
              url="https://expo.dev/@alikamran07/cricdom"
            />

            {/* QR Code Button */}
            <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              onPress={() => setShowQRModal(true)}
            >
              <Ionicons name="qr-code-outline" size={20} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        {isLoading ? (
          <View className="flex-1 items-center py-6">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : isError ? (
          <View className="flex-1 items-center py-6">
            <Text className="text-red-500">Failed to load team details.</Text>
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
                  imageStyle={{ borderRadius: 16 }}
                >
                  {/* Dark overlay */}
                  <View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      zIndex: 1,
                    }}
                  />

                  {/* Content */}
                  <View className="flex-1 py-6 items-center justify-center px-4" style={{ zIndex: 2 }}>
                    {/* Team name & edit button */}
                    <View className="flex-row items-center mb-2">
                      <Text className="text-xl font-bold mr-3 text-white">{team?.name}</Text>
                      {team?.owner?.documentId === profile?.documentId && (
                        <TouchableOpacity
                          onPress={() =>
                            router.push({
                              pathname: "/create-team",
                              params: { team: JSON.stringify(team) },
                            })
                          }
                          className="w-9 h-9 rounded-full bg-white items-center justify-center"
                        >
                          <Ionicons name="pencil" size={18} color="#374151" />
                        </TouchableOpacity>
                      )}
                    </View>

                    <Text className="text-white text-base mb-4">{players.length} players</Text>

                    {/* Follow / Unfollow Button */}
                    <TouchableOpacity
                      onPress={toggleFollow}
                      className={`px-4 py-1.5 rounded-full ${isFollowing ? "bg-white" : "bg-[#0e7ccb]"
                        }`}
                    >
                      <Text
                        className={`text-sm font-semibold ${isFollowing ? "text-green-600" : "text-white"
                          }`}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              ) : (
                // Fallback (no background image)
                <View className="flex-1 items-center justify-center px-6">
                  <View className="flex-row items-center h-20">
                    <Text className="text-xl font-bold mr-3 text-gray-900">{team?.name}</Text>
                    {team?.owner?.documentId === profile?.documentId && (
                      <TouchableOpacity
                        onPress={() =>
                          router.push({
                            pathname: "/create-team",
                            params: { team: JSON.stringify(team) },
                          })
                        }
                        className="w-9 h-9 rounded-full bg-white items-center justify-center"
                      >
                        <Ionicons name="pencil" size={18} color="#374151" />
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text className="text-gray-600 mb-4">{players.length} players</Text>

                  {/* Follow / Unfollow Button (plain background) */}
                  <TouchableOpacity
                    onPress={toggleFollow}
                    className={`px-4 py-1.5 rounded-full ${isFollowing ? "bg-gray-200" : "bg-[#0e7ccb]"
                      }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${isFollowing ? "text-green-600" : "text-white"
                        }`}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Tabs */}
            <View className="mx-4 mt-6">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                {tabs.map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    className={`px-4 py-2 rounded-full mr-3 ${activeTab === tab ? "bg-[#0e7ccb]" : "bg-gray-200"}`}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text className={`font-medium ${activeTab === tab ? "text-white" : "text-gray-700"}`}>{tab}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Tab Content */}
            <View className="mx-4">{renderTabContent()}</View>
          </ScrollView>
        )}
      </View>
      <QRCodeModal
        visible={showQRModal}
        onClose={() => setShowQRModal(false)}
        teamName={team?.name || "Team"}
        teamLocation="Lahore"
        teamId="10818998"
        teamInitials={team?.name?.substring(0, 2).toUpperCase() || "FT"}
        teamColor="#3B82F6"
      />
    </SafeAreaView>
  )
}
