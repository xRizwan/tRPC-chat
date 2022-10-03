import { initTRPC } from "@trpc/server";
import { Context, createContext } from "../../../server/context";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { z } from "zod";
import { Message } from "../../../lib/schema";
import { OptionalId } from "mongodb";

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  "msg.list": t.procedure.query(async ({ ctx }) => {
    const messages = await ctx.db
      .collection<Message>("chat")
      .find({})
      .toArray();
    return {
      messages,
    };
  }),
  "msg.add": t.procedure
    .input(
      z.object({
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const formatted = {
        ...input,
        date: new Date(),
      };
      let message = await ctx.db
        .collection<OptionalId<Message>>("chat")
        .insertOne(formatted);
      return {
        message,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
