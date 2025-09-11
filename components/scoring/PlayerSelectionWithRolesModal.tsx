import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"

interface Player {
  id: string
  name: string
  avatar: string
  isCaptain?: boolean
  isWicketKeeper?: boolean
}

interface PlayerSelectionWithRolesProps {
  visible: boolean
  onClose: () => void
  players: Player[]
  selectedPlayer?: Player
  onPlayerSelect: (player: Player) => void
  onRoleAssign: (playerId: string, role: "captain" | "wicketKeeper", assigned: boolean) => void
}

export default function PlayerSelectionWithRoles({
  visible,
  onClose,
  players,
  selectedPlayer,
  onPlayerSelect,
  onRoleAssign,
}: PlayerSelectionWithRolesProps) {
  const [activeTab, setActiveTab] = useState("TESTING")
  const [searchQuery, setSearchQuery] = useState("")
  const [showPlayerProfile, setShowPlayerProfile] = useState(false)

  const filteredPlayers = players.filter((player) => player.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="bg-red-600 px-4 py-3 pt-12">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold">Select Bowler for Over 2</Text>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Team Tabs */}
        <View className="flex-row bg-red-600">
          <TouchableOpacity
            className={`flex-1 py-3 ${activeTab === "TESTING" ? "border-b-2 border-yellow-400" : ""}`}
            onPress={() => setActiveTab("TESTING")}
          >
            <Text className={`text-center font-medium ${activeTab === "TESTING" ? "text-white" : "text-red-200"}`}>
              TESTING
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 ${activeTab === "FITNESS TEAM" ? "border-b-2 border-yellow-400" : ""}`}
            onPress={() => setActiveTab("FITNESS TEAM")}
          >
            <Text className={`text-center font-medium ${activeTab === "FITNESS TEAM" ? "text-white" : "text-red-200"}`}>
              FITNESS TEAM
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search and Add Player */}
        <View className="p-4 bg-gray-100">
          <View className="flex-row items-center gap-3">
            <View className="flex-1 flex-row items-center bg-white rounded-lg px-3 py-2">
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-2 text-gray-700"
                placeholder="Quick Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-lg flex-row items-center">
              <Ionicons name="add" size={20} color="white" />
              <Text className="text-white font-medium ml-1">ADD PLAYER</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Playing Squad */}
        <ScrollView className="flex-1 p-4">
          <Text className="text-xl font-bold text-gray-800 mb-4">Playing Squad</Text>

          {filteredPlayers.map((player) => (
            <TouchableOpacity
              key={player.id}
              className="flex-row items-center justify-between bg-gray-50 p-4 rounded-lg mb-3"
              onPress={() => {
                onPlayerSelect(player)
                setShowPlayerProfile(true)
              }}
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-red-500 rounded-full items-center justify-center">
                  <Text className="text-white font-bold">{player.name.charAt(0)}</Text>
                </View>
                <Text className="ml-3 text-gray-800 font-medium">{player.name}</Text>
              </View>
              <TouchableOpacity className="bg-gray-300 px-4 py-2 rounded">
                <Text className="text-gray-600 font-medium">REMOVE</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Player Profile Bottom Sheet */}
        <Modal visible={showPlayerProfile} animationType="slide" presentationStyle="pageSheet">
          <View className="flex-1 bg-white">
            <View className="p-6">
              <View className="flex-row items-center mb-6">
                <View className="w-16 h-16 bg-red-500 rounded-full items-center justify-center">
                  <Text className="text-white font-bold text-xl">{selectedPlayer?.name.charAt(0)}</Text>
                </View>
                <View className="ml-4">
                  <Text className="text-2xl font-bold text-gray-800">{selectedPlayer?.name}</Text>
                  <TouchableOpacity>
                    <Text className="text-green-500 font-medium">VIEW PROFILE</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text className="text-xl font-bold text-gray-800 mb-4">Assign Roles</Text>

              <View className="flex-row gap-4">
                <TouchableOpacity
                  className={`flex-1 border-2 rounded-lg p-6 items-center ${
                    selectedPlayer?.isCaptain ? "border-green-500 bg-green-50" : "border-gray-300"
                  }`}
                  onPress={() =>
                    selectedPlayer && onRoleAssign(selectedPlayer.id, "captain", !selectedPlayer.isCaptain)
                  }
                >
                  <View className="w-12 h-12 bg-teal-500 rounded-full items-center justify-center mb-2">
                    <Text className="text-white font-bold text-lg">C</Text>
                  </View>
                  <Text className="text-gray-800 font-medium">Captain</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-1 border-2 rounded-lg p-6 items-center ${
                    selectedPlayer?.isWicketKeeper ? "border-green-500 bg-green-50" : "border-gray-300"
                  }`}
                  onPress={() =>
                    selectedPlayer && onRoleAssign(selectedPlayer.id, "wicketKeeper", !selectedPlayer.isWicketKeeper)
                  }
                >
                  <View className="w-12 h-12 bg-gray-400 rounded-full items-center justify-center mb-2">
                    <Text className="text-white font-bold text-sm">WK</Text>
                  </View>
                  <Text className="text-gray-800 font-medium">Wicket Keeper</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row p-4 gap-4">
              <TouchableOpacity
                className="flex-1 bg-gray-300 py-3 rounded-lg"
                onPress={() => setShowPlayerProfile(false)}
              >
                <Text className="text-center text-gray-700 font-medium">CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-green-500 py-3 rounded-lg"
                onPress={() => setShowPlayerProfile(false)}
              >
                <Text className="text-center text-white font-medium">OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  )
}
