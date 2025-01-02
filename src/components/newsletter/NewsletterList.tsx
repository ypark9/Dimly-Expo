import React from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Newsletter } from '../../types/newsletter';
import { NewsletterCard } from './NewsletterCard';

interface NewsletterListProps {
  newsletters: Newsletter[];
  onNewsletterPress: (newsletter: Newsletter) => void;
  onEndReached?: () => void;
  isLoading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const NewsletterList: React.FC<NewsletterListProps> = ({
  newsletters,
  onNewsletterPress,
  onEndReached,
  isLoading,
  refreshing,
  onRefresh,
}) => {
  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#666" />
      </View>
    );
  };

  return (
    <FlatList
      data={newsletters}
      renderItem={({ item }) => (
        <NewsletterCard newsletter={item} onPress={onNewsletterPress} />
      )}
      keyExtractor={item => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});
