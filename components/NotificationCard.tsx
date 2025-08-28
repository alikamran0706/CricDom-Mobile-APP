import { CricketNotification } from '@/lib/types/notifications';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface NotificationCardProps {
  notification: CricketNotification;
  onPress: () => void;
  onActionPress?: (action: 'accept' | 'reject') => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
  onActionPress,
}) => {
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
      case 'tournament_invite':
        return '🏟️';
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

  const getPriorityColor = (type: string) => {
    switch (type) {
      case 'match_alert':
        return '#F59E0B'; // Amber
      case 'join_request':
        return '#3B82F6'; // Blue
      case 'match_result':
        return '#10B981'; // Green
      case 'team_update':
        return '#8B5CF6'; // Purple
      default:
        return '#6B7280'; // Gray
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !notification.isRead && styles.unreadContainer,
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[
            styles.iconContainer,
            { backgroundColor: `${getPriorityColor(notification.type)}20` }
          ]}>
            <Text style={styles.icon}>
              {getNotificationIcon(notification.type)}
            </Text>
          </View>
          
          <View style={styles.headerInfo}>
            <Text style={[
              styles.title,
              !notification.isRead && styles.unreadTitle
            ]}>
              {notification.title}
            </Text>
            <Text style={styles.timestamp}>
              {getTimeAgo(notification.timestamp)}
            </Text>
          </View>
          
          {!notification.isRead && (
            <View style={[
              styles.unreadDot,
              { backgroundColor: getPriorityColor(notification.type) }
            ]} />
          )}
        </View>

        <Text style={styles.message}>
          {notification.message}
        </Text>

        {notification.actionRequired && notification.type === 'join_request' && onActionPress && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.acceptButton]}
              onPress={() => onActionPress('accept')}
            >
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => onActionPress('reject')}
            >
              <Text style={styles.rejectButtonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  unreadContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  message: {
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

export default NotificationCard;