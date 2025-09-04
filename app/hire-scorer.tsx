import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const ScorerHireScreen = () => {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState("Whole day")
  const [selectedGroundType, setSelectedGroundType] = useState("Open Ground")
  const [selectedDays, setSelectedDays] = useState("1")
  const [selectedMatchesPerDay, setSelectedMatchesPerDay] = useState("1")
  const [selectedDailyBudget, setSelectedDailyBudget] = useState("")
  const [selectedMatchBudget, setSelectedMatchBudget] = useState("")
  const [selectedContact, setSelectedContact] = useState("CricHeroes DM")
  const [location, setLocation] = useState("Lahore")
  const [area, setArea] = useState("")
  const [ground, setGround] = useState("")
  const [details, setDetails] = useState("")

  const types = ["Whole day", "Match", "Tournament"]
  const days = ["1", "2", "3", "4", "5+"]
  const matchesPerDay = ["1", "2", "3", "4", "5+"]
  const dailyBudgets = ["500 - 1000", "1100 - 1500", "1600 - 2000", "2000+", "NOT DECIDED"]
  const matchBudgets = ["100 - 500", "600 - 1000", "1100 - 1500", "1500+", "NOT DECIDED"]
  const contactMethods = ["CricHeroes DM", "Call", "WhatsApp"]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-red-600 px-4 py-3">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-white ml-4">Looking for a scorer to hire</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
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
        <View className="mb-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-medium text-gray-600">When do you need scorer?</Text>
            <Ionicons name="calendar-outline" size={20} color="#10b981" />
          </View>
          <View className="border-b-2 border-green-500 mt-2"></View>
        </View>

        {/* Where */}
        <View className="mb-6">
          <Text className="text-base font-medium text-gray-600 mb-2">Where?</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={location}
            onChangeText={setLocation}
            placeholder="Enter location"
          />
        </View>

        {/* Area in this city */}
        <View className="mb-6">
          <Text className="text-base font-medium text-gray-600 mb-2">Area in this city?</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={area}
            onChangeText={setArea}
            placeholder="Enter area"
          />
        </View>

        {/* Ground */}
        <View className="mb-6">
          <Text className="text-base font-medium text-gray-600 mb-2">Ground? (Optional)</Text>
          <TextInput
            className="border-b border-gray-300 pb-2 text-base text-gray-800"
            value={ground}
            onChangeText={setGround}
            placeholder="Enter ground name"
          />
        </View>

        {/* Ground Type */}
        <View className="mb-6">
          <Text className="text-base font-medium text-gray-800 mb-3">Ground Type?</Text>
          <View className="flex-row">
            <TouchableOpacity
              className={`flex-1 items-center p-4 rounded-xl mr-2 ${
                selectedGroundType === "Open Ground" ? "bg-blue-100" : "bg-gray-100"
              }`}
              onPress={() => setSelectedGroundType("Open Ground")}
            >
              <View className="w-12 h-12 bg-gray-300 rounded-full mb-2 items-center justify-center">
                <Ionicons name="golf-outline" size={24} color="#666" />
              </View>
              <Text className="text-gray-800 font-medium">Open Ground</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 items-center p-4 rounded-xl ml-2 ${
                selectedGroundType === "Box Cricket" ? "bg-blue-100" : "bg-gray-100"
              }`}
              onPress={() => setSelectedGroundType("Box Cricket")}
            >
              <View className="w-12 h-12 bg-gray-300 rounded-full mb-2 items-center justify-center">
                <Ionicons name="grid-outline" size={24} color="#666" />
              </View>
              <Text className="text-gray-800 font-medium">Box Cricket</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* For how many days */}
        <View className="mb-6">
          <Text className="text-base font-medium text-gray-800 mb-3">For how many days?</Text>
          <View className="flex-row flex-wrap">
            {days.map((day) => (
              <TouchableOpacity
                key={day}
                className={`px-4 py-2 rounded-full mr-3 mb-2 ${selectedDays === day ? "bg-gray-300" : "bg-gray-200"}`}
                onPress={() => setSelectedDays(day)}
              >
                <Text className="text-gray-700">{day}</Text>
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
                className={`px-4 py-2 rounded-full mr-3 mb-2 ${
                  selectedMatchesPerDay === match ? "bg-gray-300" : "bg-gray-200"
                }`}
                onPress={() => setSelectedMatchesPerDay(match)}
              >
                <Text className="text-gray-700">{match}</Text>
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
                className={`px-4 py-2 rounded-full mr-3 mb-2 ${
                  selectedDailyBudget === budget ? "bg-gray-300" : "bg-gray-200"
                }`}
                onPress={() => setSelectedDailyBudget(budget)}
              >
                <Text className="text-gray-700">{budget}</Text>
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
                className={`px-4 py-2 rounded-full mr-3 mb-2 ${
                  selectedMatchBudget === budget ? "bg-gray-300" : "bg-gray-200"
                }`}
                onPress={() => setSelectedMatchBudget(budget)}
              >
                <Text className="text-gray-700">{budget}</Text>
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
                className={`px-4 py-2 rounded-full mr-3 mb-2 ${
                  selectedContact === method ? "bg-green-500" : "bg-gray-200"
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

      {/* Post Button */}
      <View className="p-4 bg-white border-t border-gray-200">
        <TouchableOpacity className="bg-green-500 rounded-xl py-4">
          <Text className="text-center text-white font-semibold text-lg">POST</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ScorerHireScreen
