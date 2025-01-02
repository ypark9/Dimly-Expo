import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Newsletter } from '../../types/newsletter';
import { format } from 'date-fns';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NewsletterPreviewProps {
  newsletter: Newsletter;
}

export const NewsletterPreview: React.FC<NewsletterPreviewProps> = ({
  newsletter,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.titleRow}>
          <Text style={styles.subject} numberOfLines={2}>
            {newsletter.subject}
          </Text>
          <Pressable
            hitSlop={8}
            style={styles.closeButton}
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </Pressable>
        </View>
        <View style={styles.senderInfo}>
          <Text style={styles.senderName}>{newsletter.sender.name}</Text>
          <Text style={styles.date}>
            {format(new Date(newsletter.receivedAt), 'MMM d, yyyy')}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        <WebView
          source={{
            html: `
              <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
                  <style>
                    body {
                      font-family: -apple-system, system-ui;
                      font-size: 16px;
                      color: #ffffff;
                      background-color: #000000;
                      padding: 16px;
                      margin: 0;
                      line-height: 1.5;
                    }
                    a { color: #97B1A6; }
                    p { color: #cccccc; margin: 0 0 16px 0; }
                    img { max-width: 100%; height: auto; }
                    h1, h2, h3, h4, h5, h6 { color: #ffffff; }
                  </style>
                </head>
                <body>
                  ${newsletter.content.html}
                </body>
              </html>
            `,
          }}
          style={styles.webview}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          originWhitelist={['*']}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingTop: 8,
  },
  subject: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginRight: 16,
  },
  senderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  senderName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#97B1A6',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
});
