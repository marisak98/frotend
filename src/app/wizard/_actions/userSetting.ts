"use server";

import { UpdateUserCurrencySchema } from "../../../../schemas/userSettings";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export async function updateUserCurrency(currency: string) {
  const parseBody = UpdateUserCurrencySchema.safeParse({
    currency,
  });

  if (!parseBody.success) {
    throw parseBody.error;
  }

  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.update({
    where: {
      userId: user.id,
    },
    data: {
      currency,
    },
  });

  return userSettings;
}
