import { Newsletter, NewsletterListResponse } from '../../types/newsletter';

// Mock newsletter data
export const mockNewsletters: Newsletter[] = [
  {
    id: '1',
    subject: 'The Future of AI: Weekly Insights',
    sender: {
      name: 'AI Trends Weekly',
      email: 'newsletter@aitrends.com',
    },
    receivedAt: '2024-01-05T08:00:00Z',
    content: {
      html: '<h1>The Future of AI</h1><p>This week in AI developments...</p>',
      text: 'The Future of AI\n\nThis week in AI developments...',
    },
    status: 'unread',
    tags: ['tech', 'ai'],
    metadata: {
      readTime: 5,
      wordCount: 1200,
      previewText:
        'Discover the latest breakthroughs in artificial intelligence and their impact on various industries.',
    },
  },
  {
    id: '2',
    subject: 'Weekly Product Design Inspiration',
    sender: {
      name: 'Design Weekly',
      email: 'hello@designweekly.com',
    },
    receivedAt: '2024-01-04T15:30:00Z',
    content: {
      html: "<h1>Design Inspiration</h1><p>This week's most innovative designs...</p>",
      text: "Design Inspiration\n\nThis week's most innovative designs...",
    },
    status: 'read',
    tags: ['design', 'inspiration'],
    metadata: {
      readTime: 8,
      wordCount: 1800,
      previewText:
        "Explore this week's curated collection of outstanding product designs from around the world.",
    },
  },
  {
    id: '3',
    subject: 'Startup Funding Weekly Report',
    sender: {
      name: 'Startup Digest',
      email: 'digest@startupweekly.com',
    },
    receivedAt: '2024-01-03T12:00:00Z',
    content: {
      html: '<h1>Funding Report</h1><p>Latest startup funding rounds and analysis...</p>',
      text: 'Funding Report\n\nLatest startup funding rounds and analysis...',
    },
    status: 'archived',
    tags: ['startup', 'business'],
    metadata: {
      readTime: 6,
      wordCount: 1500,
      previewText:
        'Your weekly roundup of the most significant startup funding news and market analysis.',
    },
  },
];

// Mock response with pagination
export const getMockNewsletterList = (
  page: number = 1,
  pageSize: number = 10,
): NewsletterListResponse => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = mockNewsletters.slice(startIndex, endIndex);

  return {
    items,
    total: mockNewsletters.length,
    nextToken: endIndex < mockNewsletters.length ? String(page + 1) : undefined,
  };
};

// Mock saved/library newsletters
export const mockSavedNewsletters = mockNewsletters.map(newsletter => ({
  ...newsletter,
  savedAt: new Date().toISOString(),
  lastReadPosition: Math.floor(Math.random() * 100),
  notes: 'Sample note for this newsletter',
}));
