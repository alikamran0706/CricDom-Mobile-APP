import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  value: string | undefined;
  options: DropdownOption[];
  onSelect: (item: DropdownOption) => void;
  showDropdown: boolean;
  onToggle: () => void;
  disabled?: boolean;
  onLoadMore?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onSelect,
  showDropdown,
  onToggle,
  disabled = false,
  onLoadMore,
}) => {
  return (
    <View className={`mb-4 relative ${showDropdown ? 'z-10' : ''}`}>
      <Text className="text-base font-medium mb-2 text-gray-800">{label}</Text>

      <TouchableOpacity
        className={`border rounded-lg px-4 py-3 flex-row justify-between items-center ${disabled ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-300'
          }`}
        onPress={onToggle}
        disabled={disabled}
      >
        <Text className={`text-base ${!value ? 'text-gray-400' : 'text-gray-800'}`}>
          {options.find((item) => item.value === value)?.label || `Select ${label.toLowerCase()}`}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {/* {showDropdown && (
        <View className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-52">
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="px-4 py-3 border-b border-gray-100 z-50"
                onPress={() => onSelect(item)}
              >
                <Text className="text-base text-gray-800">{item.label}</Text>
              </TouchableOpacity>
            )}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <Text className="p-4 text-center text-gray-400">No options available</Text>
            }
            nestedScrollEnabled
          />
        </View>
      )} */}

      {showDropdown && (
        <View className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-52">
          {options.length > 0 ? (
            options.map((item) => (
              <TouchableOpacity
                key={item.value}
                className="px-4 py-3 border-b border-gray-100"
                onPress={() => onSelect(item)}
              >
                <Text className="text-base text-gray-800">{item.label}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="p-4 text-center text-gray-400">No options available</Text>
          )}
        </View>
      )}

    </View>
  );
};

export default Dropdown;
