import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function summarizeFileStream(
  fileContent: string,
  mimeType: string,
  onStream: (chunk: string) => void
): Promise<void> {
  const model = "gemini-2.5-flash";
  const prompt = `
    Summarize the content of the provided file (${mimeType}) concisely. Your primary goal is to extract the most critical information, key decisions, and actionable items.

    - If the file is an image, describe the key elements, their relationships, and any text present.
    - If the file is a document, extract the main points, arguments, and conclusions.

    Present the summary in a well-structured format using Markdown:
    1.  **Main Points:** Start with a few bullet points covering the overarching themes or conclusions.
    2.  **Action Items:** If any, list clear, actionable tasks.
    3.  **Key Details:** Include any important data, figures, or specific details that are crucial for context.

    The tone should be professional and direct.
  `;

  try {
    const response = await ai.models.generateContentStream({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: fileContent,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    for await (const chunk of response) {
      onStream(chunk.text);
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get summary from AI. Please check your file and network connection.");
  }
}
