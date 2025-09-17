
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-sky-400"
          >
            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.5a.75.75 0 0 0 .5.707A9.735 9.735 0 0 0 6 21a9.707 9.707 0 0 0 5.25-1.533" />
            <path d="M15 3.003C15 3 15 2.25 15 2.25s0 8.25 0 8.25-5.25 0-5.25 0V3.003a.75.75 0 0 1 .75-.75H14.25a.75.75 0 0 1 .75.75Z" />
            <path d="M3 15V6a9.728 9.728 0 0 1 3-1.003c.957.01 1.9.155 2.75.41a.75.75 0 0 0 .5-.71V3.25a.75.75 0 0 0-.5-.708A9.738 9.738 0 0 0 6 2.003a9.705 9.705 0 0 0-5.25 1.532.75.75 0 0 0-.5.707v14.5a.75.75 0 0 0 .5.707A9.703 9.703 0 0 0 6 22.003a9.742 9.742 0 0 0 5.25-1.533.75.75 0 0 0 .5-.707v-4.501a.75.75 0 0 0-.5-.707A9.723 9.723 0 0 1 6 14.003a9.728 9.728 0 0 1-3-1.003V15Z" />
            <path d="M16.5 6.339a3.75 3.75 0 1 0-3.268 5.405 6.75 6.75 0 0 1 6.536 5.25H21a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-1.04-.683 3.75 3.75 0 0 0-4.21-7.978Z" />
          </svg>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            AI Notes Summarizer
          </h1>
        </div>
      </header>
  );
};
