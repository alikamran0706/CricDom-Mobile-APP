import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const RegisterTrainerScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    city: "",
    contactPersonName: "Ali Kamran",
    contactNumber: "",
    serviceDetails: "",
    youtubeLink: "",
    facebookLink: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#C53030" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Physio and Fitness Trainer</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Photo Upload Section */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <View style={styles.photoPlaceholder}>
              <Ionicons name="camera" size={40} color="#C53030" />
            </View>
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={16} color="white" />
            </View>
          </View>
          <Text style={styles.photoText}>Add Photo</Text>
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
            <Text style={styles.label}>
              Address <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(value) => handleInputChange("address", value)}
              placeholder="Enter address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              City <Text style={styles.required}>*</Text>
            </Text>
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
              value={formData.contactPersonName}
              onChangeText={(value) => handleInputChange("contactPersonName", value)}
              placeholder="Enter contact person name"
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

          {/* Additional Photo Upload */}
          <View style={styles.additionalPhotoSection}>
            <TouchableOpacity style={styles.addPhotoButton}>
              <Ionicons name="add" size={24} color="#999" />
            </TouchableOpacity>
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </View>
        </View>
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  photoSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "white",
  },
  photoContainer: {
    position: "relative",
    marginBottom: 12,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#e5e5e5",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#C53030",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  photoText: {
    color: "#C53030",
    fontSize: 16,
    fontWeight: "600",
  },
  formSection: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: "#999",
    marginBottom: 8,
  },
  required: {
    color: "#C53030",
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
    padding: 16,
    fontSize: 16,
    color: "#333",
    minHeight: 120,
  },
  additionalPhotoSection: {
    alignItems: "center",
    paddingVertical: 24,
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    marginBottom: 8,
  },
  addPhotoText: {
    color: "#999",
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: "#10B981",
    margin: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
})

export default RegisterTrainerScreen
