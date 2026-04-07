import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the API with the key from environment variables
// It assumes process.env.GEMINI_API_KEY is available.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        if (!process.env.GEMINI_API_KEY) {
             return NextResponse.json({ error: 'GEMINI_API_KEY is missing in your environment variables. Please add it to your .env.local file.' }, { status: 500 });
        }

        const { prompt, type, currentText } = await req.json();
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        let finalPrompt = "";

        if (type === "objective") {
            finalPrompt = `You are an expert ATS resume writer. Rewrite or generate a highly professional Career Objective based on this draft/info: "${currentText}". Keep it under 3-4 sentences, impactful, and keyword-rich. Don't use any markdown output or introductory words like "Here is the objective". Just output the raw objective text.`;
        } else if (type === "shortDesc") {
             finalPrompt = `You are a technical resume writer. Enhance the following project short description to be ultra-professional and ATS-friendly: "${currentText}". Keep it 1-2 lines maximum. Don't use markdown or introduction text. Just the output.`;
        } else if (type === "features") {
             finalPrompt = `You are an expert resume writer. Enhance these project bullet points (features) to look extremely professional and action-oriented: "${currentText}". Do not add asterisks or markdown bullet points (like * or -) unless the original text had them. Keep the output plain text with newlines separating each point. Do not output anything other than the bullet points.`;
        } else {
             finalPrompt = prompt;
        }

        const result = await model.generateContent(finalPrompt);
        const response = await result.response;
        const generatedText = response.text().trim();

        return NextResponse.json({ success: true, text: generatedText.replace(/^\* |\- /gm, '') }); // Stripping any rogue markdown bullets
    } catch (e: any) {
        console.error("AI Generation error:", e);
        return NextResponse.json({ error: e.message || 'Failed to generate AI content' }, { status: 500 });
    }
}
