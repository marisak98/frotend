"use client";

import React, { ReactNode } from "react";
import { opStateType } from "@/lib/types";
import BlueprintPicker from "../_components/BlueprintPicker";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import {
  OpTransactionSchema,
  OpTransactionSchemaType,
} from "../../../../schemas/OpTransactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  trigger: ReactNode;
  type: opStateType;
}

function CreateNewOpDialog({ trigger, type }: Props) {
  const form = useForm<OpTransactionSchemaType>({
    resolver: zodResolver(OpTransactionSchema),
    defaultValues: {
      type,
      date: new Date(),
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Crear
            <span
              className={cn(
                "m-1",
                type === "nueva" ? "text-emerald-500" : "text-red-500",
              )}
            >
              {type}
            </span>
            OP.
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input defaultValue={""} {...field} />
                  </FormControl>
                  <FormDescription>
                    Description de la OP (opcional).
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero de Actividades.</FormLabel>
                  <FormControl>
                    <Input defaultValue={0} type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Numero de Plano (obligtorio).
                  </FormDescription>
                </FormItem>
              )}
            />

            <div
              className="flex items-center
            justify-between gap-2"
            >
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plano.</FormLabel>
                    <FormControl>
                      <BlueprintPicker type={type} />
                    </FormControl>
                    <FormDescription>
                      Seleccione el Plano para de asignar las tarea.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de la tarea.</FormLabel>
                    <FormControl>
                      <Input defaultValue={""} {...field} />
                    </FormControl>
                    <FormDescription>
                      Seleccione el Plano para de asignar las tarea.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewOpDialog;
