import { Folder } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function orderList() {
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
    </main>
  );
}
