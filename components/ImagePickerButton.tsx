import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ImagePickerModal from './Modal/ImagePickerModal';

interface Props {
  imageUri: string | null;
  onChangeImage: (uri: string) => void;
  title?: string
}

const ImagePickerButton: React.FC<Props> = ({ imageUri, onChangeImage, title='Upload Player Photo' }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ alignItems: 'center', marginBottom: 24 }}>
      <TouchableOpacity
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          backgroundColor: '#F3F4F6',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: '#D1D5DB'
        }}
        onPress={() => setModalVisible(true)}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: '100%', height: '100%', borderRadius: 48 }}
          />
        ) : (
          <Ionicons name="person" size={32} color="#9CA3AF" />
        )}
      </TouchableOpacity>
      {
        title &&
      <Text style={{ marginTop: 8, color: '#6B7280', fontSize: 14 }}>
        {title}
      </Text>
      }

      <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onImagePicked={onChangeImage}
      />
    </View>
  );
};

export default ImagePickerButton;
