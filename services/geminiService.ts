
import { GoogleGenAI, Type } from "@google/genai";
import type { SeoAnalysisResult } from '../types';

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.OBJECT,
            properties: {
                text: { type: Type.STRING },
                length: { type: Type.INTEGER },
                status: { type: Type.STRING, enum: ['good', 'bad', 'warning', 'neutral'] },
                recommendation: { type: Type.STRING }
            },
            required: ['text', 'length', 'status', 'recommendation']
        },
        metaDescription: {
            type: Type.OBJECT,
            properties: {
                text: { type: Type.STRING },
                length: { type: Type.INTEGER },
                status: { type: Type.STRING, enum: ['good', 'bad', 'warning', 'neutral'] },
                recommendation: { type: Type.STRING }
            },
            required: ['text', 'length', 'status', 'recommendation']
        },
        h1Tags: {
            type: Type.OBJECT,
            properties: {
                tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                count: { type: Type.INTEGER },
                status: { type: Type.STRING, enum: ['good', 'bad', 'warning', 'neutral'] },
                recommendation: { type: Type.STRING }
            },
            required: ['tags', 'count', 'status', 'recommendation']
        },
        images: {
            type: Type.OBJECT,
            properties: {
                total: { type: Type.INTEGER },
                withAlt: { type: Type.INTEGER },
                withoutAlt: { type: Type.INTEGER },
                status: { type: Type.STRING, enum: ['good', 'bad', 'warning', 'neutral'] },
                recommendation: { type: Type.STRING }
            },
            required: ['total', 'withAlt', 'withoutAlt', 'status', 'recommendation']
        },
        wordCount: {
            type: Type.OBJECT,
            properties: {
                count: { type: Type.INTEGER },
                status: { type: Type.STRING, enum: ['good', 'bad', 'warning', 'neutral'] },
                recommendation: { type: Type.STRING }
            },
            required: ['count', 'status', 'recommendation']
        },
        keywordAnalysis: {
            type: Type.OBJECT,
            properties: {
                inTitle: { type: Type.BOOLEAN },
                inDescription: { type: Type.BOOLEAN },
                inH1: { type: Type.BOOLEAN },
                status: { type: Type.STRING, enum: ['good', 'bad', 'warning', 'neutral'] },
                recommendation: { type: Type.STRING }
            },
            required: ['inTitle', 'inDescription', 'inH1', 'status', 'recommendation']
        }
    },
    required: ['title', 'metaDescription', 'h1Tags', 'images', 'wordCount', 'keywordAnalysis']
};


export const analyzeSeo = async (url: string, keyword: string, apiKey: string): Promise<SeoAnalysisResult> => {
    if (!apiKey) {
        throw new Error("API key is required");
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
        Act as an expert on-page SEO analyzer. Analyze the content of the website at the URL "${url}" for the target keyword "${keyword}".
        Based on your knowledge of the page's content, provide a detailed analysis of the following metrics.
        
        Guidelines for analysis:
        - Title Tag: Good length is 50-60 characters.
        - Meta Description: Good length is 120-155 characters.
        - H1 Tags: Ideally, there should be exactly one H1 tag.
        - Images: All images should have descriptive alt attributes.
        - Word Count: A count above 300 words is generally good for informational content.
        - Keyword Placement: The target keyword should ideally appear in the title, meta description, and at least one H1 tag.

        Return your analysis ONLY as a JSON object that strictly follows the provided schema. Do not include any introductory text or markdown formatting.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.2,
            },
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return result as SeoAnalysisResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
           throw new Error(`Failed to get SEO analysis from Gemini API: ${error.message}`);
        }
        throw new Error('An unknown error occurred while analyzing SEO.');
    }
};
