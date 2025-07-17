import { type SnippetDetail } from "../types";
import ShikiHighlighter from "react-shiki";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useClipboard } from "../hooks/useClipboard";
import { useCodeBlock } from "../hooks/useCodeBlock";

export const SnippetContentDisplay = ({
  snippet,
}: {
  snippet: SnippetDetail;
}) => {
  const { copied, copyToClipboard } = useClipboard();
  const { preferences, getLanguage } = useCodeBlock();
  return (
    <div className="relative rounded-md flex justify-center max-w-fit">
      <ShikiHighlighter
        className="text-sm max-w-full overflow-x-auto rounded-md "
        language={getLanguage(snippet.language.toLowerCase())}
        theme={preferences.theme}
        showLanguage={preferences.showLanguage}
        showLineNumbers={preferences.showLineNumbers}
      >
        {snippet.content}
      </ShikiHighlighter>
      <div className=" absolute right-2 top-2 ">
        {copied ? (
          <ClipboardCheck
            role="button"
            className="size-4 text-muted-foreground"
          />
        ) : (
          <Clipboard
            role="button"
            className="size-4 text-muted-foreground"
            onClick={() => copyToClipboard(snippet.content)}
          />
        )}
      </div>
    </div>
  );
};
