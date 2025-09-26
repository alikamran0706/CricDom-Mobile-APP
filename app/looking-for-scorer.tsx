import FloatingActionButton from "@/components/ui/FloatingActionButton";
import FloatingLabelInputBorderBottom from "@/components/ui/FloatingLabelInputBorderBottom";
import Header from "@/components/ui/Header";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScorerHireScreen = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("Whole day");
  const [selectedGroundType, setSelectedGroundType] = useState("Open Ground");
  const [selectedDays, setSelectedDays] = useState("1");
  const [selectedMatchesPerDay, setSelectedMatchesPerDay] = useState("1");
  const [selectedDailyBudget, setSelectedDailyBudget] = useState("");
  const [selectedMatchBudget, setSelectedMatchBudget] = useState("");
  const [selectedContact, setSelectedContact] = useState("Cricdom DM");
  const [location, setLocation] = useState("Lahore");
  const [area, setArea] = useState("");
  const [ground, setGround] = useState("");
  const [details, setDetails] = useState("");
  const navigation = useNavigation();
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [hireDate, setHireDate] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const types = ["Whole day", "Match", "Tournament"];
  const days = ["1", "2", "3", "4", "5+"];
  const matchesPerDay = ["1", "2", "3", "4", "5+"];
  const dailyBudgets = ["500 - 1000", "1100 - 1500", "1600 - 2000", "2000+", "NOT DECIDED"];
  const matchBudgets = ["100 - 500", "600 - 1000", "1100 - 1500", "1500+", "NOT DECIDED"];
  const contactMethods = ["Cricdom DM", "Call", "WhatsApp"];
  const groundTypes = [
    { type: "Open Ground", image: require('../assets/images/stadium.png') },
    { type: "Box Cricket", image: require('../assets/images/net.png') },
  ];

  const handleDateChange = (field: "start_date" | "end_date", event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setHireDate(formattedDate);
    setShowEndDatePicker(false);
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1">
        {/* Header */}
        <Header heading='Looking for a scorer to hire' />

        <ScrollView className="flex-1 px-4 py-6"
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          {/* Need a scorer for */}
          <View className="mb-6">
            <Text className="text-base font-medium text-gray-800 mb-3">Need a scorer for?</Text>
            <View className="flex-row flex-wrap">
              {types.map((type) => (
                <TouchableOpacity
                  key={type}
                  className={`px-4 py-2 rounded-full mr-3 mb-2 ${selectedType === type ? "bg-gray-300" : "bg-gray-200"}`}
                  onPress={() => setSelectedType(type)}
                >
                  <Text className="text-gray-700">{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* When do you need scorer */}
          <TouchableOpacity className="mb-6" onPress={() => setShowEndDatePicker(true)}>
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-medium text-gray-600">{hireDate ? hireDate : `When do you need scorer?`}</Text>
              <Ionicons name="calendar-outline" size={20} color="gray" />
            </View>
            <View className="border-b border-gray-300 mt-2"></View>
          </TouchableOpacity>

          {/* Where */}
          <FloatingLabelInputBorderBottom
            label="Where?"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />

          {/* Area in this city */}
          <FloatingLabelInputBorderBottom
            label="Area in this city?"
            value={area}
            onChangeText={(text) => setArea(text)}
          />
          {/* Ground */}
          <FloatingLabelInputBorderBottom
            label="Ground? (Optional)"
            value={ground}
            onChangeText={(text) => setGround(text)}
          />
          {/* Ground Type */}
          <Text className="text-base font-semibold text-gray-800 mb-3">Ground Type?</Text>
          <View className="flex-row justify-around mb-6">
            {groundTypes.map((ground) => (
              <TouchableOpacity
                key={ground.type}
                className={`items-center p-4 ${selectedGroundType === ground.type ? "bg-gray-200 rounded-lg" : ""}`}
                onPress={() => setSelectedGroundType(ground.type)}
              >
                <Image
                  source={ground.image}
                  style={{
                    width: 35,
                    height: 35,
                    tintColor: '#6b7280',
                    resizeMode: 'contain',
                  }}
                />
                <Text className="text-xs font-semibold text-gray-700 mt-2">{ground.type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* For how many days */}
          <View className="mb-6">
            <Text className="text-base font-medium text-gray-800 mb-3">For how many days?</Text>
            <View className="flex-row flex-wrap">
              {days.map((day) => (
                <TouchableOpacity
                  key={day}
                  className={`px-4 py-2 rounded-full mr-3 mb-2 ${selectedDays === day ? "bg-[#0e7ccb]" : "bg-gray-200"}`}
                  onPress={() => setSelectedDays(day)}
                >
                  <Text className={selectedDays === day ? 'text-white' : "text-gray-700"}>{day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Matches per day */}
          <View className="mb-6">
            <Text className="text-base font-medium text-gray-800 mb-3">Matches per day?</Text>
            <View className="flex-row flex-wrap">
              {matchesPerDay.map((match) => (
                <TouchableOpacity
                  key={match}
                  className={`px-4 py-2 rounded-full mr-3 mb-2 ${selectedMatchesPerDay === match ? "bg-[#0e7ccb]" : "bg-gray-200"
                    }`}
                  onPress={() => setSelectedMatchesPerDay(match)}
                >
                  <Text className={selectedMatchesPerDay === match ? 'text-white' : "text-gray-700"}>{match}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Budget Per day */}
          <View className="mb-6">
            <Text className="text-base font-medium text-gray-800 mb-3">Budget (Per day in PKR)?</Text>
            <View className="flex-row flex-wrap">
              {dailyBudgets.map((budget) => (
                <TouchableOpacity
                  key={budget}
                  className={`px-4 py-2 rounded-full mr-3 mb-2 ${selectedDailyBudget === budget ? "bg-[#0e7ccb]" : "bg-gray-200"
                    }`}
                  onPress={() => setSelectedDailyBudget(budget)}
                >
                  <Text className={selectedDailyBudget === budget ? 'text-white' : "text-gray-700"}>{budget}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Budget Per match */}
          <View className="mb-6">
            <Text className="text-base font-medium text-gray-800 mb-3">Budget (Per match in PKR)?</Text>
            <View className="flex-row flex-wrap">
              {matchBudgets.map((budget) => (
                <TouchableOpacity
                  key={budget}
                  className={`px-4 py-2 rounded-full mr-3 mb-2 ${selectedMatchBudget === budget ? "bg-[#0e7ccb]" : "bg-gray-200"
                    }`}
                  onPress={() => setSelectedMatchBudget(budget)}
                >
                  <Text className={selectedMatchBudget === budget ? 'text-white ' : "text-gray-700"}>{budget}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* How can scorers contact you */}
          <View className="mb-6">
            <Text className="text-base font-medium text-gray-800 mb-3">How can scorers contact you?</Text>
            <View className="flex-row flex-wrap">
              {contactMethods.map((method) => (
                <TouchableOpacity
                  key={method}
                  className={`px-4 py-2 rounded-full mr-3 mb-2 ${selectedContact === method ? "bg-[#0e7ccb]" : "bg-gray-200"
                    }`}
                  onPress={() => setSelectedContact(method)}
                >
                  <Text className={selectedContact === method ? "text-white" : "text-gray-700"}>{method}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Details */}
          <View className="mb-8">
            <TextInput
              className="border border-gray-300 rounded-lg p-4 text-base text-gray-800 min-h-32"
              value={details}
              onChangeText={setDetails}
              placeholder="Write details like for how many days or matches do You need scorer for?"
              multiline
              textAlignVertical="top"
            />
            <Text className="text-right text-gray-400 text-sm mt-1">0/280</Text>
          </View>
        </ScrollView>

        {showEndDatePicker && (
          <DateTimePicker
            value={hireDate ? new Date(hireDate) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, date) => handleDateChange("end_date", event, date)}
          />
        )}
        <FloatingActionButton
          label="Save"
          onPress={() => { }}
        />
      </View>
    </SafeAreaView>
  )
}

export default ScorerHireScreen
