import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { text } = await req.json();
        
        const res = await fetch('https://api.languagetool.org/v2/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
            body: new URLSearchParams({ text, language: 'en-US' })
        });
        
        if (!res.ok) {
            throw new Error(`LanguageTool API responded with status: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (e: any) {
        console.error("Spellcheck error:", e);
        return NextResponse.json({ error: e.message || 'Failed to check spelling' }, { status: 500 });
    }
}
