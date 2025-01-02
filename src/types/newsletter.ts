export type NewsletterStatus = 'unread' | 'read' | 'archived';

export interface Newsletter {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
  };
  receivedAt: string; // ISO date string
  content: {
    html: string;
    text: string;
  };
  status: NewsletterStatus;
  tags: string[];
  metadata: {
    readTime?: number; // estimated reading time in minutes
    wordCount?: number;
    previewText?: string;
  };
}

export interface NewsletterListResponse {
  items: Newsletter[];
  nextToken?: string; // for pagination
  total: number;
}

export interface NewsletterFilters {
  status?: NewsletterStatus;
  tags?: string[];
  dateRange?: {
    start: string; // ISO date string
    end: string; // ISO date string
  };
  searchQuery?: string;
}

export interface NewsletterUpdateInput {
  status?: NewsletterStatus;
  tags?: string[];
}

// For the Library screen
export interface SavedNewsletter extends Newsletter {
  savedAt: string; // ISO date string
  lastReadPosition?: number; // scroll position or paragraph index
  notes?: string;
}
