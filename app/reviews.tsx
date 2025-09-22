import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const ReviewsScreen = () => {
  const [activeTab, setActiveTab] = useState("REVIEWS")

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

  const renderStars = (rating: any) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons key={index} name={index < rating ? "star" : "star-outline"} size={16} color="#FFA500" />
    ))
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>A AHAMED RYAZ</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
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

        {/* Reviews List */}
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

        {/* Write Review Button */}
        <TouchableOpacity style={styles.writeReviewButton}>
          <Text style={styles.writeReviewText}>WRITE A REVIEW</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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

export default ReviewsScreen
