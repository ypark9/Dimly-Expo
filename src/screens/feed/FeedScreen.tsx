import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { MockNewsletterService } from '../../services/mocks/mockNewsletterService';
import { Newsletter } from '../../types/newsletter';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../../types/navigation';

export default function FeedScreen() {
  const navigation =
    useNavigation<RootStackScreenProps<'NewsletterPreview'>['navigation']>();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNewsletters = async (refresh = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true);
      }
      const response = await MockNewsletterService.getNewsletters(1, 10);
      setNewsletters(response.items);
      setError(null);
    } catch (err) {
      setError('Failed to load newsletters');
      console.error('Error fetching newsletters:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const onRefresh = useCallback(() => {
    fetchNewsletters(true);
  }, []);

  const renderNewsletterItem = ({ item }: { item: Newsletter }) => (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate('NewsletterPreview', { newsletter: item })
      }>
      <View style={styles.cardHeader}>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.date}>
          {format(new Date(item.receivedAt), 'MMM d, yyyy')}
        </Text>
      </View>
      <View style={styles.senderInfo}>
        <Text style={styles.senderName}>{item.sender.name}</Text>
        <Text style={styles.senderEmail}>{item.sender.email}</Text>
      </View>
      <Text style={styles.previewText} numberOfLines={2}>
        {item.metadata.previewText}
      </Text>
      <View style={styles.cardFooter}>
        <View style={styles.tagContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.readTime}>{item.metadata.readTime} min read</Text>
      </View>
    </Pressable>
  );

  if (isLoading && !isRefreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable
          style={styles.retryButton}
          onPress={() => fetchNewsletters()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={newsletters}
        renderItem={renderNewsletterItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No newsletters found</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  subject: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  date: {
    color: '#666',
    fontSize: 14,
  },
  senderInfo: {
    marginBottom: 8,
  },
  senderName: {
    color: '#97B1A6',
    fontSize: 16,
    fontWeight: '500',
  },
  senderEmail: {
    color: '#666',
    fontSize: 14,
  },
  previewText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginRight: 8,
  },
  tag: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },
  readTime: {
    color: '#666',
    fontSize: 12,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  retryButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
