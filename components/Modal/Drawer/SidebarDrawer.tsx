import { logout } from "@/store/features/user/userSlice"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useEffect, useRef } from "react"
import { Animated, Dimensions, Easing, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"

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

const SCREEN_WIDTH = Dimensions.get("window").width
const DRAWER_WIDTH = 320

const SidebarDrawer = ({ isVisible, onClose }: SidebarDrawerProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current

    const userProfile = {
        name: "Ali Kamran",
        email: "alikamrantechdev@gmail.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
        userType: "Free User",
        profileCompletion: 50,
    }

    const menuItems: MenuItem[] = [
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
        // {
        //     id: "4",
        //     title: "Go Live",
        //     icon: "play",
        //     route: "/go-live",
        // },
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
            route: "/player-leaderboard",
        },
        {
            id: "9",
            title: "CricDom Awards",
            icon: "medal",
            route: "/awards",
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
        {
            id: "13",
            title: "Edit Profile",
            icon: "person",
            route: "/edit-profile",
        },
        {
            id: "14",
            title: "Create/Update Player",
            icon: "person",
            route: "/create-player",
        },
        {
            id: "15",
            title: "Notifications",
            icon: "notifications",
            route: "/notifications",
        },
        {
            id: "16",
            title: "Settings",
            icon: "settings",
            route: "/settings",
        },
        {
            id: "17",
            title: "Help & Support",
            icon: "help-circle",
            route: "/support",
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

    useEffect(() => {
        if (isVisible) {
            Animated.timing(slideAnim, {
                toValue: SCREEN_WIDTH - DRAWER_WIDTH,
                duration: 300,
                useNativeDriver: false,
                easing: Easing.out(Easing.ease),
            }).start()
        } else {
            Animated.timing(slideAnim, {
                toValue: SCREEN_WIDTH,
                duration: 300,
                useNativeDriver: false,
                easing: Easing.in(Easing.ease),
            }).start()
        }
    }, [isVisible]);

    const handleLogout = async() => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('profile');
        dispatch(logout())
        router.replace("/auth/login")
      }

    if (!isVisible) return null

    return (
        <View style={StyleSheet.absoluteFillObject}>
            {/* Overlay */}
            {isVisible && (
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={onClose}
                />
            )}

            {/* Sidebar */}
            <Animated.View style={[styles.drawer, { left: slideAnim }]}>
                <SafeAreaView className="flex-1">
                    {/* Profile Section */}
                    <LinearGradient
                        colors={['#ffffff', '#a9d3f2', '#a9d3f2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="px-4 py-6"
                    >
                        <View className="absolute bg-white top-80 py-6 rounded-sm z-0" style={{ left: -8 }}>
                            <TouchableOpacity onPress={onClose}>
                                <Ionicons name="chevron-forward" size={12} color="black" />
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

                            <TouchableOpacity className="flex-row items-center justify-between p-4" onPress={handleLogout}>
                                <View className="flex-row items-center">
                                    <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                                    <Text className="text-lg ml-4 text-red-500">Logout</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Animated.View>
        </View>
    )
}

export default SidebarDrawer

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1,
    },
    drawer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: "white",
        zIndex: 2,
    },
})