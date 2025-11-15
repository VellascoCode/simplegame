"use client";

import { ChatPanel } from "@/components/ChatPanel";

export default function ChatPage() {
  return (
    <section>
      <div className="card">
        <h2>Etapa 7 — Chat Global</h2>
        <p>Interface fixa com polling a cada 3 segundos para buscar novas mensagens.</p>
      </div>
      <div className="card">
        <ChatPanel />
      </div>
    </section>
  );
}
