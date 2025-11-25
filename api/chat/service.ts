import { randomUUID } from "crypto";

import { chatSendSchema } from "@/lib/models";
import { addChatMessage, listChatMessages } from "@/lib/repositories";

export async function sendMessage(payload: unknown) {
  const data = chatSendSchema.parse(payload);
  const message = {
    id: randomUUID(),
    ownerId: data.ownerId,
    characterName: data.name,
    message: data.message,
    createdAt: new Date().toISOString()
  };
  await addChatMessage(message);
  return message;
}

export async function getMessages() {
  return listChatMessages(20);
}
