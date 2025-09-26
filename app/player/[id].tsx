import Header from "@/components/community/Header";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Match {
    id: string
    tournament: string
    venue: string
    date: string
    format: string
    team1: string
    team2: string
    team1Score: string
    team2Score: string
    result: string
    status: string
}

const PlayerProfileScreen = () => {
    const { community } = useLocalSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(community ? "REVIEWS" : "MATCHES");
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const reviews = [
        {
            id: 1,
            name: "Musaib",
            date: "06/09/2025",
            rating: 5,
            image: "/user-profile.jpg",
        },
        {
            id: 2,
            name: "Ashish Kumar Mishra",
            date: "10/08/2025",
            rating: 5,
            image: "/user-profile-2.jpg",
        },
        {
            id: 3,
            name: "Mohd Kaif",
            date: "13/05/2025",
            rating: 5,
            comment: "Kdkow",
            image: "/user-profile-3.jpg",
        },
        {
            id: 4,
            name: "Limbadri K",
            date: "03/04/2025",
            rating: 4,
            comment: "Swzauw in vii Eid sq",
            image: "/user-profile-4.jpg",
        },
        {
            id: 5,
            name: "Sameer",
            date: "01/03/2025",
            rating: 5,
            image: "/user-profile-5.jpg",
        },
    ]

    const tabs = community ? ["ABOUT", "REVIEWS"]
        : ["ABOUT", "REVIEWS", "ACHIEVEMENTS", "MATCHES"];

    const matches: Match[] = [
        {
            id: "1",
            tournament: "Adil Memorial Cricket T...",
            venue: "Racecourse .., Karachi",
            date: "24-Nov-24",
            format: "The Hundred",
            team1: "Sunshine Cricket Club",
            team2: "ATTA CRICKET CLUB",
            team1Score: "180/6 (100 Balls)",
            team2Score: "175/7 (100 Balls)",
            result: "Sunshine Cricket Club won by 5 runs",
            status: "RESULT",
        },
        {
            id: "2",
            tournament: "Adil Memorial Cricket T...",
            venue: "ATTA CIRCKE.., Karachi",
            date: "22-Nov-24",
            format: "The Hundred",
            team1: "ATTA CRICKET CLUB",
            team2: "FRIENDS 11 DHA",
            team1Score: "96/10 (69 Balls)",
            team2Score: "97/3 (73 Balls)",
            result: "FRIENDS 11 DHA won by 7 wickets",
            status: "RESULT",
        },
    ]

    const renderMatchCard = (match: Match) => (
        <View key={match.id} className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-base font-semibold text-gray-800">{match.tournament}</Text>
                <View className="bg-[#0e7ccb] px-3 py-1 rounded-full">
                    <Text className="text-white text-xs font-medium">{match.status}</Text>
                </View>
            </View>

            <Text className="text-sm text-gray-600 mb-3">
                {match.venue} | {match.date} | {match.format}
            </Text>

            <View className="space-y-2 mb-3">
                <View className="flex-row justify-between items-center">
                    <Text className="text-black font-medium">{match.team1}</Text>
                    <Text className="text-base font-bold">{match.team1Score}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-800 font-medium">{match.team2}</Text>
                    <Text className="text-base font-bold">{match.team2Score}</Text>
                </View>
            </View>

            <Text className="text-sm text-gray-700 italic mb-3">{match.result}</Text>

            <View className="flex-row justify-around border-t border-gray-200 pt-3">
                <TouchableOpacity className="flex-1 items-center">
                    <Text className="text-black font-medium">INSIGHTS</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 items-center">
                    <Text className="text-black font-medium">TABLE</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 items-center">
                    <Text className="text-black font-medium">LEADERBOARD</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderStars = (rating: any) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Ionicons key={index} name={index < rating ? "star" : "star-outline"} size={16} color="#FFA500" />
        ))
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <LinearGradient colors={['#ffffff', '#a9d3f2', '#a9d3f2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                   <Header />


                    {/* Profile Section */}
                    <View className="items-center pb-6">
                        <Image
                            source={{
                                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
                            }}
                            className="w-24 h-24 rounded-full mb-4"
                        />
                        <Text className="text-2xl font-bold text-black mb-1">Saleem Khan</Text>
                        <Text className="text-gray-700 mb-4">(Scorer - Karachi)</Text>

                        <TouchableOpacity className="bg-[#0e7ccb] px-6 py-3 rounded-xl" onPress={() => router.push('/message')}>
                            <View className="flex-row items-center">
                                <Ionicons name="chatbubble" size={20} color="white" />
                                <Text className="text-white font-semibold ml-2">MESSAGE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Rating and Price */}
                    <View className="px-4 pb-4">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-gray-800 text-lg">Rs.1600/day, 800/ma...</Text>
                            <View className="flex-row items-center">
                                <Text className="text-black text-lg font-bold mr-2">5.0</Text>
                                <View className="flex-row">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Ionicons key={star} name="star" size={16} color="#fbbf24" />
                                    ))}
                                </View>
                                <Text className="text-gray-600 ml-2">(4)</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                {/* Tabs */}
                <View className="bg-white">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-3">
                        {tabs.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                className={`px-4 py-2 mr-4 ${activeTab === tab ? "border-b-2 border-[#0e7ccbd6]" : ""}`}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text className={`font-medium ${activeTab === tab ? "text-gray-900" : "text-gray-600"}`}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Content */}
                <ScrollView className="flex-1 bg-gray-50 px-4 py-4" contentContainerStyle={{ paddingBottom: 100 }}>
                    {activeTab === "MATCHES" && (
                        <View>
                            <Text className="text-sm text-gray-600 italic mb-4">*Matches scored by this scorer.</Text>
                            {matches.map(renderMatchCard)}
                        </View>
                    )}

                    {activeTab === "ABOUT" && (
                        <View className="bg-white rounded-2xl p-4">
                            <Text className="text-gray-800">Profile information and details about the scorer.</Text>
                        </View>
                    )}

                    {activeTab === "REVIEWS" && (
                        <View>
                            {/* Rating Summary */}
                            <View style={styles.ratingSummary}>
                                <View style={styles.ratingBars}>
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <View key={star} style={styles.ratingRow}>
                                            <Text style={styles.starNumber}>{star}</Text>
                                            <Ionicons name="star" size={16} color="#FFA500" />
                                            <View style={styles.ratingBar}>
                                                <View style={[styles.ratingFill, { width: star === 5 ? "80%" : star === 4 ? "15%" : "5%" }]} />
                                            </View>
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.overallRating}>
                                    <Text style={styles.ratingScore}>4.8</Text>
                                    <View style={styles.starsContainer}>{renderStars(5)}</View>
                                    <Text style={styles.reviewCount}>(46)</Text>
                                </View>
                            </View>

                            {reviews.map((review) => (
                                <View key={review.id} style={styles.reviewCard}>
                                    <Image source={{ uri: review.image }} style={styles.reviewerImage} />
                                    <View style={styles.reviewContent}>
                                        <Text style={styles.reviewerName}>{review.name}</Text>
                                        <View style={styles.reviewRating}>
                                            {renderStars(review.rating)}
                                            <Text style={styles.reviewDate}>{review.date}</Text>
                                        </View>
                                        {review.comment && <Text style={styles.reviewComment}>{review.comment}</Text>}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {activeTab === "ACHIEVEMENTS" && (
                        <View className="bg-white rounded-2xl p-4">
                            <Text className="text-gray-800">Scorer achievements and certifications.</Text>
                        </View>
                    )}
                </ScrollView>

                {activeTab === "REVIEWS" && (
                    <FloatingActionButton
                        label={'WRITE A REVIEW'}
                        onPress={() => { }}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default PlayerProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        backgroundColor: "#C53030",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 16,
    },
    headerTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#2C3E50",
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: "center",
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: "#FFA500",
    },
    tabText: {
        color: "#95A5A6",
        fontWeight: "bold",
    },
    activeTabText: {
        color: "white",
    },
    content: {
        flex: 1,
        padding: 16,
    },
    ratingSummary: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    ratingBars: {
        flex: 1,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    starNumber: {
        width: 20,
        fontSize: 14,
        color: "#333",
    },
    ratingBar: {
        flex: 1,
        height: 8,
        backgroundColor: "#E0E0E0",
        borderRadius: 4,
        marginLeft: 8,
    },
    ratingFill: {
        height: "100%",
        backgroundColor: "#4CAF50",
        borderRadius: 4,
    },
    overallRating: {
        alignItems: "center",
        marginLeft: 20,
    },
    ratingScore: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#333",
    },
    starsContainer: {
        flexDirection: "row",
        marginVertical: 8,
    },
    reviewCount: {
        fontSize: 14,
        color: "#666",
    },
    reviewCard: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
    },
    reviewerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    reviewContent: {
        flex: 1,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    reviewRating: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    reviewDate: {
        fontSize: 12,
        color: "#666",
        marginLeft: 8,
    },
    reviewComment: {
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
    },
    writeReviewButton: {
        backgroundColor: "#00BFA5",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 16,
    },
    writeReviewText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
})

