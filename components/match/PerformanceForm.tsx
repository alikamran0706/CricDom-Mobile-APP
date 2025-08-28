import Dropdown from "@/components/ui/Dropdown";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface PerformanceFormProps {
  activeTab: 'batting' | 'bowling' | null;
  onTabChange: (tab: 'batting' | 'bowling') => void;
  onClose: () => void;
}

const playerOptions = [
  { label: 'Virat Kohli', value: '1' },
  { label: 'Rohit Sharma', value: '2' },
  { label: 'KL Rahul', value: '3' },
];

const battingLabels = ["Runs", "Balls", "Fours", "Sixes"];
const bowlingLabels = ["Overs", "Runs", "Wickets", "No Balls"];

export default function PerformanceForm({ activeTab, onTabChange, onClose }: PerformanceFormProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [showPlayerDropdown, setShowPlayerDropdown] = useState(false);

  const updateFormData = (field: string) => (value: string) => {
    // Handle form data updates
  };

  const BattingForm = () => (
    <View className="p-4">
      <Dropdown
        label="Player Name *"
        value={selectedPlayerId ? playerOptions.find(opt => opt.value === selectedPlayerId)?.label : ''}
        options={playerOptions}
        onSelect={(item) => setSelectedPlayerId(item.value)}
        showDropdown={showPlayerDropdown}
        onToggle={() => setShowPlayerDropdown(!showPlayerDropdown)}
      />
      <View>
        {Array.from({ length: Math.ceil(battingLabels.length / 2) }).map((_, rowIndex) => {
          const label1 = battingLabels[rowIndex * 2];
          const label2 = battingLabels[rowIndex * 2 + 1];
          return (
            <View key={rowIndex} className="flex-row justify-between gap-x-2">
              {[label1, label2].filter(Boolean).map((label) => (
                <View key={label} className="flex-1 mr-2 last:mr-0">
                  <Input
                    label={label}
                    value=""
                    onChangeText={updateFormData(label)}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </View>
              ))}
            </View>
          );
        })}
      </View>
      <FloatingActionButton
        label="Save Batting Performance"
        containerStyle={{ marginTop: 22 }}
        onPress={onClose}
      />
    </View>
  );

  const BowlingForm = () => (
    <View className="p-4">
      <Dropdown
        label="Player Name *"
        value={selectedPlayerId ? playerOptions.find(opt => opt.value === selectedPlayerId)?.label : ''}
        options={playerOptions}
        onSelect={(item) => setSelectedPlayerId(item.value)}
        showDropdown={showPlayerDropdown}
        onToggle={() => setShowPlayerDropdown(!showPlayerDropdown)}
      />
      <View>
        {Array.from({ length: Math.ceil(bowlingLabels.length / 2) }).map((_, rowIndex) => {
          const label1 = bowlingLabels[rowIndex * 2];
          const label2 = bowlingLabels[rowIndex * 2 + 1];
          return (
            <View key={rowIndex} className="flex-row justify-between gap-x-2">
              {[label1, label2].filter(Boolean).map((label) => (
                <View key={label} className="flex-1 mr-2 last:mr-0">
                  <Input
                    label={label}
                    value=""
                    onChangeText={updateFormData(label)}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </View>
              ))}
            </View>
          );
        })}
      </View>
      <FloatingActionButton
        label="Save Bowling Performance"
        containerStyle={{ marginTop: 22 }}
        onPress={onClose}
      />
    </View>
  );

  if (!activeTab) return null;

  return (
    <>
      <Text className="text-xl font-bold text-center mt-4">Performance</Text>
      <View className="flex-row justify-center my-4">
        {['batting', 'bowling'].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => onTabChange(type as 'batting' | 'bowling')}
            className={`px-4 py-2 mx-1 rounded-full ${
              activeTab === type ? 'bg-[#0e7ccb]' : 'bg-gray-200'
            }`}
          >
            <Text className={activeTab === type ? 'text-white font-bold' : 'text-gray-700'}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {activeTab === 'batting' && <BattingForm />}
      {activeTab === 'bowling' && <BowlingForm />}
    </>
  );
}