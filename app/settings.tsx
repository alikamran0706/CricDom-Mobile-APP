import Header from '@/components/ui/Header';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingItem {
  id: string;
  title: string;
  description?: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
}

const SettingsScreen: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from Cricdom?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logged out') },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. The app may take longer to load initially.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: () => console.log('Cache cleared') },
      ]
    );
  };

  const settingSections = [
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Edit Profile',
          description: 'Update your personal information',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to profile'),
        },
        {
          id: 'notifications',
          title: 'Notifications',
          description: 'Manage notification preferences',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to notifications'),
        },
        {
          id: 'privacy',
          title: 'Privacy Settings',
          description: 'Control your data and privacy',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to privacy'),
        },
      ],
    },
    {
      title: 'App Preferences',
      items: [
        {
          id: 'dark_mode',
          title: 'Dark Mode',
          description: 'Switch to dark theme',
          type: 'toggle' as const,
          value: darkMode,
          onPress: () => setDarkMode(!darkMode),
        },
        {
          id: 'auto_refresh',
          title: 'Auto Refresh Scores',
          description: 'Automatically update live scores',
          type: 'toggle' as const,
          value: autoRefresh,
          onPress: () => setAutoRefresh(!autoRefresh),
        },
        {
          id: 'offline_mode',
          title: 'Offline Mode',
          description: 'Save data for offline viewing',
          type: 'toggle' as const,
          value: offlineMode,
          onPress: () => setOfflineMode(!offlineMode),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & Support',
          description: 'Get help and contact support',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to help'),
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          description: 'Share your thoughts about the app',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to feedback'),
        },
        {
          id: 'rate',
          title: 'Rate Cricdom',
          description: 'Rate us on the App Store',
          type: 'navigation' as const,
          onPress: () => console.log('Open app store'),
        },
      ],
    },
    {
      title: 'Advanced',
      items: [
        {
          id: 'clear_cache',
          title: 'Clear Cache',
          description: 'Free up storage space',
          type: 'action' as const,
          onPress: handleClearCache,
        },
        {
          id: 'logout',
          title: 'Logout',
          description: 'Sign out of your account',
          type: 'action' as const,
          onPress: handleLogout,
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={item.onPress}
        disabled={item.type === 'toggle'}
      >
        <View style={styles.settingInfo}>
          <Text style={[
            styles.settingTitle,
            item.id === 'logout' && styles.logoutText
          ]}>
            {item.title}
          </Text>
          {item.description && (
            <Text style={styles.settingDescription}>{item.description}</Text>
          )}
        </View>

        {item.type === 'toggle' && (
          <Switch
            value={item.value}
            onValueChange={item.onPress}
            trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
            thumbColor={item.value ? '#FFFFFF' : '#9CA3AF'}
            ios_backgroundColor="#E5E7EB"
          />
        )}

        {item.type === 'navigation' && (
          <Text style={styles.chevron}>›</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header heading={`Settings`} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        <View style={styles.appInfo}>
          <Text style={styles.appName}>Cricdom</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.copyright}>© 2024 Cricdom. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutText: {
    color: '#DC2626',
  },
  chevron: {
    fontSize: 20,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 32,
    marginTop: 24,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default SettingsScreen;