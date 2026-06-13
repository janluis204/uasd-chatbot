"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PREGUNTAS_SUGERIDAS } from "@/lib/preguntas";

// Tipo para los mensajes del chat
interface Message {
  role: "user" | "assistant";
  content: string;
}

// Parsea el texto del asistente para añadir formato HTML básico
function formatBotMessage(text: string): string {
  return text
    // Títulos en negrita al inicio de línea (ej: "TÍTULO:")
    .replace(/^([A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s]+:)/gm, "<strong>$1</strong>")
    // Listas con guión o asterisco
    .replace(/^[-*•]\s+(.+)/gm, "<li>$1</li>")
    // Listas numeradas
    .replace(/^\d+\.\s+(.+)/gm, "<li>$1</li>")
    // Saltos de línea dobles como párrafos
    .replace(/\n\n+/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    // Wrap en párrafos
    .replace(/^/, "<p>")
    .replace(/$/, "</p>")
    // Agrupar li consecutivos en ul
    .replace(/(<li>.*?<\/li>)(\s*<br\/>)*/g, "$1")
    .replace(/(<li>[\s\S]*?<\/li>)+/g, (match) => `<ul>${match}</ul>`);
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    // Abrir la primera categoría por defecto
    { "Identidad y Misión": true }
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-resize del textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  };

  // Toggle de categoría en el sidebar
  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  // Enviar mensaje
  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage = text.trim();
      if (!userMessage || loading) return;

      setError(null);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      // Añadir mensaje del usuario al historial
      const newMessages: Message[] = [
        ...messages,
        { role: "user", content: userMessage },
      ];
      setMessages(newMessages);
      setLoading(true);
      setSidebarOpen(false);

      try {
        // Llamar al API route de Next.js
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error al comunicarse con el servidor.");
        }

        // Añadir respuesta del asistente
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.reply },
        ]);
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Error desconocido.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  // Enviar con Enter (Shift+Enter = nueva línea)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // Seleccionar pregunta sugerida
  const handleSuggestedQuestion = (q: string) => {
    sendMessage(q);
  };

  // Limpiar conversación
  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="app-shell">
      {/* Overlay para cerrar sidebar en móvil */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ===== SIDEBAR ===== */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">🎓</div>
            <span className="sidebar-logo-text">UASD Chat</span>
          </div>
          <div className="sidebar-subtitle">Estatuto Orgánico</div>
        </div>

        <div className="sidebar-questions">
          <div className="sidebar-section-title">Preguntas sugeridas</div>

          {PREGUNTAS_SUGERIDAS.map((cat) => (
            <div key={cat.categoria} className="question-category">
              {/* Encabezado de categoría colapsable */}
              <div
                className={`category-label ${openCategories[cat.categoria] ? "open" : ""}`}
                onClick={() => toggleCategory(cat.categoria)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && toggleCategory(cat.categoria)
                }
              >
                {cat.categoria}
                <span className="chevron">▶</span>
              </div>

              {/* Preguntas de la categoría */}
              {openCategories[cat.categoria] &&
                cat.preguntas.map((q) => (
                  <button
                    key={q}
                    className="question-btn"
                    onClick={() => handleSuggestedQuestion(q)}
                    disabled={loading}
                  >
                    {q}
                  </button>
                ))}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="btn-clear" onClick={clearChat}>
            🗑 Limpiar conversación
          </button>
        </div>
      </aside>

      {/* ===== ÁREA DE CHAT ===== */}
      <main className="chat-main">
        {/* Header */}
        <div className="chat-header">
          {/* Botón menú (solo móvil) */}
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            ☰
          </button>
          <div className="chat-header-dot" />
          <span className="chat-header-title">
            Asistente del Estatuto Orgánico
          </span>
          <span className="chat-header-sub">UASD · {new Date().getFullYear()}</span>
        </div>

        {/* Mensajes */}
        <div className="messages-area">
          {messages.length === 0 && !loading ? (
            /* Estado vacío */
            <div className="empty-state">
              <div className="empty-state-icon">📜</div>
              <h2>Consulta el Estatuto Orgánico</h2>
              <p>
                Escribe tu pregunta o selecciona una sugerencia del panel
                lateral para comenzar.
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  <div className="msg-avatar">
                    {msg.role === "user" ? "👤" : "🎓"}
                  </div>
                  <div
                    className="msg-bubble"
                    dangerouslySetInnerHTML={
                      msg.role === "assistant"
                        ? { __html: formatBotMessage(msg.content) }
                        : undefined
                    }
                  >
                    {msg.role === "user" ? msg.content : undefined}
                  </div>
                </div>
              ))}

              {/* Indicador de carga */}
              {loading && (
                <div className="message assistant">
                  <div className="msg-avatar">🎓</div>
                  <div className="msg-bubble">
                    <div className="typing-indicator">
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Error */}
          {error && (
            <div className="error-toast">⚠️ {error}</div>
          )}

          {/* Anchor para auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="input-area">
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              className="input-field"
              placeholder="Escribe tu pregunta sobre el Estatuto..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
            />
            <button
              className="send-btn"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label="Enviar"
            >
              ↑
            </button>
          </div>
          <p className="input-hint">
            Enter para enviar · Shift+Enter para nueva línea
          </p>
        </div>
      </main>
    </div>
  );
}
