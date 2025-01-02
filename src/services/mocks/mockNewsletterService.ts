import {
  Newsletter,
  NewsletterFilters,
  NewsletterListResponse,
  NewsletterUpdateInput,
} from '../../types/newsletter';
import { mockNewsletters, getMockNewsletterList } from './newsletterMocks';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockNewsletterService = {
  // Get paginated list of newsletters
  getNewsletters: async (
    page: number = 1,
    pageSize: number = 10,
    filters?: NewsletterFilters,
  ): Promise<NewsletterListResponse> => {
    await delay(500); // Simulate network delay

    let filteredNewsletters = [...mockNewsletters];

    // Apply filters if provided
    if (filters) {
      if (filters.status) {
        filteredNewsletters = filteredNewsletters.filter(
          n => n.status === filters.status,
        );
      }
      if (filters.tags?.length) {
        filteredNewsletters = filteredNewsletters.filter(n =>
          n.tags.some(tag => filters.tags?.includes(tag)),
        );
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredNewsletters = filteredNewsletters.filter(
          n =>
            n.subject.toLowerCase().includes(query) ||
            n.content.text.toLowerCase().includes(query),
        );
      }
    }

    return {
      items: filteredNewsletters.slice((page - 1) * pageSize, page * pageSize),
      total: filteredNewsletters.length,
      nextToken:
        page * pageSize < filteredNewsletters.length
          ? String(page + 1)
          : undefined,
    };
  },

  // Get single newsletter by ID
  getNewsletter: async (id: string): Promise<Newsletter | null> => {
    await delay(300);
    return mockNewsletters.find(n => n.id === id) || null;
  },

  // Update newsletter
  updateNewsletter: async (
    id: string,
    updates: NewsletterUpdateInput,
  ): Promise<Newsletter> => {
    await delay(300);
    const newsletter = mockNewsletters.find(n => n.id === id);
    if (!newsletter) {
      throw new Error('Newsletter not found');
    }
    return {
      ...newsletter,
      ...updates,
    };
  },

  // Get all available tags
  getTags: async (): Promise<string[]> => {
    await delay(200);
    const tags = new Set<string>();
    mockNewsletters.forEach(n => n.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  },
};
