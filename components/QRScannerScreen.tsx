import { decode } from 'base64-arraybuffer';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';

export default function QRFromGallery() {
  const [image, setImage] = useState<string | null>(null);

  const pickImageAndScan = async () => {
    try {
      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
      });

      if (result.cancelled || !result.base64) return;

      const { width, height, base64 } = result;

      const rawImageData = decode(base64); // decode base64 to Uint8Array
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // This part requires a workaround in React Native (see note below 👇)

    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View className="p-6">
      <Button title="Pick QR Code from Gallery" onPress={pickImageAndScan} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 16 }} />}
    </View>
  );
}
