import MoreComponentsBelow from "@/components/home/MoreComponentsBelow";
import OtherComponentsAbove from "@/components/home/OtherComponentsAbove";
import SidebarDrawer from "@/components/Modal/Drawer/SidebarDrawer";
import SocialShare from "@/components/SocialShare";
import { useSidebar } from "@/hooks/useSidebar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logo = require('../../assets/images/logo.png');

interface Post {
  id: string
  content: string
  author: string
  timestamp: string
  reactions: number
  comments: number
  image?: string
  quickReactions: string[]
}

export default function HomeScreen() {
  const router = useRouter();
  const { toggleSidebar, isVisible, closeSidebar } = useSidebar()


  const renderPost = ({ item }: { item: Post }) => (
    <View className="bg-white mb-4 shadow-sm">
      {/* Post Image */}
      {item.image && (
        <View className="relative">
          <Image source={{ uri: item.image }} className="w-full h-64" />
          <View className="absolute inset-0 bg-black/30" />
          <View className="absolute bottom-4 left-4 right-4">
            <Text className="text-white text-xl font-bold mb-2">{item.content}</Text>
          </View>
        </View>
      )}

      {/* Post Footer */}
      <View className="p-4">
        <View className="flex-row items-center mb-3">
          <View className="items-center justify-center">
            <Image
              source={logo}
              style={{ width: 25, height: 25, resizeMode: 'contain' }}
            />
          </View>
          <Text className="font-semibold text-gray-800">{item.author}</Text>
        </View>

        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-gray-500 text-sm">{item.timestamp}</Text>
          <Text className="text-gray-500 text-sm">{item.comments} comments</Text>
        </View>

        <View className="flex-row items-center mb-4">
          <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center mr-2">
            <Ionicons name="thumbs-up" size={12} color="white" />
          </View>
          <Text className="text-gray-600 text-sm">{item.reactions} reactions</Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-around border-t border-gray-200 pt-4 mb-4">
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="thumbs-up-outline" size={20} color="#666" />
            <Text className="text-gray-600 ml-2">React</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center"
            onPress={() => router.push("/comments")}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#666" />
            <Text className="text-gray-600 ml-2">Comment</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity className="flex-row items-center">
            <Ionicons name="share-outline" size={20} color="#666" />
            <Text className="text-gray-600 ml-2">Share</Text>
          </TouchableOpacity> */}

          <SocialShare
            title="Custom Share Title"
            message="Share Post"
            url="https://expo.dev/@alikamran07/cricdom"
            color='#666'
            text='Share'
            className='flex-row items-center gap-x-2'
          />
        </View>

        {/* Quick Reactions */}
        <View className="flex-row flex-wrap mb-4">
          {item.quickReactions.map((reaction) => (
            <TouchableOpacity key={reaction} className="bg-gray-100 px-3 py-2 rounded-full mr-2 mb-2">
              <Text className="text-gray-700 text-sm">{reaction}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sample Comment */}
        <View className="flex-row items-start">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
            }}
            className="w-8 h-8 rounded-full mr-3"
          />
          <View className="flex-1">
            <Text className="font-semibold text-gray-800 mb-1">Md Asif Alam</Text>
            <Text className="text-gray-700">Straight drive 💯</Text>
          </View>
        </View>
      </View>
    </View>
  )

  const posts: Post[] = [
    {
      id: "1",
      content:
        "You've got a juicy half-volley... Are you guiding it with the field, or going big on your favourite side?",
      author: "cricdom",
      timestamp: "28-08-2025 01:00 PM",
      reactions: 47,
      comments: 62,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&auto=format&fit=crop&q=60",
      quickReactions: ["Straight drive 💯", "Loft it", "Leg side any day 😎", "Deep"],
    },
  ]

  const loadMore = () => {

  }

  return (
    <>
      <SidebarDrawer isVisible={isVisible} onClose={closeSidebar} />
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="px-4 py-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View>
                <Image
                  source={logo}
                  style={{ width: 40, height: 40, resizeMode: 'contain' }}
                />
              </View>
            </View>
            <View className="flex-row">
              <TouchableOpacity className="mr-4" onPress={() => router.push(`/search`)}>
                <Ionicons name="search" size={24} color="#3b3b3b" />
              </TouchableOpacity>
              <TouchableOpacity className="mr-4" onPress={() => router.push(`/direct-messages`)}>
                <Ionicons name="chatbubbles" size={24} color="#3b3b3b" />
              </TouchableOpacity>
              <TouchableOpacity className="mr-4" onPress={() => router.push("/notifications")}>
                <Ionicons name="notifications" size={24} color="#3b3b3b" />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleSidebar}>
                <Ionicons name="menu" size={24} color="#3b3b3b" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={() => (
            <OtherComponentsAbove />
          )}
          ListFooterComponent={() => (
            <MoreComponentsBelow />
          )}
        />
      </SafeAreaView>
    </>
  )
}
