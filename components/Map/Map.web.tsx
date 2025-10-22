import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Player = {
    id: string;
    name: string;
    type: string;
    latitude: number;
    longitude: number;
};

type Props = {
    data: Player[];
    searchTerm: string;
};

const WebMap = ({ data, searchTerm }: Props) => {
    const [MapComponent, setMapComponent] = useState<React.ReactNode>(null);

    const filteredPlayers = useMemo(() => {
        return data.filter(
            (player) =>
                player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                player.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);
    console.log('hellow iima call useEffectuseEffect')

    useEffect(() => {
        const loadMap = async () => {
            const leaflet = await import("leaflet");
            const {
                MapContainer,
                TileLayer,
                Marker,
                Popup,
            } = await import("react-leaflet");

            // 👇 Safe override with casting to any to avoid TS error
            const DefaultIcon = leaflet.Icon.Default as any;
            delete DefaultIcon.prototype._getIconUrl;

            DefaultIcon.mergeOptions({
                iconRetinaUrl:
                    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
                iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
                shadowUrl:
                    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
            });

            const center =
                filteredPlayers.length > 0
                    ? [filteredPlayers[0].latitude, filteredPlayers[0].longitude]
                    : [20.5937, 78.9629]; // fallback center (India)

            setMapComponent(
                <MapContainer
                    center={center as [number, number]}
                    zoom={5}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredPlayers.map((player) => (
                        <Marker
                            key={player.id}
                            position={[player.latitude, player.longitude]}
                        >
                            <Popup>
                                <strong>{player.name}</strong>
                                <br />
                                Type: {player.type}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            );
        };

        loadMap();
    }, [filteredPlayers]);


    return (
        <View style={styles.container}>
            <Text style={styles.loadingText}>Loading web map...</Text>
            {MapComponent || (
                <Text style={styles.loadingText}>Loading web map...</Text>
            )}
        </View>
    );
};

export default WebMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingText: {
        textAlign: "center",
        marginTop: 20,
        color: "#999",
    },
});
