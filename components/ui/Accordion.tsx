// components/Accordion.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface AccordionProps {
    title?: string;
    children: ReactNode;
    headerComponent?: any;
    initiallyOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title='Accordion Title', children, initiallyOpen = true, headerComponent = null }) => {
    const [isOpen, setIsOpen] = useState(initiallyOpen);

    return (
        <View className="mb-4 bg-white border border-gray-100">
            <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                className="flex-row justify-between items-center p-4 border-b border-gray-200"
            >
                {
                    headerComponent ? (
                        headerComponent
                    ) : (
                        <Text className="text-md font-bold text-gray-800">{title}</Text>
                    )
                }
                <Ionicons
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#666"
                />
            </TouchableOpacity>
            {isOpen && <View className="py-2">{children}</View>}
        </View>
    );
};

export default Accordion;
