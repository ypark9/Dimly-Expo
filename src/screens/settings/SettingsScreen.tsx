import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Clipboard,
  Share,
  Switch,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const PREVIEW_CONTENT = {
  title: 'The Future of AI in Healthcare',
  content:
    'Artificial Intelligence is revolutionizing how we approach medical diagnosis and treatment...',
  publisher: 'TechHealth Weekly',
};

export default function SettingsScreen() {
  const { signOut, user } = useAuth();
  const [fontSize, setFontSize] = useState(16);
  const [copyAnimation] = useState(new Animated.Value(0));
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(true);

  const dimlyEmail = `${user?.username}@read.yopa.page`;
  const userEmail = user?.username || 'user@example.com';

  const handleCopyEmail = async () => {
    try {
      await Clipboard.setString(dimlyEmail);
      setShowCopySuccess(true);
      Animated.sequence([
        Animated.timing(copyAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(copyAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowCopySuccess(false);
      });
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `My Dimly email address is: ${dimlyEmail}`,
      });
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  const renderCopyButton = () => {
    return (
      <TouchableOpacity onPress={handleCopyEmail} style={styles.actionButton}>
        <View style={{ width: 20, height: 20 }}>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                opacity: copyAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              },
            ]}>
            <Ionicons name="copy-outline" size={20} color="#007AFF" />
          </Animated.View>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                opacity: copyAnimation,
              },
            ]}>
            <Ionicons name="checkmark" size={20} color="#4CAF50" />
          </Animated.View>
        </View>
        <Text style={styles.actionText}>
          {showCopySuccess ? 'Copied!' : 'Copy'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dimly Settings</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Font Size</Text>
            <View style={styles.fontSizeControl}>
              <Text style={styles.fontSizeLabel}>A</Text>
              <Slider
                style={styles.slider}
                minimumValue={12}
                maximumValue={24}
                value={fontSize}
                onValueChange={setFontSize}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#555555"
              />
              <Text style={[styles.fontSizeLabel, { fontSize: 24 }]}>A</Text>
            </View>
            <View style={styles.previewSection}>
              <Text style={styles.previewLabel}>Preview</Text>
              <View style={styles.previewContainer}>
                <Text style={[styles.previewTitle, { fontSize: fontSize + 4 }]}>
                  {PREVIEW_CONTENT.title}
                </Text>
                <Text style={[styles.previewContent, { fontSize }]}>
                  {PREVIEW_CONTENT.content}
                </Text>
                <Text
                  style={[styles.previewPublisher, { fontSize: fontSize - 2 }]}>
                  {PREVIEW_CONTENT.publisher}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email Integration</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Your Dimly Address</Text>
            <View style={styles.emailRow}>
              <Text style={styles.email}>{dimlyEmail}</Text>
              <View style={styles.emailActions}>
                {renderCopyButton()}
                <TouchableOpacity
                  onPress={handleShare}
                  style={styles.actionButton}>
                  <Ionicons name="share-outline" size={20} color="#007AFF" />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            <View style={styles.notificationRow}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Switch
                value={isPushEnabled}
                onValueChange={setIsPushEnabled}
                trackColor={{ false: '#555555', true: '#4CAF50' }}
                thumbColor={isPushEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <Text style={styles.email}>{userEmail}</Text>
            <TouchableOpacity onPress={signOut}>
              <Text style={styles.signOutText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  fontSizeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fontSizeLabel: {
    color: '#fff',
    fontSize: 14,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  previewSection: {
    gap: 8,
  },
  previewLabel: {
    fontSize: 14,
    color: '#999',
  },
  previewContainer: {
    gap: 8,
  },
  previewTitle: {
    color: '#fff',
    fontWeight: '600',
  },
  previewContent: {
    color: '#fff',
    lineHeight: 24,
  },
  previewPublisher: {
    color: '#999',
  },
  label: {
    color: '#999',
    fontSize: 14,
  },
  emailRow: {
    flexDirection: 'column',
    gap: 12,
  },
  email: {
    color: '#fff',
    fontSize: 16,
  },
  emailActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: '#007AFF',
    fontSize: 16,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    color: '#fff',
    fontSize: 16,
  },
  signOutText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
