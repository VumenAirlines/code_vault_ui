import { type SnippetDetail } from "../types";
import ShikiHighlighter from "react-shiki";
import { useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";

export const SnippetContentDisplay = ({
  snippet,
}: {
  snippet: SnippetDetail;
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(snippet.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative rounded-md  flex justify-center max-w-fit">
      <ShikiHighlighter
        className="text-sm max-w-full overflow-x-auto rounded-md "
        language={"tsx"}
        theme="aurora-x"
        showLanguage={false}
        showLineNumbers={true}
      >
        {snippet.content}
      </ShikiHighlighter>
      <div className=" absolute right-2 top-2 ">
        {copied ? (
          <ClipboardCheck className="size-4 text-muted-foreground" />
        ) : (
          <Clipboard
            className="size-4 text-muted-foreground"
            onClick={copyToClipboard}
          />
        )}
      </div>
    </div>
  );
};
