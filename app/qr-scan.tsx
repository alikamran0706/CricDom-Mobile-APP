import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Button, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QRScanner = () => {
    const [facing, setFacing] = useState<any>("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to access the camera</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }

    const handleScan = ({ data, type }: any) => {
        if (!scanned) {
            setScanned(true);
            Alert.alert("Scanned Data", `${data}`);
            setTimeout(() => setScanned(false), 3000);
        }
    };

    const toggleCameraFacing = () => {
        setFacing((prev: any) => (prev === "back" ? "front" : "back"));
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            const selectedImage = result.assets[0];
            // Placeholder: Replace this with real QR code scanning from image
            Alert.alert("Image Selected", `URI: ${selectedImage.uri}`);
        }
    };

    return (
        <View style={styles.container}>
            {Platform.OS !== "web" ? (
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e", "code39", "code128"]
                    }}
                    onBarcodeScanned={handleScan}
                >
                    <View style={styles.overlay}>
                        <View style={styles.scanArea} />
                    </View>

                    {/* Top Right Upload Button */}
                    <View style={styles.topRightButtonContainer}>
                        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                            <Text style={styles.buttonText}>Upload</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bottom Flip Button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <Text style={styles.buttonText}>Flip Camera</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )
                :
                <Text>QR Scanner is not available on web</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    message: { textAlign: "center", marginTop: 20 },
    camera: { flex: 1 },
    buttonContainer: {
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
    },
    topRightButtonContainer: {
        position: "absolute",
        top: 2,
        right: 20,
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    uploadButton: {
        backgroundColor: "#333",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    scanArea: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10
    },
});

export default QRScanner;
