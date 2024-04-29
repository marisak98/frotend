import * as React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";
import { Tasks, columns } from "./columns";
import { DataTable } from "./data-table";

async function getTask(): Promise<Tasks[]> {
  return [
    {
      id: "1",
      task: "TASK-1",
      title: "Soldar la extructura para el proyecto 1",
      status: "Pendiente",
      priority: "Alta",
    },
    {
      id: "2",
      task: "TASK-2",
      title: "Pulir la extructura para el proyecto 2",
      status: "Completado",
      priority: "Media",
    },
    {
      id: "3",
      task: "TASK-3",
      title: "Pintar la extructura para el proyecto 3",
      status: "En Progreso",
      priority: "Baja",
    },
    {
      id: "4",
      task: "TASK-4",
      title: "Pintar la extructura para el proyecto 4",
      status: "Cancelado",
      priority: "Alta",
    },
    {
      id: "5",
      task: "TASK-5",
      title: "Doblar el tol para la cubierta",
      status: "En Espera",
      priority: "Alta",
    },
    {
      id: "6",
      task: "TASK-6",
      title: "Pulir la extructura para el proyecto 6",
      status: "Pendiente",
      priority: "Media",
    },
  ];
}

export default async function Employees() {
  const tasks = await getTask();
  const data = await getTask();

  return (
    <main className="p-4 sm:px-4 sm:py-4">
      <section className="flex items-center justify-between mb-4 md:mb-8 lg:mb-12">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl text-foreground font-semibold tracking-tight">
            Tareas en Produccion.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Todas las Tareas.
          </p>
        </div>
      </section>

      <section className="flex items-center gap-2 mb-2">
        {tasks && tasks.length > 0 ? (
          <p className="text-sm text-gray-400 flex items-center gap-x-1">
            <Users className="w-4 h-4" />
            <span>{tasks.length} Numero de Tareas</span>
          </p>
        ) : null}
      </section>

      <Separator className="mb-5 bg-gray-200 dark:bg-gray-800" />

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
