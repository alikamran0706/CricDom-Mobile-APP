import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface MenuItem {
    id: string
    title: string
    icon: string
    badge?: "PRO" | "FREE"
    route: string
}

interface SidebarDrawerProps {
    isVisible: boolean
    onClose: () => void
}

const SidebarDrawer = ({ isVisible, onClose }: SidebarDrawerProps) => {
    const router = useRouter()

    const userProfile = {
        name: "Ali Kamran",
        email: "alikamrantechdev@gmail.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
        userType: "Free User",
        profileCompletion: 50,
    }

    const menuItems: MenuItem[] = [
        // {
        //     id: "1",
        //     title: "Subscribe PRO",
        //     icon: "bar-chart",
        //     badge: "PRO",
        //     route: "/subscription",
        // },
        {
            id: "2",
            title: "Add a Tournament",
            icon: "trophy",
            // badge: "FREE",
            route: "/add-tournament",
        },
        {
            id: "3",
            title: "Start A Match",  
            icon: "play-circle",
            // badge: "FREE",
            route: "/create-match",
        },
        {
            id: "4",
            title: "Go Live",
            icon: "play",
            route: "/go-live",
        },
        {
            id: "5",
            title: "My Cricket",
            icon: "baseball",
            route: "/my-cricket",
        },
        {
            id: "6",
            title: "My Performance",
            icon: "bar-chart",
            route: "/my-performance",
        },
        {
            id: "7",
            title: "Player Leaderboard",
            icon: "podium",
            route: "/player-leaderboard",
        },
        {
            id: "8",
            title: "Team Leaderboard",
            icon: "trophy",
            route: "/team-leaderboard",
        },
        {
            id: "9",
            title: "CricDom Awards",
            icon: "medal",
            route: "/awards",
        },
        {
            id: "10",
            title: "Challenges",
            icon: "target",
            route: "/challenge",
        },
        {
            id: "11",
            title: "Looking For",
            icon: "search",
            route: "/looking-for-list",
        },
        {
            id: "12",
            title: "Community",
            icon: "people",
            route: "/community",
        },
    ]

    const handleMenuItemPress = (route: string) => {
        onClose()
        router.push(route as any)
    }

    const getBadgeColor = (badge?: string) => {
        switch (badge) {
            case "PRO":
                return "bg-green-500"
            case "FREE":
                return "bg-orange-500"
            default:
                return ""
        }
    }

    if (!isVisible) return null

    return (
        <View className="absolute inset-0 z-50">
            {/* Overlay */}
            <TouchableOpacity className="absolute inset-0 bg-black/50" onPress={onClose} />

            {/* Sidebar */}
            <View className="absolute right-0 top-0 bottom-0 w-80 bg-white">
                <SafeAreaView className="flex-1">
                    {/* Profile Section */}
                    <LinearGradient
                        colors={['#ffffff', '#a9d3f2', '#a9d3f2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="px-4 py-6"
                    >
                        <View className="absolute bg-gray-800/70 rounded-full top-10 p-1" style={{ left: -21 }}>
                            <TouchableOpacity onPress={onClose}>
                                <Ionicons name="chevron-forward" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-center justify-between mb-4">
                            <View className="flex-row items-start flex-1">
                                <Image source={{ uri: userProfile.avatar }} className="w-16 h-16 rounded-full mr-4" />
                                <View className="flex-1">
                                    <Text className="text-black text-lg font-bold mb-1">{userProfile.name}</Text>
                                    <Text className="text-gray-700 text-sm mb-2">{userProfile.email}</Text>
                                    {/* <View className="border border-gray-400 rounded-full px-3 py-1 self-start">
                                        <Text className="text-gray-700 text-xs">{userProfile.userType}</Text>
                                    </View> */}
                                </View>
                            </View>
                        </View>

                        {/* Progress Bar */}
                        <View className="mb-2">
                            <View className="flex-row items-center justify-between mb-1">
                                <View className="h-2 bg-gray-200 rounded-full flex-1 mr-3">
                                    <View
                                        className="h-2 bg-gray-900 rounded-full"
                                        style={{ width: `${userProfile.profileCompletion}%` }}
                                    />
                                </View>
                                <Text className="text-black text-sm">{userProfile.profileCompletion}%</Text>
                            </View>
                        </View>
                    </LinearGradient>


                    {/* Menu Items */}
                    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                        <View className="py-2">
                            {menuItems.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    className="flex-row items-center px-4 py-4 border-b border-gray-100"
                                    onPress={() => handleMenuItemPress(item.route)}
                                >
                                    <View className="w-6 h-6 items-center justify-center mr-4">
                                        <Ionicons name={item.icon as any} size={20} color="#666" />
                                    </View>
                                    <Text className="flex-1 text-gray-800 text-base font-medium">{item.title}</Text>
                                    {item.badge && (
                                        <View className={`px-2 py-1 rounded-full ${getBadgeColor(item.badge)}`}>
                                            <Text className="text-white text-xs font-semibold">{item.badge}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    )
}

export default SidebarDrawer
