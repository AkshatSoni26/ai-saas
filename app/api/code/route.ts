import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// import OpenAI from 'openai';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
import { checkApiLimit, incraseApiLimit } from '@/lib/api-limit';
// import {HarmCategory, HarmBlockThreshold} from ""



// Access your API key as an environment variable (see "Set up your API key" above)
const apiKey = process.env.GEMINI_API_KEY
const MODEL_NAME = process.env.MODEL_NAME


const instrucationMessage: string = "You are a code generator. You must answer only in markdown code snippts. Use code comments for explantions.\n"


export async function POST(req: Request) {
    // For text-only input, use the gemini-pro model
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!apiKey) {
            return new NextResponse("Gemini API key not configured.", { status: 500 })
        }

        const { messages } = await req.json();
        // const messages = all_messages[0].content

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired.",  {status:403})
        };

        if (!messages) {
            return new NextResponse('Messages are required', { status: 400 })
        }

        const generation_config = {
            "temperature":0,
            "top_p":1,
            "top_k":1,
            "max_output_tokens": 400,
        }

        const safety_settings = [
            {
                "category": HarmCategory.HARM_CATEGORY_HARASSMENT,
                "threshold": HarmBlockThreshold.BLOCK_NONE,
            },
            {
                "category": HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                "threshold": HarmBlockThreshold.BLOCK_NONE,
            },
            {
                "category": HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                "threshold": HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                "category": HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                "threshold": HarmBlockThreshold.BLOCK_NONE,
            },
        ]


        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME, generationConfig: generation_config,
        safetySettings: safety_settings });

        const result = await model.generateContent(instrucationMessage+messages);
        const response = await result.response;
        const text = response.text();

        await incraseApiLimit()

        return NextResponse.json(text)
    }
    catch (error) {
        console.log("[CODE_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}