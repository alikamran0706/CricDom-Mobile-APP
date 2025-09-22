import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Tabs = ({ tabs = [], activeTab = '', onTabPress }: any) => {
    const [activeFilter, setActiveFilter] = useState(activeTab);
    return (
        <View className="mx-4 mt-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                {tabs.map((tab: string) => (
                    <TouchableOpacity
                        key={tab}
                        className={`px-4 py-2 rounded-full mr-3 ${activeFilter === tab ? "bg-[#0e7ccb]" : "bg-gray-200"}`}
                        onPress={() => setActiveFilter(tab)}
                    >
                        <Text className={`font-medium ${activeFilter === tab ? "text-white" : "text-gray-700"}`}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Tabs