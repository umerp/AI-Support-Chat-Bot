import { textFieldClasses } from "@mui/material";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const SystemPrompt = "headstarter stuff"

export async function POST(req){
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completion.create({
        messages = {
            role: 'system', content:SystemPrompt
        },
        ...data,
        model:'gpt-4o-mini',
        stream:true,
    })
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if(content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (error) {
                controller.error(error)
            }
            finally{
                controller.close()
            }
        }
    })
    return new NextResponse(stream)
}