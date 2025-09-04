import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRouter } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface PricingPlan {
    id: string
    name: string
    price: string
    duration: string
    features: string[]
    isPopular?: boolean
    originalPrice?: string
}

const SubscribeProScreen = () => {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState("monthly");
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const pricingPlans: PricingPlan[] = [
        {
            id: "monthly",
            name: "Monthly",
            price: "$9.99",
            duration: "/month",
            features: [
                "Player Comparison",
                "Advanced Statistics",
                "Unlimited Tournaments",
                "Live Streaming",
                "Priority Support",
            ],
        },
        {
            id: "yearly",
            name: "Yearly",
            price: "$79.99",
            duration: "/year",
            originalPrice: "$119.88",
            isPopular: true,
            features: [
                "All Monthly Features",
                "Save 33%",
                "Exclusive Challenges",
                "Advanced Analytics",
                "Premium Badges",
                "Early Access Features",
            ],
        },
    ]

    const proFeatures = [
        {
            icon: "stats-chart",
            title: "Advanced Statistics",
            description: "Detailed performance analytics and insights",
        },
        {
            icon: "people",
            title: "Player Comparison",
            description: "Compare stats between any two players",
        },
        {
            icon: "trophy",
            title: "Unlimited Tournaments",
            description: "Create and participate in unlimited tournaments",
        },
        {
            icon: "videocam",
            title: "Live Streaming",
            description: "Stream your matches live to the community",
        },
        {
            icon: "shield-checkmark",
            title: "Priority Support",
            description: "Get priority customer support and assistance",
        },
        {
            icon: "star",
            title: "Exclusive Content",
            description: "Access to premium challenges and features",
        },
    ]

    const handleSubscribe = () => {
        router.back()
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            {/* Header */}
            <View className="bg-red-600 px-4 py-3">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-white">Subscribe PRO</Text>
                    <View className="w-6" />
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View className="px-6 py-8 items-center">
                    <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-4">
                        <Ionicons name="star" size={40} color="white" />
                    </View>
                    <Text className="text-3xl font-bold text-white text-center mb-2">Unlock PRO Features</Text>
                    <Text className="text-gray-400 text-center leading-6 max-w-sm">
                        Get access to advanced statistics, player comparisons, and exclusive features
                    </Text>
                </View>

                {/* Pricing Plans */}
                <View className="px-4 mb-8">
                    <Text className="text-white text-xl font-bold mb-4 text-center">Choose Your Plan</Text>
                    <View className="space-y-4">
                        {pricingPlans.map((plan) => (
                            <TouchableOpacity
                                key={plan.id}
                                className={`rounded-2xl p-6 border-2 ${selectedPlan === plan.id ? "border-green-500 bg-green-500/10" : "border-gray-700 bg-gray-800"
                                    } ${plan.isPopular ? "relative" : ""}`}
                                onPress={() => setSelectedPlan(plan.id)}
                            >
                                {plan.isPopular && (
                                    <View className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <View className="bg-green-500 px-4 py-1 rounded-full">
                                            <Text className="text-white text-xs font-bold">MOST POPULAR</Text>
                                        </View>
                                    </View>
                                )}

                                <View className="flex-row items-center justify-between mb-4">
                                    <View>
                                        <Text className="text-white text-xl font-bold">{plan.name}</Text>
                                        <View className="flex-row items-baseline">
                                            <Text className="text-green-500 text-2xl font-bold">{plan.price}</Text>
                                            <Text className="text-gray-400">{plan.duration}</Text>
                                        </View>
                                        {plan.originalPrice && (
                                            <Text className="text-gray-500 line-through text-sm">{plan.originalPrice}</Text>
                                        )}
                                    </View>
                                    <View
                                        className={`w-6 h-6 rounded-full border-2 ${selectedPlan === plan.id ? "border-green-500 bg-green-500" : "border-gray-400"
                                            }`}
                                    >
                                        {selectedPlan === plan.id && <View className="w-2 h-2 bg-white rounded-full m-auto" />}
                                    </View>
                                </View>

                                <View className="space-y-2">
                                    {plan.features.map((feature, index) => (
                                        <View key={index} className="flex-row items-center">
                                            <Ionicons name="checkmark" size={16} color="#10b981" />
                                            <Text className="text-gray-300 ml-2">{feature}</Text>
                                        </View>
                                    ))}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Features List */}
                <View className="px-4 mb-8">
                    <Text className="text-white text-xl font-bold mb-6 text-center">What You Get</Text>
                    <View className="space-y-4">
                        {proFeatures.map((feature, index) => (
                            <View key={index} className="flex-row items-start bg-gray-800 rounded-xl p-4">
                                <View className="w-12 h-12 bg-green-500 rounded-xl items-center justify-center mr-4">
                                    <Ionicons name={feature.icon as any} size={24} color="white" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white font-semibold mb-1">{feature.title}</Text>
                                    <Text className="text-gray-400 text-sm leading-5">{feature.description}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Terms */}
                <View className="px-4 mb-8">
                    <Text className="text-gray-500 text-xs text-center leading-5">
                        By subscribing, you agree to our Terms of Service and Privacy Policy. Subscription automatically renews
                        unless cancelled at least 24 hours before the end of the current period.
                    </Text>
                </View>
            </ScrollView>

            {/* Subscribe Button */}
            <View className="p-4 bg-gray-900 border-t border-gray-800">
                <TouchableOpacity className="bg-green-500 rounded-xl py-4 shadow-lg" onPress={handleSubscribe}>
                    <Text className="text-center text-white font-bold text-lg">
                        Subscribe Now - {pricingPlans.find((p) => p.id === selectedPlan)?.price}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SubscribeProScreen
