## 🚀 About ME
Name : Arshad
Department : Civil Engineering
University : IIT Guwahati

---

## 🚀 DEMO
Demo Link : https://drive.google.com/drive/folders/1ZPD7jNr2oj35Bt5Gz9F-udZ6qEKhBwpp?usp=drive_link

---

## 🗂️ Project Structure

├── components          # Reusable UI components
│ ├── Header.tsx
│ ├── NoteInput.tsx
│ ├── SummaryOutput.tsx
│ └── Icons.tsx
├── hooks               # Custom React hooks
│ └── useCopyToClipboard.ts
├── services            # API and external services
│ └── geminiService.ts
├── App.tsx             # Main App component
└── index.tsx           # React entry point
├── index.html          # HTML template
└── .env.local          # Environment variables

## 🛠️ Setup Instructions 

### 1. Clone the Repository

```bash
git clone https://github.com/TheArshad/I_Am_Beside_You_Assignment1.git
cd cd I_Am_Beside_You_Assignment1/
```

### 2. Create a Virtual Environment/ **.env.local**

According to Project Structure : Create A **.env.local** File and then paste the following content 
```bash
GEMINI_API_KEY='PLACE_YOUR_GEMINI_API_HERE'
```

### 3. Download All the dependancy 

```bash
npm i
```

### 3. Run the Development Server

```bash
npm run dev
```
---

# 📄 AI Notes Summarizer

The **AI Notes Summarizer** is a web application that allows users to upload a **PDF** or **image file** and receive a **concise, AI-generated summary** of its content.  
The system is designed to be **simple, fast, and efficient**, leveraging the **Google Gemini API** for summarization.

---

## 🚀 Features
- Upload PDF or image files.
- AI-powered summarization using Gemini_API.
- Progressive streaming for real-time feedback.
- Modern, responsive UI with React + Tailwind CSS.
- One-click copy for generated summaries.

---

## 🏗️ System Architecture

### High-Level Design
The application follows a **client-server architecture**:

- **Frontend (Client):**  
  React SPA handling user interactions, file uploads, and displaying summaries.

- **Backend (Server):**  
  Lightweight Node.js server or serverless function that:
  - Receives uploaded files.  
  - Sends them to the Gemini API.  
  - Streams summaries back to the client.  
  - Manages API key security.  

- **AI Service (Gemini API):**  
  Google Gemini API for multimodal content analysis (PDFs, images, text).

### Data Flow
1. User uploads a PDF or image.  
2. File is converted to **Base64** and sent to backend.  
3. Backend constructs a **summarization prompt** and forwards it to Gemini API.  
4. Gemini API analyzes file and **streams back summary chunks**.  
5. Backend relays chunks to frontend.  
6. Frontend progressively displays summary in real time.  

---

## 🔧 Component Breakdown

### Frontend (React + TypeScript + Tailwind + Vite)
- **App.tsx** → Manages state (file, summary, errors) and handles summarization.  
- **Header.tsx** → Static header with logo/title.  
- **NoteInput.tsx** → Drag-and-drop uploader, file info, and generate button.  
- **SummaryOutput.tsx** → Displays summary, loading, error messages, and "Copy" button.  
- **Icons.tsx** → Reusable SVG icons.  
- **useCopyToClipboard.ts** → Custom hook for copying summary text.  

### Backend (Node.js)
- Receives Base64 file + MIME type.  
- Sends request to Gemini API.  
- Streams response to frontend.  
- Manages API key securely.  

### Services
- **geminiService.ts** → Encapsulates Gemini API calls and handles streaming logic.  

---

## 🗃️ Data Design

### Request Payload
json
{
  "fileContent": "<Base64 string>",
  "mimeType": "application/pdf"
}
Response Data
Streamed summary text chunks.

Progressive rendering in frontend.

Final summary as a single string.

⚙️ Technologies Used
Frontend
React → Component-based UI.

TypeScript → Static typing.

Tailwind CSS → Utility-first styling.

Vite → Fast dev & build tool.

Backend / AI
Node.js → Lightweight backend.

Google Gemini API → Summarization engine (gemini-2.5-flash).

Streaming → Real-time display of summaries.

File Handling
FileReader API → Convert file to Base64 before sending to backend.

State Management
React hooks (useState, useCallback) — sufficient for this project.

📌 Future Enhancements
Multi-language summarization.

More structured summary (bullet points, action items).

Save user summaries with authentication.

Batch file uploads.

🖥️ Installation & Setup
Prerequisites
Node.js v18+

Google Gemini API Key


# Install dependencies
npm install

# Add your Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Run development server
npm run dev
📜 License
Licensed under the MIT License.

🤝 Contributing
Pull requests are welcome!
For major changes, open an issue first to discuss what you’d like to change.

🌟 Acknowledgements
Google Gemini API for AI summarization.

React + Vite + Tailwind CSS.
