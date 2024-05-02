"use server";

import {
  OpTransactionSchemaType,
  OpTransactionSchema,
} from "../../../../schemas/OpTransactionSchema";
import { currentUser } from "@clerk/nextjs/server";
import { Category } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export async function CreateOp(form: OpTransactionSchemaType) {
  const parseBody = OpTransactionSchema.safeParse(form);
  if (!parseBody.success) {
    throw new Error(parseBody.error.message);
  }

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { amount, category, date, description, type } = parseBody.data;

  const opCategory = await prisma.category.findFirst({
    where: {
      userId: user.id,
      name: category,
    },
  });

  if (!opCategory) {
    throw new Error("Op no encontrada");
  }

  //NOTE: No confidurar el tipo de $transacion(db) y prima.transaction (tabla).
  await prisma.$transaction([
    prisma.opTransaction.create({
      data: {
        userId: user.id,
        amount,
        date,
        description: description || "",
        type,
        category: opCategory.name,
        categoryIcon: opCategory.icon,
      },
    }),

    prisma.monthHistory.upsert({
      where: {
        day_month_year_userId: {
          userId: user.id,
          day: date.getUTCDate(),
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
        },
      },

      create: {
        userId: user.id,
        day: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
      },
    }),
  ]);
}
