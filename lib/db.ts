import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;
if (!uri) console.warn("MONGODB_URI not set. Contact form will fail to save.");

let cached: { client: MongoClient | null; db: Db | null } = { client: null, db: null };

export async function getDb(): Promise<Db> {
  if (cached.db) return cached.db;
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();
  cached = { client, db };
  return db;
}