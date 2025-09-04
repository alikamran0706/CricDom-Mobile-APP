"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Player {
  id: string
  name: string
  image: string
  isPro?: boolean
}

const PlayerComparisonScreen = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("COMPARE")
  const [activeStatsTab, setActiveStatsTab] = useState("Batting")

  const tabs = ["BATTING", "BOWLING", "COMPARE", "FACE OFF"]
  const statsTypes = ["Batting", "Bowling"]

  const player1: Player = {
    id: "1",
    name: "Ali Kamran",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
  }

  const player2: Player = {
    id: "2",
    name: "Select Player",
    image: "",
    isPro: false,
  }

  const handleUpgradeToPro = () => {
    // router.push("/subscribe-pro")
  }

  const renderPlayerCard = (player: Player, isSecondPlayer = false) => (
    <View className="bg-white rounded-2xl p-4 flex-1 mx-2 shadow-sm">
      {isSecondPlayer && player.isPro ? (
        <View className="items-center justify-center h-32">
          <View className="w-16 h-16 bg-gray-300 rounded-2xl items-center justify-center mb-3">
            <Ionicons name="lock-closed" size={32} color="#666" />
          </View>
          <View className="bg-green-500 px-3 py-1 rounded-full mb-2">
            <Text className="text-white text-xs font-semibold">PRO</Text>
          </View>
          <Text className="text-gray-600 font-medium">Privileges</Text>
        </View>
      ) : (
        <View className="items-center">
          <Image source={{ uri: player.image }} className="w-20 h-20 rounded-2xl mb-3" />
          <Text className="text-gray-800 font-semibold text-center">{player.name}</Text>
        </View>
      )}
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="bg-red-600 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Ali Kamran</Text>
          <View className="flex-row">
            <TouchableOpacity className="mr-4">
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="relative">
              <Ionicons name="funnel" size={24} color="white" />
              <View className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full items-center justify-center">
                <Text className="text-xs font-bold text-gray-800">1</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View className="bg-gray-800 px-4 py-3">
        <View className="flex-row justify-around">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`pb-2 ${activeTab === tab ? "border-b-2 border-yellow-400" : ""}`}
              onPress={() => setActiveTab(tab)}
            >
              <Text className={`font-medium ${activeTab === tab ? "text-white" : "text-gray-400"}`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Player Comparison Cards */}
        <View className="px-4 py-6">
          <View className="flex-row items-center">
            {renderPlayerCard(player1)}

            {/* VS Indicator */}
            <View className="w-12 h-12 bg-white rounded-full items-center justify-center mx-2 shadow-sm">
              <Text className="text-gray-800 font-bold">VS</Text>
            </View>

            {renderPlayerCard(player2, true)}
          </View>
        </View>

        {/* Stats Type Toggle */}
        <View className="px-4 mb-6">
          <View className="flex-row bg-gray-700 rounded-xl p-1">
            {statsTypes.map((type) => (
              <TouchableOpacity
                key={type}
                className={`flex-1 py-3 rounded-lg ${activeStatsTab === type ? "bg-gray-600" : "bg-transparent"}`}
                onPress={() => setActiveStatsTab(type)}
              >
                <Text className={`text-center font-medium ${activeStatsTab === type ? "text-white" : "text-gray-400"}`}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Section Header */}
        <View className="px-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-white text-lg font-semibold mr-2">{activeStatsTab.toUpperCase()} STATS</Text>
              <TouchableOpacity>
                <Ionicons name="information-circle-outline" size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>
            <View className="flex-row">
              <TouchableOpacity className="mr-4">
                <Ionicons name="play" size={20} color="#9ca3af" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="share" size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Locked Stats Content */}
        <View className="px-4 mb-8">
          <View className="bg-gray-800 rounded-2xl p-8 items-center justify-center min-h-80 relative overflow-hidden">
            {/* Blurred Background Pattern */}
            <View className="absolute inset-0 opacity-20">
              <View className="flex-row justify-around py-4">
                <View className="w-16 h-4 bg-gray-600 rounded" />
                <View className="w-20 h-4 bg-gray-600 rounded" />
                <View className="w-12 h-4 bg-gray-600 rounded" />
              </View>
              <View className="flex-row justify-around py-4">
                <View className="w-20 h-4 bg-gray-600 rounded" />
                <View className="w-16 h-4 bg-gray-600 rounded" />
                <View className="w-18 h-4 bg-gray-600 rounded" />
              </View>
              <View className="flex-row justify-around py-4">
                <View className="w-14 h-4 bg-gray-600 rounded" />
                <View className="w-22 h-4 bg-gray-600 rounded" />
                <View className="w-16 h-4 bg-gray-600 rounded" />
              </View>
            </View>

            {/* Lock Icon and Content */}
            <View className="items-center z-10">
              <View className="w-20 h-20 bg-gray-600 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="lock-closed" size={40} color="#9ca3af" />
              </View>

              <View className="flex-row items-center mb-3">
                <View className="bg-green-500 px-3 py-1 rounded-full mr-2">
                  <Text className="text-white text-sm font-semibold">PRO</Text>
                </View>
                <Text className="text-white text-lg font-semibold">Privileges</Text>
              </View>

              <Text className="text-gray-400 text-center leading-6 max-w-xs">
                Compare all the stats of both the players.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Upgrade CTA */}
      <View className="p-4 bg-gray-900">
        <TouchableOpacity className="bg-green-500 rounded-xl py-4 shadow-lg" onPress={handleUpgradeToPro}>
          <Text className="text-center text-white font-bold text-lg">BECOME A PRO</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PlayerComparisonScreen
