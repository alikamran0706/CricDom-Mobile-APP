import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const VenueReviewsScreen = ({ navigation, route }: any) => {
  const [activeTab, setActiveTab] = useState("REVIEWS")
  const venueName = route?.params?.venueName || "AAI Sportsaal"

  const reviews = [
    {
      id: 1,
      name: "Kasim",
      rating: 5,
      date: "15/08/2025",
      comment: "",
      avatar: "/public/user-avatar-1.jpg",
    },
    {
      id: 2,
      name: "Ans",
      rating: 5,
      date: "20/07/2025",
      comment: "Mast",
      avatar: "/public/user-avatar-2.jpg",
    },
    {
      id: 3,
      name: "Daksh",
      rating: 5,
      date: "15/07/2025",
      comment: "Very nice",
      avatar: "/public/user-avatar-3.jpg",
    },
    {
      id: 4,
      name: "Tirgar Anil",
      rating: 5,
      date: "11/07/2025",
      comment: "Vsnsh",
      avatar: "/public/user-avatar-4.jpg",
    },
  ]

  const ratingBreakdown = [
    { stars: 5, percentage: 75, color: "#10B981" },
    { stars: 4, percentage: 15, color: "#84CC16" },
    { stars: 3, percentage: 5, color: "#FCD34D" },
    { stars: 2, percentage: 3, color: "#FB923C" },
    { stars: 1, percentage: 2, color: "#EF4444" },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#C53030" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{venueName}</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "ABOUT" && styles.activeTab]}
          onPress={() => setActiveTab("ABOUT")}
        >
          <Text style={[styles.tabText, activeTab === "ABOUT" && styles.activeTabText]}>ABOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "REVIEWS" && styles.activeTab]}
          onPress={() => setActiveTab("REVIEWS")}
        >
          <Text style={[styles.tabText, activeTab === "REVIEWS" && styles.activeTabText]}>REVIEWS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Rating Summary */}
        <View style={styles.ratingSummary}>
          <View style={styles.ratingLeft}>
            {ratingBreakdown.map((item) => (
              <View key={item.stars} style={styles.ratingRow}>
                <Text style={styles.starNumber}>{item.stars}</Text>
                <Ionicons name="star" size={16} color="#FCD34D" />
                <View style={styles.ratingBar}>
                  <View style={[styles.ratingBarFill, { width: `${item.percentage}%`, backgroundColor: item.color }]} />
                </View>
              </View>
            ))}
          </View>
          <View style={styles.ratingRight}>
            <Text style={styles.overallRating}>4.3</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name={star <= 4 ? "star" : "star-half"} size={20} color="#FCD34D" />
              ))}
            </View>
            <Text style={styles.totalReviews}>(48)</Text>
          </View>
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsList}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewerName}>{review.name}</Text>
                  <View style={styles.reviewRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons key={star} name="star" size={16} color={star <= review.rating ? "#333" : "#E5E7EB"} />
                    ))}
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                </View>
              </View>
              {review.comment && <Text style={styles.reviewComment}>{review.comment}</Text>}
            </View>
          ))}
        </View>

        {/* Write Review Button */}
        <TouchableOpacity style={styles.writeReviewButton}>
          <Text style={styles.writeReviewText}>WRITE A REVIEW</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

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
    paddingVertical: 12,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  tabsContainer: {
    backgroundColor: "#374151",
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#FCD34D",
  },
  tabText: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "600",
  },
  activeTabText: {
    color: "white",
  },
  content: {
    flex: 1,
  },
  ratingSummary: {
    backgroundColor: "white",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingLeft: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  starNumber: {
    fontSize: 14,
    color: "#333",
    marginRight: 4,
  },
  ratingBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginLeft: 8,
  },
  ratingBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  ratingRight: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  overallRating: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
  },
  starsContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  totalReviews: {
    fontSize: 16,
    color: "#666",
  },
  reviewsList: {
    paddingHorizontal: 16,
  },
  reviewCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
  },
  writeReviewButton: {
    backgroundColor: "#10B981",
    margin: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  writeReviewText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default VenueReviewsScreen
