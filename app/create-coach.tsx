import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const RegisterCoachingScreen = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    city: "",
    contactName: "Ali Kamran",
    contactNumber: "",
    serviceDetails: "",
    youtubeLink: "",
    facebookLink: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Personal Coaching</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Photo Upload */}
        <View style={styles.photoSection}>
          <View style={styles.photoPlaceholder}>
            <View style={styles.logoCircle}>
              <Ionicons name="fitness" size={40} color="#666" />
            </View>
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={16} color="white" />
            </View>
          </View>
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Company Name*</Text>
            <TextInput
              style={styles.input}
              value={formData.companyName}
              onChangeText={(value) => handleInputChange("companyName", value)}
              placeholder="Enter company name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address*</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(value) => handleInputChange("address", value)}
              placeholder="Enter address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City*</Text>
            <TextInput
              style={styles.input}
              value={formData.city}
              onChangeText={(value) => handleInputChange("city", value)}
              placeholder="Enter city"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Person Name*</Text>
            <TextInput
              style={styles.input}
              value={formData.contactName}
              onChangeText={(value) => handleInputChange("contactName", value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Number*</Text>
            <TextInput
              style={styles.input}
              value={formData.contactNumber}
              onChangeText={(value) => handleInputChange("contactNumber", value)}
              placeholder="Enter contact number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.textArea}
              value={formData.serviceDetails}
              onChangeText={(value) => handleInputChange("serviceDetails", value)}
              placeholder="Add more details about your service, like Facilities, Timing, etc."
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>YouTube Channel Link</Text>
            <TextInput
              style={styles.input}
              value={formData.youtubeLink}
              onChangeText={(value) => handleInputChange("youtubeLink", value)}
              placeholder="Enter YouTube channel link"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Facebook Page Link</Text>
            <TextInput
              style={styles.input}
              value={formData.facebookLink}
              onChangeText={(value) => handleInputChange("facebookLink", value)}
              placeholder="Enter Facebook page link"
            />
          </View>
        </View>
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  photoSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  photoPlaceholder: {
    position: "relative",
    marginBottom: 12,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#C53030",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoText: {
    fontSize: 16,
    color: "#C53030",
    fontWeight: "500",
  },
  formSection: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    height: 120,
    fontSize: 14,
    color: "#666",
  },
  nextButton: {
    backgroundColor: "#00BFA5",
    paddingVertical: 16,
    alignItems: "center",
    margin: 16,
    borderRadius: 8,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default RegisterCoachingScreen
