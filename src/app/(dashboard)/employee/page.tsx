import * as React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";
import { Employee, columns } from "./columns";
import { DataTable } from "./data-table";

async function getEmployees(): Promise<Employee[]> {
  return [
    {
      id: "1",
      name: "Juan",
      area: "Producción",
      email: "Juan@javierdiez.com",
      phone: "123456789",
      status: "available",
      proyects: ["Proyecto 1", "Proyecto 2"],
    },
    {
      id: "2",
      name: "María",
      area: "Producción",
      email: "maria@javierdiez.com",
      phone: "987654321",
      status: "unavailable",
      proyects: ["Proyecto 3", "Proyecto 4"],
    },
    {
      id: "3",
      name: "Pedro",
      area: "Producción",
      email: "pedro@javierdiez.com",
      phone: "123456789",
      status: "available",
      proyects: ["Proyecto 5", "Proyecto 6"],
    },
    {
      id: "4",
      name: "Ana",
      area: "Metalmeánica",
      email: "ana@javierdiez.com",
      phone: "987654321",
      status: "unavailable",
      proyects: ["Proyecto 7", "Proyecto 8"],
    },
    {
      id: "5",
      name: "Luis",
      area: "Carpenetería",
      email: "luis@javierdiez.com",
      phone: "123456789",
      status: "available",
      proyects: ["Proyecto 9", "Proyecto 10"],
    },
    {
      id: "6",
      name: "Sara",
      area: "Acrilicos y Acabados",
      email: "sara@javierdiez.com",
      phone: "987654321",
      status: "unavailable",
      proyects: ["Proyecto 11", "Proyecto 12"],
    },
  ];
}

export default async function Employees() {
  const employees = await getEmployees();
  const data = await getEmployees();

  return (
    <main className="p-4 sm:px-4 sm:py-4">
      <section className="flex items-center justify-between mb-4 md:mb-8 lg:mb-12">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl text-foreground font-semibold tracking-tight">
            Personal de Producción.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tabla de empleados de la empresa.
          </p>
        </div>
      </section>

      <section className="flex items-center gap-2 mb-2">
        {employees && employees.length > 0 ? (
          <p className="text-sm text-gray-400 flex items-center gap-x-1">
            <Users className="w-4 h-4" />
            <span>{employees.length} Personal</span>
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
