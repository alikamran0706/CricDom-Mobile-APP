// components/ui/AvatarImage.tsx

import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ImageStyle, View } from 'react-native';

interface AvatarImageProps {
    uri?: string;
    size?: number;           // default: 48
    borderColor?: string;    // default: #E5E7EB (gray-200)
    borderWidth?: number;    // default: 1
    rounded?: boolean;       // true = full circle
    iconName?: string;       // default: "ios-football"
    iconSize?: number;
    backgroundColor?: string;
    borderRadius?: string | number
    extraStyle?: any;
}

const AvatarImage: React.FC<AvatarImageProps> = ({
    uri,
    size = 48,
    borderColor = '#E5E7EB',
    borderWidth = 1,
    rounded = true,
    iconName = "sports-cricket",
    iconSize,
    backgroundColor = '#F3F4F6',
    borderRadius = rounded ? size / 2 : 8,
    extraStyle = {}
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const containerStyle: ImageStyle = {
        width: size,
        height: size,
        borderRadius,
        borderWidth,
        borderColor,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    };

    const imageStyle: ImageStyle = {
        width: size,
        height: size,
        borderRadius,
    };

    const isFullUrl = uri?.startsWith('http://') || uri?.startsWith('https://');
    const fullUri = isFullUrl ? uri : `${process.env.EXPO_PUBLIC_HOST}${uri?.startsWith('/') ? uri : `/${uri}`}`;
    if (!uri || error) {
        return (
            <View style={[containerStyle, extraStyle]}>
                <MaterialIcons name={iconName as any} size={iconSize || size / 2} color="#9CA3AF" />
            </View>
        );
    }

    return (
        <View style={[containerStyle, extraStyle]}>
            {loading && (
                <ActivityIndicator size="small" color="#0e7ccb" style={{ position: 'absolute' }} />
            )}
            <Image
                source={{ uri: fullUri }}
                style={imageStyle}
                onLoadEnd={() => setLoading(false)}
                onError={() => {
                    setLoading(false);
                    setError(true);
                }}
            />
        </View>
    );
};

export default AvatarImage;
