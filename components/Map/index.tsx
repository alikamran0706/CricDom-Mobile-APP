import { playerTypeConfig } from "@/constants/payer"
import { Player } from "@/lib/types/player"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { StyleSheet } from "react-native"
import MapView, { type Region } from "react-native-maps"
import Supercluster from "supercluster"
import PlayerModal from "../Modal/PlayerModal"
import ClusterMarker from "./ClusterMarker"
import PlayerMarker from "./PlayerMarker"

export default function Map({ data, searchTerm }: any) {

    const [clusters, setClusters] = useState<any[]>([])
    const [region, setRegion] = useState<Region>(() => {
        const latitudes = data.map((p: any) => p.latitude)
        const longitudes = data.map((p: any) => p.longitude)

        const minLat = Math.min(...latitudes)
        const maxLat = Math.max(...latitudes)
        const minLng = Math.min(...longitudes)
        const maxLng = Math.max(...longitudes)

        return {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLng + maxLng) / 2,
            latitudeDelta: Math.max(5, (maxLat - minLat) * 0.5),
            longitudeDelta: Math.max(5, (maxLng - minLng) * 0.5),
        }
    })
    const [currentZoom, setCurrentZoom] = useState(0)
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
    const [modalVisible, setModalVisible] = useState(false)
    const mapRef = useRef<MapView>(null)
    const superclusterRef = useRef<Supercluster | null>(null)

    const filteredPlayers = useMemo(() => {
        return data.filter(
            (player: any) =>
                player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                player.type.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    }, [searchTerm])

    const updateClusters = useCallback(() => {
        if (!superclusterRef.current || !region) return

        try {
            const bbox: any = [
                region.longitude - region.longitudeDelta / 2,
                region.latitude - region.latitudeDelta / 2,
                region.longitude + region.longitudeDelta / 2,
                region.latitude + region.latitudeDelta / 2,
            ]

            const zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
            setCurrentZoom(zoom)

            const newClusters = superclusterRef.current.getClusters(bbox, zoom)

            setClusters(newClusters)
        } catch (error) {
            console.log("Clustering error:", error)
        }
    }, [region])

    // Initialize Supercluster
    useEffect(() => {
        superclusterRef.current = new Supercluster({
            radius: 40,
            maxZoom: 16,
            minZoom: 0,
            minPoints: 2,
        })

        const points = filteredPlayers
            .filter((player: any) => isFinite(player.latitude) && isFinite(player.longitude)) // <-- add this
            .map((player: any) => ({
                type: "Feature" as const,
                properties: {
                    cluster: false,
                    playerId: player.id,
                    player: player,
                },
                geometry: {
                    type: "Point" as const,
                    coordinates: [player.longitude, player.latitude],
                },
            }))

        superclusterRef.current.load(points)
        updateClusters()
    }, [filteredPlayers, updateClusters])

    // Update clusters when region changes
    useEffect(() => {
        updateClusters()
    }, [updateClusters])

    const onRegionChangeComplete = useCallback((newRegion: Region) => {
        setRegion(newRegion)
    }, [])

    const onClusterPress = useCallback(
        (cluster: any) => {
            const expansionZoom = Math.min(
                16,
                superclusterRef.current?.getClusterExpansionZoom(cluster.properties.cluster_id) || 16
            )

            if (mapRef.current) {
                const newRegion = {
                    latitude: cluster.geometry.coordinates[1],
                    longitude: cluster.geometry.coordinates[0],
                    latitudeDelta: region.latitudeDelta / 4, // Zoom in more aggressively
                    longitudeDelta: region.longitudeDelta / 4,
                }

                console.log(`Zooming to cluster at zoom ${expansionZoom}`)
                mapRef.current.animateToRegion(newRegion, 500)
            }
        },
        [region],
    )

    const onPlayerPress = useCallback((player: Player) => {
        setSelectedPlayer(player)
        setModalVisible(true)
    }, [])

    const closeModal = useCallback(() => {
        setModalVisible(false)
        setSelectedPlayer(null)
    }, [])

    return (
        <>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={onRegionChangeComplete}
                showsUserLocation
                showsMyLocationButton
                maxZoomLevel={18}
                minZoomLevel={3}
            >
                {clusters.map((cluster) => {
                    const key = cluster.properties.cluster
                        ? `cluster-${cluster.properties.cluster_id}`
                        : `player-${cluster.properties.playerId}`

                    if (cluster.properties.cluster) {
                        return (
                            <ClusterMarker
                                key={key}
                                cluster={cluster}
                                onPress={() => onClusterPress(cluster)}
                            />
                        )
                    } else {
                        return (
                            <PlayerMarker
                                key={key}
                                player={cluster.properties.player}
                                onPress={onPlayerPress}
                            />
                        )
                    }
                })}
            </MapView>
            {/* Player Detail Modal */}
            <PlayerModal
                modalVisible={modalVisible}
                closeModal={closeModal}
                selectedPlayer={selectedPlayer}
                playerTypeConfig={playerTypeConfig}
            />
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})