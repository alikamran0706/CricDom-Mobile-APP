import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import React, { useRef } from "react";
import { Alert, Share, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
// import { captureRef } from "react-native-view-shot";
import Modal from "../ui/Modal";

const logo = require('../../assets/images/logo.png');

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
    teamColor = "#0e7ccb",
}: QRCodeModalProps) => {

    const qrRef = useRef(null);
    const shareUrl = `https://yourapp.com/team/${teamId}`;

    const handleShareCode = async () => {
        try {
            const result = await Share.share({
                title: `${teamName} - Team QR Code`,
                message: `Scan this QR code to find ${teamName} (${teamInitials}) from ${teamLocation}!\n\n${shareUrl}`,
                url: shareUrl, // Some platforms use this to show a link preview
            });

            if (result.action === Share.sharedAction) {
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
        }
    };

    const handleDownload = async () => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission required", "Please allow access to your media library.");
                return;
            }

            // const uri = await captureRef(qrRef, {
            //     format: "png",
            //     quality: 1,
            // });

            // const asset = await MediaLibrary.createAssetAsync(uri);
            // await MediaLibrary.createAlbumAsync("Download", asset, false);

            // Alert.alert("Success", "QR Code saved to gallery.");
        } catch (error) {
            Alert.alert("Error", "Failed to save QR Code.");
        }
    };


    const handleShare = () => {
        // Implement share functionality
    }

    return (
        <Modal visible={visible} onClose={onClose} showCloseButton={false} customClass={"h-full w-full"}>
            <View>
                {/* Header with close button */}
                <View className="flex-row justify-between items-center px-6 pt-6">
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                        onPress={onClose}
                    >
                        <Ionicons name="close" size={24} color="#374151" />
                    </TouchableOpacity>

                    <View className="flex-row space-x-4">
                        <TouchableOpacity
                            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                            onPress={handleDownload}
                        >
                            <Ionicons name="download-outline" size={20} color="#0e7ccb" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                            onPress={handleShare}
                        >
                            <Ionicons name="share-outline" size={20} color="#0e7ccb" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    ref={qrRef}
                    collapsable={false}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 24,
                        backgroundColor: '#ffffff'
                    }}
                    className="p-6"
                >
                    {/* Team Info */}
                    <View className="items-center pb-6">
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
                                logo={logo} 
                                logoSize={60}
                                logoBackgroundColor="transparent"
                                logoMargin={2}
                                quietZone={10}
                            />
                        </View>
                    </View>
                    {/* Description */}
                    <Text className="text-center text-gray-700 mb-2 leading-6">
                        Let cricketers find this team easily with the above QR Code.
                    </Text>
                    {/* Team ID */}
                    <Text className="text-center text-gray-500">ID: {teamId}</Text>
                </View>

                {/* Share Button */}
                <TouchableOpacity
                    className="bg-[#0e7ccb] rounded-2xl py-4 items-center mx-6"
                    onPress={handleShareCode}
                >
                    <Text className="text-white font-bold text-lg">SHARE THIS CODE</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default QRCodeModal;
