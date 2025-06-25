export interface Snippet {
  id: string;
  title: string;
  content: string;
  language: string;
  description: string | null;
  createdAt: string;
  updatedAt: string | null;
  tags: string[];
}
export interface SnippetDetail {
  id: string;
  title: string;
  content: string;
  language: string;
  description: string | null;
  createdAt: string;
  updatedAt: string | null;
  tags: string[];
}
