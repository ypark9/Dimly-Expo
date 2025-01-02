import React from 'react';
import { NewsletterPreview } from '../../components/newsletter/NewsletterPreview';
import { RootStackScreenProps } from '../../types/navigation';

export default function NewsletterPreviewScreen({
  route,
}: RootStackScreenProps<'NewsletterPreview'>) {
  const { newsletter } = route.params;

  return <NewsletterPreview newsletter={newsletter} />;
}
