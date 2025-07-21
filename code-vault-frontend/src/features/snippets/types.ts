export interface Snippet {
  id: string;
  title: string;
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
export const languages = [
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "PHP", value: "php" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JSON", value: "json" },
  { label: "Markdown", value: "markdown" },
  { label: "SQL", value: "sql" },
  { label: "TSX", value: "tsx" },
  { label: "JSX", value: "jsx" },
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

export interface StatDetails {
  name: string;
  count: number;
}
export interface Stats {
  totalCount: number;
  mostUsedLanguage: StatDetails[];
  mostUsedTags: StatDetails[];
}
