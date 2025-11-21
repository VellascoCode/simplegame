import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

const serverSessionOptions = { ...authOptions };

export async function getOwnerIdFromSession(): Promise<string | null> {
  const session = await getServerSession(serverSessionOptions);
  const ownerId = session?.user?.id;
  return typeof ownerId === "string" && ownerId.length > 0 ? ownerId : null;
}
