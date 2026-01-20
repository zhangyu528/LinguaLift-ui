import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedLesson } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const lessonSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    topic: {
      type: Type.STRING,
      description: "The topic of the lesson",
    },
    cefrLevel: {
      type: Type.STRING,
      description: "The CEFR level of the lesson",
    },
    vocabulary: {
      type: Type.ARRAY,
      description: "List of 5 key vocabulary words related to the topic",
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          definition: { type: Type.STRING, description: "A short, simple definition appropriate for the level" },
        },
        required: ["word", "definition"],
      },
    },
    shortStory: {
      type: Type.STRING,
      description: "A short paragraph (approx 50-80 words) using the vocabulary words contextually.",
    },
  },
  required: ["topic", "cefrLevel", "vocabulary", "shortStory"],
};

export const generateLesson = async (topic: string, level: string): Promise<GeneratedLesson> => {
  const prompt = `
    Create a micro English learning lesson.
    Topic: ${topic}
    Target CEFR Level: ${level}
    
    Requirements:
    1. Select exactly 5 key English words related to the topic appropriate for the level.
    2. Write a very short engaging story or paragraph using these words.
    3. Return valid JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: lessonSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as GeneratedLesson;
  } catch (error) {
    console.error("Error generating lesson:", error);
    throw error;
  }
};