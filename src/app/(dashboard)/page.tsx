import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import CreateNewOpDialog from "./_components/createNewOpDialog";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";

async function Dashboard() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const userSettings = await prisma.userSettings.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }
  return (
    <main className="p-4 sm:px-4 sm:p-4">
      <section className="flex items-center justify-between mb-4 md:mb-8 lg:mb-12">
        <div className="space-y-1">
          <p className="text-2xl font-semibold">
            Tu panel de Control, {user.firstName}! 👋
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Visualiza todas tus actividades desde un solo lugar.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <CreateNewOpDialog
            trigger={
              <Button
                variant={"outline"}
                className=" text-left group flex gap-x-3 items-center justify-start px-3
            border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700
          hover:text-white"
                title="Agregar nueva OP."
              >
                <PlusIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Agregar actividad</span>
              </Button>
            }
            type="nueva"
          />

          <CreateNewOpDialog
            trigger={
              <Button
                variant={"outline"}
                className=" text-left group flex gap-x-3 items-center justify-start px-3
            border-rose-500 bg-rose-950 text-white hover:bg-rose-700
          hover:text-white"
                title="Agregar nuevo reproceso."
              >
                <MinusIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Reproceso Op</span>
              </Button>
            }
            type="reproceso"
          />
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
