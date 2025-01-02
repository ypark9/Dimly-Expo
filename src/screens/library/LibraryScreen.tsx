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
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Newsletter } from '../../types/newsletter';
import { format } from 'date-fns';
import { mockSavedNewsletters } from '../../services/mocks/newsletterMocks';

type FilterStatus = 'all' | 'in_progress' | 'completed' | 'not_started';

interface SavedNewsletter extends Newsletter {
  savedAt: string;
  lastReadPosition: number;
  notes: string;
}

interface StylesType {
  [key: string]: ViewStyle | TextStyle;
  not_started: ViewStyle;
  in_progress: ViewStyle;
  completed: ViewStyle;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LibraryScreen() {
  const [savedNewsletters, setSavedNewsletters] = useState<SavedNewsletter[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>('all');

  const fetchSavedNewsletters = async (refresh = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true);
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      setSavedNewsletters(mockSavedNewsletters as SavedNewsletter[]);
      setError(null);
    } catch (err) {
      setError('Failed to load saved newsletters');
      console.error('Error fetching saved newsletters:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSavedNewsletters();
  }, []);

  const onRefresh = useCallback(() => {
    fetchSavedNewsletters(true);
  }, []);

  const getReadingStatus = (lastReadPosition: number): FilterStatus => {
    if (lastReadPosition === 0) return 'not_started';
    if (lastReadPosition < 100) return 'in_progress';
    return 'completed';
  };

  const filteredNewsletters = savedNewsletters.filter(newsletter => {
    if (selectedFilter === 'all') return true;
    return getReadingStatus(newsletter.lastReadPosition) === selectedFilter;
  });

  const FilterButton = ({
    status,
    label,
  }: {
    status: FilterStatus;
    label: string;
  }) => (
    <Pressable
      style={[
        styles.filterButton,
        selectedFilter === status && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedFilter(status)}>
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === status && styles.filterButtonTextActive,
        ]}>
        {label}
      </Text>
    </Pressable>
  );

  const renderNewsletterItem = ({ item }: { item: SavedNewsletter }) => (
    <Pressable style={styles.card}>
      {/* Reading Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${item.lastReadPosition}%`,
              backgroundColor: '#C9C5BA',
            },
          ]}
        />
      </View>

      <View style={styles.cardHeader}>
        <Text style={styles.subject}>{item.subject}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.savedDate}>
            Saved {format(new Date(item.savedAt), 'MMM d, yyyy')}
          </Text>
        </View>
      </View>

      {/* Reading Status */}
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusBadge,
            styles[getReadingStatus(item.lastReadPosition)],
          ]}>
          <Text style={styles.statusText}>
            {item.lastReadPosition === 0
              ? 'Not Started'
              : item.lastReadPosition === 100
                ? 'Completed'
                : `${item.lastReadPosition}% Read`}
          </Text>
        </View>
        <Text style={styles.readTime}>{item.metadata.readTime} min read</Text>
      </View>

      {/* Notes Section */}
      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}

      {/* Tags */}
      <View style={styles.tagContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
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
          onPress={() => fetchSavedNewsletters()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <View style={styles.filterContent}>
          <FilterButton status="all" label="All" />
          <FilterButton status="in_progress" label="In Progress" />
          <FilterButton status="completed" label="Completed" />
          <FilterButton status="not_started" label="Not Started" />
        </View>
      </View>

      <FlatList
        data={filteredNewsletters}
        renderItem={renderNewsletterItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No saved newsletters</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create<StylesType>({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  filterContainer: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
  },
  filterContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#333',
    minWidth: SCREEN_WIDTH / 4 - 24,
  },
  filterButtonActive: {
    backgroundColor: '#e0e1dd',
  },
  filterButtonText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  filterButtonTextActive: {
    color: '#000',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#333',
  },
  progressBar: {
    height: '100%',
  },
  cardHeader: {
    marginTop: 8,
    marginBottom: 12,
  },
  subject: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savedDate: {
    color: '#666',
    fontSize: 14,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  not_started: {
    backgroundColor: '#424242',
  },
  in_progress: {
    backgroundColor: '#EBBAB9',
  },
  completed: {
    backgroundColor: '#388E3C',
  },
  statusText: {
    color: '#3C3C3B',
    fontSize: 12,
    fontWeight: '500',
  },
  readTime: {
    color: '#666',
    fontSize: 12,
  },
  notesContainer: {
    backgroundColor: '#262626',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  notesLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  notesText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    color: '#fff',
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
  retryButtonTextActive: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
} as const);
