import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

const createNewID = publicProcedure
  .input(
    z.object({
      researcherID: z.string(),
      pic: z.string(),
      checked: z.boolean(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const reg = /^\d{4}-\d{4}-\d{4}$/;
    const isValid = reg.test(input.researcherID);
    if (!isValid) throw new Error("Invalid ID");
    const { success } = await ratelimit.limit(input.researcherID);
    if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
    return ctx.prisma.iDs.upsert({
      where: {
        researcherID: input.researcherID,
      },
      update: {
        pic: input.pic,
        updatedAt: new Date(),
      },
      create: {
        researcherID: input.researcherID,
        pic: input.pic,
        checked: input.checked,
      },
    });
  });

const getAllIds = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.iDs.findMany({
    orderBy: { updatedAt: "desc" },
    take: 100,
  });
});

export const researchIDrouter = createTRPCRouter({
  createNewID: createNewID,
  getAllIds: getAllIds,
});
