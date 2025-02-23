import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

/**
 * Custom hook to copy text to the clipboard.
 *
 * @returns {UseCopyToClipboardReturn} - An object containing:
 * - `copy`: A function to copy text to the clipboard.
 * - `copiedText`: The last copied text or null if nothing has been copied.
 *
 * @example
 * const { copy, copiedText } = useCopyToClipboard();
 *
 * return (
 *   <div>
 *     <button onClick={() => copy('Hello, World!')}>Copy Text</button>
 *     {copiedText && <p>Copied: {copiedText}</p>}
 *   </div>
 * );
 */

export type UseCopyToClipboardReturn = {
  copy: CopyFn;
  copiedText: CopiedValue;
};

export type CopiedValue = string | null;

export type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = useCallback(
    async (text) => {
      if (!navigator?.clipboard) {
        console.warn('Clipboard not supported');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        return true;
      } catch (error) {
        console.warn('Copy failed', error);
        setCopiedText(null);
        return false;
      }
    },
    [setCopiedText]
  );

  return { copy, copiedText };
}
