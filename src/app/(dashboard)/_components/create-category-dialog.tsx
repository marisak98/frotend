"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { opStateType } from "../../../lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleOff, Loader2, PlusSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import {
  opCategorySchema,
  OpCategorytype,
} from "../../../../schemas/op-categories";
import Reat, { ReactNode, useCallback, useState } from "react";

interface Category {
  name: string;
  icon: string;
  type: string;
}

interface Props {
  type: opStateType;
  successCallback: (category: Category) => void;
  trigger?: ReactNode;
}

function CreateCategoryDialog({ type, successCallback, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<OpCategorytype>({
    resolver: zodResolver(opCategorySchema),
    defaultValues: {
      type: "inactive",
    },
  });

  const theme = useTheme();

  const onSubmit = useCallback(
    (values: OpCategorytype) => {
      const newCategory: Category = {
        name: values.name,
        icon: values.icon || "", // Si no se selecciona un icono, se establece como cadena vacía
        type: type,
      };

      // Simular la creación exitosa de la categoría
      successCallback(newCategory);

      // Cerrar el diálogo
      setOpen(false);

      // Restablecer el formulario
      form.reset();
    },
    [form, successCallback, type],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant={"ghost"}
            className="flex border-separate items-center justify-start roudned-none border-b px-3 py-3 text-muted-foreground"
          >
            <PlusSquare className="mr-2 h-4 w-4" />
            Create new
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create
            <span
              className={cn(
                "m-1",
                type === "inactivo" ? "text-emerald-500" : "text-red-500",
              )}
            >
              {type}
            </span>
            category
          </DialogTitle>
          <DialogDescription>
            Categories are used to group your transactions
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how your category will appear in the app
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    {/* Aquí puedes poner cualquier selector de iconos o lógica para seleccionar un icono */}
                    {/* Por ejemplo, puedes usar un menú desplegable o un selector de emoji */}
                    {/* Aquí lo estoy simplificando para fines de demostración */}
                    <CircleOff className="h-[48px] w-[48px]" />
                  </FormControl>
                  <FormDescription>
                    This is how your category will appear in the app
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                form.reset();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryDialog;
