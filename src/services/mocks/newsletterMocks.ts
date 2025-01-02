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
      html: "<h1>Funding Report</h1><p>Latest startup funding rounds and analysis... What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Where can I get some? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>",
      text: "Funding Report\n\nLatest startup funding rounds and analysis... What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Where can I get some? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
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
