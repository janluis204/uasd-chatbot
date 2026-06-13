import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/estatuto";

// Tipo para los mensajes del historial
interface Message {
  role: "user" | "assistant";
  content: string;
}

// Inicializar cliente de Anthropic (la API key se lee de la variable de entorno)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    // Parsear el cuerpo de la solicitud
    const body = await req.json();
    const { messages }: { messages: Message[] } = body;

    // Validar que se enviaron mensajes
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Se requiere al menos un mensaje." },
        { status: 400 }
      );
    }

    // Llamar a la API de Anthropic con el historial completo
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    // Extraer el texto de la respuesta
    const assistantMessage = response.content[0];
    if (assistantMessage.type !== "text") {
      throw new Error("Respuesta inesperada de la IA.");
    }

    return NextResponse.json({ reply: assistantMessage.text });
  } catch (error: unknown) {
    console.error("Error en API de chat:", error);

    // Manejo de errores específicos de Anthropic
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `Error de la IA: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor. Por favor intenta de nuevo." },
      { status: 500 }
    );
  }
}
