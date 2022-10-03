import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import clientPromise from "../lib/mongodb";

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  const mongo = (await clientPromise) || null;
  const MONGODB_DB = process.env.MONGODB_DB;

  if (!MONGODB_DB) {
    throw new Error("Add Mongo DB name to .env.local");
  }

  const db = mongo.db("chatroom");

  return {
    db,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
