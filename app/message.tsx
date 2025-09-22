import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MessageScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [hasReplied, setHasReplied] = useState(false); // Simulate recipient reply

  const playerData = {
    name: "Pramod Mohite",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSend = () => {
    if (!message.trim()) return;

    // First message restriction
    if (!hasReplied && messages.length >= 1) return;

    setMessages((prev) => [...prev, message.trim()]);
    setMessage("");

    // Simulate recipient reply after 3 seconds
    if (!hasReplied) {
      setTimeout(() => {
        setMessages((prev) => [...prev, "Thanks for your message!"]);
        setHasReplied(true);
      }, 3000);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#3b3b3b" />
          </TouchableOpacity>
          <View className="flex-row items-center flex-1 ml-4">
            <Image
              source={{ uri: playerData.image }}
              className="w-10 h-10 rounded-full mr-3"
            />
            <Text className="text-xl font-bold text-black">{playerData.name}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#3b3b3b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Body */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <ScrollView
            className="flex-1 px-4"
            contentContainerStyle={{ paddingVertical: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            {messages.length === 0 ? (
              <View className="items-center justify-center mt-12">
                <View className="w-24 h-24 bg-gray-300 rounded-2xl items-center justify-center mb-4">
                  <Ionicons name="chatbubbles-outline" size={40} color="#666" />
                </View>
                <Text className="text-center text-gray-600 leading-6 max-w-sm">
                  Hey, you will be able to send only 1 message initially. You will be able
                  to send more once the recipient replies to your messages.
                </Text>
              </View>
            ) : (
              messages.map((msg, index) => (
                <View
                  key={index}
                  className={`mb-2 max-w-[75%] p-3 rounded-xl ${
                    index % 2 === 0
                      ? "bg-[#0e7ccb] self-end"
                      : "bg-gray-200 self-start"
                  }`}
                >
                  <Text className={`${index % 2 === 0 ? 'text-white' : 'text-gray-800'}`}>{msg}</Text>
                </View>
              ))
            )}
          </ScrollView>

          {/* Message Input */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90}
            className="bg-white"
          >
            <View className="px-4 py-3 border-t border-gray-200">
              <View className="flex-row justify-end mb-2">
                <Text className="text-gray-400 text-sm">
                  {message.length}/280
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-3">
                  <TextInput
                    className="text-base text-gray-800"
                    placeholder="Write a message..."
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    maxLength={280}
                  />
                </View>

                <TouchableOpacity
                  className={`w-12 h-12 rounded-full items-center justify-center ${
                    message.trim() && (hasReplied || messages.length < 1)
                      ? "bg-[#0e7ccb]"
                      : "bg-gray-300"
                  }`}
                  onPress={handleSend}
                  disabled={
                    !message.trim() || (!hasReplied && messages.length >= 1)
                  }
                >
                  <Ionicons name="send" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default MessageScreen;
