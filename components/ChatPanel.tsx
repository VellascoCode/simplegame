"use client";

import { useCallback, useEffect, useState } from "react";
import { getJSON, postJSON } from "@/lib/clientApi";
import type { ChatMessage } from "@/lib/models";

export function useChatFeed(forcedOwnerId?: string, forcedCharacterName?: string) {
  const [ownerId, setOwnerId] = useState(forcedOwnerId ?? "");
  const [name, setName] = useState(forcedCharacterName ?? "");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const list = await getJSON<ChatMessage[]>("/api/chat/get");
        if (active) {
          setMessages(list.slice(-20));
        }
      } catch (err) {
        if (active) {
          setError(getMessage(err));
        }
      }
    }

    load();
    const interval = setInterval(load, 3000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (forcedOwnerId) {
      setOwnerId(forcedOwnerId);
    }
  }, [forcedOwnerId]);

  useEffect(() => {
    if (forcedCharacterName) {
      setName(forcedCharacterName);
    }
  }, [forcedCharacterName]);

  const sendMessage = useCallback(async () => {
    if (!ownerId) {
      setError("Informe o ownerId para enviar ao chat.");
      return;
    }
    if (!message.trim()) {
      return;
    }
    try {
      await postJSON("/api/chat/send", { ownerId, name: name || undefined, message });
      setMessage("");
      setError(null);
    } catch (err) {
      setError(getMessage(err));
    }
  }, [ownerId, name, message]);

  return {
    ownerId,
    setOwnerId,
    name,
    setName,
    message,
    setMessage,
    messages,
    error,
    sendMessage
  };
}

export function ChatPanel({
  ownerId: forcedOwnerId,
  characterName
}: {
  ownerId?: string;
  characterName?: string;
}) {
  const {
    ownerId,
    setOwnerId,
    name,
    setName,
    message,
    setMessage,
    messages,
    error,
    sendMessage
  } = useChatFeed(forcedOwnerId, characterName);

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage();
  }

  return (
    <div className="chat-panel">
      <h3>Chat Global</h3>
      {error && <p>{error}</p>}
      <div className="chat-log">
        <ul className="list">
          {messages.map((entry) => (
            <li key={entry.id}>
              <strong>{entry.characterName ?? entry.ownerId}</strong>: {entry.message}{" "}
              <small>{new Date(entry.createdAt).toLocaleTimeString()}</small>
            </li>
          ))}
          {messages.length === 0 && <li>Nenhuma mensagem.</li>}
        </ul>
      </div>
      <form className="chat-form" onSubmit={handleSend}>
        {!forcedOwnerId && (
          <input
            id="chat-owner"
            value={ownerId}
            onChange={(event) => setOwnerId(event.target.value)}
            placeholder="Owner ID"
            required
          />
        )}
        {!characterName && (
          <input
            id="chat-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nome do personagem"
          />
        )}
        <textarea
          id="chat-message"
          value={message}
          maxLength={280}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Digite sua mensagem"
          required
        />
        <button className="button">Enviar</button>
      </form>
    </div>
  );
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Falha no chat";
}
