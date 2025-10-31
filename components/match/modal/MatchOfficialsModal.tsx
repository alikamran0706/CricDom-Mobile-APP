import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const imageMap: Record<string, any> = {
  umpire: require('../../../assets/images/umpire.png'),
  scorer: require('../../../assets/images/score.png'),
  referee: require('../../../assets/images/refree.png'),
  commentator: require('../../../assets/images/cricket-commentator.png'),
};

interface Props {
  officialHandler: (officials: any, selectedOfficials: any) => void;
  existingOfficials?: any;
}

const MatchOfficialsModal: React.FC<Props> = ({
  officialHandler,
  existingOfficials,
}) => {
  const [selectedOfficials, setSelectedOfficials] = useState(
    existingOfficials || {
      umpires: { first: null, second: null },
      scorers: { first: null, second: null },
      commentators: { first: null, second: null },
      referee: null,
      livestreamers: null,
    }
  );

  const toggleSelection = (
    category: keyof typeof selectedOfficials,
    slot?: 'first' | 'second',
  ) => {
 

    officialHandler(category, slot)
  };


  const renderOfficialSlot = (
    icon: string,
    label: string,
    image?: string | null,
    onPress?: () => void,
    isSelected?: boolean
  ) => (
    <TouchableOpacity
      className={`flex-1 items-center p-6 mx-2 rounded-2xl ${
        isSelected ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-100'
      }`}
      onPress={onPress}
    >
      <View className="w-20 h-20 rounded-full bg-gray-200 items-center justify-center mb-4">
        {image ? (
          <Image
            source={imageMap[image]}
            style={{ width: 28, height: 28, resizeMode: 'contain' }}
          />
        ) : (
          <Ionicons name={icon as any} size={32} color="#6b7280" />
        )}
      </View>
      <Text className="text-gray-800 font-semibold text-center">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Umpires */}
        <View className="mb-8">
          <Text className="lg font-bold text-gray-800 mb-6">Select Umpires</Text>
          <View className="flex-row">
            {renderOfficialSlot(
              '',
              '1st',
              'umpire',
              () => toggleSelection('umpires', 'first'),
              !!selectedOfficials.umpires.first
            )}
            {renderOfficialSlot(
              '',
              '2nd',
              'umpire',
              () => toggleSelection('umpires', 'second'),
              !!selectedOfficials.umpires.second
            )}
          </View>
        </View>

        {/* Scorers */}
        <View className="mb-8">
          <Text className="lg font-bold text-gray-800 mb-6">Select Scorers</Text>
          <View className="flex-row">
            {renderOfficialSlot(
              '',
              '1st',
              'scorer',
              () => toggleSelection('scorers', 'first'),
              !!selectedOfficials.scorers.first
            )}
            {renderOfficialSlot(
              '',
              '2nd',
              'scorer',
              () => toggleSelection('scorers', 'second'),
              !!selectedOfficials.scorers.second
            )}
          </View>
        </View>

        {/* Commentators */}
        <View className="mb-8">
          <Text className="lg font-bold text-gray-800 mb-6">Select Commentators</Text>
          <View className="flex-row">
            {renderOfficialSlot(
              '',
              '1st',
              'commentator',
              () => toggleSelection('commentators', 'first'),
              !!selectedOfficials.commentators.first
            )}
            {renderOfficialSlot(
              '',
              '2nd',
              'commentator',
              () => toggleSelection('commentators', 'second'),
              !!selectedOfficials.commentators.second
            )}
          </View>
        </View>

        {/* Others */}
        <View className="mb-8">
          <Text className="lg font-bold text-gray-800 mb-6">Others</Text>
          <View className="flex-row">
            {renderOfficialSlot(
              '',
              'Match Referee',
              'referee',
              () => toggleSelection('referee', undefined),
              !!selectedOfficials.referee
            )}
            {renderOfficialSlot(
              'videocam',
              'Live Streamers',
              null,
              () => toggleSelection('livestreamers', undefined),
              !!selectedOfficials.livestreamers
            )}
          </View>
        </View>
      </ScrollView>

    </View>
  );
};

export default MatchOfficialsModal;
