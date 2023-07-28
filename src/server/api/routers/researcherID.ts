import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
    if (!isValid) {
      throw new Error("Invalid ID");
    }
    return ctx.prisma.iDs.create({
      data: {
        researcherID: input.researcherID,
        pic: input.pic,
        checked: input.checked,
      },
    });
  });

const getAllIds = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.iDs.findMany({
    orderBy: { id: "desc" },
  });
});

export const researchIDrouter = createTRPCRouter({
  createNewID: createNewID,
  getAllIds: getAllIds,
});
