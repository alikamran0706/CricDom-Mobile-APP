import Header from '@/components/ui/Header';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface Notification {
    id: string;
    type: 'match_alert' | 'team_update' | 'join_request' | 'match_result' | 'player_update';
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
    matchId?: string;
    teamId?: string;
    playerId?: string;
    avatar?: string;
    actionRequired?: boolean;
}

const NotificationsScreen = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            type: 'match_alert',
            title: 'Match Starting Soon!',
            message: 'Your match "Mumbai vs Chennai" starts in 30 minutes. Get ready!',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            isRead: false,
            matchId: 'match_001',
            actionRequired: false,
        },
        {
            id: '2',
            type: 'join_request',
            title: 'New Join Request',
            message: 'Rahul Sharma wants to join your team "Thunder Bolts" for upcoming tournament.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            isRead: false,
            teamId: 'team_001',
            playerId: 'player_123',
            avatar: 'https://placeholder.com/40x40',
            actionRequired: true,
        },
        {
            id: '3',
            type: 'team_update',
            title: 'Team Update',
            message: 'New player "Virat Singh" has joined your team "Thunder Bolts".',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            isRead: true,
            teamId: 'team_001',
            playerId: 'player_456',
            avatar: 'https://placeholder.com/40x40',
            actionRequired: false,
        },
        {
            id: '4',
            type: 'match_result',
            title: 'Match Completed',
            message: 'Your team won against "Royal Kings" by 25 runs! Great performance!',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            isRead: true,
            matchId: 'match_002',
            actionRequired: false,
        },
        {
            id: '5',
            type: 'player_update',
            title: 'Player Achievement',
            message: 'Congratulations! You scored your highest runs (89*) in the last match.',
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
            isRead: true,
            actionRequired: false,
        },
        {
            id: '6',
            type: 'match_alert',
            title: 'Match Reminder',
            message: 'Don\'t forget! You have a match tomorrow at 6:00 PM - "Eagles vs Hawks".',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
            isRead: true,
            matchId: 'match_003',
            actionRequired: false,
        },
        {
            id: '7',
            type: 'join_request',
            title: 'Join Request Approved',
            message: 'Your request to join "Super Kings" has been approved! Welcome to the team.',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            isRead: true,
            teamId: 'team_002',
            actionRequired: false,
        },
    ]);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id ? { ...notification, isRead: true } : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, isRead: true }))
        );
    };

    const handleJoinRequest = (notificationId: string, action: 'accept' | 'reject') => {
        markAsRead(notificationId);
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'match_alert':
                return '🏏';
            case 'team_update':
                return '👥';
            case 'join_request':
                return '🤝';
            case 'match_result':
                return '🏆';
            case 'player_update':
                return '⭐';
            default:
                return '📢';
        }
    };

    const getTimeAgo = (timestamp: Date) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    };

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1">
                {/* Header */}
                <Header
                    heading={`Notifications`}
                />
                
                   <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {notifications.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateIcon}>🔔</Text>
                            <Text style={styles.emptyStateTitle}>No notifications yet</Text>
                            <Text style={styles.emptyStateMessage}>
                                You'll see match alerts, team updates, and join requests here.
                            </Text>
                        </View>
                    ) : (
                        notifications.map((notification) => (
                            <TouchableOpacity
                                key={notification.id}
                                style={[
                                    styles.notificationItem,
                                    !notification.isRead && styles.unreadNotification,
                                ]}
                                onPress={() => markAsRead(notification.id)}
                            >
                                <View style={styles.notificationContent}>
                                    <View style={styles.notificationHeader}>
                                        <View style={styles.notificationIcon}>
                                            <Text style={styles.iconText}>
                                                {getNotificationIcon(notification.type)}
                                            </Text>
                                        </View>

                                        <View style={styles.notificationInfo}>
                                            <Text style={[
                                                styles.notificationTitle,
                                                !notification.isRead && styles.unreadTitle
                                            ]}>
                                                {notification.title}
                                            </Text>
                                            <Text style={styles.notificationTime}>
                                                {getTimeAgo(notification.timestamp)}
                                            </Text>
                                        </View>

                                        {!notification.isRead && <View style={styles.unreadDot} />}
                                    </View>

                                    <Text style={styles.notificationMessage}>
                                        {notification.message}
                                    </Text>

                                    {notification.actionRequired && notification.type === 'join_request' && (
                                        <View style={styles.actionButtons}>
                                            <TouchableOpacity
                                                style={[styles.actionButton, styles.acceptButton]}
                                                onPress={() => handleJoinRequest(notification.id, 'accept')}
                                            >
                                                <Text style={styles.acceptButtonText}>Accept</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.actionButton, styles.rejectButton]}
                                                onPress={() => handleJoinRequest(notification.id, 'reject')}
                                            >
                                                <Text style={styles.rejectButtonText}>Reject</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
                
            </View>
        </SafeAreaView>
    )
}

export default NotificationsScreen

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    markAllButton: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    markAllButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        paddingHorizontal: 20,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyStateIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8,
    },
    emptyStateMessage: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
    },
    notificationItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    unreadNotification: {
        borderLeftWidth: 4,
        borderLeftColor: '#3B82F6',
    },
    notificationContent: {
        padding: 16,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    notificationIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    iconText: {
        fontSize: 18,
    },
    notificationInfo: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 2,
    },
    unreadTitle: {
        fontWeight: '600',
    },
    notificationTime: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3B82F6',
        marginLeft: 8,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
        marginLeft: 52,
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 12,
        marginLeft: 52,
        gap: 8,
    },
    actionButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        minWidth: 80,
        alignItems: 'center',
    },
    acceptButton: {
        backgroundColor: '#10B981',
    },
    rejectButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    acceptButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    rejectButtonText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '600',
    },
});