import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Match } from '../lib/types/match';

interface MatchCardProps {
  match: Match;
  onPress: (matchId: string) => void;
}

export default function MatchCard({ match, onPress }: MatchCardProps) {
  const { team_a, team_b, match_date, venue, status, result } = match; // Changed from team1, team2

  const getStatusColor = () => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'live': return 'LIVE';
      case 'completed': return 'COMPLETED';
      default: return 'UPCOMING';
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(match.documentId)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3"
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900">
            {team_a?.data?.attributes?.name && team_b?.data?.attributes?.name ? `${team_a.data.attributes.name} vs ${team_b.data.attributes.name}` : 'Match Details'}
          </Text>
        </View>
        {status && (
          <View className={`px-2 py-1 rounded-full ${getStatusColor()}`}>
            <Text className="text-white text-xs font-semibold">{getStatusText()}</Text>
          </View>
        )}
      </View>

      {match_date && (
        <View className="flex-row items-center mb-2">
          <Feather name="calendar" size={16} color="#6B7280" />
          <Text className="text-gray-600 ml-2 text-sm">
            {new Date(match_date).toLocaleDateString()}
          </Text>
        </View>
      )}

      {venue && (
        <View className="flex-row items-center mb-2">
          <Feather name="map-pin" size={16} color="#6B7280" />
          <Text className="text-gray-600 ml-2 text-sm">{venue}</Text>
        </View>
      )}

      {status === 'completed' && result && (
        <View className="mt-2 pt-2 border-t border-gray-100">
          <Text className="text-green-600 font-semibold text-sm">{result}</Text>
        </View>
      )}

      {status === 'live' && (
        <View className="mt-2 pt-2 border-t border-gray-100">
          <View className="flex-row items-center">
             <Feather name="clock" size={16} color="#EF4444" />
            <Text className="text-red-500 font-semibold text-sm ml-2">Match in progress</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
