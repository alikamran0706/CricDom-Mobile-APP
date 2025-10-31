import ImagePickerButton from "@/components/ImagePickerButton"
import FloatingActionButton from "@/components/ui/FloatingActionButton"
import Header from "@/components/ui/Header"
import Input from "@/components/ui/Input"
import { ballTypes } from "@/constants/match"
import { battingStyles, bowlingStyles, positions } from "@/constants/player"
import { getFullStrapiUrl, sanitizeObject } from "@/lib/utils/common"
import type { RootState } from "@/store"
import { showAlert } from "@/store/features/alerts/alertSlice"
import {
  useCreatePlayerMutation,
  useUpdatePlayerMutation
} from "@/store/features/player/playerApi"
import { useUploadFileMutation } from "@/store/features/upload/uploadApi"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router"
import React, { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react"
import { ActivityIndicator, Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"

const PhoneNumberInputComp = Platform.OS !== "web"
  ? lazy(() => import("@/components/ui/PhoneNumberInput"))
  : (() => null) as React.FC<any>;

export default function CreatePlayerScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  let player: any = null;

  if (params?.player) {
    try {
      player = JSON.parse(params.player as string);
    } catch (err) {
      console.warn("❌ Failed to parse player param:", err);
    }
  }

  const id = player?.documentId;

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [createPlayer, { isLoading, isError, error, isSuccess }] = useCreatePlayerMutation();
  const [updatePlayer, { isLoading: isUpdating }] = useUpdatePlayerMutation();
  const [uploadFile] = useUploadFileMutation();
  const profile = useSelector((state: RootState) => state.user.profile);

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    image: null as string | null,

    batting_style: "",
    bowling_style: "",
    position: "",
    game_type: [] as string[],
  })

  const [showBattingDropdown, setShowBattingDropdown] = useState(false)
  const [showBowlingDropdown, setShowBowlingDropdown] = useState(false)
  const [showPositionDropdown, setShowPositionDropdown] = useState(false)
  const [showGameTypeDropdown, setShowGameTypeDropdown] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  // console.log(formData)

  useEffect(() => {
    if (!player) return;
    setFormData({
      name: player.
        name || "",
      phone_number: player.phone_number || "",
      image: null,
      batting_style: player.batting_style || "",
      bowling_style: player.bowling_style || "",
      position: player.position || "",
      game_type: player.game_type || [],
    });
  }, []);


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
    const { game_type, ...rest } = formData;
    const cleanedData = sanitizeObject(rest)
    if (!cleanedData?.name?.trim()) {
      dispatch(
        showAlert({
          type: "error",
          message: "Please enter player name",
        }),
      )
      return
    }

    if (!formData.phone_number?.trim()) {
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

  const getStepLabel = (index: number) => {
    switch (index) {
      case 0:
        return "Basic Info";
      case 1:
        return "Playing Style";
      case 2:
        return "Review";
      default:
        return "";
    }
  }

  const StepIndicator = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 6,
        paddingHorizontal: 16,
      }}
    >
      {Array.from({ length: totalSteps }, (_, index) => (
        <React.Fragment key={index}>
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: index <= currentStep ? "#0e7ccb" : "#E5E7EB",
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
            {/* Add label under step */}
            <Text style={{
              marginTop: 4,
              fontSize: 12,
              color: index <= currentStep ? "#0e7ccb" : "#9CA3AF",
              textAlign: 'center',
              width: 60,
            }}>
              {getStepLabel(index)}
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
                imageUri={formData.image || getFullStrapiUrl(player?.image.url)}
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
            {
              Platform.OS === 'web' ?
                <Input
                  label="Phone Number"
                  value={formData.phone_number}
                  onChangeText={(phone_number) => setFormData((prev) => ({ ...prev, phone_number }))}
                  placeholder="Enter phone number"
                  required={true}
                  keyboardType="phone-pad"
                />
                :
                <Suspense fallback={<ActivityIndicator size="small" color="#0e7ccb" />}>
                  <PhoneNumberInputComp
                    value={formData.phone_number}
                    onChange={(number: string) =>
                      setFormData((prev) => ({ ...prev, phone_number: number }))
                    }
                    label="Contact Number"
                    required={true}
                    placeholder="e.g. +1 123 456 7890"
                  />
                </Suspense>

              // <View>
              //   <Text className="text-base font-medium text-gray-800 mb-2">
              //     Phone Number <Text className="text-red-600"> *</Text>
              //   </Text>
              //   <PhoneInput
              //     initialCountry={countryCode.toLowerCase()}
              //     ref={phoneInputRef}
              //     onChangePhoneNumber={(number) => setPhoneNumber(number)}
              //     onPressFlag={toggleCountryPicker}
              //     textProps={{ placeholder: 'Enter a phone number...' }}
              //     style={styles.phoneInput}
              //     textStyle={styles.phoneInputText}
              //   />
              // </View>
            }
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

            {/* Batting Style Selection */}
            <Text className="text-base font-semibold text-gray-800 mb-3">Batting Style</Text>
            <View className="flex-row justify-around mb-6">
              {battingStyles.map((batting) => (
                <TouchableOpacity
                  key={batting.value}
                  className={`items-center p-4 ${formData.batting_style === batting.value ? "bg-blue-100 rounded-lg" : ""}`}
                  onPress={() => setFormData(prev => ({ ...prev, batting_style: batting.value }))}
                >
                  <Image
                    source={batting.image}
                    style={{
                      width: 35,
                      height: 35,
                      tintColor: '#6b7280',
                      resizeMode: 'contain',
                    }}
                  />
                  <Text className="text-xs font-semibold text-gray-700 mt-2">{batting.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Ball Type Selection */}
            <Text className="text-base font-semibold text-gray-800 mb-3">Game Type</Text>
            <View className="flex-row justify-around mb-6 flex-wrap">
              {ballTypes.map((ball) => {
                const isSelected = formData.game_type.includes(ball.type);
                const iconName = isSelected ? 'checkmark' : ball.icon;

                return (
                  <TouchableOpacity
                    key={ball.type}
                    className="items-center m-2"
                    onPress={() => {
                      setFormData(prev => {
                        const selected = prev.game_type.includes(ball.type)
                          ? prev.game_type.filter(t => t !== ball.type)
                          : [...prev.game_type, ball.type];
                        return { ...prev, game_type: selected };
                      });
                    }}
                  >
                    <View
                      className={`
                                     w-16 h-16 rounded-full items-center justify-center mb-2 
                                     ${isSelected ? 'bg-blue-100 border border-[#0e7ccb]' : 'bg-white border border-gray-200'}
                                   `}
                    >
                      <Ionicons
                        name={iconName as any}
                        size={24}
                        color={isSelected ? '#0e7ccb' : ball.color}
                      />
                    </View>
                    <Text className="text-gray-800 font-medium">{ball.type}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )

      case 2:
        return (
          <View>
            <Text style={{
              fontSize: 24, fontWeight: "700", marginBottom: 8,
              textAlign: "center", color: 'black'
            }}
            >
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
                      borderColor: "#E5E7EB",
                      borderWidth: 1,
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={
                        formData.image
                          ? { uri: formData.image }
                          : player?.image?.url
                            ? { uri: getFullStrapiUrl(player.image.url) }
                            : undefined
                      }
                      style={{ width: "70%", height: "70%" }}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              )}


              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: "black", marginBottom: 4 }}>Name</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#6B7280" }}>{formData.name || "Not specified"}</Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: "black", marginBottom: 4 }}>Phone Number</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#6B7280" }}>{formData.phone_number || "Not specified"}</Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: "black", marginBottom: 4 }}>Position</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#6B7280" }}>{formData.position || "Not specified"}</Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: "black", marginBottom: 4 }}>Batting Style</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#6B7280" }}>{formData.batting_style || "Not specified"}</Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: "black", marginBottom: 4 }}>Bowling Style</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#6B7280" }}>{formData.bowling_style || "Not specified"}</Text>
              </View>

              <View>
                <Text style={{ fontSize: 14, color: "black", marginBottom: 4 }}>Game Type</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#6B7280" }}>{formData.game_type || "Not specified"}</Text>
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
        <Header heading='Create Player' />

        {/* Step Indicator */}
        <StepIndicator />

        {(
          <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingBottom: 120 }}>
            <View style={{ paddingVertical: 24 }}>{renderStepContent()}</View>
          </ScrollView>
        )}

        {/* Navigation Buttons */}
        <View >
          {(currentStep > 0 && currentStep < totalSteps - 1) ? (
            <View className="bg-white p-4">
              <View className="flex-row gap-x-3">
                <TouchableOpacity
                  className="flex-1 rounded-xl py-4 items-center bg-[#d1d5db] flex-row justify-center"
                  onPress={handlePrevious}
                >
                  <Ionicons name="chevron-back" size={20} color="black" />
                  <Text className="text-black font-bold ml-2">Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 bg-[#0e7ccb] rounded-xl py-4 items-center flex-row justify-center"
                  onPress={handleNext}>
                  <Text className="text-white font-bold mr-2">Next</Text>
                  <Ionicons name="chevron-forward" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (currentStep < totalSteps - 1) &&
          <FloatingActionButton
            label="Next"
            iconName="chevron-forward"
            iconPosition='right'
            backgroundColor='#0e7ccb'
            textColor='white'
            iconColor='white'
            onPress={handleNext}
            loading={isLoading}
            disabled={isLoading}
          />
          }

          {currentStep === totalSteps - 1 && (
            <View className="bg-white p-4">
              <View className="flex-row gap-x-3">
                <TouchableOpacity
                  className="flex-1 rounded-xl py-4 items-center bg-[#d1d5db] flex-row justify-center"
                  onPress={handlePrevious}
                >
                  <Ionicons name="chevron-back" size={20} color="black" />
                  <Text className="text-black font-bold ml-2">Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={isLoading || isUpdating} className="flex-1 flex-row bg-[#0e7ccb] rounded-xl py-4 items-center justify-center" onPress={handleCreatePlayer}>
                  {isLoading || isUpdating ? (
                    <ActivityIndicator size="small" color="white" />
                  )
                    :
                    (
                      <>
                        <Ionicons name="checkmark" size={20} color="white" />
                        <Text className="text-white font-bold"> {id ? "Update Player" : "Create Player"}</Text>
                      </>
                    )
                  }
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

