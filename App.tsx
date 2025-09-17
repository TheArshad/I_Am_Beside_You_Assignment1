import React, { useState, useCallback } from 'react';
import { NoteInput } from './components/NoteInput';
import { SummaryOutput } from './components/SummaryOutput';
import { summarizeFileStream } from './services/geminiService';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = useCallback(async () => {
    if (!file || isLoading) return;

    setIsLoading(true);
    setSummary('');
    setError(null);

    const readFileAsBase64 = (fileToRead: File): Promise<{ base64: string; mimeType: string }> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          const [header, base64] = dataUrl.split(',');
          if (!base64) {
            return reject(new Error("Could not read file content."));
          }
          const mimeType = header?.match(/:(.*?);/)?.[1];
          if (!mimeType) {
            return reject(new Error("Could not determine file MIME type."));
          }
          resolve({ base64, mimeType });
        };
        reader.onerror = () => {
          reject(new Error("Failed to read the file."));
        };
        reader.readAsDataURL(fileToRead);
      });
    };

    try {
      const { base64, mimeType } = await readFileAsBase64(file);
      await summarizeFileStream(base64, mimeType, (chunk) => {
        setSummary((prev) => prev + chunk);
      });
    } catch (err) {
      console.error('Summarization error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [file, isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-900 text-slate-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 gap-8">
        <section
          className="w-full max-w-4xl"
          style={{ width: '80%' }}
        >
          <div className="rounded-3xl shadow-2xl bg-gradient-to-br from-indigo-800/80 via-slate-800/90 to-blue-800/80 border border-indigo-700/60 p-8 mb-10 transition-all duration-300 hover:shadow-indigo-700/40">
            <h2 className="text-2xl font-bold mb-6 text-indigo-200 drop-shadow">Upload Your Notes</h2>
            <NoteInput
              file={file}
              setFile={setFile}
              onSummarize={handleSummarize}
              isLoading={isLoading}
            />
          </div>
          <div className="rounded-3xl shadow-2xl bg-gradient-to-br from-blue-800/80 via-slate-800/90 to-indigo-800/80 border border-blue-700/60 p-8 transition-all duration-300 hover:shadow-blue-700/40">
            <h2 className="text-2xl font-bold mb-6 text-blue-200 drop-shadow">Summary</h2>
            <SummaryOutput summary={summary} isLoading={isLoading} error={error} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
