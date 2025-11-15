import { onlinePingSchema } from "@/lib/models";
import { listOnline, pingOnline } from "@/lib/repositories";

export async function ping(payload: unknown) {
  const data = onlinePingSchema.parse(payload);
  return pingOnline(data.ownerId);
}

export async function listPresences() {
  return listOnline();
}
