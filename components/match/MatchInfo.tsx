// ProfessionalMatchInfo.tsx
"use client";

import { matchData } from '@/constants/match';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// --- Type Definitions ---
type PlayerRole = 'All Rounder' | 'Bowler' | 'Batsman' | 'Wicket Keeper' | string;

interface Player {
  name: string;
  role: PlayerRole;
  image: string;
  isCaptain?: boolean;
  battingStyle?: string;
  bowlingStyle?: string;
}

// --- Helper Functions ---
const getRoleIcon = (role: PlayerRole): keyof typeof Ionicons.glyphMap => {
  switch (role) {
    case 'All Rounder': return 'fitness-outline';
    case 'Bowler': return 'baseball-outline';
    case 'Batsman': return 'golf-outline';
    case 'Wicket Keeper': return 'hand-left-outline';
    default: return 'person-outline';
  }
};

const getRoleColor = (role: PlayerRole): string => {
  switch (role) {
    case 'All Rounder': return '#FF6B35';
    case 'Bowler': return '#4ECDC4';
    case 'Batsman': return '#45B7D1';
    case 'Wicket Keeper': return '#96CEB4';
    default: return '#95A5A6';
  }
};

// --- Component ---
const ProfessionalMatchInfo: React.FC = () => {
  const renderPlayerCard = (player: Player, idx: number, isReversed = false) => (
    <TouchableOpacity key={idx} className="mb-3 rounded-xl bg-white shadow" style={{ elevation: 2 }} activeOpacity={0.7}>
      <View className={`flex-row items-center p-3 ${isReversed ? 'flex-row-reverse' : ''}`}>
        <View className="relative mr-3">
          <Image source={{ uri: player.image }} className="w-12 h-12 rounded-full bg-gray-200" />
          {player.isCaptain && <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-400 border-2 border-white items-center justify-center"><Text className="text-xs font-bold text-gray-800">C</Text></View>}
        </View>
        <View className={`flex-1 ${isReversed ? 'items-end mr-3' : ''}`}>
          <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>{player.name}</Text>
          <View className="flex-row items-center mb-1">
            <View className="w-5 h-5 rounded-full justify-center items-center mr-2" style={{ backgroundColor: getRoleColor(player.role) }}>
              <Ionicons name={getRoleIcon(player.role)} size={12} color="white" />
            </View>
            <Text className="text-xs font-medium" style={{ color: getRoleColor(player.role) }}>{player.role}</Text>
          </View>
          {player.battingStyle && <Text className="text-xs text-gray-500">{player.battingStyle}</Text>}
          {player.bowlingStyle && <Text className="text-xs text-gray-500">{player.bowlingStyle}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTeamSection = (teamName: string, players: Player[], teamColor: string, isReversed = false) => (
    <View className="mb-6 rounded-xl bg-white overflow-hidden shadow" style={{ elevation: 6 }}>
      <LinearGradient colors={[teamColor, `${teamColor}CC`]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="p-4">
        <View className={`flex-row items-center ${isReversed ? 'flex-row-reverse' : ''}`}>
          <View className="w-12 h-12 rounded-full bg-gray-200 mr-3 justify-center items-center">
            <Image source={{ uri: '/placeholder.svg?height=32&width=32&text=🏏' }} className="w-8 h-8 rounded-full" />
          </View>
          <View className={`${isReversed ? 'items-end mr-3' : ''} flex-1`}>
            <Text className="text-xl font-bold text-gray-600">{teamName}</Text>
            <Text className="text-xs text-gray-600/80">{players.length} Players</Text>
          </View>
        </View>
      </LinearGradient>
      <View className="p-4">{players.map((player, index) => renderPlayerCard(player, index, isReversed))}</View>
      <View className="flex-row justify-around bg-gray-100 border-t border-gray-200 py-4">
        {[
          ['Batsmen', players.filter(p => p.role === 'Batsman').length],
          ['All Rounders', players.filter(p => p.role === 'All Rounder').length],
          ['Bowlers', players.filter(p => p.role === 'Bowler').length],
          ['Keepers', players.filter(p => p.role === 'Wicket Keeper').length],
        ].map(([label, count]) => (
          <View key={label as string} className="items-center">
            <Text className="text-lg font-bold text-gray-800">{count}</Text>
            <Text className="text-xs text-gray-500 mt-1">{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4" showsVerticalScrollIndicator={false}>
      {/* <View className="m-4 rounded-xl overflow-hidden shadow" style={{ elevation: 8 }}>
        <LinearGradient colors={['#ffffff', '#f5faff', '#a9d3f2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="p-6 items-center">
          <Text className="text-2xl font-bold text-gray-800 mb-1">Team Squads</Text>
          <Text className="text-sm text-gray-800/90">Warriors vs STARS • T20 Match</Text>
        </LinearGradient>
      </View> */}


          {/* Match Details Header */}
      <View className="mb-6 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <LinearGradient 
          colors={['#ffffff', '#f5faff', '#a9d3f2']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }} 
          className="p-6 items-center"
        >
          <Text className="text-2xl font-bold text-gray-800 mb-1">Match Details</Text>
          <Text className="text-sm text-gray-800/90">
            {matchData.team1.name} vs {matchData.team2.name} • {matchData.matchType}
          </Text>
        </LinearGradient>
      </View>

      {/* Basic Match Info */}
      <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
        <Text className="text-lg font-bold text-gray-800 mb-4">Match Information</Text>
        
        <View className="flex-row justify-between mb-4">
          <View className="flex-1 mr-2">
            <Text className="text-sm font-medium text-gray-600 mb-1">Match Id</Text>
            <Text className="text-xl font-bold text-gray-900">{matchData.id}</Text>
          </View>
          <View className="flex-1 ml-2 items-end">
            <Text className="text-sm font-medium text-gray-600 mb-1">Match Type</Text>
            <Text className="text-xl font-bold text-gray-900">{matchData.matchType}</Text>
          </View>
        </View>

        <View className="border-t border-gray-200 pt-4 mb-4">
          <Text className="text-sm font-medium text-gray-600 mb-2">Toss</Text>
          <Text className="text-base font-semibold text-gray-900">{matchData.toss}</Text>
        </View>

        <View className="border-t border-gray-200 pt-4 mb-4">
          <Text className="text-sm font-medium text-gray-600 mb-2">Series</Text>
          <Text className="text-base font-semibold text-gray-900">{matchData.series}</Text>
        </View>

        <View className="flex-row justify-between border-t border-gray-200 pt-4">
          <View className="flex-1 mr-2">
            <Text className="text-sm font-medium text-gray-600 mb-1">Timings</Text>
            <Text className="text-base font-semibold text-gray-900">{matchData.timings}</Text>
          </View>
          <View className="flex-1 ml-2 items-end">
            <Text className="text-sm font-medium text-gray-600 mb-1">Match Date</Text>
            <Text className="text-base font-semibold text-gray-900">{matchData.matchDate}</Text>
          </View>
        </View>
      </View>

      <View>
        {renderTeamSection('Warriors', enhancedWarriorsPlayers, '#fff1f2')}
        <View className="items-center my-4">
          <LinearGradient colors={['#f5f5f5', '#cce5ff']} className="w-16 h-16 rounded-full justify-center items-center shadow" style={{ elevation: 4 }}>
            <Text className="text-lg font-bold text-gray-600">VS</Text>
          </LinearGradient>
        </View>
        {renderTeamSection('STARS', enhancedStarsPlayers, '#a9d3f2', false)}
      </View>
      <View className="my-4 p-4 bg-white rounded-xl shadow" style={{ elevation: 3 }}>
        <Text className="text-xl font-semibold text-gray-800 mb-3">Match Officials</Text>
        {[
          ['person-outline', 'Umpire 1: John Smith'],
          ['person-outline', 'Umpire 2: Mike Johnson'],
          ['tv-outline', '3rd Umpire: David Wilson'],
        ].map(([icon, label], idx) => (
          <View key={idx} className="flex-row items-center py-1">
            <Ionicons name={icon as any} size={20} color="#666" />
            <Text className="text-base text-gray-700 ml-3">{label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfessionalMatchInfo;

const enhancedWarriorsPlayers = [
  {
    name: "Aaryan Vaddi",
    role: "All Rounder",
    image: "/placeholder.svg?height=48&width=48&text=AV",
    isCaptain: true,
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
  },
  {
    name: "Avaneesh Kannappan",
    role: "Bowler",
    image: "/placeholder.svg?height=48&width=48&text=AK",
    bowlingStyle: "Right-arm fast",
  },
  {
    name: "Dhiyanesh Vigneshwaran",
    role: "All Rounder",
    image: "/placeholder.svg?height=48&width=48&text=DV",
    battingStyle: "Left-handed",
  },
  {
    name: "Guest Player Thaman",
    role: "Batsman",
    image: "/placeholder.svg?height=48&width=48&text=GT",
    battingStyle: "Right-handed",
  },
  {
    name: "Harshith Rahul",
    role: "Bowler",
    image: "/placeholder.svg?height=48&width=48&text=HR",
    bowlingStyle: "Left-arm spin",
  },
  {
    name: "Kavin Aadityaa",
    role: "All Rounder",
    image: "/placeholder.svg?height=48&width=48&text=KA",
    battingStyle: "Right-handed",
  },
  {
    name: "Manvith Padala",
    role: "Wicket Keeper",
    image: "/placeholder.svg?height=48&width=48&text=MP",
    battingStyle: "Right-handed",
  },
  {
    name: "Meysam KARIMI",
    role: "All Rounder",
    image: "/placeholder.svg?height=48&width=48&text=MK",
    battingStyle: "Left-handed",
  },
  {
    name: "Mihir Ranade",
    role: "Batsman",
    image: "/placeholder.svg?height=48&width=48&text=MR",
    battingStyle: "Right-handed",
  },
]

const enhancedStarsPlayers = [
  {
    name: "Adrith Arya Gopal",
    role: "All Rounder",
    image: "/placeholder.svg?height=48&width=48&text=AG",
    isCaptain: true,
    battingStyle: "Right-handed",
  },
  {
    name: "Ashwanth Sathishkumar",
    role: "Batsman",
    image: "/placeholder.svg?height=48&width=48&text=AS",
    battingStyle: "Left-handed",
  },
  {
    name: "Atharv Aryan Sorrot",
    role: "All Rounder",
    image: "/placeholder.svg?height=48&width=48&text=AA",
    battingStyle: "Right-handed",
  },
  {
    name: "Ayman Reza",
    role: "Wicket Keeper",
    image: "/placeholder.svg?height=48&width=48&text=AR",
    battingStyle: "Right-handed",
  },
  {
    name: "Ayushman A",
    role: "All Rounder",
    image: "/placeholder.svg?height=48&width=48&text=AY",
    battingStyle: "Left-handed",
  },
  {
    name: "Guestplayer Raj",
    role: "Bowler",
    image: "/placeholder.svg?height=48&width=48&text=GR",
    bowlingStyle: "Right-arm fast",
  },
  {
    name: "Kireeti Pottipareddy",
    role: "All Rounder",
    image: "/placeholder.svg?height=48&width=48&text=KP",
    battingStyle: "Right-handed",
  },
  {
    name: "Mourya A",
    role: "Bowler",
    image: "/placeholder.svg?height=48&width=48&text=MA",
    bowlingStyle: "Left-arm spin",
  },
  {
    name: "Salaar Karimi",
    role: "All Rounder",
    image: "/placeholder.svg?height=48&width=48&text=SK",
    battingStyle: "Right-handed",
  },
]