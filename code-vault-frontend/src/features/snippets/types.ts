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
export interface CreateSnippet {
  title: string;
  language: string;
  content: string;
  description?: string | null;
  tags?: string[] | null;
}
export interface UpdateSnippet {
  title?: string;
  content?: string;
  language?: string;
  description?: string | null;
  tags?: string[];
}
export interface UpdateSnippetParams {
  id: string;
  data: UpdateSnippet;
}
