import CardWithRating from "@/components/community/CardWithRating";
import Header from "@/components/community/Header";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

const BoxCricketScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const venues = [
    {
      id: 1,
      name: "3 Dimensional ACA Cricket Academy",
      location: "Gurugram (Gurgaon)",
      rating: 3.6,
      reviews: 29,
      image: "/public/cricket-ground-facility.jpg",
    },
    {
      id: 2,
      name: "AAI Sportsaal",
      location: "Chennai",
      rating: 4.3,
      reviews: 48,
      image: "/public/cricket-nets-facility.jpg",
    },
    {
      id: 3,
      name: "Academy Modasa",
      location: "Modasa",
      rating: 4.1,
      reviews: 16,
      image: "/public/cricket-academy-logo.jpg",
    },
    {
      id: 4,
      name: "Adwan Sports Veritas Complex",
      location: "Noida",
      rating: 3.3,
      reviews: 6,
      image: "/public/sports-complex-logo.jpg",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <Header heading="Box Cricket & Nets" />

        <ScrollView className="flex-1">
          {/* Location Filter */}
          <View className="flex-row justify-between items-center px-4 mb-4 mt-2">
            <Text className="text-base text-gray-800">
              Nearby <Text className="text-[#0e7ccb] font-semibold">All Locations</Text>
            </Text>
            <TouchableOpacity>
              <Ionicons name="swap-vertical" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Venues List */}
          <View className="px-4">
            {venues.map((venue) => (
              <CardWithRating
                key={venue.id}
                id={venue.id}
                title={venue.name}
                subTitle={venue.location}
                image={venue.image}
                rating={venue.rating}
                reviews={venue.reviews}
              />
            ))}
          </View>
        </ScrollView>

        <FloatingActionButton
          label="REGISTER"
          onPress={() => router.push("/create-livestreamer")}
        />
      </View>
    </SafeAreaView>
  );
};

export default BoxCricketScreen;
