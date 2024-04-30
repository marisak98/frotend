"use client";

import { Folder } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { opState } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "@/components/skeletonWrapper";
import { Boxes, TrendingDown, PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateCategoryDialog from "../_components/create-category-dialog";
import { cn } from "@/lib/utils";
import { Category } from "@emoji-mart/data";

export default function page() {
  const directory = ["OP Cervezas", "OP Refrescos", "OP Jugos", "OP Vinos"];
  return (
    <main className="p-4 sm:px-4 sm:py-4">
      <section className="flex items-center justify-between mb-4 md:mb-8 lg:mb-12">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl text-foreground font-semibold -tracking-wide ">
            Lista de Ordenes de Producción.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground ">
            Total de la lista de ordenes de producción
          </p>
        </div>
      </section>
      <section className="flex items-center gap-2 mb-2">
        {directory && directory.length > 0 ? (
          <p className="text-sm text-gray-400 flex items-center gap-x-1">
            <Folder className="w-4 h-4" />
            <span>{directory.length} OP Carpetas</span>
          </p>
        ) : null}
      </section>

      <Separator className="mb-5 bg-gray-200 dark:bg-gray-800" />
      <div className=" container flex flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Crear OP`s</CardTitle>
            <CardDescription>Crear ordenes de producción</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Crear ordenes de producción</p>
          </CardContent>
        </Card>
        <OpCategoryList type="active" />
        <OpCategoryList type="inactive" />
      </div>
    </main>
  );
}

function OpCategoryList({ type }: { type: opState }) {
  /*  const categoryQuery = useQuery({
    queryKey: ["oplist", type],
    queryFn: () => fetch(`/api/oplist/${type}`).then((res) => res.json()),
  });
  const dataAvailable = categoryQuery.data && categoryQuery.data.length > 0;
  */

  const sampleData = [
    {
      id: 1,
      name: "OP Cervezas",
      description: "Ordenes de Producción de Cervezas",
      status: "active",
    },
    {
      id: 2,
      name: "OP Refrescos",
      description: "Ordenes de Producción de Refrescos",
      status: "active",
    },
    {
      id: 3,
      name: "OP Jugos",
      description: "Ordenes de Producción de Jugos",
      status: "active",
    },
    {
      id: 4,
      name: "OP Vinos",
      description: "Ordenes de Producción de Vinos",
      status: "active",
    },
  ];

  const getCategoryQuery = () => {
    return {
      data: sampleData,
      isLoading: false,
      isError: false,
    };
  };
  const categoryQuery = getCategoryQuery();
  const dataAvailable = categoryQuery.data && categoryQuery.data.length > 0;

  return (
    <SkeletonWrapper isLoading={categoryQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {type === "active" ? (
                <TrendingDown className="h-12 w-12 items-center rounded-lg bg-red-400/10 p-2 text-red-500" />
              ) : (
                <Boxes className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
              )}
              <div>
                {type === "inactive" ? "Inactives" : "Actives"} categories
                <div className="text-sm text-muted-foreground">
                  Filtrar por categorias
                </div>
              </div>
            </div>
            <CreateCategoryDialog
              type={type}
              successCallback={() => categoryQuery}
              trigger={
                <Button className="gap-2 text-sm">
                  <PlusSquare className="h-4 w-4" />
                  Create category
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator className="mb-2 bg-gray-200 dark:bg-gray-800" />
        {!dataAvailable && (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p>
              No
              <span
                className={cn(
                  "m-1",
                  type === "inactive" ? "text-emerald-500" : "text-red-500",
                )}
              >
                {type}
              </span>
              categories yet
            </p>

            <p className="text-sm text-muted-foreground">
              Create one to get started
            </p>
          </div>
        )}
        {dataAvailable && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoryQuery.data.map((category: Category) => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]">
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
      </div>
    </div>
  );
}
