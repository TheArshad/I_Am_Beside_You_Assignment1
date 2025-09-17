import React, { useState, useCallback } from 'react';
import { SparklesIcon, LoaderIcon, FileUploadIcon, PdfIcon, ImageIcon, XCircleIcon } from './Icons';

interface NoteInputProps {
  file: File | null;
  setFile: (file: File | null) => void;
  onSummarize: () => void;
  isLoading: boolean;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};


export const NoteInput: React.FC<NoteInputProps> = ({ file, setFile, onSummarize, isLoading }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };
    
    const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    }, [setFile]);

  return (
    <div className="flex flex-col h-full bg-slate-800/50 rounded-lg border border-slate-700 shadow-lg">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-slate-200">Your File</h2>
        <p className="text-sm text-slate-400">Upload an image or PDF to get a summary.</p>
      </div>
      <div className="flex-grow p-4">
        {!file ? (
            <label 
                className={`flex flex-col items-center justify-center w-full h-full min-h-[300px] lg:min-h-0 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${isDragging ? 'border-sky-500 bg-sky-900/20' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-800'}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <FileUploadIcon />
                    <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-slate-500">Image or PDF file</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => handleFileChange(e.target.files)} accept="image/*,application/pdf" disabled={isLoading} />
            </label>
        ) : (
            <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px] lg:min-h-0 bg-slate-800 rounded-lg p-4">
                <div className="flex items-center w-full bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <div className="flex-shrink-0">
                        {file.type.startsWith('image/') ? <ImageIcon /> : <PdfIcon />}
                    </div>
                    <div className="ml-4 flex-grow min-w-0">
                        <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
                        <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>
                    </div>
                    <button onClick={() => setFile(null)} disabled={isLoading} className="ml-4 flex-shrink-0 text-slate-500 hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <XCircleIcon />
                    </button>
                </div>
            </div>
        )}
      </div>
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onSummarize}
          disabled={isLoading || !file}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-sky-600 text-white font-semibold rounded-md transition-all duration-200 ease-in-out enabled:hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          {isLoading ? (
            <>
              <LoaderIcon />
              Summarizing...
            </>
          ) : (
            <>
              <SparklesIcon />
              Generate Summary
            </>
          )}
        </button>
      </div>
    </div>
  );
};
