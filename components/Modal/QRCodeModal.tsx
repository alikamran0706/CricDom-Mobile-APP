import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Share, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Modal from "../ui/Modal";

interface QRCodeModalProps {
  visible: boolean;
  onClose: () => void;
  teamName: string;
  teamLocation: string;
  teamId: string;
  teamInitials: string;
  teamColor?: string;
}

const QRCodeModal = ({
  visible,
  onClose,
  teamName,
  teamLocation,
  teamId,
  teamInitials,
  teamColor = "#3B82F6",
}: QRCodeModalProps) => {
  const shareUrl = `https://yourapp.com/team/${teamId}`; // Your team URL here

  const handleShareCode = async () => {
    try {
      const result = await Share.share({
        title: `${teamName} - Team QR Code`,
        message: `Scan this QR code to find ${teamName} (${teamInitials}) from ${teamLocation}!\n\n${shareUrl}`,
        url: shareUrl, // Some platforms use this to show a link preview
      });

      if (result.action === Share.sharedAction) {
        console.log("Content shared!");
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Modal visible={visible} onClose={onClose} showCloseButton={false} customClass={"h-full w-full"}>
      <View className="p-6">
        {/* Header with close button */}
        <View className="flex-row justify-between items-center mb-8">
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Team Info */}
        <View className="items-center mb-8">
          <View
            className="w-20 h-20 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: teamColor }}
          >
            <Text className="text-white text-2xl font-bold">{teamInitials}</Text>
          </View>
          <Text className="text-xl font-bold text-gray-900 mb-1">{teamName}</Text>
          <Text className="text-gray-600">{teamLocation}</Text>
        </View>

        {/* Real QR Code */}
        <View className="items-center mb-6">
          <View
            style={{
              width: 256,
              height: 256,
              backgroundColor: "white",
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <QRCode
              value={shareUrl}
              size={256}
              backgroundColor="white"
              color={teamColor}
            />

            {/* Cricket Ball Logo in Center */}
            <View
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 48,
                height: 48,
                marginLeft: -24,
                marginTop: -24,
                backgroundColor: "white",
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 4,
                    backgroundColor: "white",
                    borderRadius: 2,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    width: 4,
                    height: 24,
                    backgroundColor: "white",
                    borderRadius: 2,
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Description */}
        <Text className="text-center text-gray-700 mb-2 leading-6">
          Let cricketers find this team easily with the above QR Code.
        </Text>

        {/* Team ID */}
        <Text className="text-center text-gray-500 mb-8">ID: {teamId}</Text>

        {/* Share Button */}
        <TouchableOpacity
          className="bg-[#0e7ccb] rounded-2xl py-4 items-center"
          onPress={handleShareCode}
        >
          <Text className="text-white font-bold text-lg">SHARE THIS CODE</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default QRCodeModal;
