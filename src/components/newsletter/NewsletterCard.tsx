import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Newsletter } from '../../types/newsletter';
import { format } from 'date-fns';

interface NewsletterCardProps {
  newsletter: Newsletter;
  onPress: (newsletter: Newsletter) => void;
}

export const NewsletterCard: React.FC<NewsletterCardProps> = ({
  newsletter,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(newsletter)}
      activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.sender}>{newsletter.sender.name}</Text>
        <Text style={styles.date}>
          {format(new Date(newsletter.receivedAt), 'MMM d, yyyy')}
        </Text>
      </View>
      <Text style={styles.subject} numberOfLines={2}>
        {newsletter.subject}
      </Text>
      <Text style={styles.preview} numberOfLines={2}>
        {newsletter.metadata.previewText}
      </Text>
      <View style={styles.footer}>
        <View style={styles.tags}>
          {newsletter.tags.map(tag => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.readTime}>
          {newsletter.metadata.readTime} min read
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sender: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  subject: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  preview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  readTime: {
    fontSize: 12,
    color: '#666',
  },
});
