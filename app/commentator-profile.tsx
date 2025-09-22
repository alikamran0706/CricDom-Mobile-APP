import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const CommentatorProfileScreen = ({ navigation, route }: any) => {
  const [activeTab, setActiveTab] = useState("ABOUT")
  const commentator = route?.params?.commentator || {
    name: "PADMAKAR PATIL (PADDY)",
    phone: "9423935175",
    role: "Commentator - Jalgaon",
    pricing: "₹5000/day, 2500/match",
    rating: 4.9,
    reviews: 326,
    avatar: "/public/cricket-commentator-professional.jpg",
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#374151" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: commentator.avatar }} style={styles.profileImage} />
        <Text style={styles.profileName}>{commentator.name}</Text>
        <Text style={styles.profileRole}>({commentator.role})</Text>

        <TouchableOpacity style={styles.messageButton}>
          <Ionicons name="chatbubble-outline" size={20} color="white" />
          <Text style={styles.messageButtonText}>MESSAGE</Text>
        </TouchableOpacity>

        <View style={styles.pricingSection}>
          <Text style={styles.pricingText}>{commentator.pricing}</Text>
          <View style={styles.ratingSection}>
            <Text style={styles.ratingNumber}>{commentator.rating}</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name="star" size={16} color="#FCD34D" />
              ))}
            </View>
            <Text style={styles.reviewsCount}>({commentator.reviews})</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["ABOUT", "REVIEWS", "ACHIEVEMENTS", "MATCHES"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {/* All Time Ranking */}
        <View style={styles.rankingCard}>
          <View style={styles.rankingHeader}>
            <Text style={styles.rankingTitle}>ALL TIME RANKING</Text>
            <TouchableOpacity>
              <Ionicons name="information-circle-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={styles.rankingContent}>
            <Ionicons name="trophy" size={40} color="#FCD34D" />
            <View style={styles.rankingInfo}>
              <Text style={styles.rankingText}>
                #1 in <Text style={styles.rankingCategory}>Limited Overs</Text>
              </Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={16} color="#10B981" />
                <Text style={styles.locationText}>AHMEDABAD</Text>
              </View>
            </View>
          </View>
        </View>

        {/* August Rank */}
        <View style={styles.monthlyRankCard}>
          <View style={styles.monthlyRankHeader}>
            <Text style={styles.monthlyRankTitle}>AUGUST RANK</Text>
            <TouchableOpacity style={styles.pastRankingsButton}>
              <Text style={styles.pastRankingsText}>Past Rankings</Text>
              <Ionicons name="chevron-forward" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.rankingContent}>
            <Ionicons name="star" size={40} color="#FCD34D" />
            <View style={styles.rankingInfo}>
              <Text style={styles.rankingText}>
                #1 in <Text style={styles.rankingCategory}>Limited Overs</Text>
              </Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={16} color="#10B981" />
                <Text style={styles.locationText}>AHMEDABAD</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Commentator Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Commentator Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>MATCHES COMMENTATED</Text>
            <Text style={styles.detailValue}>2540</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>EXPERIENCE</Text>
            <Text style={styles.detailValue}>20 yrs</Text>
          </View>
        </View>
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
    backgroundColor: "#374151",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileSection: {
    backgroundColor: "#374151",
    alignItems: "center",
    paddingBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  profileName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileRole: {
    color: "#D1D5DB",
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 16,
  },
  messageButton: {
    backgroundColor: "#10B981",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 16,
  },
  messageButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
  pricingSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  pricingText: {
    color: "white",
    fontSize: 16,
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingNumber: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  reviewsCount: {
    color: "white",
    fontSize: 16,
  },
  tabsContainer: {
    backgroundColor: "#374151",
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#FCD34D",
  },
  tabText: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "600",
  },
  activeTabText: {
    color: "white",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  rankingCard: {
    backgroundColor: "#F59E0B",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  rankingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  rankingTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  rankingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  rankingInfo: {
    marginLeft: 16,
  },
  rankingText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  rankingCategory: {
    color: "#10B981",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    color: "#10B981",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
  monthlyRankCard: {
    backgroundColor: "#374151",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  monthlyRankHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  monthlyRankTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  pastRankingsButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  pastRankingsText: {
    color: "white",
    fontSize: 14,
    marginRight: 4,
  },
  detailsCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    backgroundColor: "#E5E7EB",
    padding: 12,
    margin: -16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
})

export default CommentatorProfileScreen
