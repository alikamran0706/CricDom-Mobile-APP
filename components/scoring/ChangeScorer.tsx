import { Player } from "@/lib/types/match";
import { getFullStrapiUrl } from "@/lib/utils/common";
import { useLazyGetPlayersQuery } from "@/store/features/player/playerApi";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface ChangeScorer {
    selectHours: any;
    setSelectHours: any;
}

const tabs = ['QR Code', 'Teams', 'Officials']
const shareUrl = `https://cricdom.com/scorer`;
const logo = require('../../assets/images/logo.png');

const ChangeScorer = ({
    selectHours,
    setSelectHours,
}: ChangeScorer) => {

    const router = useRouter();
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const [allOverChecked, setAllOverChecked] = useState<boolean>(false);
    const [activeFilter, setActiveFilter] = useState<string>('QR Code');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

    const [fetchPlayers, { data: allPlayersData, isLoading }] =
        useLazyGetPlayersQuery();

    useEffect(() => {
        fetchPlayers({
            page: 1,
            pageSize: 100,
        });
    }, []);

    const allFetchedPlayers: Player[] =
        allPlayersData?.data?.map((p: any) => ({
            id: p.id.toString(),
            documentId: p.documentId,
            name: p.name,
            position: p.position,
            bowling_style: p.bowling_style,
            batting_style: p.batting_style,
            avatar: p.image?.url || "",
        })) ?? [];
    const filteredPlayers = allFetchedPlayers
        .filter(
            (player) =>
            (player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                player.position?.toLowerCase().includes(searchQuery.toLowerCase()))
        );

    const togglePlayerSelection = (player: Player) => {
        setSelectedPlayer(player);
    };

    const isPlayerSelected = (playerId: any) =>
        selectedPlayer?.id === playerId;


    const renderContent = () => {
        switch (activeFilter) {
            case 'QR Code':
                return (
                    <View>
                        <Text className="text-lg font-bold mb-2">Ask the new scorer to scan below QR Code.</Text>
                        {/* Your QR Code rendering logic here */}
                        <View className="items-center mb-6">
                            <View
                                style={{
                                    width: 256,
                                    height: 256,
                                    backgroundColor: "white",
                                    borderRadius: 24,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                }}
                            >
                                <QRCode
                                    value={shareUrl}
                                    size={256}
                                    backgroundColor="white"
                                    color={'#0e7ccb'}
                                    logo={logo}
                                    logoSize={60}
                                    logoBackgroundColor="transparent"
                                    logoMargin={2}
                                    quietZone={10}
                                />
                            </View>
                        </View>
                    </View>
                );
            case 'Teams':
                return (
                    <View>
                        <Text className="text-lg font-bold mb-2">Who will score from one of the teams?</Text>
                        {/* Your Teams UI here */}
                        <ScrollView showsVerticalScrollIndicator={false} className="max-h-96">
                            {isLoading ? (
                                <Text className="text-center text-gray-500 mt-6">Loading players...</Text>
                            ) : filteredPlayers.length > 0 ? (
                                <View className='flex flex-col gap-y-3'>
                                    {
                                        filteredPlayers.map((player) => (
                                            <TouchableOpacity
                                                key={player.id}
                                                className="flex-1"
                                                onPress={() => {
                                                    togglePlayerSelection(player);
                                                }}
                                            >
                                                <View className={`flex flex-row justify-between items-center border ${isPlayerSelected(player.id) ? 'border-[#0e7ccb]' :
                                                    'border-gray-300'} p-2 rounded-lg`}
                                                >
                                                    <View className='flex flex-row items-center gap-x-3'>
                                                        <View className="w-12 h-12 rounded-full items-center justify-center overflow-hidden border border-gray-100 ">
                                                            {
                                                                player.avatar &&
                                                                <Image
                                                                    source={{ uri: getFullStrapiUrl(player.avatar) }}
                                                                    className="w-full h-full"
                                                                />
                                                            }

                                                        </View>
                                                        <View className="">
                                                            <Text className="text-base font-medium text-black">{player.name}</Text>
                                                        </View>
                                                    </View>
                                                    {isPlayerSelected(player.id) && (
                                                        <View className="w-6 h-6 bg-[#0e7ccb] rounded-full items-center justify-center">
                                                            <Ionicons name="checkmark" size={14} color="white" />
                                                        </View>
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            ) : (
                                <Text className="text-center text-gray-500 mt-6">No players found.</Text>
                            )}
                        </ScrollView>
                    </View>
                );
            case 'Officials':
                return (
                    <View>
                        <Text className="text-lg font-bold mb-2">Transfer scoring to a match official.</Text>
                        {/*  Officials */}
                        <TouchableOpacity onPress={() => router.push('/match-officials')}>
                            <Text className="text-xl font-bold my-4 text-[#0e7ccb] text-center">ADD MATCH OFFICIALS</Text>
                        </TouchableOpacity>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View
            collapsable={false}
        >
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

            {renderContent()}

        </View>
    )
}

export default ChangeScorer