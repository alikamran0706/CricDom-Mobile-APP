import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

const PlayerCard = ({
    title,
    iconSource,
    onPress,
    isSelected,
}: {
    title: string;
    iconSource: any;
    onPress: () => void;
    isSelected: boolean;
}) => {
    return (
        <TouchableOpacity
            className={`flex-1 mx-2 items-center p-4 rounded-xl ${isSelected ? "bg-blue-50 border-2 border-[#0e7ccb]" : "bg-gray-100"
                }`}
            onPress={onPress}
        >
            <Image
                source={iconSource}
                style={{ width: 80, height: 80 }}
                resizeMode="contain"
                className="mb-3"
            />
            <Text className="text-base font-semibold text-gray-700 text-center">
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default PlayerCard