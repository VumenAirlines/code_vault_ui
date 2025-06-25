import { SnippetListItem } from './SnippetListItem';
import {type Snippet } from '../types';

interface SnippetListProps {
  snippets: Snippet[];
}

export const SnippetList = ({ snippets }: SnippetListProps) => {
  if (snippets.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-8">
        <p>You haven't created any snippets yet.</p>
        <p>Click "Create Snippet" to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {snippets.map((snippet) => (
        <SnippetListItem key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
};