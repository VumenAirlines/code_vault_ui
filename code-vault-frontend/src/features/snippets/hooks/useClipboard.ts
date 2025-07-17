import { useState, useCallback } from "react";

export const useClipboard = (resetDelay = 2000) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        setTimeout(() => setCopied(false), resetDelay);
      } catch (err) {
        setCopied(false);
        setError((err as Error).message);

        setTimeout(() => setError(null), resetDelay);
      }
    },
    [resetDelay]
  );

  return {
    copied,
    error,
    copyToClipboard,
  };
};
