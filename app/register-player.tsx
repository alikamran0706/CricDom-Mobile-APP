import ImagePickerButton from "@/components/ImagePickerButton"
import Input from "@/components/ui/Input"
import { battingStyles, bowlingStyles, gameTypes, positions } from "@/constants/player"
import { getFullStrapiUrl, sanitizeObject } from "@/lib/utils/common"
import type { RootState } from "@/store"
import { showAlert } from "@/store/features/alerts/alertSlice"
import {
    useCreatePlayerMutation,
    useGetPlayerByIdQuery,
    useUpdatePlayerMutation,
} from "@/store/features/player/playerApi"
import { useUploadFileMutation } from "@/store/features/upload/uploadApi"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"

export default function CreatePlayerScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const navigation = useNavigation()

  const {
    data,
    isLoading: loading,
    refetch,
  } = useGetPlayerByIdQuery(id!, {
    skip: !id,
  })
  const player = data?.data
  const dispatch = useDispatch()
  const [createPlayer, { isLoading, isError, error, isSuccess }] = useCreatePlayerMutation()
  const [updatePlayer, { isLoading: isUpdating }] = useUpdatePlayerMutation()
  const [uploadFile] = useUploadFileMutation()
  const profile = useSelector((state: RootState) => state.user.profile)

  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = 3

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    image: null as string | null,

    batting_style: "",
    bowling_style: "",
    position: "",
    game_type: "",
  })

  const [showBattingDropdown, setShowBattingDropdown] = useState(false)
  const [showBowlingDropdown, setShowBowlingDropdown] = useState(false)
  const [showPositionDropdown, setShowPositionDropdown] = useState(false)
  const [showGameTypeDropdown, setShowGameTypeDropdown] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  useEffect(() => {
    if (player) {
      setFormData({
        name: player.name || "",
        phone_number: player.phone_number || "",
        image: null, // Assuming you let user upload new image, or populate existing later
        batting_style: player.batting_style || "",
        bowling_style: player.bowling_style || "",
        position: player.position || "",
        game_type: player.game_type || "",
      })
    }
  }, [player])

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Basic Info
        if (!formData.name.trim()) {
          dispatch(
            showAlert({
              type: "error",
              message: "Please enter player name",
            }),
          )
          return false
        }
        if (!formData.phone_number.trim()) {
          dispatch(
            showAlert({
              type: "error",
              message: "Please enter phone number",
            }),
          )
          return false
        }
        return true
      case 1: // Playing Style
        return true // Optional fields
      case 2: // Review
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const uploadImageAndGetId = async (): Promise<number | null> => {
    if (!formData.image) return null

    try {
      const imageId = await uploadFile({ image: formData.image })
        .unwrap()
        .then((res) => res[0]?.id)
      return imageId
    } catch (uploadError) {
      dispatch(
        showAlert({
          type: "error",
          message: "Could not upload the image.",
        }),
      )
      return null
    }
  }

  const handleCreatePlayer = async () => {
    const cleanedData = sanitizeObject(formData)
    if (!cleanedData?.name?.trim()) {
      dispatch(
        showAlert({
          type: "error",
          message: "Please enter player name",
        }),
      )
      return
    }

    if (!cleanedData?.phone_number?.trim()) {
      dispatch(
        showAlert({
          type: "error",
          message: "Please enter phone number",
        }),
      )
      return
    }

    let imageId: number | null = null
    if (cleanedData?.image) {
      imageId = await uploadImageAndGetId()
      if (!imageId) return // Stop if upload failed
    }

    const playerData = {
      ...cleanedData,
      ...(imageId && { image: imageId }),
      ...(profile && { user: profile.documentId }),
    }

    try {
      if (id) await updatePlayer({ id, data: playerData }).unwrap()
      else await createPlayer({ data: playerData }).unwrap()

      dispatch(
        showAlert({ type: "success", message: id ? "Player updated successfully!" : "Player created successfully!" }),
      )
      router.replace({
        pathname: "/profile",
        params: { refetch: "true" },
      })
    } catch (error: any) {
      dispatch(
        showAlert({
          type: "error",
          message: error?.response?.data || error.message || isError || "An unknown error occurred.",
        }),
      )
    }
  }

  const Dropdown = ({
    label,
    value,
    options,
    onSelect,
    showDropdown,
    onToggle,
    required = false,
  }: {
    label: string
    value: string
    options: string[]
    onSelect: (value: any) => void
    showDropdown: boolean
    required?: boolean
    onToggle: () => void
  }) => (
    <View style={{ marginBottom: 16 }}>
      <Text className="text-base font-medium text-gray-800 mb-2">
        {label}
        {required && <Text className="text-red-600"> *</Text>}
      </Text>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "#D1D5DB",
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={onToggle}
      >
        <Text style={{ fontSize: 16, color: value ? "#000" : "#9CA3AF" }}>
          {value || `Select ${label.toLowerCase()}`}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {showDropdown && (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 8,
            marginTop: 4,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#F3F4F6",
              }}
              onPress={() => {
                onSelect(option)
                onToggle()
              }}
            >
              <Text style={{ fontSize: 16, color: "#000" }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )

  const StepIndicator = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 16,
      }}
    >
      {Array.from({ length: totalSteps }, (_, index) => (
        <React.Fragment key={index}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: index <= currentStep ? "#3B82F6" : "#E5E7EB",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: index <= currentStep ? "white" : "#9CA3AF",
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              {index + 1}
            </Text>
          </View>
          {index < totalSteps - 1 && (
            <View
              style={{
                width: 40,
                height: 2,
                backgroundColor: index < currentStep ? "#3B82F6" : "#E5E7EB",
                marginHorizontal: 8,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View>
            <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8, textAlign: "center" }}>
              Basic Information
            </Text>
            <Text style={{ fontSize: 16, color: "#6B7280", marginBottom: 32, textAlign: "center" }}>
              Let's start with the player's basic details
            </Text>

            {/* Player Image Upload */}
            <View style={{ alignItems: "center", marginBottom: 24 }}>
              <ImagePickerButton
                imageUri={player?.image ? getFullStrapiUrl(player?.image.url) : formData.image}
                onChangeImage={(uri) => setFormData((prev) => ({ ...prev, image: uri }))}
              />
            </View>

            {/* Player Name */}
            <Input
              label="Player Name"
              value={formData.name}
              onChangeText={(name) => setFormData((prev) => ({ ...prev, name }))}
              placeholder="Enter player name"
              required={true}
            />

            {/* Phone Number */}
            <Input
              label="Phone Number"
              value={formData.phone_number}
              onChangeText={(phone_number) => setFormData((prev) => ({ ...prev, phone_number }))}
              placeholder="Enter phone number"
              required={true}
              keyboardType="phone-pad"
            />
          </View>
        )

      case 1:
        return (
          <View>
            <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8, textAlign: "center" }}>Playing Style</Text>
            <Text style={{ fontSize: 16, color: "#6B7280", marginBottom: 32, textAlign: "center" }}>
              Tell us about the player's cricket skills
            </Text>

            {/* Position */}
            <Dropdown
              label="Position"
              value={formData.position}
              options={positions}
              onSelect={(value) => setFormData((prev) => ({ ...prev, position: value }))}
              showDropdown={showPositionDropdown}
              onToggle={() => {
                setShowPositionDropdown(!showPositionDropdown)
                setShowBattingDropdown(false)
                setShowBowlingDropdown(false)
                setShowGameTypeDropdown(false)
              }}
            />

            {/* Batting Style */}
            <Dropdown
              label="Batting Style"
              value={formData.batting_style}
              options={battingStyles}
              onSelect={(value) => setFormData((prev) => ({ ...prev, batting_style: value }))}
              showDropdown={showBattingDropdown}
              onToggle={() => {
                setShowBattingDropdown(!showBattingDropdown)
                setShowPositionDropdown(false)
                setShowBowlingDropdown(false)
                setShowGameTypeDropdown(false)
              }}
            />

            {/* Bowling Style */}
            <Dropdown
              label="Bowling Style"
              value={formData.bowling_style}
              options={bowlingStyles}
              onSelect={(value) => setFormData((prev) => ({ ...prev, bowling_style: value }))}
              showDropdown={showBowlingDropdown}
              onToggle={() => {
                setShowBowlingDropdown(!showBowlingDropdown)
                setShowPositionDropdown(false)
                setShowBattingDropdown(false)
                setShowGameTypeDropdown(false)
              }}
            />

            {/* Game Type */}
            <Dropdown
              label="Game Type"
              value={formData.game_type}
              options={gameTypes}
              onSelect={(value) => setFormData((prev) => ({ ...prev, game_type: value }))}
              showDropdown={showGameTypeDropdown}
              onToggle={() => {
                setShowGameTypeDropdown(!showGameTypeDropdown)
                setShowPositionDropdown(false)
                setShowBattingDropdown(false)
                setShowBowlingDropdown(false)
              }}
            />
          </View>
        )

      case 2:
        return (
          <View>
            <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8, textAlign: "center" }}>
              Review & Confirm
            </Text>
            <Text style={{ fontSize: 16, color: "#6B7280", marginBottom: 32, textAlign: "center" }}>
              Please review the player information before submitting
            </Text>

            <View
              style={{
                backgroundColor: "#F9FAFB",
                borderRadius: 12,
                padding: 20,
                marginBottom: 24,
              }}
            >
              {/* Player Image Preview */}
              {(formData.image || player?.image) && (
                <View style={{ alignItems: "center", marginBottom: 16 }}>
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      backgroundColor: "#E5E7EB",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="person" size={40} color="#9CA3AF" />
                  </View>
                </View>
              )}

              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 4 }}>Name</Text>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{formData.name || "Not specified"}</Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 4 }}>Phone Number</Text>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{formData.phone_number || "Not specified"}</Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 4 }}>Position</Text>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{formData.position || "Not specified"}</Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 4 }}>Batting Style</Text>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{formData.batting_style || "Not specified"}</Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 4 }}>Bowling Style</Text>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{formData.bowling_style || "Not specified"}</Text>
              </View>

              <View>
                <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 4 }}>Game Type</Text>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{formData.game_type || "Not specified"}</Text>
              </View>
            </View>
          </View>
        )

      default:
        return null
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#E5E7EB",
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 16 }}>
            {id ? "Edit Player" : "Create Player"}
          </Text>
        </View>

        {/* Step Indicator */}
        <StepIndicator />

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingBottom: 120 }}>
            <View style={{ paddingVertical: 24 }}>{renderStepContent()}</View>
          </ScrollView>
        )}

        {/* Navigation Buttons */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {currentStep > 0 && (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F3F4F6",
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                marginRight: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handlePrevious}
            >
              <Ionicons name="chevron-back" size={20} color="#374151" />
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#374151", marginLeft: 4 }}>Previous</Text>
            </TouchableOpacity>
          )}

          {currentStep < totalSteps - 1 ? (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#3B82F6",
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                marginLeft: currentStep > 0 ? 8 : 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleNext}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", color: "white", marginRight: 4 }}>Next</Text>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#10B981",
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                marginLeft: currentStep > 0 ? 8 : 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                opacity: isLoading || isUpdating ? 0.7 : 1,
              }}
              onPress={handleCreatePlayer}
              disabled={isLoading || isUpdating}
            >
              {isLoading || isUpdating ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Ionicons name="checkmark" size={20} color="white" />
                  <Text style={{ fontSize: 16, fontWeight: "600", color: "white", marginLeft: 4 }}>
                    {id ? "Update Player" : "Create Player"}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}
