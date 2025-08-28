import React, { useState } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  expanded: boolean;
}

const HelpSupportScreen: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: '1',
      question: 'How do I get live cricket scores?',
      answer: 'Live scores are automatically updated on the home screen. Make sure you have an internet connection and enable notifications for real-time updates.',
      expanded: false,
    },
    {
      id: '2',
      question: 'Can I customize my notification preferences?',
      answer: 'Yes! Go to Settings > Notifications to customize which types of cricket updates you want to receive.',
      expanded: false,
    },
    {
      id: '3',
      question: 'How do I follow my favorite teams?',
      answer: 'Tap on any team from the matches list and select "Follow Team" to get personalized updates about their matches and news.',
      expanded: false,
    },
    {
      id: '4',
      question: 'Is there an offline mode?',
      answer: 'Yes, you can enable offline mode in Settings. This will save match data for viewing when you don\'t have internet access.',
      expanded: false,
    },
    {
      id: '5',
      question: 'How do I report a bug or issue?',
      answer: 'You can report bugs through the "Report Issue" option below or email us directly at support@cricdom.com.',
      expanded: false,
    },
  ]);

  const toggleFAQ = (id: string) => {
    setFaqs(prev =>
      prev.map(faq =>
        faq.id === id ? { ...faq, expanded: !faq.expanded } : faq
      )
    );
  };

  const handleEmailSupport = () => {
    const email = 'support@cricdom.com';
    const subject = 'Cricdom App Support Request';
    const body = 'Please describe your issue or question here...';
    
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Email app is not available on this device');
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Failed to open email app');
      });
  };

  const handleCallSupport = () => {
    const phoneNumber = 'tel:+1234567890';
    
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneNumber);
        } else {
          Alert.alert('Error', 'Phone app is not available on this device');
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Failed to open phone app');
      });
  };

  const handleReportIssue = () => {
    Alert.alert(
      'Report Issue',
      'Choose how you\'d like to report the issue:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Email', onPress: handleEmailSupport },
        { text: 'Call', onPress: handleCallSupport },
      ]
    );
  };

  const supportOptions = [
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      action: handleEmailSupport,
      icon: '✉️',
    },
    {
      id: 'call',
      title: 'Call Support',
      description: 'Speak directly with our support team',
      action: handleCallSupport,
      icon: '📞',
    },
    {
      id: 'report',
      title: 'Report Issue',
      description: 'Report bugs or technical problems',
      action: handleReportIssue,
      icon: '🐛',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <Text style={styles.headerSubtitle}>
          We're here to help you with Cricdom
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Support Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Help</Text>
          <View style={styles.supportGrid}>
            {supportOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.supportOption}
                onPress={option.action}
              >
                <Text style={styles.supportIcon}>{option.icon}</Text>
                <Text style={styles.supportTitle}>{option.title}</Text>
                <Text style={styles.supportDescription}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqContainer}>
            {faqs.map((faq) => (
              <View key={faq.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleFAQ(faq.id)}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <Text style={[
                    styles.faqChevron,
                    faq.expanded && styles.faqChevronExpanded
                  ]}>
                    ›
                  </Text>
                </TouchableOpacity>
                {faq.expanded && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Last Updated</Text>
              <Text style={styles.infoValue}>January 2024</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Support Email</Text>
              <Text style={styles.infoValue}>support@cricdom.com</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Support Hours</Text>
              <Text style={styles.infoValue}>Mon-Fri, 9 AM - 6 PM</Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.contactDescription}>
            Our support team is always ready to assist you with any questions 
            or issues you might have with Cricdom.
          </Text>
          <TouchableOpacity style={styles.contactButton} onPress={handleEmailSupport}>
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  supportGrid: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  supportOption: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  supportIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  faqContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  faqChevron: {
    fontSize: 18,
    color: '#9CA3AF',
    transform: [{ rotate: '0deg' }],
  },
  faqChevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  contactSection: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  contactDescription: {
    fontSize: 14,
    color: '#1E40AF',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HelpSupportScreen;