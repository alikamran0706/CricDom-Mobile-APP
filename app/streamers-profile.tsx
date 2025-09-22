import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const StreamerProfileScreen = ({ navigation, route }: any) => {
  const [activeTab, setActiveTab] = useState("MATCH VIDEOS")
  const streamer = route?.params?.streamer || {
    name: "TheExtreme Media",
    role: "Live Stream Provider",
    pricing: "₹12000/day, 6500/match",
    rating: 5.0,
    reviews: 30,
    logo: "/public/extreme-media-logo.jpg",
  }

  const matchVideos = [
    {
      id: 1,
      title: "ROYAL REDDY BROTHERS VS REDDYS SUPER STRIKERS VERRAS",
      league: "Bangalore East Reddy Cricket League (BERCL)",
      venue: "M S B TURF ..., Bengaluru (Bang...)",
      date: "14-Sep-25",
      thumbnail: "/public/cricket-match-thumbnail-1.jpg",
    },
    {
      id: 2,
      title: "ROYAL REDDY BROTHERS VS REDDYS SUPER STRIKERS VERRAS",
      league: "Bangalore East Reddy Cricket League (BERCL)",
      venue: "M S B TURF ..., Bengaluru (Bang...)",
      date: "14-Sep-25",
      thumbnail: "/public/cricket-match-thumbnail-2.jpg",
    },
  ]

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
        <Image source={{ uri: streamer.logo }} style={styles.profileImage} />
        <Text style={styles.profileName}>{streamer.name}</Text>
        <Text style={styles.profileRole}>{streamer.role}</Text>

        <TouchableOpacity style={styles.messageButton}>
          <Ionicons name="chatbubble-outline" size={20} color="white" />
          <Text style={styles.messageButtonText}>MESSAGE</Text>
        </TouchableOpacity>

        <View style={styles.pricingSection}>
          <Text style={styles.pricingText}>{streamer.pricing}</Text>
          <View style={styles.ratingSection}>
            <Text style={styles.ratingNumber}>{streamer.rating}</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name="star" size={16} color="#FCD34D" />
              ))}
            </View>
            <Text style={styles.reviewsCount}>({streamer.reviews})</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["ABOUT", "REVIEWS", "MATCH VIDEOS"].map((tab) => (
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
        {/* Match Videos Section */}
        <Text style={styles.sectionTitle}>*Matches streamed by this streamer.</Text>

        <View style={styles.videosList}>
          {matchVideos.map((video) => (
            <TouchableOpacity key={video.id} style={styles.videoCard}>
              <Image source={{ uri: video.thumbnail }} style={styles.videoThumbnail} />
              <View style={styles.playButton}>
                <Ionicons name="play" size={24} color="white" />
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoLeague}>{video.league}</Text>
                <Text style={styles.videoVenue}>{video.venue}</Text>
                <Text style={styles.videoDate}>{video.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    width: 80,
    height: 80,
    borderRadius: 40,
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
  sectionTitle: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 16,
  },
  videosList: {
    gap: 16,
  },
  videoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoThumbnail: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  playButton: {
    position: "absolute",
    top: 80,
    left: "50%",
    marginLeft: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(239, 68, 68, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  videoLeague: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  videoVenue: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  videoDate: {
    fontSize: 14,
    color: "#666",
  },
})

export default StreamerProfileScreen
