import { getFullStrapiUrl } from '@/lib/utils/common';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const OfficialModal = ({ data, selectedOfficialHandler, matchOfficials, currentSlot, heading }: any) => {
  const activeSlot = currentSlot?.slot; 

  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <View collapsable={false} className="px-6 flex-1 bg-white">
      <View>
        <Text className="text-lg font-semibold mb-3 text-black">{heading}</Text>
      </View>
      {
        hasData ?
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {data?.map((item: any) => {
          const isSelectedInThisSlot =
            matchOfficials?.umpires?.[activeSlot]?.id === item.id;

          const isSelectedInOtherSlot =
            activeSlot === 'first'
              ? matchOfficials?.umpires?.second?.id === item.id
              : matchOfficials?.umpires?.first?.id === item.id;

          const isDisabled = isSelectedInOtherSlot;

          return (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center py-3 ${isDisabled ? 'opacity-50' : ''}`}
              onPress={() => {
                if (isDisabled) return;

                // ✅ Toggle logic — deselect if already selected
                if (isSelectedInThisSlot) {
                  selectedOfficialHandler(null); // deselect
                } else {
                  selectedOfficialHandler(item); // select
                }
              }}
              disabled={isDisabled}
            >
              <View className="relative mr-3">
                <View className="relative w-12 h-12 rounded-full items-center justify-center overflow-hidden border border-gray-100">
                  {item.photo?.formats?.thumbnail?.url && (
                    <Image
                      source={{
                        uri: getFullStrapiUrl(item.photo?.formats?.thumbnail?.url),
                      }}
                      className="w-full h-full"
                    />
                  )}
                </View>

                {/* ✅ Show checkmark if selected in this slot */}
                {isSelectedInThisSlot && (
                  <View className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                    <Ionicons name="checkmark" size={14} color="white" />
                  </View>
                )}
              </View>

              <View className="flex-1">
                <Text className="text-base font-medium text-black">{item.name}</Text>
                <Text className="text-sm text-gray-600">{item.rank}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      :
      <Text className='text-gray-600 text-sm'>No record found</Text>
      }
    </View>
  );
};

export default OfficialModal;
