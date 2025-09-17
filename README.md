📄 AI Notes Summarizer
The AI Notes Summarizer is a web application that allows users to upload a PDF or image file and receive a concise, AI-generated summary of its content.
The system is designed to be simple, fast, and efficient, leveraging the Google Gemini API for summarization.

🚀 Features
Upload PDF or image files.
AI-powered summarization using Google Gemini.
Progressive streaming for real-time feedback.
Modern, responsive UI with React + Tailwind CSS.
One-click copy for generated summaries.
🏗️ System Architecture
High-Level Design
The application follows a client-server architecture:

Frontend (Client):
React SPA handling user interactions, file uploads, and displaying summaries.

Backend (Server):
Lightweight Node.js server or serverless function that:

Receives uploaded files.
Sends them to the Gemini API.
Streams summaries back to the client.
Manages API key security.
AI Service (Gemini API):
Google Gemini API for multimodal content analysis (PDFs, images, text).

Data Flow
User uploads a PDF or image.
File is converted to Base64 and sent to backend.
Backend constructs a summarization prompt and forwards it to Gemini API.
Gemini API analyzes file and streams back summary chunks.
Backend relays chunks to frontend.
Frontend progressively displays summary in real time.
🔧 Component Breakdown
Frontend (React + TypeScript + Tailwind + Vite)
App.tsx → Manages state (file, summary, errors) and handles summarization.
Header.tsx → Static header with logo/title.
NoteInput.tsx → Drag-and-drop uploader, file info, and generate button.
SummaryOutput.tsx → Displays summary, loading, error messages, and "Copy" button.
Icons.tsx → Reusable SVG icons.
useCopyToClipboard.ts → Custom hook for copying summary text.
Backend (Node.js)
Receives Base64 file + MIME type.
Sends request to Gemini API.
Streams response to frontend.
Manages API key securely.
Services
geminiService.ts → Encapsulates Gemini API calls and handles streaming logic.
🗂️ Project Structure
/src ├── components │ ├── Header.tsx │ ├── NoteInput.tsx │ ├── SummaryOutput.tsx │ └── Icons.tsx ├── hooks │ └── useCopyToClipboard.ts ├── services │ └── geminiService.ts ├── App.tsx └── index.tsx

yaml Copy code

🗃️ Data Design
Request Payload
json { "fileContent": "", "mimeType": "application/pdf" } Response Data Streamed summary text chunks.

Progressive rendering in frontend.

Final summary as a single string.

⚙️ Technologies Used Frontend React → Component-based UI.

TypeScript → Static typing.

Tailwind CSS → Utility-first styling.

Vite → Fast dev & build tool.

Backend / AI Node.js → Lightweight backend.

Google Gemini API → Summarization engine (gemini-2.5-flash).

Streaming → Real-time display of summaries.

File Handling FileReader API → Convert file to Base64 before sending to backend.

State Management React hooks (useState, useCallback) — sufficient for this project.

📌 Future Enhancements Multi-language summarization.

More structured summary (bullet points, action items).

Save user summaries with authentication.

Batch file uploads.

🖥️ Installation & Setup Prerequisites Node.js v18+

Google Gemini API Key

Install dependencies
npm install

Add your Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env

Run development server
npm run dev 📜 License Licensed under the MIT License.

🤝 Contributing Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

🌟 Acknowledgements Google Gemini API for AI summarization.

React + Vite + Tailwind CSS.
