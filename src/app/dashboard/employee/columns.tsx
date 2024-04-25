"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Employee = {
  id: string;
  name: string;
  area: string;
  email: string;
  phone: string;
  status: "available" | "unavailable";
  proyects: string[];
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "area",
    header: "Área",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "proyects",
    header: "Proyectos",
  },
];
