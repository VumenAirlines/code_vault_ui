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
export const availableThemes = [
  "github",
  "github-dark",
  "monokai",
  "one-dark",
] as const;
export const availableEditorThemes = [
  "github",
  "github_dark",
  "monokai",
  "one_dak",
] as const;
export const availableLanguages = {
  c: "c",
  "c++": "cpp",
  "c#": "csharp",
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  java: "java",
  go: "go",
  rust: "rust",
  php: "php",
  html: "html",
  css: "css",
  json: "json",
  markdown: "markdown",
  sql: "sql",
  tsx: "tsx",
  jsx: "jsx",
} as const;
export const availableEditorLanguages = {
  c: "c_cpp",
  "c++": "c_cpp",
  "c#": "csharp",
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  java: "java",
  go: "golang",
  rust: "rust",
  php: "php",
  html: "html",
  css: "css",
  json: "json",
  markdown: "markdown",
  sql: "sql",
  tsx: "tsx",
  jsx: "jsx",
} as const;
export type SupportedLanguage = keyof typeof availableLanguages;
