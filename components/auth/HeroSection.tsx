import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Image, Text, View } from 'react-native';

const { height } = Dimensions.get('window');
const banner = require('../../assets/images/banner.jpg');
const logo = require('../../assets/images/icon.png');

const HeroSection = () => {
    const ballAnim = useRef(new Animated.ValueXY({ x: 80, y: 50 })).current;
    const trophyAnim = useRef(new Animated.ValueXY({ x: 80, y: 50 })).current;
    const starAnim = useRef(new Animated.ValueXY({ x: 80, y: 50 })).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(ballAnim, {
                toValue: { x: 210, y: -7 },
                duration: 2000,
                useNativeDriver: true,
                easing: Easing.out(Easing.exp),
            }),
            Animated.timing(trophyAnim, {
                toValue: { x: -20, y: 210 },
                duration: 2000,
                useNativeDriver: true,
                easing: Easing.out(Easing.exp),
            }),
            Animated.timing(starAnim, {
                toValue: { x: 10, y: -10 },
                duration: 2000,
                useNativeDriver: true,
                easing: Easing.out(Easing.exp),
            }),
        ]).start();
    }, []);
    return (
        <View className="items-center pt-8 pb-4" style={{ minHeight: height * 0.45 }}>
            {/* Logo */}
            <View className="mb-6 flex-row items-center justify-center gap-x-2">
                <Image
                    source={logo}
                    style={{ width: 40, height: 40, resizeMode: 'contain' }}
                />

                <Text className="text-4xl font-bold text-center">
                    <Text className="text-black">Cric</Text>
                    <Text className="text-[#0e7ccb]">dom</Text>
                </Text>
            </View>

            {/* Cricket Hero Image */}
            <View className="relative mb-8">
                <View
                    className="rounded-full bg-white/10 items-center justify-center overflow-hidden border-4 border-white/20"
                    style={{ width: 240, height: 240 }}
                >
                    <Image
                        source={banner}
                        style={{ width: '95%', height: '95%', borderRadius: 240 / 2 }}
                        resizeMode="cover"
                    />
                </View>

                {/* Floating cricket elements */}
                {/* Ball (Top Right) */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        width: 40,
                        height: 40,
                        backgroundColor: '#f97316', // orange-400
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: ballAnim.getTranslateTransform(),
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 4,
                        elevation: 4,
                    }}
                >
                    <Ionicons name="baseball" size={20} color="white" />
                </Animated.View>

                {/* Trophy (Bottom Left) */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        width: 40,
                        height: 40,
                        backgroundColor: '#22c55e', // green-500
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: trophyAnim.getTranslateTransform(),
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 4,
                        elevation: 4,
                    }}
                >
                    <Ionicons name="trophy" size={20} color="white" />
                </Animated.View>

                {/* Star (Top Left) */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        width: 32,
                        height: 32,
                        backgroundColor: '#facc15', // yellow-400
                        borderRadius: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: starAnim.getTranslateTransform(),
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 4,
                        elevation: 4,
                    }}
                >
                    <Ionicons name="star" size={16} color="white" />
                </Animated.View>
            </View>
        </View>
    )
}

export default HeroSection