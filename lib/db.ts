import { MongoClient, type Collection, type Document } from "mongodb";

let client: MongoClient | null = null;

const uri = process.env.MONGODB_URI;
const parsedDbName = (() => {
  if (!uri) return null;
  try {
    const url = new URL(uri);
    const pathname = url.pathname.replace(/^\//, "");
    return pathname || null;
  } catch {
    return null;
  }
})();

async function getClient() {
  if (!uri) {
    throw new Error("MONGODB_URI não configurado");
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  return client;
}

export async function getCollection<T extends Document = Document>(
  name: string
): Promise<Collection<T>> {
  const cli = await getClient();
  const dbName = process.env.MONGODB_DB || parsedDbName || "simpleapp";
  return cli.db(dbName).collection<T>(name);
}

export function hasMongoConnection() {
  return Boolean(uri);
}
