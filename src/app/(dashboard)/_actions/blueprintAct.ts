"use server";

import { redirect } from "next/navigation";
import {
  CreateBlueprintType,
  CreateBlueprintSchema,
} from "../../../../schemas/blueprint";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function CreateBlueprints(form: CreateBlueprintType) {
  const parseBody = CreateBlueprintSchema.safeParse(form);

  if (!parseBody.success) {
    throw new Error("Datos no validos");
  }

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { name, icon, type } = parseBody.data;
  return await prisma.category.create({
    data: {
      userId: user.id,
      name,
      icon,
      type,
    },
  });
}
