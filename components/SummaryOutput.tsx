
import React from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { CopyIcon, CheckIcon, ErrorIcon } from './Icons';

interface SummaryOutputProps {
  summary: string;
  isLoading: boolean;
  error: string | null;
}

const SummaryPlaceholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-30">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <h3 className="text-lg font-semibold text-slate-400">Your summary will appear here</h3>
        <p className="max-w-xs">Enter some notes and click "Generate Summary" to see the magic happen.</p>
    </div>
);

export const SummaryOutput: React.FC<SummaryOutputProps> = ({ summary, isLoading, error }) => {
  const [isCopied, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    if (summary) {
      copyToClipboard(summary);
    }
  };

  const formattedSummary = summary.replace(/\*\*(.*?)\*\*/g, '<strong class="text-sky-400">$1</strong>')
                                   .replace(/### (.*?)\n/g, '<h3 class="text-lg font-semibold mt-4 mb-2 text-slate-100">$1</h3>')
                                   .replace(/\* (.*?)\n/g, '<li class="ml-5 list-disc">$1</li>');

  return (
    <div className="flex flex-col h-full bg-slate-800/50 rounded-lg border border-slate-700 shadow-lg">
      <div className="flex justify-between items-center p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-slate-200">AI Summary</h2>
        <button
          onClick={handleCopy}
          disabled={!summary || isLoading}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-700 text-slate-300 font-medium rounded-md transition-all duration-200 ease-in-out enabled:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          {isCopied ? (
            <>
              <CheckIcon /> Copied!
            </>
          ) : (
            <>
              <CopyIcon /> Copy
            </>
          )}
        </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {error && (
            <div className="flex flex-col items-center justify-center h-full text-center text-red-400 p-8">
                <ErrorIcon />
                <h3 className="text-lg font-semibold text-red-300 mt-4">An Error Occurred</h3>
                <p className="max-w-xs">{error}</p>
            </div>
        )}
        {!error && !isLoading && !summary && <SummaryPlaceholder />}
        {isLoading && !summary && (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 p-8 animate-pulse">
                <div className="w-16 h-4 bg-slate-700 rounded-md mb-4"></div>
                <div className="w-full h-3 bg-slate-700 rounded-md mb-2"></div>
                <div className="w-full h-3 bg-slate-700 rounded-md mb-2"></div>
                <div className="w-3/4 h-3 bg-slate-700 rounded-md"></div>
                 <div className="w-12 h-4 bg-slate-700 rounded-md mb-4 mt-8"></div>
                <div className="w-full h-3 bg-slate-700 rounded-md mb-2"></div>
                <div className="w-5/6 h-3 bg-slate-700 rounded-md"></div>
            </div>
        )}
        <div 
          className="prose prose-invert prose-sm max-w-none text-slate-300"
          dangerouslySetInnerHTML={{ __html: formattedSummary }}
        />
      </div>
    </div>
  );
};
