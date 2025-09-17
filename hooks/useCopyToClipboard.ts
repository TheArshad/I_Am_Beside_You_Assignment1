
import { useState, useCallback } from 'react';

export const useCopyToClipboard = (): [boolean, (text: string) => void] => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    if (!navigator.clipboard) {
      console.warn('Clipboard not available');
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }, []);

  return [isCopied, copyToClipboard];
};
