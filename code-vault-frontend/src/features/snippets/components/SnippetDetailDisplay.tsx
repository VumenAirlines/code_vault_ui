import {type SnippetDetail } from "../types";

export const SnippetDetailDisplay = ({ snippet }: { snippet: SnippetDetail }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{snippet.title}</h1>
      <p className="text-muted-foreground mt-1">{snippet.description}</p>
      
      <div className="mt-4">
        {/* We'll add syntax highlighting here later */}
        <pre className="bg-muted p-4 rounded-lg">
          <code>{snippet.content}</code>
        </pre>
      </div>
    </div>
  );
};


